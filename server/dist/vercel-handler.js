"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
let cachedExpressApp = null;
function createExpressApp() {
    return core_1.NestFactory.create(app_module_1.AppModule).then((app) => {
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
        app.enableCors({
            origin: process.env.CLIENT_URL || true,
            credentials: true,
        });
        return app.init().then(() => app.getHttpAdapter().getInstance());
    });
}
async function getApp() {
    if (!cachedExpressApp) {
        cachedExpressApp = createExpressApp();
    }
    return cachedExpressApp;
}
async function handler(req, res) {
    const expressApp = await getApp();
    let path = req.url ?? req.url ?? '/';
    if (typeof path === 'string' && path.startsWith('http')) {
        try {
            path = new URL(path).pathname;
        }
        catch {
            path = '/';
        }
    }
    req.url = String(path) || '/';
    const timeoutMs = 20000;
    await new Promise((resolve, reject) => {
        const done = () => {
            clearTimeout(t);
            resolve();
        };
        const t = setTimeout(() => {
            if (!res.headersSent) {
                res.statusCode = 504;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Gateway Timeout', message: 'Response took too long (e.g. cold start). Retry or use normal dev: npm run dev:server + npm run dev:client.' }));
            }
            done();
        }, timeoutMs);
        res.once('finish', done);
        res.once('close', done);
        res.once('error', (err) => {
            clearTimeout(t);
            reject(err);
        });
        expressApp(req, res);
    });
}
//# sourceMappingURL=vercel-handler.js.map
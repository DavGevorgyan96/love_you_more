import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

let cachedExpressApp: ReturnType<typeof createExpressApp> | null = null;

function createExpressApp() {
  return NestFactory.create(AppModule).then((app) => {
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
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

/**
 * Vercel serverless handler: forwards /api/* to Nest (Nest has global prefix 'api').
 */
export default async function handler(req: import('http').IncomingMessage, res: import('http').ServerResponse) {
  const expressApp = await getApp();
  // Path: keep /api/* as-is so Nest (globalPrefix 'api') matches /api/health, /api/mail/send
  let path = (req as any).url ?? req.url ?? '/';
  if (typeof path === 'string' && path.startsWith('http')) {
    try {
      path = new URL(path).pathname;
    } catch {
      path = '/';
    }
  }
  (req as any).url = String(path) || '/';

  const timeoutMs = 20000;
  await new Promise<void>((resolve, reject) => {
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

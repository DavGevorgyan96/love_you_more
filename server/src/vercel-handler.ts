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
 * Vercel serverless handler: forwards /api/* to Nest (paths without /api).
 */
export default async function handler(req: import('http').IncomingMessage, res: import('http').ServerResponse) {
  const expressApp = await getApp();
  const url = (req.url || '/').replace(/^\/api/, '') || '/';
  (req as any).url = url;
  expressApp(req, res);
}

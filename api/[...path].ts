// Vercel serverless: /api/* (with at least one segment) → NestJS (server)
// server/dist is produced by "npm run build:server" (run on Vercel before this)
const nestHandler = require('../server/dist/vercel-handler').default;

export default async function handler(req: unknown, res: unknown) {
  try {
    await nestHandler(req, res);
  } catch (err) {
    const r = res as { statusCode?: number; setHeader?: (a: string, b: string) => void; end?: (s: string) => void };
    r.statusCode = 500;
    r.setHeader?.('Content-Type', 'application/json');
    r.end?.(JSON.stringify({ error: 'Server error', message: String((err as Error).message) }));
  }
}

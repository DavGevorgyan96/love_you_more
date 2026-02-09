export default function handler(_req: unknown, res: { statusCode: number; setHeader: (a: string, b: string) => void; end: (s: string) => void }) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok', source: 'api/health' }));
}

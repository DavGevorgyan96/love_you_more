// Vercel serverless: all /api/* requests are handled by NestJS (server)
// server/dist is produced by "npm run build:server" (run on Vercel before this)
const handler = require('../server/dist/vercel-handler').default;
export default handler;

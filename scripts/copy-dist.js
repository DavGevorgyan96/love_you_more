const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'client', 'dist');
const dest = path.join(__dirname, '..', 'public');

if (!fs.existsSync(src)) {
  console.error('Run "npm run build:client" first (client/dist not found)');
  process.exit(1);
}
if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });
// SPA fallback: Vercel serves 404.html for missing paths, so client-side routes work
const indexPath = path.join(dest, 'index.html');
const notFoundPath = path.join(dest, '404.html');
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('Added 404.html (SPA fallback)');
}
console.log('Copied client/dist -> public');

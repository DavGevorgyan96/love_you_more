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
console.log('Copied client/dist -> public');

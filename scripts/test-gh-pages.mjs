// Serves out/ with basePath prefix, simulating GitHub Pages locally.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 3459;
const ROOT = path.resolve('out');
const BASE = '/daily-reading-digest';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

http
  .createServer((req, res) => {
    let url = req.url.split('?')[0];
    if (!url.startsWith(BASE)) {
      res.writeHead(404);
      res.end('Not under basePath ' + BASE);
      return;
    }
    url = url.slice(BASE.length) || '/';
    // Decode URL-encoded path segments (e.g. %5Bslug%5D → [slug]) so Next's
    // dynamic-route chunks under out/_next/static/chunks/app/posts/[slug]/
    // resolve. GitHub Pages decodes automatically; we mirror that here.
    let decoded;
    try {
      decoded = decodeURIComponent(url);
    } catch {
      decoded = url;
    }
    let filePath = path.join(ROOT, decoded);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found: ' + url);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`serving out/ at http://localhost:${PORT}${BASE}/`);
  });

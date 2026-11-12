import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import handle from './worker/api.mjs';

const host = '127.0.0.1';
const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const origin = `http://${host}:${port}`;
const html = await readFile(new URL('./worker/index.html', import.meta.url), 'utf8');

createServer(async (req, res) => {
  try {
    // This adapter is only for loopback. Validate Host to prevent DNS rebinding.
    if (req.headers.host !== `${host}:${port}`) return res.writeHead(403).end();
    const url = new URL(req.url, origin);
    if (url.origin !== origin) return res.writeHead(403).end();
    const headers = new Headers(req.headers);
    headers.set('oai-authenticated-user-id', 'loopback-owner');
    const chunks = [];
    let bytes = 0;
    for await (const chunk of req) {
      bytes += chunk.length;
      if (bytes > 4096) return res.writeHead(413).end();
      chunks.push(chunk);
    }
    const body = /^(GET|HEAD)$/.test(req.method) ? undefined : Buffer.concat(chunks);
    const result = await handle(new Request(url, { method: req.method, headers, body }), process.env, html);
    res.writeHead(result.status, Object.fromEntries(result.headers));
    res.end(Buffer.from(await result.arrayBuffer()));
  } catch {
    if (!res.headersSent) res.writeHead(500);
    res.end('ULTRON could not handle this request.');
  }
}).listen(port, host, () => console.log(`ULTRON is ready at ${origin}`));

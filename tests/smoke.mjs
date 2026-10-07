// Browser smoke run: load the built page, collect console errors, take screenshots.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.join(here, '..');
const out = path.join(root, 'qa/shots'); mkdirSync(out, { recursive: true });
const page0 = readFileSync(path.join(root, 'dist/index.html'), 'utf8');
const wrapped = `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"></head><body>${page0}</body></html>`;
writeFileSync(path.join(root, 'qa/page.html'), wrapped);
// Serve the page over HTTP with dist/audio beside it, the way the Artifact publishes supporting files.
import http from 'node:http';
import { existsSync } from 'node:fs';
let url = '';
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (u === '/' || u === '/index.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); res.end(wrapped); return; }
  const m = /^\/audio\/([a-z0-9._-]+)$/i.exec(u);
  const f = m && path.join(root, 'dist/audio', m[1]);
  if (f && existsSync(f)) { res.writeHead(200, { 'content-type': f.endsWith('.json') ? 'application/json' : 'audio/mpeg' }); res.end(readFileSync(f)); return; }
  res.writeHead(404); res.end();
});
const ready = new Promise(r => server.listen(0, '127.0.0.1', () => { url = `http://127.0.0.1:${server.address().port}/`; r(); }));
server.unref();

export async function open({ width = 1280, height = 860, scheme = 'light', reduced = false, mock = null, hash = '' } = {}) {
  await ready;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width, height }, colorScheme: scheme, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/ERR_TOO_MANY_RETRIES|ERR_CERT/.test(m.text())) errors.push('console: ' + m.text()); });
  // Font CDN failures through the sandbox proxy are environment noise, not page bugs.
  const noise = u => /fonts\.(googleapis|gstatic)\.com/.test(u);
  page.on('requestfailed', r => noise(r.url()) || errors.push('requestfailed: ' + r.url().slice(0, 120) + ' ' + (r.failure()?.errorText || '')));
  if (mock) await page.addInitScript(mock);
  await page.goto(url + hash);
  await page.waitForTimeout(600);
  return { browser, page, errors };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const { browser, page, errors } = await open({});
  await page.screenshot({ path: path.join(out, 'home-light.png'), fullPage: true });
  console.log('title', await page.title(), 'h1', await page.locator('h1').first().textContent());
  console.log(errors.join('\n') || 'no errors');
  await browser.close();
}

import { readdir, readFile } from 'node:fs/promises';

const origin = 'https://fourthwingdragon.com';
const files = (await readdir(new URL('../public/', import.meta.url)))
  .filter(name => /^[a-f0-9]{32}\.txt$/.test(name));
if (files.length !== 1) throw new Error('Expected one IndexNow key file');
const key = (await readFile(new URL(`../public/${files[0]}`, import.meta.url), 'utf8')).trim();
const keyLocation = `${origin}/${files[0]}`;
async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}
const verification = await get(keyLocation);
if ((await verification.text()).trim() !== key) throw new Error('Production key file does not match');
const urls = new Set();
const visited = new Set();
async function sitemap(url) {
  if (visited.has(url)) return;
  if (new URL(url).origin !== origin) throw new Error('Unexpected sitemap host');
  visited.add(url);
  const xml = await (await get(url)).text();
  const locations = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match => match[1].trim().replaceAll('&amp;', '&'));
  if (xml.includes('<sitemapindex')) {
    for (const location of locations) await sitemap(location);
  } else {
    for (const location of locations) {
      if (new URL(location).origin !== origin) throw new Error('Unexpected page host');
      urls.add(location);
    }
  }
}
await sitemap(`${origin}/sitemap-index.xml`);
if (!urls.size) throw new Error('Sitemap has no URLs');
// Validate all pages before sending any notifications.
for (const url of urls) {
  const page = await get(url);
  const html = await page.text();
  if (page.url !== url || !page.headers.get('content-type')?.includes('text/html'))
    throw new Error(`Not a direct HTML page: ${url}`);
  if (/noindex/i.test(page.headers.get('x-robots-tag') ?? '') || /<meta\b(?=[^>]*\bname=["'](?:robots|bingbot)["'])(?=[^>]*\bcontent=["'][^"']*noindex)[^>]*>/i.test(html))
    throw new Error(`Page excludes indexing: ${url}`);
}
const submit = process.argv.includes('--submit');
let failed = 0;
for (const url of urls) {
  const endpoint = new URL('https://api.indexnow.org/indexnow');
  endpoint.search = new URLSearchParams({ url, key, keyLocation }).toString();
  if (!submit) { console.log(`READY ${url}`); continue; }
  const response = await fetch(endpoint, { signal: AbortSignal.timeout(30000) });
  console.log(`${response.status} ${url}`);
  if (![200, 202].includes(response.status)) {
    failed++;
    console.error(await response.text());
  }
}
console.log(`${urls.size} URLs; ${submit ? `${failed} failed (200 accepted; 202 pending validation)` : 'dry run; pass --submit to send'}`);
if (failed) process.exitCode = 1;

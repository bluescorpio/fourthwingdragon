import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
const root = resolve(process.argv[2] ?? 'dist');
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name === 'index.html') files.push(file);
  }
}
await walk(root);
if (!files.length) throw new Error('No built pages found');
const decode = value => value.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const legal = new Set(['/about/', '/privacy/', '/disclaimer/']);
const sitemap = await readFile(join(root, 'sitemap-0.xml'), 'utf8');
let bad = 0;
const fail = message => { bad++; console.error(message); };
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const page = '/' + file.slice(root.length + 1).replace(/index\.html$/, '');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const description = decode(html.match(/name="description"\s+content="([^"]*)"/)?.[1] ?? '');
  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];
  const expected = 'https://fourthwingdragon.com' + page;
  if (!title.trim()) fail('[title] ' + page);
  if (!description.trim()) fail('[description] ' + page);
  if (h1 !== 1) fail('[h1] ' + page + ': ' + h1);
  if (canonical !== expected) fail('[canonical] ' + page + ': ' + canonical);
  if (!legal.has(page)) {
    if (title.length < 55 || title.length > 62) fail('[title-len] ' + page + ': ' + title.length + ' — ' + title);
    if (description.length < 75 || description.length > 155) fail('[desc-len] ' + page + ': ' + description.length);
  }
  if (Buffer.byteLength(html) >= 100 * 1024) fail('[html-size] ' + page);
  if (html.includes('noindex') && sitemap.includes('<loc>' + expected + '</loc>')) fail('[sitemap] noindex page ' + page);
  console.log(page + ': title=' + title.length + ' description=' + description.length + ' h1=' + h1);
}
if (bad) { console.error(bad + ' seo problem(s)'); process.exit(1); }
console.log('seo check ok: ' + files.length + ' pages');

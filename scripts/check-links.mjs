import { readdir, readFile, stat } from 'node:fs/promises';
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
const pageOf = file => '/' + file.slice(root.length + 1).replace(/index\.html$/, '');
const pages = new Map();
const outgoing = new Map();
const inbound = new Map(files.map(file => [pageOf(file), new Set()]));
let bad = 0;
const fail = message => { bad++; console.error(message); };
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const page = pageOf(file);
  const main = html.match(/<main\b[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/)?.[1];
  if (main === undefined) fail('[main] ' + page + ': missing main-content');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const allLinks = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m => m[1].replaceAll('&amp;', '&'));
  pages.set(page, { html, ids, allLinks });
  const links = [...(main ?? '').matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m => m[1].replaceAll('&amp;', '&'));
  outgoing.set(page, links);
}
for (const [page] of outgoing) {
  const targets = new Set();
  for (const href of pages.get(page).allLinks) {
    const url = new URL(href, 'https://fourthwingdragon.com' + page);
    if (url.origin !== 'https://fourthwingdragon.com') continue;
    const target = decodeURIComponent(url.pathname);
    if (pages.has(target)) {
      if (url.hash && !pages.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) fail('[anchor] ' + page + ' -> ' + href);
      if (target !== page) targets.add(target);
    } else {
      try {
        const path = resolve(root, '.' + target);
        if (!path.startsWith(root + '/')) throw new Error('invalid path');
        if (!(await stat(path)).isFile()) throw new Error('not a file');
      } catch { fail('[404] ' + page + ' -> ' + href); }
    }
  }
  outgoing.set(page, targets);
  for (const target of targets) inbound.get(target).add(page);
}
for (const [page, targets] of outgoing) {
  const sources = inbound.get(page);
  const character = page.startsWith('/characters/');
  console.log(page + ': out=' + targets.size + ' in=' + sources.size);
  if (sources.size < 1 && !pages.get(page).html.includes('noindex')) fail('[orphan] ' + page);
  if (character && !pages.get(page).html.includes('noindex')) {
    const characterOut = [...targets].filter(t => t.startsWith('/characters/')).length;
    const aggregate = targets.has('/fourth-wing-characters/') || targets.has('/dragons/');
    if (targets.size < 3 || characterOut < 2 || !aggregate) fail('[out] ' + page + ': need 2 other characters and an index');
    if (sources.size < 3 || !sources.has('/') || !sources.has('/fourth-wing-characters/')) fail('[in] ' + page + ': need 3 sources including home and character index');
  }
}
if (bad) { console.error(bad + ' link problem(s)'); process.exit(1); }
console.log('link check ok: ' + files.length + ' pages');

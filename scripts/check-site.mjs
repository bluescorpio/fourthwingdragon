import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const paths = ['/', '/dragons/', '/guide-to-dragonkind/', '/quiz/dragon-type/', '/quiz/signet/', '/dragon-name-generator/', '/guides/threshing/', '/about/', '/privacy/', '/terms/', '/disclaimer/', '/fourth-wing-characters/', '/characters/ridoc/', '/characters/rhiannon-matthias/', '/characters/aaric-graycastle/'];
const expected = paths.map(p => 'https://fourthwingdragon.com' + p).sort();
const robots = await readFile('dist/robots.txt', 'utf8');
assert.match(robots, /Sitemap: https:\/\/fourthwingdragon\.com\/sitemap\.xml/);
for (const file of ['dist/sitemap-0.xml', 'dist/sitemap.xml']) {
  const sitemap = await readFile(file, 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(locs.sort(), expected, file + ' URLs');
}
for (const path of paths) {
  const html = await readFile('dist' + path + 'index.html', 'utf8');
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, path + ' H1');
  assert.ok(/<title>[^<]+<\/title>/.test(html), path + ' title');
  assert.ok(/name="description" content="[^"]+"/.test(html), path + ' description');
  assert.ok(html.includes('rel="canonical" href="https://fourthwingdragon.com' + path + '"'), path + ' canonical');
  assert.ok(!html.includes('noindex'), path + ' noindex');
  assert.ok(html.includes('Fan-site disclaimer.'), path + ' disclaimer');
  assert.ok(Buffer.byteLength(html) < 102400, path + ' HTML budget');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  console.log(path + ' metadata, H1, disclaimer, JSON-LD and size OK (' + Buffer.byteLength(html) + ' bytes)');
}
for (const [path, type] of [['/quiz/dragon-type/', 'Quiz'], ['/quiz/signet/', 'Quiz'], ['/guide-to-dragonkind/', 'FAQPage'], ['/guides/threshing/', 'Article']]) {
  const html = await readFile('dist' + path + 'index.html', 'utf8');
  assert.ok(html.includes('"@type":"' + type + '"'), path + ' ' + type + ' JSON-LD');
}
const dragons = await readFile('dist/dragons/index.html', 'utf8');
assert.equal([...dragons.matchAll(/class="bordered intersection"/g)].length, 0);
assert.ok(!/project brief|site owner|not independently checked|Not confirmed|rebeccayarros\.com/i.test(dragons), 'dragon index has no internal notes or excluded citations');
for (const path of ['/guide-to-dragonkind/', '/guides/threshing/', '/quiz/dragon-type/', '/quiz/signet/']) {
  const html = await readFile('dist' + path + 'index.html', 'utf8');
  const prose = [...html.matchAll(/<(?:div|section) class="prose">([\s\S]*?)<\/(?:div|section)>/g)].map(m => m[1]).join(' ');
  const words = prose.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  const minimum = path.startsWith('/quiz/') ? 300 : 600;
  assert.ok(words >= minimum, path + ' word minimum: ' + words);
  console.log(path + ': ' + words + ' prose words');
}
assert.equal(await readFile('dist/google7898b661ebe700a1.html', 'utf8'), 'google-site-verification: google7898b661ebe700a1.html');
const assets = await readdir('dist/_astro');
const jsBytes = (await Promise.all(assets.filter(n => n.endsWith('.js')).map(async n => (await readFile('dist/_astro/' + n)).length))).reduce((a, b) => a + b, 0);
assert.ok(jsBytes < 20480, 'Combined client JS budget: ' + jsBytes);
console.log('site check OK: 15 sitemap URLs, vocabulary index, character routes restored, GSC file preserved, client JS ' + jsBytes + ' bytes');

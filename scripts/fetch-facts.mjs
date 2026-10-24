import { mkdir, writeFile } from 'node:fs/promises';
const SOURCES = {
  official: 'https://www.rebeccayarros.com/fourthwing/',
  dragonkind: 'https://dragonkind.com/',
  publisher: 'https://www.entangledpublishing.com/',
};
const slug = process.argv[2];
if (!slug || !/^[a-z]+(?:-[a-z]+)*$/.test(slug)) throw new Error('usage: node scripts/fetch-facts.mjs <slug>');
await mkdir('research', { recursive: true });
let failed = 0;
for (const [name, url] of Object.entries(SOURCES)) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 (compatible; research-bot)' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = (await res.text())
      .replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    await writeFile(`research/${slug}-${name}.txt`, `${url}\n\n${text}`, 'utf8');
    console.log(`ok ${name} ${res.status} ${text.length}`);
  } catch (error) { failed++; console.warn(`fail ${name}: ${error.message}`); }
}
if (failed) process.exitCode = 1;

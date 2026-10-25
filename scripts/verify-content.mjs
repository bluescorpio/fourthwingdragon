import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const contentDir = 'src/content/characters';
const pagesDir = 'src/pages';
const markerPatterns = [/\[FACT:/, /\bTBD\b/, /<!--\s*src:/i, /<!--\s*TODO/i];
const editorialDescription = /source notes|editorial reference|unpublished research|checked material|profile guide/i;
const characterRoute = /\/characters\/([a-z0-9-]+)\//g;
const problems = [];
const report = (file, message) => problems.push(file + ': ' + message);

function parseCharacter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error('missing YAML frontmatter');
  // Strict parser for this site's frontmatter subset. Reject unsupported YAML,
  // rather than silently skipping values. Astro also validates the full schema.
  const scalar = raw => {
    const value = raw.trim();
    if (value.startsWith('"')) return JSON.parse(value);
    if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replaceAll("''", "'");
    if (value === '[]') return [];
    if (value === 'true' || value === 'false') return value === 'true';
    if (/^[\w./:#-]+$/.test(value)) return value;
    throw new Error('unsupported YAML scalar: ' + value);
  };
  const data = {};
  let list;
  let item;
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const top = line.match(/^(\w+):[ \t]*(.*)$/);
    if (top) {
      if (Object.hasOwn(data, top[1])) throw new Error('duplicate field ' + top[1]);
      list = top[1];
      data[list] = top[2] ? scalar(top[2]) : [];
      item = undefined;
      continue;
    }
    const row = line.match(/^  - (.*)$/);
    if (row && Array.isArray(data[list])) {
      const raw = row[1];
      if (raw.startsWith('{') && raw.endsWith('}')) {
        item = {};
        const fields = raw.slice(1, -1).match(/(?:[^,"']|"[^"\\]*(?:\\.[^"\\]*)*"|'[^']*')+/g) ?? [];
        for (const field of fields) {
          const pair = field.trim().match(/^(\w+):[ \t]*(.+)$/);
          if (!pair) throw new Error('invalid flow mapping');
          item[pair[1]] = scalar(pair[2]);
        }
        data[list].push(item);
      } else {
        const pair = raw.match(/^(\w+):[ \t]*(.+)$/);
        if (pair) { item = { [pair[1]]: scalar(pair[2]) }; data[list].push(item); }
        else { data[list].push(scalar(raw)); item = undefined; }
      }
      continue;
    }
    const continuation = line.match(/^    (\w+):[ \t]*(.+)$/);
    if (continuation && item) { item[continuation[1]] = scalar(continuation[2]); continue; }
    throw new Error('unsupported YAML line: ' + line);
  }
  return { data, body: match[2] };
}

function characterLinks(text) {
  return [...text.matchAll(characterRoute)].map((match) => match[1]);
}

async function astroFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await astroFiles(path));
    else if (entry.name.endsWith('.astro')) files.push(path);
  }
  return files;
}

const characters = new Map();
for (const name of await readdir(contentDir)) {
  if (!name.endsWith('.md')) continue;
  const file = join(contentDir, name);
  const text = await readFile(file, 'utf8');
  let entry;
  try { entry = parseCharacter(text); } catch (error) { report(file, error.message); continue; }
  const { data, body } = entry;
  if (!data.slugName) report(file, 'missing slugName');
  if (!data.contentStatus) report(file, 'missing contentStatus');
  if (!['draft', 'verified'].includes(data.contentStatus)) report(file, 'unsupported contentStatus');
  for (const source of data.sources ?? []) {
    try {
      const url = new URL(source.url);
      if (url.protocol !== 'https:' || !['entangledpublishing.com', 'www.entangledpublishing.com'].includes(url.hostname)) {
        report(file, 'source must be an HTTPS publisher page');
      }
    } catch { report(file, 'source must have a valid publisher URL'); }
  }
  for (const key of ['role', 'squad', 'wing', 'signet', 'dragon', 'dragonColor', 'firstAppearance', 'homeProvince', 'family', 'status']) {
    if (data[key]) report(file, 'Phase 1 disallows factual field ' + key);
  }
  if ((data.related ?? []).some(item => item.relation)) report(file, 'Phase 1 related entries must be navigation without relationship claims');
  for (const marker of markerPatterns) if (marker.test(body)) report(file, 'body contains forbidden marker ' + marker);
  if (typeof data.description !== 'string') report(file, 'missing description');
  else {
    if (data.description.length > 160) report(file, 'description is ' + data.description.length + ' characters (maximum 160)');
    if (editorialDescription.test(data.description)) report(file, 'description contains editorial-process language');
  }
  characters.set(data.slugName, { file, body, data, targets: new Set() });
}

const inbound = new Map([...characters.keys()].map((slug) => [slug, new Set()]));
for (const [slug, character] of characters) {
  const relatedSlugs = (character.data.related ?? []).flatMap((item) => item.slug ? [item.slug] : []);
  const targets = new Set([...characterLinks(character.body), ...relatedSlugs]);
  character.targets = targets;
  for (const target of targets) {
    const recipient = characters.get(target);
    if (!recipient) report(character.file, 'links to unknown character /characters/' + target + '/');
    else {
      inbound.get(target).add('character:' + slug);
      if (recipient.data.contentStatus !== 'verified') report(character.file, 'links to non-verified character /characters/' + target + '/ (' + recipient.data.contentStatus + ')');
    }
  }
}

for (const file of await astroFiles(pagesDir)) {
  const text = await readFile(file, 'utf8');
  for (const slug of new Set(characterLinks(text))) if (inbound.has(slug)) inbound.get(slug).add('page:' + file);
}

for (const [slug, character] of characters) {
  if (character.data.contentStatus !== 'verified') continue;
  const characterOutlinks = [...character.targets].filter((target) => characters.has(target)).length;
  if (characterOutlinks < 2) report(character.file, 'verified page has ' + characterOutlinks + ' character outlinks (minimum 2)');
  const relatedHrefs = (character.data.related ?? []).flatMap((item) => item.href ? [item.href] : []);
  const allLinks = new Set([...characterLinks(character.body), ...relatedHrefs]);
  if (!character.body.includes('](/fourth-wing-characters/)') && !allLinks.has('/fourth-wing-characters/')) report(character.file, 'verified page is missing /fourth-wing-characters/');
  if (!character.body.includes('](/dragons/)') && !allLinks.has('/dragons/')) report(character.file, 'verified page is missing /dragons/');
  if (!(character.data.sources ?? []).some((source) => source.primary === true)) report(character.file, 'verified page has no source with primary: true');
  const count = inbound.get(slug).size;
  console.log(slug + ': out=' + characterOutlinks + ' in=' + count);
  if (count < 3) report(character.file, 'has ' + count + ' inbound links (minimum 3)');
}

if (problems.length) {
  console.error('content verification failed: ' + problems.length + ' problem(s)');
  for (const problem of problems) console.error('- ' + problem);
  process.exit(1);
}
console.log('content verification ok: ' + characters.size + ' character file(s)');

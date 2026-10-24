import {readdir,readFile} from 'node:fs/promises';
import {join} from 'node:path';
const root=join(process.cwd(),'dist');
const pages=[];
async function walk(dir){for(const name of await readdir(dir,{withFileTypes:true})){const p=join(dir,name.name);if(name.isDirectory())await walk(p);else if(name.name==='index.html')pages.push(p)}}
await walk(root); let failed=false;
for(const file of pages){const html=await readFile(file,'utf8');const links=[...html.matchAll(/href="(\/[^"#?]*)/g)].map(m=>m[1]);const internal=links.filter(x=>x!=='/'); if(file.includes('/characters/')){const characterLinks=internal.filter(x=>x.startsWith('/characters/')).length; if(characterLinks<2){console.error(`${file}: needs at least 2 character links`);failed=true} if(!internal.includes('/fourth-wing-characters/')&&!internal.includes('/dragons/')){console.error(`${file}: needs an aggregate link`);failed=true}}}
if(failed)process.exit(1); console.log(`Checked ${pages.length} pages for internal link thresholds.`);

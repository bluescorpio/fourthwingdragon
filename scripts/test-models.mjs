import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
async function moduleAt(path){const source=await readFile(new URL(path,import.meta.url),'utf8');const {outputText}=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}});return import('data:text/javascript;base64,'+Buffer.from(outputText).toString('base64'));}
const {dragonTypeQuiz,signetQuiz,dragonColorQuiz,scoreQuiz,DIMENSIONS}=await moduleAt('../src/lib/quizzes.ts');
const {DRAGON_COLORS,TAIL_TYPES}=await moduleAt('../src/lib/dragons.ts');
const {DRAGON_NAMES,NAME_STYLES,chooseNames,formatNames}=await moduleAt('../src/lib/names.ts');
const {AFFILIATE,amazonSearchUrl,audibleBookUrl,bookDualLink}=await moduleAt('../src/data/affiliate.ts');
const originalTag=AFFILIATE.amazonTag;
try {
 const query='Fantasy books & audiobooks';
 // This identifier is synthetic test data, not a verified product recommendation.
 const asin='B000000000';
 for(const tag of ['', '   ', ' sample-20 ']){
  AFFILIATE.amazonTag=tag;
  const links=bookDualLink('Sample title',query,asin.toLowerCase());
  assert.equal(links.title,'Sample title');
  assert.equal(links.amazonUrl,amazonSearchUrl(query));
  const amazon=new URL(links.amazonUrl);
  assert.equal(amazon.origin,'https://www.amazon.com');
  assert.equal(amazon.searchParams.get('k'),query);
  assert.equal(amazon.searchParams.get('tag'),tag.trim()||null);
  assert.equal(links.audibleUrl,`https://www.audible.com/pd/${asin}`);
  assert.equal(new URL(links.audibleUrl).search,'','Amazon tags must not be copied to Audible');
 }
 assert.equal(audibleBookUrl(` ${asin} `),`https://www.audible.com/pd/${asin}`);
 for(const invalid of ['', 'B000', 'B0000000000', 'B00000000?', 'B000 00000']){
  assert.throws(()=>audibleBookUrl(invalid),TypeError);
  assert.throws(()=>bookDualLink('Sample title',query,invalid),TypeError);
 }
} finally {
 AFFILIATE.amazonTag=originalTag;
}
console.log('book links: query encoding, optional Amazon tags, ASIN validation and untagged Audible links pass');
for(const quiz of [dragonTypeQuiz,signetQuiz]){
 assert.equal(quiz.questions.length,12);assert.equal(quiz.results.length,7);
 for(const q of quiz.questions){assert.deepEqual(q.options.map(o=>o.id),['a','b','c','d']);assert.equal(new Set(q.options.map(o=>o.label)).size,4);for(const o of q.options)for(const [d,w] of Object.entries(o.weights)){assert.ok(DIMENSIONS.includes(d));assert.ok(Number.isFinite(w)&&w>=0);}}
 assert.equal(scoreQuiz(quiz,[]),null);assert.equal(scoreQuiz(quiz,Array(11).fill('a')),null);assert.equal(scoreQuiz(quiz,Array(13).fill('a')),null);assert.equal(scoreQuiz(quiz,Array(12).fill('x')),null);
 const answers=quiz.questions.map(q=>q.options[0].id);assert.deepEqual(scoreQuiz(quiz,answers),scoreQuiz(quiz,answers));
 for(const result of quiz.results){const preferred=quiz.questions.map(q=>(q.options.find(o=>o.weights[result.dimension])??q.options[0]).id);assert.equal(scoreQuiz(quiz,preferred).id,result.id);}
 const tied={...quiz,questions:quiz.questions.map(q=>({...q,options:q.options.map(o=>({...o,weights:{}}))}))};assert.equal(scoreQuiz(tied,answers).id,quiz.results[0].id);
 console.log(quiz.id+': 12 questions, 7 reachable results, invalid/incomplete answers and deterministic ties pass');
}
assert.equal(dragonColorQuiz.questions.length,8);assert.equal(dragonColorQuiz.results.length,6);
assert.deepEqual(dragonColorQuiz.results.map(result=>result.id),['red','green','orange','blue','brown','black']);
for(const result of dragonColorQuiz.results){const preferred=dragonColorQuiz.questions.map(question=>(question.options.find(option=>option.weights[result.dimension])??question.options[0]).id);assert.equal(scoreQuiz(dragonColorQuiz,preferred).id,result.id);}
console.log('dragon-color: 8 questions, 6 reachable color results');
assert.equal(DRAGON_COLORS.length,7);assert.equal(TAIL_TYPES.length,6);assert.equal(new Set([...DRAGON_COLORS,...TAIL_TYPES].map(entry=>entry.id)).size,13);
assert.equal(DRAGON_NAMES.length,72);
assert.equal(new Set(DRAGON_NAMES.map(item=>item.name)).size,72);
assert.deepEqual(NAME_STYLES.map(style=>style.label),['Fire','Ice','Shadow','Storm','Earth','Sky']);
const original=JSON.stringify(DRAGON_NAMES);
for(const style of NAME_STYLES){
 const pool=DRAGON_NAMES.filter(item=>item.style===style.id);
 assert.equal(pool.length,12);
 assert.ok(pool.every(item=>item.meaning.trim().length>0));
 for(const count of [4,6,8,12]){
  const batch=chooseNames(pool,count,()=>0.75);
  assert.equal(batch.length,count);assert.equal(new Set(batch.map(item=>item.name)).size,count);
  assert.ok(batch.every(item=>item.style===style.id));
 }
}
assert.equal(chooseNames(DRAGON_NAMES,4,()=>0.999999)[0].name,DRAGON_NAMES.at(-1).name);
assert.equal(chooseNames(DRAGON_NAMES,12,()=>0).length,12);
assert.equal(JSON.stringify(DRAGON_NAMES),original,'sampling must not mutate the catalogue');
for(const count of [0,-1,1.5,73])assert.throws(()=>chooseNames(DRAGON_NAMES,count),RangeError);
assert.throws(()=>chooseNames([],4),RangeError);
assert.equal(formatNames(DRAGON_NAMES.slice(0,2)),DRAGON_NAMES.slice(0,2).map(item=>`${item.name} — ${item.meaning}`).join('\n'));
console.log('index: 13 unique labels; names: 72 names with meanings, 6 styles, all batch sizes, unique sampling and copy text pass');

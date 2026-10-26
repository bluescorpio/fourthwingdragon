import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
async function moduleAt(path){const source=await readFile(new URL(path,import.meta.url),'utf8');const {outputText}=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}});return import('data:text/javascript;base64,'+Buffer.from(outputText).toString('base64'));}
const {dragonTypeQuiz,signetQuiz,scoreQuiz,DIMENSIONS}=await moduleAt('../src/lib/quizzes.ts');
const {getDragonMatrix,DRAGON_COLORS,TAIL_TYPES}=await moduleAt('../src/lib/dragons.ts');
const {NAME_COMBINATIONS,nameAt}=await moduleAt('../src/lib/names.ts');
for(const quiz of [dragonTypeQuiz,signetQuiz]){
 assert.equal(quiz.questions.length,12);assert.equal(quiz.results.length,7);
 for(const q of quiz.questions){assert.deepEqual(q.options.map(o=>o.id),['a','b','c','d']);assert.equal(new Set(q.options.map(o=>o.label)).size,4);for(const o of q.options)for(const [d,w] of Object.entries(o.weights)){assert.ok(DIMENSIONS.includes(d));assert.ok(Number.isFinite(w)&&w>=0);}}
 assert.equal(scoreQuiz(quiz,[]),null);assert.equal(scoreQuiz(quiz,Array(11).fill('a')),null);assert.equal(scoreQuiz(quiz,Array(13).fill('a')),null);assert.equal(scoreQuiz(quiz,Array(12).fill('x')),null);
 const answers=quiz.questions.map(q=>q.options[0].id);assert.deepEqual(scoreQuiz(quiz,answers),scoreQuiz(quiz,answers));
 for(const result of quiz.results){const preferred=quiz.questions.map(q=>(q.options.find(o=>o.weights[result.dimension])??q.options[0]).id);assert.equal(scoreQuiz(quiz,preferred).id,result.id);}
 const tied={...quiz,questions:quiz.questions.map(q=>({...q,options:q.options.map(o=>({...o,weights:{}}))}))};assert.equal(scoreQuiz(tied,answers).id,quiz.results[0].id);
 console.log(quiz.id+': 12 questions, 7 reachable results, invalid/incomplete answers and deterministic ties pass');
}
assert.equal(DRAGON_COLORS.length,7);assert.equal(TAIL_TYPES.length,6);const matrix=getDragonMatrix();assert.equal(matrix.length,42);assert.equal(new Set(matrix.map(m=>m.id)).size,42);assert.equal(matrix.filter(m=>m.verified).length,3);assert.ok(!JSON.stringify(matrix).includes('flail-tail'));
assert.equal(NAME_COMBINATIONS,600);assert.equal(new Set(Array.from({length:600},(_,i)=>nameAt(i).name)).size,600);assert.throws(()=>nameAt(600));console.log('matrix: 42 unique cells; names: 600 unique combinations; all model tests pass');

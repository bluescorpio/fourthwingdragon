export const DIMENSIONS = ['valor','loyalty','cunning','ambition','resolve','insight','shadow'] as const;
export type Dimension = typeof DIMENSIONS[number];
export type QuizOption = {id:'a'|'b'|'c'|'d';label:string;weights:Partial<Record<Dimension,number>>};
export type QuizQuestion = {id:string;prompt:string;options:QuizOption[]};
export type QuizResult = {id:string;dimension:Dimension;title:string;description:string;traits:string[]};
export type Quiz = {id:string;title:string;intro:string;questions:QuizQuestion[];results:QuizResult[]};
type QuestionSeed = [string, [string,Dimension][],];
const dragonSeeds:QuestionSeed[] = [
 ['A path splits before an unfamiliar valley. What do you do?',[['Scout the ridge','insight'],['Keep the group together','loyalty'],['Take the steep shortcut','valor'],['Find a hidden route','cunning']]],
 ['You receive a difficult assignment. What is your first move?',[['Make a patient plan','resolve'],['Ask what success could unlock','ambition'],['Observe quietly','shadow'],['Check who needs support','loyalty']]],
 ['Your team disagrees about a decision. How do you help?',[['Name the risk clearly','valor'],['Listen for the missing perspective','insight'],['Propose a clever compromise','cunning'],['Return to shared commitments','loyalty']]],
 ['Which challenge sounds most rewarding?',[['Mastering a demanding craft','resolve'],['Leading a bold new project','ambition'],['Solving a hidden pattern','shadow'],['Making sense of a strange map','insight']]],
 ['A plan fails halfway through. You prefer to…',[['Try a different angle','cunning'],['Keep working steadily','resolve'],['Take responsibility publicly','valor'],['Protect the team’s trust','loyalty']]],
 ['What kind of recognition matters most?',[['Being trusted','loyalty'],['Being effective without attention','shadow'],['Reaching a difficult goal','ambition'],['Understanding something deeply','insight']]],
 ['Choose a way to prepare for uncertainty.',[['Practice the fundamentals','resolve'],['Gather quiet observations','shadow'],['Build several alternative plans','cunning'],['Set an ambitious destination','ambition']]],
 ['Someone must make the first move. You…',[['Volunteer immediately','valor'],['Check the likely consequences','insight'],['Coordinate everyone’s roles','loyalty'],['Wait for a less visible opening','shadow']]],
 ['What would you bring to a long journey?',[['An adaptable toolkit','cunning'],['A notebook of questions','insight'],['A reminder of your purpose','resolve'],['A map to a challenging destination','ambition']]],
 ['A rival surprises you with a better idea. You…',[['Learn from it and improve','ambition'],['Test it without fanfare','shadow'],['Credit them openly','valor'],['Keep refining your work','resolve']]],
 ['What makes a partnership work?',[['Honest courage','valor'],['Consistent care','loyalty'],['Inventive cooperation','cunning'],['Respect for private space','shadow']]],
 ['At the end of a difficult day, you value…',[['Progress toward a larger goal','ambition'],['A lesson you understand','insight'],['The promise you kept','resolve'],['A friend who stayed','loyalty']]],
];
const signetSeeds:QuestionSeed[] = [
 ['A friend asks for help with an unfamiliar problem. You…',[['Act on the urgent part','valor'],['Listen before deciding','loyalty'],['Find an unconventional solution','cunning'],['Look for the underlying pattern','insight']]],
 ['Which responsibility would you choose?',[['Protecting a quiet space','resolve'],['Anticipating future obstacles','insight'],['Managing hidden information','shadow'],['Organizing what people need','ambition']]],
 ['Your group loses an important object. You…',[['Reconstruct the last few steps','loyalty'],['Search somewhere unexpected','cunning'],['Coordinate the search','ambition'],['Check overlooked details','shadow']]],
 ['What would you most like to improve?',[['Decisiveness under pressure','valor'],['Long-term consistency','resolve'],['Awareness of distant consequences','insight'],['Discretion','shadow']]],
 ['A noisy argument interrupts your work. You…',[['Calm the room','resolve'],['Challenge the mistaken assumption','cunning'],['Remind everyone of shared history','loyalty'],['Make a clear decision','valor']]],
 ['Pick a tool for a fictional expedition.',[['A signal lamp','valor'],['A collection of useful supplies','ambition'],['A detailed journal','loyalty'],['A lookout’s telescope','insight']]],
 ['What is your response to a surprise setback?',[['Adapt to the opposing force','cunning'],['Rebuild your boundaries','resolve'],['Work out of the spotlight','shadow'],['Gather resources again','ambition']]],
 ['What do teammates usually ask of you?',[['A direct answer','valor'],['A careful recollection','loyalty'],['A fresh perspective','insight'],['An inventive workaround','cunning']]],
 ['Which working environment suits you?',[['A quiet room','shadow'],['A well-protected workshop','resolve'],['A busy coordination desk','ambition'],['An open observation point','insight']]],
 ['Choose a promise you would keep.',[['I will remember what matters','loyalty'],['I will stand firm','resolve'],['I will face the hard moment','valor'],['I will respect a confidence','shadow']]],
 ['You can change one thing about a difficult task.',[['Bring the right resources closer','ambition'],['Understand the wider view','insight'],['Turn its biggest obstacle around','cunning'],['Remove distracting attention','shadow']]],
 ['What does a satisfying ending look like?',[['A safe place for others','resolve'],['A decisive action completed','valor'],['A creative problem solved','cunning'],['Everyone has what they need','ambition']]],
];
function makeQuestions(seeds:QuestionSeed[]):QuizQuestion[]{return seeds.map(([prompt,options],i)=>({id:'q'+(i+1),prompt,options:options.map(([label,dimension],j)=>({id:(['a','b','c','d'] as const)[j],label,weights:{[dimension]:3}}))}));}
function result(id:string,dimension:Dimension,title:string,description:string,traits:string[]):QuizResult{return {id,dimension,title,description,traits};}
export const dragonTypeQuiz:Quiz = {id:'dragon-type',title:'Which dragon would choose you?',intro:'Twelve choices, seven color profiles. Discover your fan-made dragon personality match.',questions:makeQuestions(dragonSeeds),results:[
 result('red','valor','Red Dragon','You favor direct action and honest courage. In this original profile, the red color represents stepping forward when a choice feels difficult.',['Courageous','Direct','Energetic']),
 result('green','loyalty','Green Dragon','You make room for others and protect shared trust. This creative green profile celebrates cooperation and dependable friendship.',['Loyal','Cooperative','Attentive']),
 result('orange','cunning','Orange Dragon','You enjoy changing the shape of a problem. This original orange profile celebrates adaptability and inventive alternatives.',['Inventive','Flexible','Resourceful']),
 result('blue','ambition','Blue Dragon','You are drawn to demanding goals. This creative blue profile values initiative, preparation and purposeful progress.',['Purposeful','Driven','Organized']),
 result('brown','resolve','Brown Dragon','You keep going when excitement fades. This original brown profile values patient practice and commitments carried through.',['Steady','Patient','Persistent']),
 result('golden','insight','Golden / Iridescent Dragon','You want to understand before you choose. This creative gold profile celebrates curiosity and the ability to notice a wider pattern.',['Curious','Reflective','Observant']),
 result('black','shadow','Black Dragon','You work comfortably outside the spotlight. This original black profile values discretion, independence and quiet attention.',['Independent','Discreet','Focused']),
]};
export const signetQuiz:Quiz = {id:'signet',title:'What is your signet profile?',intro:'Explore seven imaginative ability themes through twelve everyday choices. This is entertainment, not a canon test.',questions:makeQuestions(signetSeeds),results:[
 result('lightning','valor','Lightning','A creative symbol for decisive energy: you prefer to address an urgent challenge directly. This is a personality metaphor, not a canonical eligibility rule.',['Decisive','Bold','Responsive']),
 result('memory','loyalty','Memory','A creative symbol for continuity: you value remembered promises and shared experience. This category is an entertainment label.',['Attentive','Thoughtful','Reliable']),
 result('counter','cunning','Counter','A creative symbol for reframing resistance: you look for an unexpected response. This category does not assert a named canonical classification.',['Adaptive','Inventive','Analytical']),
 result('summoning','ambition','Summoning','A creative symbol for bringing resources together: you organize what a goal needs. This profile makes no claim about the books’ ability mechanics.',['Resourceful','Purposeful','Practical']),
 result('warding','resolve','Warding','A creative symbol for consistency and boundaries: you value a dependable space. This is an original personality mapping.',['Protective','Steady','Patient']),
 result('farsight','insight','Farsight','A creative symbol for perspective: you consider consequences and seek a wider view. This result does not predict any story event.',['Perceptive','Curious','Reflective']),
 result('shadows','shadow','Shadows','A creative symbol for discretion: you value privacy and quiet concentration. This result assigns no connection to a book character.',['Private','Independent','Focused']),
]};
const colorSeeds:QuestionSeed[] = [
 ['A path splits before an unfamiliar valley. What do you do?',[['Take the steep shortcut','valor'],['Keep the group together','loyalty'],['Find a hidden route','cunning'],['Aim for a harder destination','ambition']]],
 ['You receive a difficult assignment. What is your first move?',[['Make a patient plan','resolve'],['Observe quietly','shadow'],['Volunteer to go first','valor'],['Check who needs support','loyalty']]],
 ['Your team disagrees about a decision. How do you help?',[['Propose a clever compromise','cunning'],['Name the larger goal','ambition'],['Return to the work and continue','resolve'],['Wait for a quieter opening','shadow']]],
 ['Which challenge sounds most rewarding?',[['A moment that asks for courage','valor'],['A promise you can keep for someone else','loyalty'],['A puzzle with a hidden route','cunning'],['A demanding project you can organize','ambition']]],
 ['A plan fails halfway through. You prefer to…',[['Keep working steadily','resolve'],['Step aside and rethink','shadow'],['Take responsibility publicly','valor'],['Protect the group’s trust','loyalty']]],
 ['What kind of preparation suits you?',[['Build several alternative plans','cunning'],['Set an ambitious destination','ambition'],['Practice the fundamentals','resolve'],['Gather quiet observations','shadow']]],
 ['Someone must make the first move. You…',[['Volunteer immediately','valor'],['Stay with the task until it is finished','resolve'],['Look for an inventive opening','cunning'],['Choose a less visible moment','shadow']]],
 ['At the end of a difficult day, you value…',[['A friend who stayed','loyalty'],['Progress toward a larger goal','ambition'],['The promise you kept','resolve'],['A quiet hour to yourself','shadow']]],
];
export const dragonColorQuiz:Quiz = {id:'dragon-color',title:'What color is your Fourth Wing dragon?',intro:'Eight choices, six original color marks. A fan-made picture, not a canon dragon.',questions:makeQuestions(colorSeeds),results:[
 result('red','valor','Red Dragon','You favor direct action and honest courage. This red mark is an original picture for the result, not a dragon from the books.',['Courageous','Direct','Energetic']),
 result('green','loyalty','Green Dragon','You make room for others and protect shared trust. This green mark is a creative label, not a canon temperament.',['Loyal','Cooperative','Attentive']),
 result('orange','cunning','Orange Dragon','You enjoy changing the shape of a problem. This orange mark celebrates adaptability. It does not name a book dragon.',['Inventive','Flexible','Resourceful']),
 result('blue','ambition','Blue Dragon','You are drawn to demanding goals. This blue mark is an original profile, not an assignment from the novels.',['Purposeful','Driven','Organized']),
 result('brown','resolve','Brown Dragon','You keep going when excitement fades. This brown mark values patience. It is not a published breed.',['Steady','Patient','Persistent']),
 result('black','shadow','Black Dragon','You work comfortably outside the spotlight. This black mark is fan-made art for the result, not a canon dragon.',['Independent','Discreet','Focused']),
]};
export const RESULT_NOTES = [
 {title:'Dragons do the choosing', text:'The public premise is a war college for dragon riders, where dragons choose whether to bond with a candidate. A quiz label does not make that choice.'},
 {title:'Same answers, same label', text:'The questions and weights are fixed. Ties follow a published order, so the match you share can be repeated. This site does not store it.'},
 {title:'A grid is not a roster', text:'The dragon reference pairs seven color headings with six tail labels. A cell is a browsing slot, not evidence that the combination appears in the novels.'},
 {title:'Official and fan stay separate', text:'Dragonkind is the official interactive destination. This quiz does not share a login with it. A page that asks for an email address is a different destination.'},
] as const;

export function scoreQuiz(quiz:Quiz, answers:readonly string[]):QuizResult|null {
 if(answers.length!==quiz.questions.length)return null;
 const scores:Record<Dimension,number>={valor:0,loyalty:0,cunning:0,ambition:0,resolve:0,insight:0,shadow:0};
 for(let i=0;i<quiz.questions.length;i++){const option=quiz.questions[i].options.find(o=>o.id===answers[i]);if(!option)return null;for(const d of DIMENSIONS)scores[d]+=option.weights[d]??0;}
 const highest=Math.max(...quiz.results.map(r=>scores[r.dimension]));return quiz.results.find(r=>scores[r.dimension]===highest)??null;
}

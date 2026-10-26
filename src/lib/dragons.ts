export type DragonColor = 'black' | 'blue' | 'green' | 'red' | 'orange' | 'brown' | 'golden';
export type TailType = 'daggertail' | 'morningstar-tail' | 'swordtail' | 'scorpion-tail' | 'club-tail' | 'feathertail';
export type DragonEntry = {id:string; name:string; summary:string; paragraphs:string[]; verified:boolean; source:string};
const source = 'https://www.entangledpublishing.com/books/fourth-wing';
export const DRAGON_COLORS: (DragonEntry & {id:DragonColor;hex:string})[] = [
 {id:'black',name:'Black',hex:'#29252e',summary:'A color label in the dragon vocabulary index.',paragraphs:['Use color names as one axis of the index. The page pairs them with six tail labels for quick reference.'],verified:true,source},
 {id:'blue',name:'Blue',hex:'#476aaf',summary:'A color label in the dragon vocabulary index.',paragraphs:['Use color names as one axis of the index. The page pairs them with six tail labels for quick reference.'],verified:true,source},
 {id:'green',name:'Green',hex:'#4f8866',summary:'A color label in the dragon vocabulary index.',paragraphs:['Use color names as one axis of the index. The page pairs them with six tail labels for quick reference.'],verified:false,source},
 {id:'red',name:'Red',hex:'#aa4b49',summary:'A color label in the dragon vocabulary index.',paragraphs:['Use color names as one axis of the index. The page pairs them with six tail labels for quick reference.'],verified:false,source},
 {id:'orange',name:'Orange',hex:'#bc783a',summary:'A color label in the dragon vocabulary index.',paragraphs:['Use color names as one axis of the index. The page pairs them with six tail labels for quick reference.'],verified:false,source},
 {id:'brown',name:'Brown',hex:'#8b694b',summary:'A color label in the dragon vocabulary index.',paragraphs:['Use color names as one axis of the index. The page pairs them with six tail labels for quick reference.'],verified:false,source},
 {id:'golden',name:'Golden / Iridescent',hex:'#c9a227',summary:'A color label in the dragon vocabulary index.',paragraphs:['Use color names as one axis of the index. The page pairs them with six tail labels for quick reference.'],verified:true,source},
];
export const TAIL_TYPES: (DragonEntry & {id:TailType})[] = [
 ['daggertail','Daggertail','A dagger-shaped tail label.'],['morningstar-tail','Morningstar-tail','A morningstar-shaped tail label.'],['swordtail','Swordtail','A sword-shaped tail label.'],['scorpion-tail','Scorpion-tail','A scorpion-shaped tail label.'],['club-tail','Club-tail','A club-shaped tail label.'],['feathertail','Feathertail','A feather-shaped tail label; do not infer an adult breed from this label alone.'],
].map(([id,name,summary])=>({id:id as TailType,name,summary,paragraphs:['Tail names form the second axis of the index and sit beside the seven color labels.'],verified:false,source}));

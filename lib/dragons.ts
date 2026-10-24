export type DragonColor={slug:string;name:string;summary:string;body:string[];verified:boolean};
export type TailType={slug:string;name:string;summary:string;verified:boolean};
export type DragonCombo={colorSlug:string;tailSlug:string;note:string;verified:boolean};
export const DRAGON_COLORS:DragonColor[]=["black","blue","green","red","orange","brown","golden"].map((slug)=>({slug,name:slug[0].toUpperCase()+slug.slice(1),summary:`The ${slug} dragon archetype in the Empyrean world.`,body:[`The ${slug} color is catalogued here as a reference point for readers.`],verified:false}));
export const TAIL_TYPES:TailType[]=["club-tail","daggertail","swordtail","scorpion-tail","morningstar-tail","flail-tail"].map((slug)=>({slug,name:slug.split("-").map(x=>x[0].toUpperCase()+x.slice(1)).join(" "),summary:"A tail form listed for comparison.",verified:false}));
export const DRAGON_COMBOS:DragonCombo[]=[];
export function getDragonMatrix(){return DRAGON_COLORS.flatMap(c=>TAIL_TYPES.map(t=>DRAGON_COMBOS.find(x=>x.colorSlug===c.slug&&x.tailSlug===t.slug)??{colorSlug:c.slug,tailSlug:t.slug,note:"Not confirmed in canon.",verified:false}));}

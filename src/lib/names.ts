export const PREFIXES=['Ae','Bel','Cor','Dae','Eir','Fae','Kel','Mor','Rae','Tor'] as const;
export const SUFFIXES=['an','ara','en','eth','ia','ion','is','or','ra','yn'] as const;
// Dictionary headwords; the surrounding syllables are invented, not Gaelic grammar.
export const ROOTS=[{root:'teine',meaning:'fire'},{root:'gaoth',meaning:'wind'},{root:'uisge',meaning:'water'},{root:'clach',meaning:'stone'},{root:'solas',meaning:'light'},{root:'oidhche',meaning:'night'}] as const;
export const NAME_COMBINATIONS=PREFIXES.length*ROOTS.length*SUFFIXES.length;
export function nameAt(index:number){if(!Number.isInteger(index)||index<0||index>=NAME_COMBINATIONS)throw new RangeError('Invalid name index');const suffix=SUFFIXES[index%SUFFIXES.length];const root=ROOTS[Math.floor(index/SUFFIXES.length)%ROOTS.length];const prefix=PREFIXES[Math.floor(index/(SUFFIXES.length*ROOTS.length))];return {name:prefix+root.root+suffix,root:root.root,meaning:root.meaning,prefix,suffix};}

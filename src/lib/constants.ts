import { AFFILIATE } from '../data/affiliate';
export { amazonSearchUrl } from '../data/affiliate';

export const SITE_NAME = 'FourthWingDragon';
export const SITE_URL = 'https://fourthwingdragon.com';
export const SITE_TAGLINE = 'Dragon types, quizzes and guides for the Empyrean series.';
export const DEFAULT_TITLE = 'Fourth Wing Quiz, Dragon Name Generator & Character Index';
export const DEFAULT_DESCRIPTION = 'Take the original Fourth Wing dragon quiz, try the signet quiz and dragon name generator, and browse publisher-sourced character profiles.';
export const SOCIAL_IMAGE = {url:'/og-image.png',width:1200,height:630,alt:'Fourth Wing Dragons — Interactive Quiz & Fan Reference'};
export const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || 'wangxiaoyi.sh@gmail.com';
export const DISCLAIMER_SHORT = 'Unofficial fan site. Not affiliated with Rebecca Yarros or Entangled Publishing.';
export const CANON_SOURCES = [{label:'Entangled Publishing — Fourth Wing',url:'https://www.entangledpublishing.com/books/fourth-wing'},{label:'Dragonkind — official experience',url:'https://dragonkind.com/'}] as const;
export const CORE_PAGES = [{href:'/',label:'Home'},{href:'/dragons/',label:'Dragon Types'},{href:'/quiz/dragon-type/',label:'Dragon Quiz'},{href:'/quiz/signet/',label:'Signet Quiz'},{href:'/dragon-name-generator/',label:'Name Generator'},{href:'/guide-to-dragonkind/',label:'Dragonkind Guide'},{href:'/fourth-wing-characters/',label:'Characters'}] as const;

export const AMAZON_AFFILIATE_TAG = AFFILIATE.amazonTag;

// Per-result CTA mapping. Dragon quiz routes to color-specific book searches;
// signet quiz routes to the broader Empyrean series search (signet is an ability, not a color).
// null = no affiliate CTA for this result (falls back to internal links only).
export const AFFILIATE_CTA: Record<string, { label: string; query: string } | null> = {
  'dragon-type:red':    { label: 'Browse Red dragon reads',         query: 'fourth wing red dragon book' },
  'dragon-type:green':  { label: 'Browse Green dragon reads',       query: 'fourth wing green dragon book' },
  'dragon-type:orange': { label: 'Browse Orange dragon reads',      query: 'fourth wing orange dragon book' },
  'dragon-type:blue':   { label: 'Browse Blue dragon reads',        query: 'fourth wing blue dragon book' },
  'dragon-type:brown':  { label: 'Browse Brown dragon reads',       query: 'fourth wing brown dragon book' },
  'dragon-type:golden': { label: 'Browse Gold dragon reads',        query: 'fourth wing gold iridescent dragon book' },
  'dragon-type:black':  { label: 'Browse Black dragon reads',       query: 'fourth wing black dragon book' },
  'signet:lightning':   { label: 'Browse the Empyrean series',      query: 'empyrean series rebecca yarros' },
  'signet:memory':      { label: 'Browse the Empyrean series',      query: 'empyrean series rebecca yarros' },
  'signet:counter':     { label: 'Browse the Empyrean series',      query: 'empyrean series rebecca yarros' },
  'signet:summoning':   { label: 'Browse the Empyrean series',      query: 'empyrean series rebecca yarros' },
  'signet:warding':     { label: 'Browse the Empyrean series',      query: 'empyrean series rebecca yarros' },
  'signet:farsight':    { label: 'Browse the Empyrean series',      query: 'empyrean series rebecca yarros' },
  'signet:shadows':     { label: 'Browse the Empyrean series',      query: 'empyrean series rebecca yarros' },
};

export function affiliateCtaFor(quizId: string, resultId: string): { label: string; query: string } | null {
  return AFFILIATE_CTA[`${quizId}:${resultId}`] ?? null;
}

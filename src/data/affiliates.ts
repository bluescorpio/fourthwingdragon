import { amazonSearchUrl } from './affiliate';

export type StoreLinkType = 'affiliate' | 'official';

export interface StoreLink {
  store: string;
  url: string;
  type: StoreLinkType;
  note: string;
}

export const AMAZON_STORE: StoreLink = {
  store: 'Amazon',
  url: amazonSearchUrl('Fourth Wing Rebecca Yarros'),
  type: 'affiliate',
  note: 'Search for Fourth Wing by Rebecca Yarros.',
};

export const MERCH_STORES: StoreLink[] = [
  {
    store: 'Out of Print',
    url: 'https://outofprint.com/collections/fourth-wing',
    type: 'official',
    note: 'Describes its Fourth Wing line as officially licensed.',
  },
  {
    store: 'Kingdom of Threads',
    url: 'https://kingdomofthreads.com/collections/official-fourth-wing-collection',
    type: 'official',
    note: 'Describes its Fourth Wing line as officially licensed.',
  },
  {
    store: 'The Bean Workshop',
    url: 'https://thebeanworkshop.store/collections/official-fourth-wing-merch',
    type: 'official',
    note: 'Describes its Fourth Wing line as officially licensed.',
  },
  {
    store: 'Rebecca Yarros Shop',
    url: 'https://rebeccayarrosshop.com/',
    type: 'official',
    note: "The author's own shop.",
  },
  {
    store: 'Hot Topic',
    url: 'https://www.hottopic.com/pop-culture/shop-by-license/fourth-wing/',
    type: 'official',
    note: 'Carries a Fourth Wing section.',
  },
];

export const STORE_LINKS: StoreLink[] = [AMAZON_STORE, ...MERCH_STORES];

export const AFFILIATE_DISCLOSURE = 'As an Amazon Associate and Etsy Affiliate, I earn from qualifying purchases.';

export const storeRel = (store: StoreLink) => store.type === 'affiliate' ? 'sponsored nofollow' : undefined;

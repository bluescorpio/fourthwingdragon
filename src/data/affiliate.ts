export const AFFILIATE = {
  amazonTag: 'wangxiaolou-20',
};

export function amazonSearchUrl(query: string): string {
  const url = new URL('https://www.amazon.com/s');
  url.searchParams.set('k', query);
  const tag = AFFILIATE.amazonTag.trim();
  if (tag) url.searchParams.set('tag', tag);
  return url.toString();
}

/** Build a direct book link from an ASIN verified by the caller. */
export function audibleBookUrl(asin: string): string {
  const normalizedAsin = asin.trim().toUpperCase();
  if (!/^[A-Z0-9]{10}$/.test(normalizedAsin)) {
    throw new TypeError('An Audible ASIN must contain exactly 10 letters or digits.');
  }
  // Amazon Associates tags are not added to Audible links without a verified
  // Audible tracking configuration. This is an ordinary product link.
  return new URL(`/pd/${normalizedAsin}`, 'https://www.audible.com').toString();
}

/** Return destinations only; callers render links with sponsored attributes. */
export function bookDualLink(title: string, amazonQuery: string, audibleAsin: string): {
  title: string;
  amazonUrl: string;
  audibleUrl: string;
} {
  return {
    title,
    amazonUrl: amazonSearchUrl(amazonQuery),
    audibleUrl: audibleBookUrl(audibleAsin),
  };
}

/**
 * Audible bounty link (SiteStripe, generated on the Audible membership landing page).
 * Verified 2026-10-28: HTTP 200, no redirect, lands on the Audible signup page.
 * Do not rewrap or shorten this URL — linkId is the click-tracking id.
 * Leave empty to disable the block site-wide; nothing renders when this is empty,
 * so an empty value can never produce a dead link.
 */
export const AUDIBLE = {
  trialUrl:
    'https://www.amazon.com/hz/audible/arya/mlp?_encoding=UTF8&purchaseType=MTRIAL&SHOPPING_PORTAL_MODE=AUGMENTED&linkCode=ll2&tag=wangxiaolou-20&linkId=1e5fdfbc43ea82b51a9decd4da5fcc24&language=en_US&ref_=as_li_ss_tl',
  disclosure: 'As an Amazon Associate and Etsy Affiliate, I earn from qualifying purchases.',
};

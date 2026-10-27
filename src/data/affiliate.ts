export const AFFILIATE = {
  amazonTag: '',
};

export function amazonSearchUrl(query: string): string {
  const url = new URL('https://www.amazon.com/s');
  url.searchParams.set('k', query);
  const tag = AFFILIATE.amazonTag.trim();
  if (tag) url.searchParams.set('tag', tag);
  return url.toString();
}

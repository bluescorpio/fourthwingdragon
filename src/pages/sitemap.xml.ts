import type { APIRoute } from 'astro';
import { SITE_URL, CORE_PAGES } from '../lib/constants';
import { getCollection } from 'astro:content';
import { isPublishedCharacter } from '../lib/publication';
export const GET: APIRoute = async () => {
  const characters = await getCollection('characters', isPublishedCharacter);
  const paths = [...CORE_PAGES.map(page => page.href), '/quiz/dragon-color/', '/fourth-wing-merchandise/', '/fourth-wing-gift/', '/guides/threshing/', '/rebecca-yarros-quiz/', '/threshing-day-dragon/', '/about/', '/privacy/', '/terms/', '/disclaimer/', ...characters.map(entry => `/characters/${entry.data.slugName}/`)];
  const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map(path => '<url><loc>' + SITE_URL + path + '</loc></url>').join('') + '</urlset>';
  return new Response(xml, {headers: {'Content-Type': 'application/xml; charset=utf-8'}});
};

import type { APIRoute } from 'astro';
import { SITE_URL, CORE_PAGES } from '../lib/constants';
export const GET: APIRoute = () => {
  const paths = [...CORE_PAGES.map(page => page.href), '/guides/threshing/', '/about/', '/privacy/', '/terms/', '/disclaimer/'];
  const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map(path => '<url><loc>' + SITE_URL + path + '</loc></url>').join('') + '</urlset>';
  return new Response(xml, {headers: {'Content-Type': 'application/xml; charset=utf-8'}});
};

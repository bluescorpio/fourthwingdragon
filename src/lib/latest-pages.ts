import { getCollection } from 'astro:content';
import { isPublishedPath } from './publication';

export interface LatestPage {
  href: string;
  title: string;
  updatedAt: string;
}

export async function latestPages(limit = 3): Promise<LatestPage[]> {
  const characters = await getCollection('characters');
  const pages: LatestPage[] = [];
  for (const entry of characters) {
    const href = `/characters/${entry.data.slugName}/`;
    if (!entry.data.updatedAt || entry.data.contentStatus !== 'published' || !isPublishedPath(href)) continue;
    pages.push({ href, title: entry.data.title, updatedAt: entry.data.updatedAt });
  }
  return pages.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title)).slice(0, limit);
}

import { getCollection } from 'astro:content';
import { UNPUBLISHED_PATHS } from '../data/unpublished';

export const isPublishedPath = (path: string): boolean => !UNPUBLISHED_PATHS.includes(path);

export const isPublishedCharacter = ({ data }: {
  data: { contentStatus: string; slugName: string };
}): boolean => data.contentStatus === 'published'
  && isPublishedPath(`/characters/${data.slugName}/`);

export async function characterStatuses(): Promise<Map<string, string>> {
  const entries = await getCollection('characters');
  return new Map(entries.map((entry) => [entry.data.slugName, entry.data.contentStatus]));
}

export function hrefIfLive(href: string | undefined, statuses: Map<string, string>): string | undefined {
  if (!href || !isPublishedPath(href)) return undefined;
  const character = href.match(/^\/characters\/([^/]+)\/$/);
  if (!character) return href;
  return statuses.get(character[1]) === 'published' ? href : undefined;
}

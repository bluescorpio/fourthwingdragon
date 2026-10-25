import { UNPUBLISHED_PATHS } from '../data/unpublished';

export const isPublishedPath = (path: string): boolean => !UNPUBLISHED_PATHS.includes(path);

export const isPublishedCharacter = ({ data }: {
  data: { contentStatus: string; slugName: string };
}): boolean => data.contentStatus === 'published'
  && isPublishedPath(`/characters/${data.slugName}/`);

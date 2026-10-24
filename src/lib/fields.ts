export const UNKNOWN = 'Not confirmed in canon';
export const isKnown = (value?: string) => Boolean(value?.trim() && !['unknown', 'tbd'].includes(value.trim().toLowerCase()));
export const show = (value?: string) => isKnown(value) ? value!.trim() : UNKNOWN;
export const cardFields = (data: Record<string, string | undefined>) => [
  ['Full name', data.fullName], ['Role', data.role], ['Squad', data.squad], ['Wing', data.wing],
  ['Signet', data.signet], ['Dragon', data.dragon], ['Dragon color', data.dragonColor],
  ['First appearance', data.firstAppearance], ['Home province', data.homeProvince], ['Status', data.status],
].filter(([, value]) => isKnown(value)) as [string, string][];

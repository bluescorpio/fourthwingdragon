/** Uniform independent draws; the random source can be replaced in tests. */
export function randomIndex(size: number, source: Pick<Crypto, 'getRandomValues'> | null = globalThis.crypto ?? null, fallback = Math.random): number {
  if (!Number.isInteger(size) || size < 1 || size > 4294967296) throw new RangeError('Invalid pool size');
  if (source) {
    const limit = Math.floor(4294967296 / size) * size;
    const buffer = new Uint32Array(1);
    try {
      do { source.getRandomValues(buffer); } while (buffer[0]! >= limit);
      return buffer[0]! % size;
    } catch { /* Unavailable secure API: keep the picker usable. */ }
  }
  return Math.floor(fallback() * size);
}
export function pickDragon<C, T>(colors: readonly C[], tails: readonly T[], draw = randomIndex) {
  return { color: colors[draw(colors.length)]!, tail: tails[draw(tails.length)]! };
}
export function formatPick(color: string, tail: string, url: string) {
  return `My Fourth Wing Dragon Picker result:\n\n${color} · ${tail}\n\nA playful fan-made dragon combination.\nPick yours:\n${url}`;
}

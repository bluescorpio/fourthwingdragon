export const NAME_STYLES = [
  { id: 'fire', label: 'Fire', description: 'Embers, sparks, and warm light give these names a fiery mood.' },
  { id: 'ice', label: 'Ice', description: 'Frost, snow, and winter landscapes suggest a crisp, quiet mood.' },
  { id: 'shadow', label: 'Shadow', description: 'Dusk, hidden paths, and soft silhouettes suggest mystery.' },
  { id: 'storm', label: 'Storm', description: 'Thunder, rain, and rough weather give these names a restless rhythm.' },
  { id: 'earth', label: 'Earth', description: 'Stone, roots, and woodland textures give these names a grounded feel.' },
  { id: 'sky', label: 'Sky', description: 'Clouds, open horizons, and daylight suggest space and freedom.' },
] as const;

export type NameStyle = typeof NAME_STYLES[number]['id'];
export interface DragonName { name: string; style: NameStyle; meaning: string }

// Meanings are creative interpretations for these fantasy compounds, not translations.
export const DRAGON_NAMES: DragonName[] = [
  { name: 'Embercrest', style: 'fire', meaning: 'A crown of embers glowing above the dark.' },
  { name: 'Ashglow', style: 'fire', meaning: 'A quiet warmth that lingers beneath the ashes.' },
  { name: 'Cinderwake', style: 'fire', meaning: 'A trail of bright cinders left behind in flight.' },
  { name: 'Flarepeak', style: 'fire', meaning: 'A sudden blaze shining from a mountain summit.' },
  { name: 'Sparkmantle', style: 'fire', meaning: 'A cloak of sparks scattered across the night.' },
  { name: 'Coalwhisper', style: 'fire', meaning: 'A low murmur from a slowly burning hearth.' },
  { name: 'Blazehollow', style: 'fire', meaning: 'A sheltered valley filled with firelight.' },
  { name: 'Sootgleam', style: 'fire', meaning: 'A small flash of brightness against dark soot.' },
  { name: 'Kindlethorn', style: 'fire', meaning: 'A thorny branch catching its first spark.' },
  { name: 'Hearthflare', style: 'fire', meaning: 'A welcoming flame rising from a hearth.' },
  { name: 'Pyrebloom', style: 'fire', meaning: 'A flowerlike burst of flame reaching upward.' },
  { name: 'Flintglimmer', style: 'fire', meaning: 'A brief light struck from a piece of flint.' },
  { name: 'Frosthaven', style: 'ice', meaning: 'A quiet refuge surrounded by frost.' },
  { name: 'Rimecrest', style: 'ice', meaning: 'A ridge edged with pale winter crystals.' },
  { name: 'Snowhush', style: 'ice', meaning: 'The stillness that follows a fresh snowfall.' },
  { name: 'Glaciergleam', style: 'ice', meaning: 'A clear reflection shining across ancient ice.' },
  { name: 'Sleetveil', style: 'ice', meaning: 'A thin curtain of frozen rain.' },
  { name: 'Chillbrook', style: 'ice', meaning: 'A cold stream slipping beneath winter branches.' },
  { name: 'Wintershard', style: 'ice', meaning: 'A sharp fragment of ice holding winter light.' },
  { name: 'Icepetal', style: 'ice', meaning: 'A delicate frost pattern shaped like a flower.' },
  { name: 'Hoarmantle', style: 'ice', meaning: 'A pale covering of frost across the landscape.' },
  { name: 'Snowdrift', style: 'ice', meaning: 'A soft bank of snow sculpted by the wind.' },
  { name: 'Frostlilt', style: 'ice', meaning: 'A light winter melody carried through cold air.' },
  { name: 'Thawglint', style: 'ice', meaning: 'The first sparkle of water as ice begins to melt.' },
  { name: 'Duskweave', style: 'shadow', meaning: 'A tapestry of fading light and gathering shade.' },
  { name: 'Gloamveil', style: 'shadow', meaning: 'A soft veil of twilight over the land.' },
  { name: 'Shadequill', style: 'shadow', meaning: 'A dark feather tracing an unseen story.' },
  { name: 'Umbrahollow', style: 'shadow', meaning: 'A sheltered hollow beyond the reach of sunlight.' },
  { name: 'Nightmurmur', style: 'shadow', meaning: 'A faint sound traveling through a sleeping landscape.' },
  { name: 'Sablehush', style: 'shadow', meaning: 'A velvet darkness wrapped in silence.' },
  { name: 'Dimcrest', style: 'shadow', meaning: 'A distant ridge barely visible at dusk.' },
  { name: 'Veilstep', style: 'shadow', meaning: 'A quiet footfall behind a curtain of mist.' },
  { name: 'Hushthorn', style: 'shadow', meaning: 'A thorn hedge guarding a silent path.' },
  { name: 'Twilightfold', style: 'shadow', meaning: 'A hidden fold in the hills at evening.' },
  { name: 'Shadowlace', style: 'shadow', meaning: 'An intricate pattern of shadows on the ground.' },
  { name: 'Dusklantern', style: 'shadow', meaning: 'A small guiding light in the gathering dark.' },
  { name: 'Thunderrill', style: 'storm', meaning: 'A running stream echoing a distant thunderclap.' },
  { name: 'Tempestcrest', style: 'storm', meaning: 'A high ridge facing the full force of a storm.' },
  { name: 'Rainforge', style: 'storm', meaning: 'A meeting of hard rain and restless energy.' },
  { name: 'Squallwake', style: 'storm', meaning: 'A churning trail left by a sudden gust.' },
  { name: 'Bolthollow', style: 'storm', meaning: 'A valley briefly lit by a flash of lightning.' },
  { name: 'Gustmantle', style: 'storm', meaning: 'A swirling cloak of wind around a traveler.' },
  { name: 'Stormspindle', style: 'storm', meaning: 'A slender spiral at the center of turning clouds.' },
  { name: 'Rumblepeak', style: 'storm', meaning: 'A summit that seems to answer the thunder.' },
  { name: 'Drizzlethorn', style: 'storm', meaning: 'A thorn branch beaded with fine rain.' },
  { name: 'Thunderloom', style: 'storm', meaning: 'A broad canopy of clouds gathering before thunder.' },
  { name: 'Downpourcrest', style: 'storm', meaning: 'A high crest washed by a heavy rainstorm.' },
  { name: 'Hailwhisper', style: 'storm', meaning: 'The first faint tapping of hail before a storm grows.' },
  { name: 'Flintroot', style: 'earth', meaning: 'A sturdy root finding its way through hard stone.' },
  { name: 'Claymantle', style: 'earth', meaning: 'A warm layer of clay covering the hillside.' },
  { name: 'Mossridge', style: 'earth', meaning: 'A weathered ridge softened by green moss.' },
  { name: 'Pebblehush', style: 'earth', meaning: 'The quiet of smooth stones beside a resting stream.' },
  { name: 'Oakfurrow', style: 'earth', meaning: 'A deep groove beneath the roots of an old oak.' },
  { name: 'Shalehaven', style: 'earth', meaning: 'A sheltered place between layered stone walls.' },
  { name: 'Loamcrest', style: 'earth', meaning: 'A fertile rise of dark, soft earth.' },
  { name: 'Fernbarrow', style: 'earth', meaning: 'A rounded earthen mound covered with ferns.' },
  { name: 'Granitebloom', style: 'earth', meaning: 'A small flower growing from a crack in granite.' },
  { name: 'Copperglen', style: 'earth', meaning: 'A wooded valley glowing with copper tones.' },
  { name: 'Rootmantle', style: 'earth', meaning: 'A woven covering of roots beneath the forest floor.' },
  { name: 'Stonewisp', style: 'earth', meaning: 'A delicate curl of mist around a standing stone.' },
  { name: 'Cloudlilt', style: 'sky', meaning: 'A drifting melody imagined among high clouds.' },
  { name: 'Dawnspan', style: 'sky', meaning: 'An open reach of sky lit by the first daylight.' },
  { name: 'Horizoncrest', style: 'sky', meaning: 'A distant rise where land and sky seem to meet.' },
  { name: 'Cirruswhisper', style: 'sky', meaning: 'A fine streak of cloud drawn across a clear sky.' },
  { name: 'Breezebloom', style: 'sky', meaning: 'A flower opening into a gentle breeze.' },
  { name: 'Sunglide', style: 'sky', meaning: 'A smooth passage through a shaft of sunlight.' },
  { name: 'Daybreakquill', style: 'sky', meaning: 'A feather catching the first colors of morning.' },
  { name: 'Mistsoar', style: 'sky', meaning: 'A rising shape lifting above a bank of mist.' },
  { name: 'Cloudharbor', style: 'sky', meaning: 'A peaceful opening among drifting clouds.' },
  { name: 'Skylace', style: 'sky', meaning: 'A delicate pattern of clouds across the blue.' },
  { name: 'Lightdrift', style: 'sky', meaning: 'A slow movement through soft afternoon light.' },
  { name: 'Zephyrcrest', style: 'sky', meaning: 'A high ridge touched by a gentle breeze.' },
];

export function chooseNames(pool: readonly DragonName[], count: number, random: () => number = Math.random): DragonName[] {
  if (!Number.isInteger(count) || count < 1 || count > pool.length) throw new RangeError('Invalid name count');
  const remaining = [...pool];
  for (let i = 0; i < count; i++) {
    const value = random();
    if (value < 0 || value >= 1 || !Number.isFinite(value)) throw new RangeError('Invalid random value');
    const next = i + Math.floor(value * (remaining.length - i));
    [remaining[i], remaining[next]] = [remaining[next]!, remaining[i]!];
  }
  return remaining.slice(0, count);
}

export function formatNames(names: readonly DragonName[]): string {
  return names.map(({ name, meaning }) => `${name} — ${meaning}`).join('\n');
}

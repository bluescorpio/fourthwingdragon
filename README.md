# FourthWingDragon

An unofficial English fan reference for the dragons and characters of Rebecca Yarros's Empyrean series.

The site is a fully pre-rendered Astro 5 project. Character and dragon entries live in Astro content collections, with unresolved facts kept as `TBD` or `[FACT: ...]` placeholders instead of being guessed.

## Stack

- Astro 5, static output with directory URLs
- TypeScript strict mode
- Tailwind CSS 4 through the Vite plugin
- `@astrojs/sitemap` and `@astrojs/mdx`
- Zod schemas for the `characters` and `dragons` collections
- No database, backend, login, payment flow or client-side framework

## Setup

```bash
npm install
npm run dev
```

The production site is configured with `site: https://fourthwingdragon.com` in `astro.config.mjs`.

## Scripts

```bash
npm run dev       # start the Astro development server
npm run check     # run Astro's type and content checks
npm run build     # build dist/ and run the internal-link check
npm run preview   # preview the static build
```

## Content

Add character entries to `src/content/characters/` and dragon entries to `src/content/dragons/`. The schemas are defined in `src/content/config.ts` and re-exported from `src/content.config.ts` for Astro's collection loader.

Character routes are generated from `slugName` by `src/pages/characters/[slug].astro`. Unknown frontmatter values are hidden from quick information cards, and the build logs a warning listing missing fields.

## Site rules

- This is an unofficial fan site and is not affiliated with Rebecca Yarros or Entangled Publishing.
- Do not add unsupported character facts, official artwork, book covers, logos or long quotations.
- Every page includes a canonical URL, description, breadcrumb data and the shared disclaimer footer.
- `scripts/check-links.mjs` checks character-page internal-link thresholds after each build.

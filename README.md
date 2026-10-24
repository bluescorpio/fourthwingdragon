# FourthWingDragon

An unofficial English fan reference for Rebecca Yarros's Empyrean series.

## Current status — round 1 rework

The Astro migration is being repaired on `rework/round1`. **Not ready for release.**
All four character entries and the dragon entry remain drafts. Drafts generate no public character routes and appear in neither indexes nor the sitemap. There are currently six public pages: home, characters, dragons, about, privacy and disclaimer.

The release requirement is at least three source-reviewed character profiles, with no placeholders or broken links and the required incoming/outgoing links. Passing the technical checks alone does not satisfy that requirement.

## Stack and setup

Astro 5 static output, Tailwind CSS 4, TypeScript strict, MDX and sitemap integration. Node 20.19+ (or a current supported LTS) is required. No database, client framework or runtime backend.

```sh
npm ci
npm run dev
```

Production URLs use https://fourthwingdragon.com with lowercase directory paths and trailing slashes. Build output is `dist/`.

## Commands

- `npm run check`: Astro and TypeScript checks.
- `npm run build`: static build only.
- `npm run verify`: inspect the built SEO metadata, main-content links, anchors, dead links and incoming-link thresholds.
- `npm run ship`: check, build and verify; it does not deploy.
- `npm run preview`: preview the static build.

## Content and source review

The single collection schema is `src/content.config.ts`, using Astro 5 glob loaders. Character and dragon Markdown lives in `src/content/characters/` and `src/content/dragons/`.

Optional factual fields are omitted when unverified. A published character's missing facts use “Not confirmed in canon”; index cards omit missing descriptions. Character initials are drawn in CSS; no nonexistent portrait assets are referenced.

`scripts/fetch-facts.mjs <slug>` downloads public author/publisher material into `research/`. Successful downloads are source evidence only, not automatic fact verification. HTTP failures return a nonzero exit code. The current three generic source pages do not substantiate the detailed powers, dragon assignments and plot claims from the original drafts.

Original supplied manuscripts are preserved in `research/editorial/` for later review. They are not imported by Astro or copied into `dist/`. Review each statement against a specific source before moving it into a published profile. Never set `contentStatus: verified` simply to fill an empty index.

Only verified profiles are generated. RelationTable and RelatedReading use the same live slug list, so unpublished targets render without links. TOC links use heading IDs returned by Astro's renderer; retained draft headings have explicit HTML IDs, avoiding unsupported Markdown heading suffix syntax.

## Release checklist

1. Complete at least three substantive character profiles and their source review.
2. Set reviewed entries to `verified`; ensure each links to two other profiles and an index, with incoming links from home, the character index and another profile.
3. Run `npm run ship` and inspect generated pages and sitemap.
4. Replace `public/google-site-verification.html` with the actual token supplied by Google Search Console. No token has been supplied.
5. Confirm privacy wording matches the chosen hosting service.
6. This rework round must not push or bind a domain.

The social image is an original dark-and-gold typographic composition at 1200×630. No official artwork, logos, covers or book extracts are used. Every page includes the shared fan-site disclaimer.

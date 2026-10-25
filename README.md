# FourthWingDragon

An unofficial English fan reference built with Astro 5, Tailwind CSS 4 and TypeScript strict. Static output only.

## Phase 1

Ten static pages: home, character index, dragon navigation index, four character references, about, privacy and disclaimer. Existing route paths and layouts are preserved. This checkout has no quiz page; no route has been added for it.

Character facts are limited to names and short phrases checked on Entangled Publishing pages. No plot, abilities, dragon pairings, biographies or character relationships are published. Each profile links to its publisher source. The dragon page provides navigation only.

## Development and checks

Node 20.19+; Vercel should use a supported Node LTS.

```sh
npm ci
npm run dev
npm run verify:content
npx astro check
npm run build
npm run verify
```

The single content schema is `src/content.config.ts`. Publication uses `contentStatus: verified`, matching the existing routes and collection queries. Drafts generate no public character routes.

The content verifier uses Node standard libraries and a strict parser for the site's YAML subset (quoted scalar values, booleans, empty arrays, block lists and flow mappings). Unsupported YAML fails explicitly. It checks descriptions, markers, publisher-only sources, and incoming/outgoing links. Built HTML checks verify actual routes, metadata, anchors and main-content links. `verify:content` remains a manual command.

## Deployment

Vercel: Astro framework preset, build command `npm run build`, output directory `dist`, repository root directory. No backend or environment secrets are required. Production canonical origin: https://fourthwingdragon.com.

Actual deployment and domain status must be checked in Vercel; a successful local build is not proof of deployment. Google Search Console verification requires the user's real token or an existing verified domain property. The verification file remains a placeholder until a token is supplied.

## Sources and assets

- https://www.entangledpublishing.com/books/threshing-day
- https://www.entangledpublishing.com/books/fourth-wing

Historical manuscripts under `research/editorial/` are unverified archives and are not copied to the website. They must never be treated as approved publication content.

Original typographic social image; no official artwork or book extracts. System fonts, no client framework, no login or database.

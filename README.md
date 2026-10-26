# FourthWingDragon

An unofficial English Empyrean fan site built with Astro 5, Tailwind CSS 4 and TypeScript strict. Entirely prerendered; no backend, database, account or client framework.

## Current scope

Seven core pages: home, dragon color/tail matrix, Dragonkind guide, dragon quiz, signet quiz, dragon name generator and the character index. Four legal pages: about, privacy, terms and disclaimer. The published character index and three published character profiles use trailing-slash URLs; Violet's draft profile remains excluded from the sitemap.

The matrix contains seven colors × six tails (42 intersections). Three example pairings were supplied in the owner’s brief and are labeled accordingly; the public official introductions do not independently establish a full taxonomy. Other cells display an unconfirmed badge. The guides contain source-aware reading advice, not an independently verified date/rules timetable. Do not present the reading sequence as a complete canonical timeline.

Both quizzes have twelve questions, four stable option IDs and seven weighted dimensions. They use independent question sets, deterministic result-order tie breaking and no persistent answer storage. Results are original personality interpretations, not canon. The browser-only name generator has 600 combinations; Gaelic dictionary roots are distinguished from invented syllables.

## Development and checks

Node 20.19+ (use a supported LTS on Vercel).

~~~sh
npm ci
npm run dev
npm test
npx astro check
npm run build
npm run verify:content
npm run verify
npm run start
~~~

The preview server binds to 127.0.0.1:3000. Run build before output validation or preview. Tests transpile TypeScript with the already-installed TypeScript dependency, so native Node TypeScript stripping is not required. No new package dependency is introduced.

verify:content checks the built HTML, metadata, single H1, JSON-LD, sitemap URLs, guide/quiz word counts, 42 cells, HTML/JS budgets and exact Google verification contents. verify also checks every local link and fragment, including character routes. These remain manual scripts, not prebuild hooks. The old character YAML verifier is historical and is no longer the active publication check.

## Architecture

- src/lib/constants.ts: site settings and navigation.
- src/lib/dragons.ts: categories, explicit evidence notes and matrix.
- src/lib/quizzes.ts: question data, profiles and pure scoring function.
- src/lib/names.ts: generator roots, invented syllables and deterministic indexed combinations.
- src/components/quiz/QuizRunner.astro: accessible native browser quiz state machine.
- src/pages/: static HTML routes, restored character routes and a static sitemap.xml endpoint.
- public/llms.txt: question-to-URL index; public/robots.txt points at sitemap-index.xml.

Astro’s sitemap integration generates sitemap-index.xml and sitemap-0.xml. The static sitemap.xml endpoint contains the same published page URLs for direct submission. Draft character routes remain excluded from public navigation and the sitemap.

## Deployment and verification

Vercel: Astro preset, npm run build, output dist, repository root. Production origin: https://fourthwingdragon.com. No secrets are needed. PUBLIC_CONTACT_EMAIL is optional; no contact address is invented.

Keep public/google7898b661ebe700a1.html permanently. It contains the actual Google Search Console token and must remain at the domain root after every deploy. A successful local build does not by itself prove a production deployment; verify production responses after pushing main.

## Sources and assets

The author’s public Fourth Wing introduction and the public Dragonkind entrance are linked with specific source limitations. The official entrance does not supply a complete public Threshing timetable or rulebook. Gaelic root links use LearnGaelic dictionary entries. Quiz descriptions and reading instructions are original fan activities. No Amazon Associate membership is claimed without confirmation.

System fonts, local original social artwork, no official illustrations or book-cover assets. No analytics, cookies, local storage or remote answer submission are implemented.

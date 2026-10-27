# FourthWingDragon

An unofficial English Empyrean fan site built with Astro 5, Tailwind CSS 4 and TypeScript strict. Entirely prerendered; no backend, database, account or client framework.

## Current scope

Seven core pages: home, dragon color/tail matrix, Dragonkind guide, dragon quiz, signet quiz, dragon name generator and the character index. Four legal pages: about, privacy, terms and disclaimer. The published character index and three published character profiles use trailing-slash URLs; Violet's draft profile remains excluded from the sitemap.

The matrix indexes seven colors and six tails, with only named examples shown. The guides contain source-aware reading advice and do not present an unsupported date or rules timetable as fact.

Both quizzes have twelve questions, four stable option IDs and seven weighted dimensions. They use independent question sets, deterministic result-order tie breaking and no persistent answer storage. Results are original personality interpretations, not canon. The browser-only name generator offers 72 fantasy names with creative meanings, grouped into Fire, Ice, Shadow, Storm, Earth and Sky. It samples 4, 6, 8 or 12 distinct names per batch and copies names with their meanings; the full catalogue is prerendered for reading without JavaScript.

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
- src/lib/names.ts: 72 names and creative meanings, six styles, batch sampling and clipboard text formatting.
- src/data/affiliate.ts: centralized Amazon tag and Amazon/Audible book link helpers.
- src/components/quiz/QuizRunner.astro: accessible native browser quiz state machine.
- src/pages/: static HTML routes, restored character routes and a static sitemap.xml endpoint.
- public/llms.txt: question-to-URL index; public/robots.txt points at sitemap-index.xml.

Astro’s sitemap integration generates sitemap-index.xml and sitemap-0.xml. The static sitemap.xml endpoint contains the same published page URLs for direct submission. Draft character routes remain excluded from public navigation and the sitemap.

## Book link helpers

`amazonSearchUrl(query)`, `audibleBookUrl(asin)` and `bookDualLink(title, amazonQuery, audibleAsin)` live in `src/data/affiliate.ts` and are also re-exported from `src/lib/constants.ts`. The dual helper returns `{ title, amazonUrl, audibleUrl }`; it does not render markup. Links rendered from these helpers should use `rel="sponsored nofollow"` and `target="_blank"`.

Amazon search links include a tag only when `AFFILIATE.amazonTag` is nonempty after trimming. Audible links are ordinary product URLs and do not inherit the Amazon tag. Callers must verify the intended product and edition before supplying its ten-character ASIN; format validation does not prove that a listing exists. No series ASIN catalogue or Audible commission claim is included.

Run `npm test` separately from `npm run ship`; ship runs type checks, build and output validation, but does not run model tests. Review `/dragons/` in the rendered output: its body is written in the page template, while the data arrays supply the label lists. Changes to unused data descriptions do not expand the page. Rider/dragon pairings remain outside this update pending an agreed source policy and verification of each entry.

## Deployment and verification

Vercel: Astro preset, npm run build, output dist, repository root. Production origin: https://fourthwingdragon.com. No secrets are needed. PUBLIC_CONTACT_EMAIL is optional; no contact address is invented.

Keep public/google7898b661ebe700a1.html permanently. It contains the actual Google Search Console token and must remain at the domain root after every deploy. A successful local build does not by itself prove a production deployment; verify production responses after pushing main.

## Sources and assets

The author’s public Fourth Wing introduction and the public Dragonkind entrance are linked with specific source limitations. The official entrance does not supply a complete public Threshing timetable or rulebook. Name meanings are original creative prompts, not translations or novel references. Quiz descriptions and reading instructions are original fan activities. No Amazon Associate membership is claimed without confirmation.

System fonts, local original social artwork, no official illustrations or book-cover assets. No analytics, cookies, local storage or remote answer submission are implemented.

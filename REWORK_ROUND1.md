# Round 1 verification

Date: 2026-10-24. Branch: `rework/round1`. No push or domain binding performed.

## Technical result

- Astro 5.18.2 installed with a regenerated npm lockfile. Legacy Next files and unrelated public assets removed.
- `ASTRO_TELEMETRY_DISABLED=1 npm run ship`: passed, with 0 errors, 0 warnings and 0 hints from Astro check.
- Static build: 6 HTML pages. SEO and internal-link checks passed for all 6.
- Sitemap: 6 URLs, no character draft URLs.
- Source scans: zero fact placeholders, uppercase unknown-value markers, obsolete Ridoc URL slugs or character portrait paths.
- 12 research text files downloaded successfully; originals preserved separately in `research/editorial/`.
- Original 1200×630 social image generated and visually checked.
- Negative fixtures confirmed the validators reject missing metadata, broken internal routes and missing anchors.

The telemetry environment variable avoids Astro writing preferences outside the restricted workspace. The final dependency installation used the bundled sharp binary; its libvips version was checked successfully.

## Publication remains blocked

All four character entries and the dragon entry remain drafts. The requested generic source pages support introductory material but do not support substantive profiles with detailed powers, dragons and later story events. The originals were retained for review rather than published as verified facts.

The instruction's release gate requires at least three substantive verified character profiles with the specified link thresholds. There are currently zero. The character-page thresholds will be enforced when those routes are generated; a six-page technical pass does not establish that the content gate is satisfied.

The requested Violet entry in `llms.txt` is intentionally omitted while its public route is absent, avoiding a machine-readable 404 recommendation.

The GSC token has not been supplied. `public/google-site-verification.html` remains the documented placeholder.

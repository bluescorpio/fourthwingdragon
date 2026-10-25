# Phase 1 release

Verified on 2026-10-25.

## Deployment

Vercel team: wangxiaoloou's projects.
Project: fourthwingdragon.
Production URL: https://fourthwingdragon.vercel.app/
Publisher-content release commit: 35d216f.
Vercel displayed Ready for this commit.

The project is linked to main in bluescorpio/fourthwingdragon. Vercel uses the Astro preset, npm run build, and dist output. No environment secrets are required.

## Checks

- Content verification: four characters passed, with three other character outlinks each.
- Astro check: zero errors, warnings or hints.
- Build: ten static pages.
- Built SEO and internal-link verification: ten pages passed.
- Live browser checks: all four character pages loaded, had one H1, linked to the correct Entangled Publishing source, and used the corresponding fourthwingdragon.com canonical.
- All three entry pages linked to all four characters.
- Live sitemap-0.xml listed ten canonical URLs.
- No client script bundles were generated.
- Strict content-verifier fixture passed with valid data and returned nonzero for a fact marker and a missing primary source.
- Existing layout files, styles, fonts, site configuration and route paths were preserved.

The prior REWORK_ROUND1.md records the earlier draft-only state. This release supersedes that publication status.

## Remaining domain setup

fourthwingdragon.com has been added to Vercel Production. Its DNS configuration was invalid when checked; the user will configure DNS.

Required record shown by Vercel:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 216.150.1.1 |

Keep the apex domain as the canonical hostname. The Vercel option to redirect apex to www was disabled.

After DNS propagates, refresh the domain in Vercel and verify HTTPS plus the four character routes on the apex domain.

## Google Search Console

No verification token has been supplied, and this task has not verified a GSC property or submitted a sitemap.

After the domain works:

1. Add or select the fourthwingdragon.com domain property in Google Search Console.
2. Complete the Google-provided DNS TXT verification if needed.
3. Submit https://fourthwingdragon.com/sitemap-index.xml.
4. Inspect the homepage and character URLs and request indexing.

The existing public/google-site-verification.html remains a placeholder. Do not submit that placeholder as a real verification token. Google indexing and performance data are not immediate and are not guaranteed by deployment.

## Content boundaries

Public character references contain publisher-confirmed names and short marketing phrases, source links, and site navigation. Plot, ages, appearance, units, magic, dragon assignments and character relationships were removed. Navigation references do not claim fictional relationships.

Source verification details are recorded in research/phase1-publisher-verification.json.

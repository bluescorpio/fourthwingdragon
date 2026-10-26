# Current release: dragon reference and fan tools

The approved scope supersedes the earlier character-index release while retaining Astro 5 static output.

## Release checks

- Build after each implementation phase.
- npm test: both 12-question scoring models, reachable outcomes, invalid/incomplete answers, deterministic ties, 42 cells and 600 unique generated names.
- npx astro check: no active source errors.
- npm run build, then npm run verify:content and npm run verify.
- Preview all published page routes: HTTP 200 without redirect; draft character profiles remain out of the sitemap.
- Confirm /sitemap.xml and /sitemap-0.xml contain the published page URLs, including the character index and three published profiles.
- Test quiz completion/restart/share and name generation/copy in a browser.
- Preserve Google verification file exactly and confirm it returns HTTP 200.
- Push HEAD to remote main without force; verify deployed site separately.

## Content limitations

The official public sources do not provide a complete canonical Threshing timeline, exact date or detailed rules. The implemented guides make that boundary explicit and offer reading guidance. Three matrix examples originate in the approved project brief, with visible evidence notes; they are not independently book-verified citations. All personality mappings and generated names are labeled as fan creations.

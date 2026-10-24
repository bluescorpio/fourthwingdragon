# CognitiveBench

Free browser-based cognitive tests with personal benchmarks.

## Stack

- Next.js `16.2.12` (App Router)
- React `19.2.4`
- TypeScript `5`
- Tailwind CSS `4`
- ESLint `9` + `eslint-config-next`
- Vitest + Testing Library
- Playwright

## Setup

```bash
npm install
cp .env.example .env.local
npx playwright install chromium
```

## Scripts

```bash
npm run dev          # local development server
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run test         # unit tests
npm run test:e2e     # Playwright end-to-end tests
npm run build        # production build
npm start            # serve production build
```

## Notes

- Reaction Time Test scores are stored in browser `localStorage` only.
- Set `NEXT_PUBLIC_CONTACT_EMAIL` to show a real public contact address on the
  Privacy and Terms pages. If it is unset, no placeholder address is rendered.
- Set `NEXT_PUBLIC_SITE_URL` to the production canonical origin.

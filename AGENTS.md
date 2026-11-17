<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agency site: coding standard

The public website of an AI automation agency. One codebase, two brands (`BRAND=us` or `BRAND=asia`), each a
separate Vercel project. Leads go to the agency CRM (AgencyDesk) through signed server-to-server calls. The site has
no database and keeps no customer data.

## Where things live

| Folder         | What                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| `src/app/`     | Routes only: pages, layouts, server actions                               |
| `src/content/` | Shared content: services, products. Plain typed data, no UI               |
| `src/brands/`  | Per-brand overrides: tone, hero, CTAs, order, industries, money, theme    |
| `src/lib/`     | Small helpers: brand switch, formatting, the CRM client                   |
| `docs/kb/`     | Knowledge base; every engineering decision goes in engineering-highlights |

## Rules

- **Content is data.** Copy lives in `src/content/` and `src/brands/`, never inside components. A brand only
  overrides what differs; everything else comes from the shared content.
- **Brand is fixed per build.** Read it with `currentBrand()`; never branch on the hostname.
- **Tailwind is mobile-first:** base classes for phones, then `md:` and `lg:`. Never `max-*` variants.
- **Forms:** errors show inline under the field and focus moves to the first wrong field. No error-summary box.
- **Secrets stay on the server.** The CRM secret is read only in server code (`server-only`); the browser never
  sees it.
- **Demo data is made up.** No real client names, numbers or logos until a real, named project allows it, and every
  number shown on the site comes from a real project.
- **Packages:** ask before adding one.
- TypeScript strict, no `any`. Comments say why, not what.

## Before you open a PR

```bash
npm run check   # typecheck, lint, format, unit tests
```

Playwright (`npm run test:e2e`) runs only when asked.

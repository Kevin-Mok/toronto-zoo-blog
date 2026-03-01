# ExecPlan: Date Archive + Canonical Routing

## Checklist

- [x] Add canonical/date path utilities and archive query helpers
- [x] Replace `/blog/[slug]` with catch-all date/archive/post routing
- [x] Add sidebar with latest posts + archive navigation links
- [x] Update all internal links to canonical post URLs
- [x] Update sitemap/rss/metadata canonical URLs
- [x] Update seed/test fixtures for `/blog/YYYY/M/D/title`
- [x] Run typecheck + unit + integration tests

## Review

Implemented canonical date/title post URLs (`/blog/YYYY/M/D/title`), archive landing pages at each date depth, and reusable sidebar navigation with latest posts and year/month/day links.
Validated with `npm run build`, `npm run typecheck`, `npm run lint`, `npm run test:unit`, and `npm run test:integration`.
`npm run test:e2e` could not execute in sandbox due local port binding restrictions (`listen EPERM`), so e2e verification must be executed on host machine.

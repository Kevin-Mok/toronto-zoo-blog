# Toronto Zoo Report

Recruiter-focused 2026 full-stack build: TypeScript strict mode, SSR-first Next.js App Router routes, PostgreSQL + Prisma operational data, and Directus CMS integration (self-hosted) for editorial content.

## Routes

- `/` Home landing page
- `/about` About page (reporting method and activism lens)
- `/blog` Blog index with categories/tags and archive navigation
- `/blog/YYYY`, `/blog/YYYY/M`, `/blog/YYYY/M/D` Archive landing pages
- `/blog/YYYY/M/D/title` Canonical dynamic article route
- `/rss.xml` RSS feed
- `/sitemap.xml` Sitemap

## Tech Stack

- Next.js 15 (App Router, SSR-first)
- TypeScript strict mode
- Node.js runtime
- PostgreSQL + Prisma
- Zod runtime validation
- Directus (self-hosted CMS)
- Playwright + Vitest

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run media:import
npm run media:reencode
npm run media:posters
npm run dev
```

## Setup Commands

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run test:integration
npm run build
```

## Optional E2E + Perf

```bash
npx playwright install --with-deps
npm run test:e2e
npm run perf:lhci
```

### E2E with Shareable Logs

```bash
npm run test:e2e:logs
```

By default, Playwright starts this app on `127.0.0.1:4173` to avoid conflicts with other local projects already using port `3000`.
You can override it with:

```bash
E2E_PORT=4300 npm run test:e2e:logs
```

Artifacts are written to:

- `test-artifacts/e2e/<timestamp>/playwright.log`
- `test-artifacts/e2e/<timestamp>/playwright-results.json`
- `test-artifacts/e2e/<timestamp>/playwright-junit.xml`
- `test-artifacts/e2e/<timestamp>/playwright-html-report/`
- `test-artifacts/e2e/<timestamp>/test-results/`

You can pass extra filters through npm, for example:

```bash
npm run test:e2e:logs -- tests/e2e/blog.spec.ts
npm run test:e2e:logs -- tests/e2e/site-structure-crawl.spec.ts
```

### LHCI with Shareable Logs

```bash
npm run perf:lhci:logs
```

Artifacts are written to:

- `test-artifacts/lhci/<timestamp>/lhci.log`
- `test-artifacts/lhci/<timestamp>/summary.txt`
- `test-artifacts/lhci/<timestamp>/lighthouseci/`

Pass extra LHCI args through npm, for example:

```bash
npm run perf:lhci:logs -- --collect.numberOfRuns=1
```

Target a specific post URL (for example a canonical date/title path) without editing config:

```bash
LHCI_POST_PATH=/blog/2026/3/1/toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026 npm run perf:lhci:logs
```

## Docker Deployment

```bash
docker compose up -d --build
```

`web` bind-mounts `./public/media` into the container at runtime. If that folder is empty on the host, `/_next/image` requests for site media will fail.

### One-Command VPS Bootstrap (Docker + Certbot)

Run this on the Ubuntu VPS after cloning the repo:

```bash
chmod +x scripts/ops/bootstrap-vps.sh
scripts/ops/bootstrap-vps.sh --domain yourdomain.com --admin-email you@yourdomain.com
```

The script installs Docker/Compose, configures host Nginx + UFW, patches domain/secrets, issues Let's Encrypt certificates with Certbot, and starts the stack.
It auto-selects a free localhost app port (and persists it in `.env` as `APP_HOST_PORT`) to avoid port collisions.

Full VPS runbook (Porkbun domain -> OVHcloud Ubuntu production):
[Porkbun to OVHcloud Ubuntu Deployment](/home/kevin/coding/zoo-blog/docs/deploy-porkbun-ubuntu-vps.md)

Services:

- `web`: Next.js standalone app
- `postgres`: PostgreSQL database
- `directus`: CMS backend
- `nginx` (host service): reverse proxy and TLS
- `backup`: daily compressed DB backups

## Toronto Zoo Source Inputs

- Source page: `/home/kevin/coding/portfolio-site/app/toronto-zoo/2026/2/28/page.tsx`
- Source media: `/home/kevin/coding/portfolio-site/public/{images,videos}/blog/toronto-zoo-2026-02-28`
- Source transcripts: `docs/toronto-zoo/2026-02-28/transcripts`

## Accessibility + Motion

- Semantic landmarks and visible focus rings
- Reduced-motion support via `prefers-reduced-motion`
- No scroll-triggered animation sequences
- Animations limited to opacity/transform interactions and page-load entry

## SEO

- Per-route metadata and canonical URLs
- Open Graph metadata
- `robots.ts`, `sitemap.ts`, and RSS route

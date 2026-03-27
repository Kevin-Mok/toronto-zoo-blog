# Toronto Zoo Report

Recruiter-facing full-stack newsroom build for Toronto Zoo reporting. The app pairs SSR-first Next.js routes with typed content fetching, Directus-backed editorial data, Prisma operational writes, and an ops path that can run locally in Docker or ship to a small Ubuntu VPS.

## Why This Repo Stands Out To Recruiters

- It is not just a frontend shell. The repo includes CMS integration, operational data storage, cache invalidation, post view tracking, content fallback strategy, and deployment automation.
- It shows product judgment. The app combines editorial storytelling, SEO surfaces, archive navigation, RSS, accessibility constraints, and performance checks in one build.
- It demonstrates verification discipline. Type checks, linting, Vitest, Playwright, Lighthouse CI logging, and ops runbooks are all tracked in the repository.
- It is deployable. `docker-compose.yml`, the VPS bootstrap script, backup loop, and deployment docs make the build legible to another engineer without private tribal knowledge.

## Tech Stack And Why Chosen

- Next.js 15 App Router + React 19: SSR-first route rendering keeps article pages indexable and fast while still allowing client-side enhancements where needed.
- TypeScript strict mode: the repo is optimized for predictable refactors across routes, content mappers, and ops scripts instead of loosely typed glue code.
- Directus SDK + local seed fallback: editors can work through a CMS when configured, but local development remains reliable even when Directus is absent or empty.
- PostgreSQL + Prisma: operational writes such as contact submissions, revalidation audits, and view tracking stay explicit, queryable, and migration-backed.
- Zod: runtime validation closes the gap between CMS payloads and trusted server-rendering input.
- Playwright + Vitest: browser coverage and unit or integration tests give the repo a verification story beyond "it works on my machine."
- Docker Compose + Ubuntu VPS bootstrap automation: the local stack mirrors production-adjacent services, and the bootstrap script turns a generic VPS into a repeatable deployment target.
- Bash + TSX automation scripts: media ingestion, poster generation, seeding, and ops helpers stay repo-local and reproducible instead of living in undocumented shell history.

## What You Can Browse

- `/` homepage with the latest report and archive entry points
- `/about` reporting method and activism lens
- `/blog` post index with categories, tags, and archive navigation
- `/blog/YYYY`, `/blog/YYYY/M`, `/blog/YYYY/M/D` archive landing pages
- `/blog/YYYY/M/D/title` canonical article routes
- `/rss.xml` RSS feed
- `/sitemap.xml` sitemap

## Quick Start

```bash
npm install
cp .env.example .env.local
cp .env.example .env
POSTGRES_HOST_PORT=55432 docker compose up -d postgres
npx prisma migrate dev
npm run media:import
npm run media:reencode
npm run media:posters
npm run dev
```

For host-side `npm run dev`, keep `DATABASE_URL` aligned in both `.env.local` and `.env`. Next.js reads `.env.local`; Prisma CLI reads `.env`.

If you want a one-off fish shell override instead of editing the files:

```fish
set -gx DATABASE_URL postgresql://zoo:zoo@127.0.0.1:55432/zoo_blog
```

Required runtime values live in `.env.example`: `NEXT_PUBLIC_SITE_URL`, `DIRECTUS_URL`, `DATABASE_URL`, `REVALIDATE_TOKEN`, and `CONTACT_EMAIL`. `DIRECTUS_TOKEN` is optional for fallback-driven local work but required when you need authenticated Directus reads or seeding.

## Day-To-Day Use

### Local App Work

```bash
npm run dev
npm run typecheck
npm run lint
npm run test:unit
npm run test:integration
npm run build
```

These npm scripts do not expose repo-specific flags. Use normal npm argument passthrough (`npm run <script> -- ...`) only when the underlying tool supports it.

### Media Pipeline

```bash
npm run media:import
npm run media:reencode
npm run media:posters
```

Use these when new Toronto Zoo media lands in the repo. They are plain wrapper scripts with no documented custom flags in `package.json`.

### E2E With Shareable Logs

```bash
npx playwright install --with-deps
npm run test:e2e
npm run test:e2e:logs
```

By default, Playwright starts the app on `127.0.0.1:4173` to avoid collisions with other local projects already using port `3000`.

Useful options and passthrough patterns:

- Override the app port: `E2E_PORT=4300 npm run test:e2e:logs`
- Run one spec file: `npm run test:e2e:logs -- tests/e2e/blog.spec.ts`
- Run another targeted spec: `npm run test:e2e:logs -- tests/e2e/site-structure-crawl.spec.ts`

Artifacts are written to:

- `test-artifacts/e2e/<timestamp>/playwright.log`
- `test-artifacts/e2e/<timestamp>/playwright-results.json`
- `test-artifacts/e2e/<timestamp>/playwright-junit.xml`
- `test-artifacts/e2e/<timestamp>/playwright-html-report/`
- `test-artifacts/e2e/<timestamp>/test-results/`

### Lighthouse CI With Shareable Logs

```bash
npm run perf:lhci
npm run perf:lhci:logs
```

Useful options and passthrough patterns:

- Reduce run count: `npm run perf:lhci:logs -- --collect.numberOfRuns=1`
- Target a specific post route:

```bash
LHCI_POST_PATH=/blog/2026/3/1/toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026 npm run perf:lhci:logs
```

Artifacts are written to:

- `test-artifacts/lhci/<timestamp>/lhci.log`
- `test-artifacts/lhci/<timestamp>/summary.txt`
- `test-artifacts/lhci/<timestamp>/lighthouseci/`

## Docker And Ops

### Local Docker Stack

```bash
docker compose up -d --build
```

The checked-in Compose stack currently defines four services:

- `postgres` for Prisma operational data
- `directus` for content authoring
- `web` for the Next.js SSR app
- `backup` for daily compressed Postgres dumps

`web` bind-mounts `./public/media` into the container at runtime. If that host folder is empty, `/_next/image` requests for site media will fail.

### VPS Bootstrap Script

Run this on an Ubuntu VPS after cloning the repo:

```bash
chmod +x scripts/ops/bootstrap-vps.sh
scripts/ops/bootstrap-vps.sh --domain yourdomain.com --admin-email you@yourdomain.com
```

Verified local options from `scripts/ops/bootstrap-vps.sh --help`:

- `--domain <domain>`: required base domain
- `--repo-dir <path>`: override the repo path on the VPS
- `--admin-email <email>`: Directus admin and Certbot email, defaults to `admin@<domain>`
- `--app-port <port>`: set the host localhost port for the web container instead of auto-picking
- `--allow-directus-port`: open UFW port `8055` publicly
- `--skip-upgrade`: skip `apt` upgrade during bootstrap
- `--skip-certbot`: skip Let's Encrypt issuance and renewal setup
- `--help`: print usage

Supported environment overrides:

- `POSTGRES_PASSWORD`
- `DIRECTUS_KEY`
- `DIRECTUS_SECRET`
- `ADMIN_PASSWORD`
- `REVALIDATE_TOKEN`
- `DIRECTUS_TOKEN`
- `APP_HOST_PORT`

What the script does:

1. Installs Docker Engine and the Compose plugin.
2. Installs and configures host Nginx as the reverse proxy.
3. Configures UFW for SSH, HTTP, and HTTPS.
4. Patches `docker-compose.yml` and runtime secrets.
5. Issues a Let's Encrypt certificate with the Certbot Nginx plugin unless `--skip-certbot` is used.
6. Starts the Docker stack.

Full production runbook:
[Porkbun to OVHcloud Ubuntu Deployment](/home/kevin/coding/zoo-blog/docs/deploy-porkbun-ubuntu-vps.md)

### DNS Monitoring Helper

```bash
chmod +x scripts/ops/watch-dns-provider.sh
scripts/ops/watch-dns-provider.sh
```

Verified option from the current ops docs:

- `--once`: run a single DNS provider check without the watch loop

## Architecture Snapshot

The repo's current request path is:

1. A route under `app/` renders through the Next.js App Router.
2. Typed content helpers in `lib/directus/queries.ts` fetch post data.
3. Zod validation guards the payload shape.
4. Directus content is preferred when configured.
5. Local seed content in `lib/content/local-seed.ts` keeps local development and fallback rendering reliable.
6. Prisma-backed operational routes handle side effects like contact submissions and cache revalidation audit logging.

Public interfaces documented in the repo:

- `POST /api/contact` writes validated contact submissions to PostgreSQL
- `POST /api/revalidate` invalidates cache tags and records the event
- `GET /api/views?slug=<post-slug>` returns the current persisted count for a post when the database is available
- `POST /api/views` increments the persisted count for `{ "slug": "<post-slug>" }`

Post pages render a client-side `PostViewCounter` that calls the views API, shows the current count, and degrades to a visible unavailable state when Prisma storage is missing or migrations have not been applied.

## Source Inputs

- Source page: `/home/kevin/coding/portfolio-site/app/toronto-zoo/2026/2/28/page.tsx`
- Source media: `/home/kevin/coding/portfolio-site/public/{images,videos}/blog/toronto-zoo-2026-02-28`
- Source transcripts: `docs/toronto-zoo/2026-02-28/transcripts`

## Accessibility And Motion

- Semantic landmarks and visible focus rings
- Reduced-motion support via `prefers-reduced-motion`
- No scroll-triggered animation sequences
- Animations limited to opacity and transform interactions plus page-load entry

## SEO

- Per-route metadata and canonical URLs
- Open Graph metadata
- `robots.ts`, `sitemap.ts`, and RSS route

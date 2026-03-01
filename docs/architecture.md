# Architecture

## Application Topology

- Next.js App Router with server components for initial route rendering.
- Content retrieval is routed through `lib/directus/queries.ts`.
- Directus is preferred when configured; fallback content from `lib/content/local-seed.ts` keeps local development reliable.
- Operational events (contact + cache revalidation audits) use Prisma models in PostgreSQL.

## Data Flow

1. Request enters route handler (`/`, `/blog`, `/blog/[...segments]` with archive and canonical post variants).
2. Route calls typed content query helpers.
3. Query helper attempts Directus content fetch and validates with Zod.
4. Fallback path returns local seed content if Directus is unavailable.
5. Server components render HTML with media constraints and metadata.

## Caching

- Post payload is wrapped in `unstable_cache` with a 300 second revalidation window.
- Cache tag `posts` can be invalidated through `/api/revalidate`.

## Public Interfaces

- `POST /api/revalidate`
  - Input: `{ token: string; tags: string[] }`
  - Effect: invalidates Next.js cache tags and logs an event.
- `POST /api/contact`
  - Input: `{ name; email; company; message }`
  - Effect: writes validated contact submission to PostgreSQL.

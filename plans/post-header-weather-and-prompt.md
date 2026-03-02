# ExecPlan: Post Header Weather + Live Prompt Update

## Checklist

- [x] Add `weatherSummary` to post types and schema validation
- [x] Wire optional weather field through Directus schema/query mapping and seeding
- [x] Backfill rounded Toronto weather summaries for existing local posts
- [x] Render weather summary as minor text in the post header card
- [x] Add weather line styling in global blog CSS
- [x] Update canonical publish-live prompt with weather requirements
- [x] Update content model docs with weather field
- [x] Add/update tests for weather presence and rounded integer formatting
- [x] Run `npm run typecheck`, `npm run test:unit`, and `npm run test:integration`

## Review

Added optional `weatherSummary` through the blog content contract (`types`, Zod schema, Directus schema, mapping, and seeding payload).
Backfilled rounded average values in local seed data:
- `Toronto weather: -1°C` for 2026-02-28
- `Toronto weather: -10°C` for 2026-03-01
Rendered weather text inside the existing post header card under date/read-time/author metadata and styled it as minor text.
Updated the canonical live-post prompt and content model docs to require whole-degree Toronto average weather summary output.
Added unit/integration coverage for weather summary presence and integer formatting.

Verification passed:
- `npm run typecheck`
- `npm run test:unit`
- `npm run test:integration`

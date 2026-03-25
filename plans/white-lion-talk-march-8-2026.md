# ExecPlan: White Lion Talk March 8, 2026

## Checklist

- [x] Add March 8 white-lion draft docs under `docs/toronto-zoo/2026-03-08/`.
- [x] Add the new March 8 white-lion post to `lib/content/local-seed.ts`.
- [x] Update relevant tests for latest-post ordering, route resolution, and transcript-only lion sections.
- [x] Run validation and record results.

## Review

- Added a March 8 white-lion draft pack with a standalone blog-post draft, follow-up checklist, reusable question script, and SEO title recommendations.
- Refined the follow-up docs so the keeper section now starts with short, easy-to-ask public questions, while the deeper evidence-driven welfare and status questions are reserved for Grant Furniss and Molly McGuire after on-site evidence capture.
- Published a new local-seed post at `/blog/2026/3/8/toronto-zoo-field-notes-white-lion-care-genetics-and-family-status-march-8-2026` using transcript-only lion sections and a temporary placeholder hero because lion media is not yet in the repo.
- Updated weather fallbacks and test coverage for the new post, including route resolution and transcript-only section expectations.
- Fixed one stale Playwright assertion in `tests/e2e/blog.spec.ts` so the blog flow matches the current homepage heading and exact title-link selectors.

Verification passed:
- `npm run typecheck`
- `npm run lint`
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:e2e -- tests/e2e/blog.spec.ts`

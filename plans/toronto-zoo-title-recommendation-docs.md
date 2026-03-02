# ExecPlan: Toronto Zoo Title Recommendation Docs

## Checklist

- [x] Create `docs/toronto-zoo/2026-03-01/title-recommendations-seo.md` with 5 SEO-forward options and one primary recommendation.
- [x] Create `docs/toronto-zoo/2026-02-28/title-recommendations-seo.md` with 5 SEO-forward options and one primary recommendation.
- [x] Include explicit justification, keyword coverage, and tradeoffs for each title option.
- [x] Verify route, date, and species alignment against local content source data.

## Review

Added two date-scoped title recommendation docs to the Toronto Zoo documentation folders:

- `docs/toronto-zoo/2026-03-01/title-recommendations-seo.md`
- `docs/toronto-zoo/2026-02-28/title-recommendations-seo.md`

Each doc includes:

- Target URL
- A primary recommendation
- Five total title options
- Per-option SEO/readability rationale
- Keyword coverage
- Tradeoff notes

Verification completed against `lib/content/local-seed.ts` and canonical date-route shape from `lib/utils/post-path.ts`.

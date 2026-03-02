# ExecPlan: Organize docs Directory

## Objective
- Reorganize `/home/kevin/coding/zoo-blog/docs` into clearer categories while preserving behavior and references.

## Checklist
- [x] Inspect current docs layout and repository constraints.
- [x] Define minimal folder taxonomy for existing docs.
- [x] Move files into categorized folders.
- [x] Add docs index files for navigation and conventions.
- [x] Update in-repo links/paths that reference moved docs.
- [x] Validate no broken references remain.

## Review Notes
- Applied a split of reusable vs historical docs:
  - Reusable OG prompt assets moved under `docs/reusable/prompts/og/`.
  - One-off OG run output moved under `docs/archive/og/`.
  - Reusable Toronto Zoo templates moved under `docs/toronto-zoo/templates/`.
- Added index guides at:
  - `docs/README.md`
  - `docs/reusable/README.md`
  - `docs/archive/README.md`
  - `docs/toronto-zoo/README.md`
- Updated all in-repo references that pointed to old moved paths and re-grepped for stale path patterns.

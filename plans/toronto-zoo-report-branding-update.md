# ExecPlan: Toronto Zoo Report Branding Update

## Checklist

- [x] Replace runtime/UI references of `Toronto Zoo Blog` with `Toronto Zoo Report`
- [x] Use lockup logo (`/media/logo-word.png`) where image + name branding is needed in the header homepage link
- [x] Use icon-only logo (`/media/logo-cr.png`) for non-name branding contexts via metadata icons
- [x] Update e2e selectors impacted by branding changes
- [x] Run verification checks and capture results

## Review

Updated site branding constants and user-facing copy to `Toronto Zoo Report` across header, homepage text, archive metadata/descriptions, and seed author names.
Replaced the header text brand link with the provided lockup logo image and added responsive sizing styles.
Configured metadata icons to use the icon-only logo for favicon/apple icon contexts.
Adjusted `tests/e2e/blog.spec.ts` to target the `Blog posts` region explicitly to avoid strict-mode ambiguity from duplicate links in main content and sidebar.

Verification passed:
- `npm run typecheck`
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:e2e -- tests/e2e/blog.spec.ts tests/e2e/site-structure-crawl.spec.ts`
- `npm run lint`

# Product TODO Roadmap

Source: `/home/kevin/coding/zoo-blog/todo.md`

This document expands each TODO item into implementation-ready guidance so any engineer or agent can start directly from a single section.

## Status and Usage

- Use checkboxes as feature status.
- Mark `[x]` only when implementation is complete and validated.
- If partially complete, keep `[ ]` and add a short progress note under the item.

## Prioritization Method

Priority is based on:

- Impact on reader experience and product utility.
- Dependency chain (items that unlock multiple future tasks move earlier).
- Implementation risk (low-risk, high-value items first).
- Reuse of existing architecture (Directus + Prisma + Next.js SSR routes).

## Now

### [ ] create email/contact section

Goal:
- Add user-facing contact UI that uses the existing backend endpoint.

Why it matters:
- Contact API already exists and is currently underused without a frontend entrypoint.

Current repo baseline:
- API route exists at `app/api/contact/route.ts`.
- Validation schema exists at `lib/validation/schemas.ts` (`contactPayloadSchema`).
- No visible contact form route/component in current pages.

Implementation approach:
- Build a reusable `ContactForm` client component and place it on `/contact` or in `/about`.
- Mirror Zod constraints client-side for early feedback.
- Provide clear submit states: idle, submitting, success, error.
- Include accessible inline validation errors and success confirmation.

Concrete file/model/API touchpoints:
- `app/contact/page.tsx` (new) or `app/about/page.tsx` (extend).
- `components/ContactForm.tsx` (new).
- `app/api/contact/route.ts` (no behavior change expected; ensure response handling contract is stable).
- `app/globals.css` for form layout and error styles.

Acceptance criteria:
- Valid submission returns success and creates a `ContactSubmission` row.
- Invalid values are blocked with field-level messages.
- Loading state prevents duplicate submissions.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Manual submit test with valid/invalid payloads.

Risks and edge cases:
- Spam submissions (future: honeypot or simple rate limit).
- DB unavailable path should show useful user-facing error.

Kickoff prompt for agent:
- "Implement the contact UI using existing `/api/contact`, with accessible validation and clear success/error states."

### [ ] table of contents for each post
- sections with linkable URL's

Goal:
- Add per-post TOC with anchor links for quick navigation and shareable section URLs.

Why it matters:
- Long posts are easier to scan and revisit.

Current repo baseline:
- Section IDs already exist in `components/AnimalSection.tsx` (`section-title-<id>`).
- Post template is rendered in `app/blog/[...segments]/page.tsx`.

Implementation approach:
- Add a `PostTableOfContents` component populated from intro, each animal section, and preservation lens.
- Render TOC near article header on post pages.
- Ensure anchor offsets account for sticky header height.

Concrete file/model/API touchpoints:
- `components/PostTableOfContents.tsx` (new).
- `app/blog/[...segments]/page.tsx` (wire data + render TOC).
- `app/globals.css` (TOC layout and anchor offset styles).

Acceptance criteria:
- All TOC links navigate to intended section.
- URL hash deep-linking works on direct open/refresh.
- Keyboard users can navigate TOC links with visible focus.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Manual test on desktop/mobile and with keyboard-only navigation.

Risks and edge cases:
- Duplicate or invalid heading IDs.
- Sticky header covering section titles on jump.

Kickoff prompt for agent:
- "Implement post TOC using existing section IDs and hash links, with sticky-header-safe anchors and accessible focus states."

### [ ] flesh out tags
- able to choose posts based on tag

Goal:
- Turn tags into navigable filters so users can browse topic-specific posts.

Why it matters:
- Improves discoverability and increases content depth per visitor.

Current repo baseline:
- Tags are displayed via `components/TagPill.tsx` and in `components/PostCard.tsx`.
- No tag route or filtering UI currently exists.

Implementation approach:
- Add tag route (`/blog/tag/[tag]`) with normalized tag slug handling.
- Make tag pills clickable in cards/post pages.
- Add helper in content query layer to filter posts by tag.

Concrete file/model/API touchpoints:
- `app/blog/tag/[tag]/page.tsx` (new).
- `components/TagPill.tsx` (link support or clickable variant).
- `components/PostCard.tsx` (wire clickable tags).
- `lib/directus/queries.ts` (filter helper for tag-based summaries).

Acceptance criteria:
- Clicking a tag opens tag-filtered list page.
- Unknown tag returns clear empty state (or 404 per final decision).
- Tag URLs are stable and lowercase-normalized.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Manual test for known/unknown tags.

Risks and edge cases:
- Tag naming inconsistencies (spaces/casing/synonyms).
- SEO duplication if query-param and path-based routes coexist.

Kickoff prompt for agent:
- "Implement tag browsing route and clickable tags from post cards, with normalized slug handling."

### [ ] image enlargement with animation from Kanban
- image popup overlay
- /home/kevin/coding/kanban-calendar

Goal:
- Enable click-to-enlarge media in an overlay/lightbox with smooth, accessible animation.

Why it matters:
- Improves media readability and perceived polish.

Current repo baseline:
- Images render inline in `components/AnimalSection.tsx`.
- No lightbox/overlay system exists yet.

Implementation approach:
- Add client-side `ImageLightbox` component with open/close state.
- Support keyboard controls (ESC close, arrow navigation if multiple images).
- Respect `prefers-reduced-motion`.
- Reuse motion pattern references from `/home/kevin/coding/kanban-calendar` without coupling repos.

Concrete file/model/API touchpoints:
- `components/ImageLightbox.tsx` (new).
- `components/AnimalSection.tsx` (trigger lightbox on image click).
- `app/globals.css` (overlay, transitions, focus trap visuals).

Acceptance criteria:
- Clicking any photo opens overlay with enlarged image + caption.
- Overlay closes by button, ESC, and backdrop click.
- No background scroll bleed on mobile while overlay is open.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Manual keyboard + mobile checks.

Risks and edge cases:
- Focus trap bugs.
- Scroll lock behavior across iOS/Android browsers.

Kickoff prompt for agent:
- "Build an accessible image lightbox for `AnimalSection` photos with reduced-motion support and keyboard controls."

### [ ] setup social media
- icon links to accounts

Goal:
- Add social profile links in header/footer.

Why it matters:
- Supports brand trust, distribution, and cross-channel audience growth.

Current repo baseline:
- Header and footer exist but contain no social links.

Implementation approach:
- Add centralized social config in `lib/site.ts`.
- Render icons/links in `SiteFooter`; optionally include in mobile nav.
- Hide missing accounts gracefully.

Concrete file/model/API touchpoints:
- `lib/site.ts` (social handles/URLs config).
- `components/SiteFooter.tsx`.
- `components/SiteHeader.tsx` (optional nav integration).

Acceptance criteria:
- Icons link to configured accounts correctly.
- Links include `aria-label` and safe external-link attributes.
- Layout is responsive and does not break nav/footer spacing.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Manual visual checks at mobile and desktop widths.

Risks and edge cases:
- Broken/outdated URLs in config.
- Icon bundle size creep.

Kickoff prompt for agent:
- "Add centralized social links config and render accessible social icons in site chrome."

### [ ] questions
- reusable script to ask zookeepers

Goal:
- Generate repeatable interview question sets for zoo visits.

Why it matters:
- Improves data collection quality and consistency across posts.

Current repo baseline:
- Existing scripts cover media import/transcoding/transcription.
- No editorial question-generator script currently exists.

Implementation approach:
- Add a CLI that outputs markdown question packs by species and focus.
- Include sections: welfare signals, habitat design, enrichment, social management, conservation, follow-ups.
- Save output in a date-scoped docs path.

Concrete file/model/API touchpoints:
- `scripts/editorial/generate-zookeeper-questions.ts` (new).
- `package.json` (new script command, e.g. `questions:generate`).
- `docs/editorial/` (output and usage examples).

Acceptance criteria:
- CLI supports flags (`--species`, `--focus`, `--date`, optional `--output`).
- Output is deterministic and markdown-formatted.
- Script exits non-zero on invalid input.

Validation checklist:
- `npm run typecheck`
- Run CLI with at least two species/focus combinations.

Risks and edge cases:
- Overly generic questions without species context.
- Drift between script templates and editorial needs.

Kickoff prompt for agent:
- "Implement a reusable CLI question-pack generator for zoo keeper interviews, with species/focus flags and markdown output."

## Next

### [ ] view count
- backend counter

Goal:
- Track per-post views and surface counts in post metadata.

Why it matters:
- Enables editorial insight and social proof.

Current repo baseline:
- Prisma models exist for contact/revalidation/audit only.
- No view aggregation model or endpoint exists.

Implementation approach:
- Add a `PostView` model keyed by post slug with aggregate count and timestamps.
- Add API endpoint for increment/read with lightweight abuse controls.
- Display count in article meta row.

Concrete file/model/API touchpoints:
- `prisma/schema.prisma` (new model).
- `app/api/views/route.ts` (new).
- `lib/validation/schemas.ts` (view payload schema).
- `app/blog/[...segments]/page.tsx` (render count).

Acceptance criteria:
- View API increments and returns stable count.
- UI shows count without hydration mismatch.
- Basic repeat-hit throttling works.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- API manual test (increment + fetch).

Risks and edge cases:
- Bot traffic inflation.
- Overcounting from reloads/prefetching.

Kickoff prompt for agent:
- "Add a Prisma-backed post view counter with an API route and surface counts on post pages."

### [ ] comment section

Goal:
- Enable moderated user comments per post.

Why it matters:
- Adds reader interaction and feedback loop.

Current repo baseline:
- No comment model or comment API exists.

Implementation approach:
- Add `Comment` model with moderation status (`pending`, `approved`, `rejected`).
- Add `GET` (approved comments) and `POST` (creates pending comment) API route.
- Add comment list + form below article.

Concrete file/model/API touchpoints:
- `prisma/schema.prisma` (new `Comment` model).
- `app/api/comments/route.ts` (new).
- `components/CommentList.tsx`, `components/CommentForm.tsx` (new).
- `app/blog/[...segments]/page.tsx` (integration point).

Acceptance criteria:
- Approved comments render in chronological order.
- New submissions enter pending state.
- Validation and anti-spam safeguards are present.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Manual API tests for create/list paths.

Risks and edge cases:
- Abuse/spam and moderation burden.
- Potential PII handling policy requirements.

Kickoff prompt for agent:
- "Implement moderated comments with Prisma model, API, and post-page UI integration."

### [ ] edit blog content

Goal:
- Make editorial updates safer and faster through a documented workflow.

Why it matters:
- Prevents regressions and route/metadata inconsistencies during edits.

Current repo baseline:
- Content is Directus-first with local fallback.
- Cache invalidation endpoint exists at `app/api/revalidate/route.ts`.

Implementation approach:
- Document a standard editing runbook (edit, validate, preview, revalidate, verify).
- Add schema-check and route-check steps to prevent invalid content shape.
- Define rollback steps for bad publish.

Concrete file/model/API touchpoints:
- `docs/editorial-editing.md` (new runbook).
- `lib/directus/queries.ts` + `lib/validation/schemas.ts` (reference checks).
- `app/api/revalidate/route.ts` (operational usage section).

Acceptance criteria:
- Workflow doc lets another developer perform safe post updates end-to-end.
- Includes cache behavior expectations and verification commands.

Validation checklist:
- Follow runbook once with test content change in a non-prod environment.

Risks and edge cases:
- Mismatch between Directus fields and local types.
- Stale cache confusion after edits.

Kickoff prompt for agent:
- "Create and validate an editorial editing runbook for Directus-backed posts with revalidation and rollback steps."

### [ ] generate on server

Goal:
- Move heavy content/media generation steps to server-side execution.

Why it matters:
- Improves repeatability and reduces local workstation dependency.

Current repo baseline:
- Media scripts are local-first (`scripts/media/*`) and ops scripts exist (`scripts/ops/*`).

Implementation approach:
- Define server-run job flow for media re-encode/poster generation/transcription.
- Capture logs and artifacts in a predictable path.
- Document env prerequisites and failure recovery.

Concrete file/model/API touchpoints:
- `scripts/ops/` (job launcher wrapper).
- `scripts/media/` (reused tasks).
- `docs/media-pipeline.md` + `docs/ops.md` (runbook updates).

Acceptance criteria:
- One command can run generation flow on VPS with clear output.
- Failures are logged and non-zero exit status is propagated.

Validation checklist:
- Dry run on server host with test dataset.
- Verify artifact output structure.

Risks and edge cases:
- Missing ffmpeg/transcription dependencies.
- Long-running task interruption handling.

Kickoff prompt for agent:
- "Implement a server-side media generation runner that orchestrates existing scripts and logs artifacts clearly."

## Later

### [ ] content type: stereotypies criticism

Goal:
- Add a dedicated content structure for reporting stereotypy-related observations.

Why it matters:
- Supports the site's watchdog lens while keeping claims controlled and evidence-based.

Current repo baseline:
- Category union currently: `field-notes | conservation | engineering`.
- No dedicated structured field for stereotypy observations.

Implementation approach:
- Add a new category or structured block (recommended: new category plus optional observation block).
- Extend validation and Directus schema mapping.
- Add editorial language guardrails to avoid over-claiming causes.

Concrete file/model/API touchpoints:
- `lib/content/types.ts`
- `lib/validation/schemas.ts`
- `lib/directus/schema.ts`
- `app/blog/page.tsx` and post template rendering

Acceptance criteria:
- New content type validates and renders correctly.
- Archive/index/category navigation includes the new type.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Add/update unit schema tests.

Risks and edge cases:
- Sensitivity and framing correctness.
- Editorial/legal review requirements.

Kickoff prompt for agent:
- "Add a schema-safe stereotypy-focused content type/category and integrate it into rendering + filters."

### [ ] habitat review

Goal:
- Add a standardized habitat-review block per relevant post.

Why it matters:
- Creates consistent, comparable welfare reporting across entries.

Current repo baseline:
- No habitat review schema in content model.

Implementation approach:
- Define optional `habitatReview` structure with scored dimensions + narrative notes.
- Render as a compact scorecard in posts when present.
- Keep optional to avoid breaking existing content.

Concrete file/model/API touchpoints:
- `lib/content/types.ts` (new optional interface).
- `lib/validation/schemas.ts` (Zod schema extension).
- `lib/directus/schema.ts` and mapper in `lib/directus/queries.ts`.
- `app/blog/[...segments]/page.tsx` (render section).

Acceptance criteria:
- Existing posts still render unchanged without this block.
- Posts with review render deterministic, styled summary.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Add/update schema tests.

Risks and edge cases:
- Subjective scoring consistency.
- Backfill burden for old content.

Kickoff prompt for agent:
- "Implement an optional `habitatReview` content block across types, schemas, and post rendering."

## Cross-Cutting API, Type, and Model Proposals

- Add tag route contract: `/blog/tag/[tag]`.
- Add view counter API contract: `POST/GET /api/views`.
- Add comment API contract: `GET/POST /api/comments` with moderation state.
- Add optional post content blocks for `habitatReview` and stereotypy-focused analysis.
- Add CLI contract for editorial question pack generation.

## Implementation Dependencies

- Contact UI can ship independently and should go first.
- TOC and image overlay depend only on post-render UI files and can run in parallel.
- Tags route should land before any advanced category/content-type expansion.
- Comments and views both require Prisma schema changes and should be sequenced to avoid migration conflicts.
- Habitat review and stereotypy content-type changes should be batched with schema/test updates.

## Definition of Done (Per Item)

An item can move from `[ ]` to `[x]` only when:

- Implementation is complete.
- Validation has been run (`typecheck`, `lint`, and relevant tests/manual checks).
- Related docs are updated.
- No known blocking defects remain for the feature's intended scope.

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
- Add user-facing contact UI and send admin notification emails for each valid submission.

Why it matters:
- Contact API already exists and is currently underused without a frontend entrypoint.
- Notifications remove the need for a full admin panel in early stages.

Current repo baseline:
- API route exists at `app/api/contact/route.ts`.
- Validation schema exists at `lib/validation/schemas.ts` (`contactPayloadSchema`).
- `CONTACT_EMAIL` env var exists in `.env.example`.
- No visible contact form route/component in current pages.
- No outbound email transport is configured.

Implementation approach:
- Build a reusable `ContactForm` client component and place it on `/contact` or in `/about`.
- Mirror Zod constraints client-side for early feedback.
- Provide clear submit states: idle, submitting, success, error.
- Include accessible inline validation errors and success confirmation.
- Save to DB first, then attempt notification email send.
- Use Cloudflare + Mailgun setup:
  - Cloudflare: DNS host and optional Email Routing (forwarding only).
  - Mailgun: outbound send API and optional inbound routes.

Step-by-step implementation (Cloudflare + Mailgun, migrating from Porkbun):
1. In Cloudflare, add the domain and import current DNS records from Porkbun before changing nameservers.
2. Audit imported records and ensure all existing site/email records are present before continuing (`A`/`AAAA`, `CNAME`, `MX`, SPF/DKIM/DMARC TXT, provider verification TXT, `CAA` if used).
3. Decide mail domain split:
   - Keep regular inbox aliases on root domain (Cloudflare Email Routing, optional).
   - Use `mg.torontozooreport.com` for Mailgun sending and optional inbound handling.
4. In Mailgun, add domain `mg.torontozooreport.com`.
5. In Cloudflare DNS, add Mailgun-provided records for `mg.torontozooreport.com`:
   - SPF TXT
   - DKIM TXT/CNAME
   - MX records
   - tracking CNAME (if enabled)
6. Keep email-related DNS records `DNS only` (not proxied), including `MX`, SPF/DKIM/DMARC TXT, and Mailgun tracking host.
7. Wait for Mailgun domain verification to reach active status.
8. Create Mailgun API key with send permission.
9. Set env vars locally and in production secrets:
   - `MAILGUN_API_KEY`
   - `MAILGUN_DOMAIN`
   - `MAILGUN_FROM`
   - `CONTACT_EMAIL`
   - `MAILGUN_WEBHOOK_SIGNING_KEY` (only if using inbound/webhooks)
   - Example values:
     - `MAILGUN_DOMAIN=mg.torontozooreport.com`
     - `MAILGUN_FROM=Toronto Zoo Report <noreply@mg.torontozooreport.com>`
     - `CONTACT_EMAIL=contact@torontozooreport.com`
10. Add a small send helper that calls Mailgun `/messages` API.
11. Update contact API flow in `app/api/contact/route.ts`:
   - validate payload
   - write `ContactSubmission` row
   - call Mailgun helper
   - return `ok: true` even if email fails, with `notificationSent` flag
12. Log email failures server-side without exposing provider errors to end users.
13. If inbound/forwarding is needed:
   - Do not configure both Cloudflare and Mailgun as inbound handlers for the same hostname.
   - Keep one handler per hostname to avoid routing conflicts.
14. After DNS records are verified in Cloudflare, switch nameservers at Porkbun to Cloudflare nameservers.
15. Verify post-cutover DNS resolution and email flow (`dig NS`, `dig MX`, `dig TXT`, Mailgun domain status, end-to-end send test).
16. Add a docs runbook for key rotation, DNS checks, and provider outage behavior.
17. Add anti-spam controls (honeypot + simple IP/email cooldown) before public launch.

Step-by-step DNS migration (Porkbun -> Cloudflare):
1. Add domain to Cloudflare and let Cloudflare import existing DNS records from Porkbun.
2. Before nameserver cutover, perform a full DNS record audit and ensure these records exist in Cloudflare:
   - `A`/`AAAA` for site origin(s)
   - `CNAME` aliases
   - `MX` records
   - `TXT` records for SPF/DKIM/DMARC and provider verification
   - `CAA` records if currently used
3. For email-related records in Cloudflare (`MX`, SPF/DKIM/DMARC TXT, Mailgun tracking host), keep them `DNS only` (not proxied).
4. Add/verify Mailgun records on `mg.torontozooreport.com` in Cloudflare exactly as provided by Mailgun.
5. Lower TTL on critical records before cutover when possible to reduce rollback delay.
6. Switch nameservers at Porkbun to Cloudflare-assigned nameservers.
7. Wait for propagation, then verify DNS resolution:
   - `dig NS torontozooreport.com`
   - `dig MX torontozooreport.com`
   - `dig TXT torontozooreport.com`
   - `dig TXT mg.torontozooreport.com`
   - `dig MX mg.torontozooreport.com`
8. Verify Mailgun domain status is active after propagation.
9. Send end-to-end test email from app contact flow and from Mailgun dashboard/API.
10. Keep Porkbun DNS snapshot/export as rollback reference for at least one week.
11. If inbound mail forwarding is required, confirm only one inbound handler per hostname:
   - root domain handled by Cloudflare Email Routing, and
   - `mg.torontozooreport.com` handled by Mailgun routes.
12. Document final DNS ownership and operational runbook in `docs/ops.md`.

Rollback plan for DNS migration:
1. Revert nameservers at Porkbun back to previous provider if cutover causes critical outage.
2. Restore last-known-good DNS records from pre-cutover snapshot.
3. Re-run verification commands and pause feature rollout until DNS stability is confirmed.

Concrete file/model/API touchpoints:
- `app/contact/page.tsx` (new) or `app/about/page.tsx` (extend).
- `components/ContactForm.tsx` (new).
- `app/api/contact/route.ts` (extend to trigger notification after DB save).
- `lib/notifications/mailgun.ts` (new helper for outbound email).
- `.env.example` (document `MAILGUN_*` vars).
- `docs/ops.md` (provider setup and key rotation notes).
- `app/globals.css` for form layout and error styles.

Acceptance criteria:
- Valid submission returns success and creates a `ContactSubmission` row.
- Invalid values are blocked with field-level messages.
- Loading state prevents duplicate submissions.
- If Mailgun is configured, admin email is delivered to `CONTACT_EMAIL`.
- If Mailgun is down/misconfigured, DB save still succeeds and API returns controlled response.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Manual submit test with valid/invalid payloads.
- API smoke test:
  - `curl -s -X POST http://localhost:3000/api/contact -H 'content-type: application/json' -d '{"name":"Test User","email":"test@example.com","company":"QA","message":"Contact flow notification test message."}'`
- Confirm DB write:
  - `docker compose exec postgres psql -U zoo -d zoo_blog -c 'SELECT email,message,\"createdAt\" FROM \"ContactSubmission\" ORDER BY \"createdAt\" DESC LIMIT 5;'`
- Confirm notification event in Mailgun logs/events.
- DNS migration validation:
  - `dig NS torontozooreport.com`
  - `dig MX torontozooreport.com`
  - `dig TXT torontozooreport.com`
  - `dig TXT mg.torontozooreport.com`
  - `dig MX mg.torontozooreport.com`
- Confirm Cloudflare DNS dashboard shows all required records and email records are `DNS only`.

Risks and edge cases:
- Spam submissions (future: honeypot or simple rate limit).
- DB unavailable path should show useful user-facing error.
- DNS misconfiguration can silently break delivery.
- Provider throttling or temporary outage can delay notifications.

Kickoff prompt for agent:
- "Implement contact UI plus Mailgun admin-notification flow (DB save first, non-blocking email send), using Cloudflare DNS for domain verification."

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

Step-by-step implementation:
1. Define a `TOCItem` shape (`id`, `label`, `level`) in a new component-local type.
2. Add stable IDs for intro and preservation sections in `app/blog/[...segments]/page.tsx`.
3. Build TOC entries from:
   - intro section,
   - each animal section (`section.id`),
   - preservation lens section.
4. Create `components/PostTableOfContents.tsx` with:
   - semantic `<nav aria-label="Table of contents">`,
   - list of hash links,
   - visible active/focus styles.
5. Render TOC in post layout near header with mobile-first stacking and desktop sticky behavior.
6. Add CSS offset strategy:
   - `scroll-margin-top` on headings,
   - account for header height and responsive breakpoints.
7. Add fallback behavior:
   - hide TOC entirely if fewer than 2 target sections.
8. Add regression checks:
   - no duplicate IDs,
   - no broken hash links on canonical and redirected routes.

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

Step-by-step implementation:
1. Add tag normalization helpers:
   - `toTagSlug(tag: string)`,
   - `fromTagSlug(slug: string)` (best-effort match).
2. Extend query layer in `lib/directus/queries.ts` with:
   - `getPostsByTag(tagSlug: string)`,
   - `getAllTagsWithCounts()`.
3. Create route `app/blog/tag/[tag]/page.tsx` with metadata + canonical URL.
4. Update `TagPill` to render a `Link` variant when `href` is provided.
5. Update `PostCard` and post header/tag sections to route tags to `/blog/tag/<slug>`.
6. Add empty-state behavior for unknown tags:
   - either 404 or explicit empty list (pick one and keep consistent).
7. Add sidebar enhancement (optional):
   - top tags list with counts.
8. Add tests for slug normalization, route rendering, and unknown-tag behavior.

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

Step-by-step implementation:
1. Build `components/ImageLightbox.tsx` as a client component with:
   - `isOpen`,
   - active image index,
   - close/open callbacks.
2. Wrap each `AnimalSection` photo in an interactive trigger (`button` semantics, not raw div click).
3. Implement accessibility primitives:
   - focus trap while open,
   - ESC to close,
   - restore focus to trigger on close.
4. Add optional previous/next keyboard navigation for multi-image sections.
5. Add body scroll lock while overlay is open.
6. Apply motion rules:
   - transform/opacity animation by default,
   - reduced-motion fallback disables transitions.
7. Add caption and alt text in overlay to preserve context.
8. Validate across desktop/mobile and reduced-motion settings.

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

Step-by-step implementation:
1. Add typed social config to `lib/site.ts`:
   - platform key,
   - profile URL,
   - visibility toggle.
2. Add icon map component (inline SVG or small icon set) with accessible labels.
3. Render social links in `SiteFooter` using config iteration.
4. Optionally expose a compact version in `SiteHeader` mobile nav.
5. Ensure all external links use `target="_blank" rel="noopener noreferrer"`.
6. Add fallback behavior:
   - if no social URLs configured, hide social block cleanly.
7. Add visual regression check for footer/header spacing at mobile and desktop widths.

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

Step-by-step implementation:
1. Create `scripts/editorial/generate-zookeeper-questions.ts`.
2. Add argument parsing for:
   - `--species`,
   - `--focus`,
   - `--date`,
   - `--output` (optional).
3. Build question template modules:
   - core baseline questions,
   - species-specific add-ons,
   - follow-up probes by focus.
4. Generate deterministic markdown output with fixed section order.
5. Write to `docs/editorial/questions/<YYYY-MM-DD>/<species>.md` by default.
6. Add npm script (`questions:generate`) in `package.json`.
7. Add short usage runbook and sample output in docs.
8. Add error handling for unknown species/focus and invalid dates.

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

Step-by-step implementation:
1. Add Prisma model `PostView` with:
   - `slug` unique key,
   - `count`,
   - `lastViewedAt`.
2. Add migration and regenerate Prisma client.
3. Add `lib/validation/schemas.ts` payload schemas for view read/increment.
4. Create `app/api/views/route.ts`:
   - `GET` by slug,
   - `POST` increment by slug.
5. Add basic dedupe/rate limits:
   - cookie or session cooldown,
   - optional IP-based throttle.
6. Fetch count in post page and render near reading time/author metadata.
7. Add client-only increment trigger that avoids duplicate increments from strict mode rerenders.
8. Add tests for increment behavior and invalid payload handling.

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

Step-by-step implementation:
1. Add Prisma `Comment` model:
   - `id`, `postSlug`, `name`, `message`, `status`, `createdAt`, `updatedAt`.
2. Add migration and regenerate Prisma client.
3. Add comment schemas in `lib/validation/schemas.ts`.
4. Build `app/api/comments/route.ts`:
   - `GET` approved comments by slug,
   - `POST` creates pending comment.
5. Add UI components:
   - `CommentForm` (client),
   - `CommentList` (server/client depending on data strategy).
6. Add anti-spam protections:
   - honeypot field,
   - lightweight rate limiting.
7. Add minimal moderation workflow:
   - SQL/admin script for approving pending comments until admin UI exists.
8. Add tests for create/list and moderation visibility rules.

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

Step-by-step implementation:
1. Create `docs/editorial-editing.md` with a strict publish checklist.
2. Define pre-edit checks:
   - backup/record current post payload,
   - verify target slug/date canonical route.
3. Define edit path:
   - Directus field updates,
   - required schema fields and common pitfalls.
4. Define validation steps:
   - local preview,
   - schema/type checks,
   - URL and metadata checks.
5. Define cache revalidation steps using `/api/revalidate`.
6. Define rollback procedure:
   - revert content in Directus,
   - revalidate affected tags/routes.
7. Add "done" checklist for editor signoff.

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

### [ ] dynamic opengraph preview images
- generate share cards from post metadata

Progress note (2026-03-02):
- Implemented `app/opengraph-image.tsx` and `app/blog/opengraph-image/[...segments]/route.tsx` with branded `ImageResponse` cards plus fallback rendering for invalid/missing post contexts.
- Updated metadata wiring in `app/layout.tsx` and `app/blog/[...segments]/page.tsx` to use dynamic OG image URLs for homepage, archive pages, and canonical post pages, including Twitter summary-large-image metadata.
- Updated blog post OG card composition to use each post's hero image as the background with only title + Toronto Zoo Report logo treatment.
- Fixed OG runtime compatibility by falling back to `/media/opengraph-image-resized.jpg` when post hero sources use unsupported `next/og` formats (for example `.webp`), and removed `zIndex` styles that triggered unitless-value rendering warnings in `ImageResponse`.
- Hardened canonical post metadata for fixed Toronto Zoo OG cards by adding publish-date fallback matching, so 2026-02-28 and 2026-03-01 posts still resolve to static OG files even if slug data varies.
- Locked homepage social copy to:
  - Title: `Toronto Zoo Report: animal updates and keeper talks`
  - Description: `Explore the blog for animal updates, keeper-talk summaries, and conservation context from on-site visits to the Toronto Zoo.`
- Added dedicated manual image build spec at `docs/reusable/prompts/og/homepage-og-image-generation-spec.md`, and switched homepage metadata image source to static `/media/opengraph-image-resized.jpg`.
- Local verification completed: `npm run typecheck`, `npm run lint`, and `npm run build` all pass.
- Remaining before checking `[x]`: manual OG URL fetch check in a running server and external social debugger checks against a deployed URL.

Goal:
- Generate dynamic Open Graph images for posts and archive pages so shared links have consistent, branded previews.

Why it matters:
- Improves click-through and visual consistency when links are shared on social platforms and messaging apps.
- Removes dependency on manually curated hero-image framing for social previews.

Current repo baseline:
- Metadata is generated in `app/blog/[...segments]/page.tsx`.
- Post Open Graph images currently point to `post.hero.src`.
- No dynamic OG image generation route currently exists.

Implementation approach:
- Use Next.js OG image generation (`ImageResponse`) to render dynamic preview cards.
- Add per-route OG image handler for blog post/date archive segments.
- Keep fallback behavior for missing or invalid post data.

Step-by-step implementation:
1. Add `app/blog/opengraph-image/[...segments]/route.tsx` with `ImageResponse`.
2. Resolve segment type (post/year/month/day) similarly to the page route parser.
3. Fetch post or archive context using existing query helpers.
4. Render branded OG card containing:
   - site label,
   - post/archive title,
   - publish date for post pages,
   - optional tag/category chips,
   - simplified background/hero accent.
5. Add a robust fallback card for missing content (title + site brand only).
6. Update `generateMetadata` in `app/blog/[...segments]/page.tsx` to point `openGraph.images` to the dynamic OG route URL.
7. Add optional base OG route for non-blog pages (`app/opengraph-image.tsx`) for consistency.
8. Ensure fonts and assets used by OG renderer are available in the runtime environment.
9. Add caching strategy (`revalidate`) so OG images update with content changes but do not regenerate on every request.
10. Verify social parsers can fetch the OG route publicly.

Concrete file/model/API touchpoints:
- `app/blog/opengraph-image/[...segments]/route.tsx` (new).
- `app/blog/[...segments]/page.tsx` (metadata image URL changes).
- `app/opengraph-image.tsx` (optional default route).
- `lib/site.ts` (absolute URL helpers if needed for OG links).
- `app/globals.css` is not used by `ImageResponse`; style must be embedded in renderer component.

Acceptance criteria:
- Every canonical blog post URL resolves to a dynamic OG image URL.
- Archive pages (year/month/day) also resolve to valid OG previews.
- Shared links display branded preview cards with readable titles.
- Missing content falls back to a safe default OG image instead of broken previews.

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Open generated OG URL directly in browser:
  - `http://localhost:3000/blog/opengraph-image/2026/3/1/<slug>`
- Validate response headers include image content type.
- Run social debugger checks (for production URL):
  - Facebook Sharing Debugger
  - X Card Validator (or equivalent link preview check)

Risks and edge cases:
- OG rendering can fail if unsupported fonts/assets are referenced.
- Large image complexity can increase render time.
- Social platform cache staleness can delay new preview visibility.

Kickoff prompt for agent:
- "Implement dynamic OG image generation for blog segments using `ImageResponse`, wire metadata to the new route, and add fallback rendering for missing content."

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

Step-by-step implementation:
1. Create a wrapper script in `scripts/ops/` that orchestrates existing media scripts.
2. Add flags for:
   - source path/date,
   - dry run,
   - output log directory.
3. Standardize output directories under `test-artifacts/` or `docs/toronto-zoo/<date>/`.
4. Ensure command exits non-zero on any failed substep.
5. Add retry-safe behavior:
   - idempotent output writes,
   - skip already-generated artifacts unless forced.
6. Add VPS run instructions to `docs/ops.md`.
7. Add scheduling guidance (cron/systemd timer) after manual flow is stable.

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

Step-by-step implementation:
1. Decide category key (recommended: `welfare-watch`).
2. Update type unions in `lib/content/types.ts` and `lib/directus/schema.ts`.
3. Extend Zod validators in `lib/validation/schemas.ts`.
4. Update index/post rendering to support the new category label and filters.
5. Add editorial rubric in docs:
   - observable behavior only,
   - avoid causal claims without evidence.
6. Add seed/test content entry and verify rendering path.
7. Add unit tests for new category validation and fallback behavior.

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

Step-by-step implementation:
1. Define `HabitatReview` interface:
   - dimensions (`enrichment`, `spaceUse`, `climateSupport`, `socialManagement`, `visitorImpact`),
   - optional freeform notes.
2. Add optional `habitatReview` to post type/schema/directus mappings.
3. Build `HabitatReviewCard` component for compact rendering.
4. Insert card in post template below section summaries or preservation lens.
5. Add neutral scoring descriptors (not absolute verdict language).
6. Add tests to ensure posts without `habitatReview` remain unchanged.
7. Add one sample post entry for manual QA.

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

### [ ] newsletter feature (low priority)
- Mailgun subscribe + auto weekly digest from weekly posts

Goal:
- Add a lightweight newsletter system for subscriber capture and automatically generated weekly updates from that week's posts.

Why it matters:
- Provides a direct audience channel without building a full admin dashboard first.
- Reuses Mailgun setup from the contact-notification work.

Current repo baseline:
- No newsletter subscriber model, routes, or UI currently exist.
- `CONTACT_EMAIL` exists, but no newsletter-specific env/config keys yet.
- No background job or campaign send workflow exists.

Implementation approach:
- Phase 1 (MVP): subscriber capture + double opt-in + unsubscribe.
- Phase 2: auto-generate weekly digest content from posts published during the target week.
- Phase 3: schedule automatic weekly sends (with manual override and preview option).
- Keep local subscriber state in Postgres and use Mailgun as delivery layer.
- Reuse Cloudflare DNS + Mailgun domain (`mg.torontozooreport.com`).

Step-by-step implementation:
1. Add newsletter env vars:
   - `MAILGUN_API_KEY`
   - `MAILGUN_DOMAIN`
   - `MAILGUN_FROM`
   - `NEWSLETTER_LIST_ADDRESS` (if using Mailgun mailing list)
   - `NEWSLETTER_CONFIRM_BASE_URL`
2. Add Prisma model `NewsletterSubscriber` with:
   - `id`, `email` (unique), `status` (`pending|active|unsubscribed`),
   - `confirmToken`, `unsubscribeToken`, `createdAt`, `updatedAt`.
3. Add Zod schemas for subscribe/confirm/unsubscribe payloads.
4. Build `POST /api/newsletter/subscribe`:
   - validate email,
   - upsert subscriber as `pending`,
   - generate/rotate confirmation token,
   - send confirmation email via Mailgun.
5. Build `GET /api/newsletter/confirm?token=...`:
   - validate token,
   - mark subscriber as `active`,
   - send welcome/confirmation success response page.
6. Build `POST /api/newsletter/unsubscribe` (token or signed link):
   - mark subscriber `unsubscribed`,
   - return safe confirmation response.
7. Add `NewsletterSignup` UI component:
   - place in footer and/or blog sidebar,
   - include consent copy and success/error states.
8. Add low-risk anti-abuse controls:
   - hidden honeypot field,
   - per-IP cooldown on subscribe endpoint.
9. Add weekly digest generator script:
   - compute week window (recommended: previous Monday 00:00 through Sunday 23:59, site timezone),
   - fetch posts for that window from existing content query layer,
   - build digest sections (headline, top stories, short summaries, canonical links),
   - generate plain-text + HTML output.
10. Add weekly send script:
   - consume generated digest artifact,
   - send only to `active` subscribers,
   - include unsubscribe link for each recipient.
11. Add scheduler for full automation:
   - run generator + sender weekly (e.g., Monday morning),
   - persist job result (`week`, `status`, `sentCount`, `failedCount`) to avoid duplicate sends.
12. Add manual override commands:
   - preview-only,
   - regenerate for specific week,
   - resend internal test only.
13. Add operational docs:
   - key rotation,
   - weekly send checklist and approval flow,
   - weekly generation rules and timezone definition,
   - double opt-in behavior,
   - unsubscribe compliance handling.

Concrete file/model/API touchpoints:
- `prisma/schema.prisma` (new `NewsletterSubscriber` model).
- `lib/validation/schemas.ts` (newsletter schemas).
- `app/api/newsletter/subscribe/route.ts` (new).
- `app/api/newsletter/confirm/route.ts` (new).
- `app/api/newsletter/unsubscribe/route.ts` (new).
- `components/NewsletterSignup.tsx` (new).
- `components/SiteFooter.tsx` and/or `components/BlogSidebar.tsx` (placement).
- `lib/notifications/mailgun.ts` (reuse/extend for newsletter sends).
- `scripts/newsletter/generate-weekly-digest.ts` (new).
- `scripts/newsletter/send-weekly-digest.ts` (new).
- `scripts/ops/` scheduler wrapper or systemd/cron entry docs.
- `.env.example` (newsletter env vars).
- `docs/ops.md` (runbook and compliance notes).

Acceptance criteria:
- New subscriber receives confirmation email and is not active until confirmed.
- Confirmed subscriber status becomes `active`.
- Unsubscribe link sets status to `unsubscribed`.
- Duplicate subscribe attempts for existing active users do not create duplicate rows.
- Weekly digest content is generated automatically from posts published in the defined week window.
- Weekly send targets only `active` subscribers and includes unsubscribe links.
- Weekly automation is idempotent per week (no accidental duplicate campaigns).

Validation checklist:
- `npm run typecheck`
- `npm run lint`
- Subscribe endpoint test:
  - `curl -s -X POST http://localhost:3000/api/newsletter/subscribe -H 'content-type: application/json' -d '{"email":"newsletter-test@example.com"}'`
- Confirm DB state:
  - `docker compose exec postgres psql -U zoo -d zoo_blog -c 'SELECT email,status,\"createdAt\" FROM \"NewsletterSubscriber\" ORDER BY \"createdAt\" DESC LIMIT 10;'`
- Confirm Mailgun event logs for confirmation email delivery.
- Confirm unsubscribe flow via tokened link.
- Run one weekly-digest test send to internal test addresses before public rollout.
- Run generator for a known week and verify included post links/titles match blog data exactly.

Risks and edge cases:
- Compliance requirements (double opt-in, unsubscribe visibility, retention rules).
- Mail deliverability issues from misconfigured SPF/DKIM/DMARC.
- Abuse from bot signups if anti-spam is weak.
- Large sends should be batched/throttled to avoid provider rate limits.
- Timezone/week-boundary mistakes can include wrong posts in digest.
- Automation without idempotency can duplicate sends.

Kickoff prompt for agent:
- "Implement low-priority weekly newsletter with Mailgun: double opt-in subscribers, auto-generate digest from that week's posts, schedule weekly send, and keep resend-safe idempotency."

## Cross-Cutting API, Type, and Model Proposals

- Add tag route contract: `/blog/tag/[tag]`.
- Add view counter API contract: `POST/GET /api/views`.
- Add comment API contract: `GET/POST /api/comments` with moderation state.
- Add optional post content blocks for `habitatReview` and stereotypy-focused analysis.
- Add CLI contract for editorial question pack generation.
- Add newsletter contracts: `POST /api/newsletter/subscribe`, `GET /api/newsletter/confirm`, `POST /api/newsletter/unsubscribe`.
- Add dynamic OG image contract for blog routes (file-based `opengraph-image.tsx` with `ImageResponse`).

## Implementation Dependencies

- Contact UI can ship independently and should go first.
- TOC and image overlay depend only on post-render UI files and can run in parallel.
- Tags route should land before any advanced category/content-type expansion.
- Comments and views both require Prisma schema changes and should be sequenced to avoid migration conflicts.
- Dynamic OG previews depend on stable metadata fields and should ship before broader social/distribution pushes.
- Habitat review and stereotypy content-type changes should be batched with schema/test updates.
- Newsletter depends on Mailgun sender setup from contact flow plus stable post-query access for weekly digest generation and should remain low-priority until contact notifications are stable.

## Definition of Done (Per Item)

An item can move from `[ ]` to `[x]` only when:

- Implementation is complete.
- Validation has been run (`typecheck`, `lint`, and relevant tests/manual checks).
- Related docs are updated.
- No known blocking defects remain for the feature's intended scope.

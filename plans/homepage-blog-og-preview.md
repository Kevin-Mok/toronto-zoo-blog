# ExecPlan: Homepage and Blog OG Preview Improvements

## Objective

Improve social link previews for the homepage and blog routes by introducing explicit Open Graph images and richer metadata for both Open Graph and Twitter cards.

## Plan

- [x] Review existing metadata and identify minimal safe touchpoints.
- [x] Add a branded homepage OG image route at `app/opengraph-image.tsx`.
- [x] Add dynamic blog segment OG image route at `app/blog/opengraph-image/[...segments]/route.tsx` with post and archive variants.
- [x] Wire root and blog metadata to use the new OG image routes, including Twitter card metadata.
- [x] Validate with `npm run typecheck` and `npm run lint`.
- [x] Update review notes and TODO status implications.

## Review Notes

- Added `app/opengraph-image.tsx` to generate a branded homepage OG card (1200x630 PNG).
- Added `app/blog/opengraph-image/[...segments]/route.tsx` to generate dynamic blog OG cards for post, year, month, and day routes with fallback behavior.
- Updated post-card rendering in the blog OG route to use `post.hero` as the visual background with only post title and Toronto Zoo Report logo.
- Updated `app/layout.tsx` metadata with default homepage OG image and Twitter `summary_large_image` card configuration.
- Updated `app/blog/[...segments]/page.tsx` metadata so archive and post routes point to dynamic OG image URLs and include Twitter metadata.
- Validation results:
  - `npm run typecheck`: pass
  - `npm run lint`: pass
  - `npm run build`: pass
- TODO implication:
  - `docs/TODO.md` dynamic OG item remains unchecked because external social debugger validation still needs to be run against a deployed URL.

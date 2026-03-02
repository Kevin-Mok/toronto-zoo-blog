# ExecPlan: Blog Preview Hero Shot

## Objective

Show each blog preview card's most visually stunning shot directly under the excerpt, and update reusable blog post prompts so future posts explicitly select a standout hero image for previews.

## Plan

- [x] Add hero image block to `PostCard` under excerpt.
- [x] Add CSS for preview image presentation in cards.
- [x] Update reusable prompt docs to require standout still-image hero selection for preview cards.
- [x] Run verification commands (`typecheck`, unit, integration, targeted e2e).
- [x] Record results and review notes.

## Review Notes

- Implemented shared `PostCard` preview image using the existing `post.hero` source, rendered in a fixed 16:9 frame.
- Enforced uniform preview heights with landscape framing and `object-fit: cover`, including portrait fallback via cropping.
- Updated reusable prompt docs to require selecting a standout still hero image and keeping hero output landscape-oriented (or using a landscape crop derivative).
- Verification results:
  - `npm run typecheck`: pass
  - `npm run test:unit`: pass
  - `npm run test:integration`: pass
  - `npm run test:e2e -- tests/e2e/blog.spec.ts`: fail (existing heading expectation mismatch in `tests/e2e/blog.spec.ts`, looking for `/conservation storytelling/i` which does not exist in current home page copy)

# Purpose

Provide a reusable prompt that takes a source media folder + publish date and creates a **real, site-rendered blog post** in this repository.

Unlike draft-only prompts, this one must:

1. Generate web-ready media assets in `public/media/...`
2. Add a new post entry in `lib/content/local-seed.ts`
3. Keep existing posts intact
4. Update tests and run verification commands

---

# Required Inputs

- `{{SOURCE_FOLDER_PATH}}` absolute source folder (images/videos/audio)
- `{{TARGET_POST_DATE}}` in `YYYY-MM-DD`
- `{{TARGET_POST_SLUG}}` kebab-case slug
- `{{TARGET_POST_TITLE}}` full title

## Optional Inputs

- `{{TARGET_AUTHOR_NAME=Toronto Zoo Blog Team}}`
- `{{TARGET_SPECIES_COUNT_DEFAULT=3}}`
- `{{REFERENCE_STYLE_URL=http://localhost:3001/blog/2026/2/28/toronto-zoo-field-notes-snow-leopard-polar-bear-and-gibbon-highlights-february-28-2026}}`
- `{{CANONICAL_SPELLINGS_OPTIONAL}}`

---

# Repo Targets (must update)

- `public/media/toronto-zoo/{{TARGET_POST_DATE}}/images/*`
- `public/media/toronto-zoo/{{TARGET_POST_DATE}}/videos/*`
- `lib/content/local-seed.ts`
- `tests/integration/content-provider.test.ts` (add/adjust canonical route assertion for new post)
- Any other tests that become invalid after adding the post

Do not create a docs-only result. The result must be an actual post available at:

- `/blog/YYYY/M/D/{{TARGET_POST_SLUG}}`

---

# Reuse Constraints (from existing prompt docs)

1. Family-first, educational, conservation-grounded tone
2. Factual, non-hyped writing
3. Structure:
   - Intro with exactly 2 paragraphs
   - `TARGET_SPECIES_COUNT_DEFAULT` species sections unless evidence suggests otherwise
   - Each species section has exactly 2 paragraphs
   - Exactly 2 photos per species section
   - Up to 1 video per species section (only when suitable source exists)
   - Preservation Lens with exactly 2 paragraphs
4. Every selected asset must include:
   - Source filename traceability
   - Alt text
   - Caption
5. Hero selection for previews:
   - Choose one still image as `hero` that is the most visually stunning shot for the post.
   - Hero output must be landscape-oriented for preview cards.
   - If the strongest still is portrait, generate a landscape crop derivative and use that as hero.
6. Never fabricate transcript quotes

---

# Single Mega Prompt (Copy/Paste)

```text
You are a coding agent working directly inside /home/kevin/coding/zoo-blog.

Goal:
- Publish a new live blog post on the site from source media.
- Do NOT output only markdown drafts; make real repo changes.

Inputs:
- SOURCE_FOLDER_PATH: {{SOURCE_FOLDER_PATH}}
- TARGET_POST_DATE: {{TARGET_POST_DATE}}
- TARGET_POST_SLUG: {{TARGET_POST_SLUG}}
- TARGET_POST_TITLE: {{TARGET_POST_TITLE}}
- TARGET_AUTHOR_NAME: {{TARGET_AUTHOR_NAME=Toronto Zoo Blog Team}}
- TARGET_SPECIES_COUNT_DEFAULT: {{TARGET_SPECIES_COUNT_DEFAULT=3}}
- REFERENCE_STYLE_URL: {{REFERENCE_STYLE_URL=http://localhost:3001/blog/2026/2/28/toronto-zoo-field-notes-snow-leopard-polar-bear-and-gibbon-highlights-february-28-2026}}
- CANONICAL_SPELLINGS_OPTIONAL: {{CANONICAL_SPELLINGS_OPTIONAL}}

Hard requirements:
1) Preserve existing posts:
   - Never replace or delete unrelated LOCAL_POSTS entries.
   - Append a new post entry unless explicitly told to overwrite.
2) Slug safety:
   - If TARGET_POST_SLUG already exists on a different date, derive a unique slug by appending date text.
3) Media generation:
   - Create folder:
     public/media/toronto-zoo/{{TARGET_POST_DATE}}/{images,videos}
   - Convert selected photos to .webp.
   - Re-encode selected videos to mp4 using:
     ffmpeg -c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac
   - Generate poster .webp frames for selected videos.
   - Capture width/height and duration values via identify/ffprobe for seed data.
4) Content model update:
   - Add a new BlogPost object in lib/content/local-seed.ts with:
     id, slug, title, excerpt, publishDate, authorName, category, tags, readingMinutes, hero, intro, sections, preservationLens.
   - Section shape must match existing schema/types exactly.
   - `hero` must point to the selected standout still image for preview cards and be landscape-oriented (crop derivative allowed).
5) Tests:
   - Update/add tests so canonical date+slug route for the new post is verified.
   - Keep old post assertions valid unless user requested migration.
6) Validation:
   - Run:
     npm run typecheck
     npm run test:unit
     npm run test:integration
   - Report pass/fail.

Style/content constraints:
1) Family-first, educational, conservation-aware, concise.
2) Intro = exactly 2 paragraphs.
3) Each section = exactly 2 paragraphs.
4) Each section = exactly 2 photos.
5) Optional one video per section if suitable footage exists.
6) Include source-filename traceability in your own working notes.
7) No fabricated transcript quotes.
8) If CANONICAL_SPELLINGS_OPTIONAL is provided, enforce those spellings.
9) Pick the most visually stunning still image as `hero` for previews.
10) Keep hero landscape; if needed, create a landscape crop from a portrait still.

Source handling rules:
1) Inspect files by extension (.jpg/.jpeg/.heic/.mov/.mp4/.m4a).
2) Infer likely species/topic clusters from filenames and visual checks.
3) Prefer concrete evidence over guessing; mark uncertainty explicitly.

Execution order:
1) Analyze source folder and select media set.
2) Select the standout still image hero for preview cards and ensure landscape output.
3) Generate assets under public/media/toronto-zoo/{{TARGET_POST_DATE}}.
4) Update local-seed.ts with new post object.
5) Update tests tied to canonical routing/content assumptions.
6) Run verification commands.
7) Return changed files + canonical URL + test results.

Final response format:
- CHANGES MADE
- NEW CANONICAL URL
- TEST RESULTS
- NOTES (uncertainties, if any)
```

---

# Quality Gate Checklist

- [ ] New post is visible through canonical route format `/blog/YYYY/M/D/slug`
- [ ] Existing posts still exist
- [ ] Intro has exactly 2 paragraphs
- [ ] Preservation Lens has exactly 2 paragraphs
- [ ] Each species section has exactly 2 paragraphs
- [ ] Each species section has exactly 2 photos
- [ ] Video included only when suitable
- [ ] All selected assets map to real source filenames
- [ ] Every selected asset has alt text and caption
- [ ] Hero uses the most visually stunning still image and is landscape-oriented (or landscape crop derivative)
- [ ] No fabricated transcript quotes
- [ ] `npm run typecheck` passes
- [ ] `npm run test:unit` passes
- [ ] `npm run test:integration` passes

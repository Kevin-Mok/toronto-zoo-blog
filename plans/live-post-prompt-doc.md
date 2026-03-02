# ExecPlan: Reusable Live Post Prompt Doc

## Checklist

- [x] Create a reusable prompt doc that publishes a post to the site (not just draft docs)
- [x] Reuse relevant style and quality constraints from existing field-notes prompt docs
- [x] Include explicit repo file targets, media generation rules, and validation commands
- [x] Verify doc clarity and hand off usage notes

## Review

Added `docs/toronto-zoo/templates/publish-live-post-from-source-prompt.md`, a reusable publish-to-site prompt that:
- accepts source folder + date + slug + title inputs
- requires real repo edits (media generation + `local-seed.ts` update + tests)
- preserves existing posts and enforces slug-safety
- carries over style and quality constraints from existing field-notes prompt docs

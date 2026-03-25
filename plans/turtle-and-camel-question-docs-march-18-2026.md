# ExecPlan: Turtle And Camel Question Docs March 18, 2026

## Checklist

- [x] Review repo instructions, Toronto Zoo doc patterns, and relevant TODO scope.
- [x] Research Nile soft-shelled turtle and Bactrian camel habitat, substrate, enrichment, and stereotypy context from reliable sources.
- [x] Add March 18 Toronto Zoo question docs for Nile soft-shelled turtle and Bactrian camel.
- [x] Review the diff and record validation notes.

## Review

- Added two compact Toronto Zoo field docs under `docs/toronto-zoo/2026-03-18/`: one for Nile soft-shelled turtle and one for Bactrian camel.
- Each doc keeps the scope tight: five blog-relevant keeper questions, a self-guided habitat/substrate/enrichment observation checklist, a stereotypy watch section, and source notes.
- Used Toronto Zoo animal and enrichment pages for exhibit-relevant baseline context, then added one external welfare-oriented source per species area to sharpen the enrichment or stereotypy prompts.
- No relevant unchecked `docs/TODO.md` item directly matched this doc-only request, so none was folded into the change.

Validation:
- Reviewed all three new files with `sed`.
- Ran `git diff --no-index --check /dev/null <file>` for each new file. `git diff --no-index` exits `1` for any new file by design; there was no whitespace-error output.

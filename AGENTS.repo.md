# AGENTS.repo.md

Repository-specific strict additions for `/home/kevin/coding/zoo-blog`.

These rules add constraints on top of `AGENTS.md` and do not relax any baseline requirement.

## Required TODO Review On Every Change

- Before starting any task that changes the repository (code, docs, tests, configs, scripts), read `/home/kevin/coding/zoo-blog/docs/TODO.md`.
- Check whether any unchecked TODO item is directly relevant to the current task.
- If a relevant TODO item can be completed safely within the current scope, include it in the same change.
- If a relevant TODO item is not included, explicitly state why it was deferred in your final summary.

## Required TODO Checkbox Maintenance

- Keep `/home/kevin/coding/zoo-blog/docs/TODO.md` as a checkbox-driven list for trackable feature status.
- When a TODO feature is fully implemented and verified, update its checkbox from `[ ]` to `[x]` in the same change.
- If work is only partial, leave the checkbox as `[ ]` and add a short progress note under that item.
- Do not mark `[x]` unless implementation is complete and validation has been run.

## Scope Discipline

- Apply only TODO items that are relevant to the active task.
- Do not force unrelated TODO implementation into focused bug fixes.
- Keep diffs minimal and aligned to the active request while still honoring relevant TODO opportunities.

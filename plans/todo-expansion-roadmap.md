# ExecPlan: Expand docs/TODO.md Into Implementation-Ready Roadmap

## Checklist

- [x] Read current TODO sources (`todo.md` and `docs/TODO.md`) and repo constraints (`AGENTS.md`, `AGENTS.repo.md`).
- [x] Replace `docs/TODO.md` with a prioritized roadmap (`Now`, `Next`, `Later`).
- [x] Expand each TODO entry with concrete implementation details, file touchpoints, acceptance criteria, and kickoff prompt.
- [x] Preserve checkbox-driven tracking for feature completion.
- [x] Verify that every `todo.md` item is represented in `docs/TODO.md`.

## Review

`docs/TODO.md` now contains a detailed, execution-ready implementation roadmap for all current backlog items, including:

- goal and rationale per feature
- current baseline in this repository
- implementation paths and exact file/model/API entrypoints
- acceptance and validation checklists
- risks/edge cases
- kickoff prompts to hand a single TODO item to another agent

No feature checkboxes were marked complete because this change is planning/documentation only.

# Docs Directory Guide

This directory uses a simple split:

- Root `docs/*.md`: stable, reusable project docs and runbooks.
- `docs/reusable/`: reusable prompt/template packs.
- `docs/toronto-zoo/`: Toronto Zoo content workspace.
- `docs/archive/`: historical one-off run outputs.

## Keep Stable Paths

- `docs/TODO.md` stays at root (tracked by repo agent rules).
- `docs/toronto-zoo/<YYYY-MM-DD>/transcripts` stays unchanged (used by scripts).

## Toronto Zoo Conventions

- Date folders: `docs/toronto-zoo/<YYYY-MM-DD>/`
- Reusable templates: `docs/toronto-zoo/templates/`

## Where To Put New Files

- Reusable operational docs: root `docs/`
- Reusable prompt docs: `docs/reusable/prompts/<topic>/`
- One-time prompt responses/artifacts: `docs/archive/<topic>/`
- Visit-specific notes/transcripts: `docs/toronto-zoo/<YYYY-MM-DD>/`

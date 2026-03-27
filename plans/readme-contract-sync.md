# ExecPlan: README Contract Sync

## Objective

Bring the root `README.md` into alignment with the repository's README gate so it accurately documents bootstrap, day-to-day use, documented command options, repo-grounded tech stack rationale, and recruiter-facing value.

## Assumptions

1. The existing unstaged README bootstrap edits are part of the intended final state and should be preserved.
2. This task is limited to README synchronization plus the required ExecPlan record.
3. No behavior changes are needed; the work is documentation-only.

## Checklist

- [x] Review the current README contract, root README, and repo evidence for scripts, services, and architecture.
- [x] Update the root `README.md` to cover install/bootstrap, day-to-day use, command options, tech stack rationale, and recruiter-facing value.
- [x] Reorder the README so recruiter value and stack rationale appear before setup-heavy sections.
- [x] Document the post view counter and `/api/views` behavior now present in the repo.
- [x] Re-read the final README and confirm it satisfies the gate without inventing unsupported commands or flags.

## Review

- Added explicit bootstrap guidance for `.env`, local Postgres port publishing, and Prisma migration flow.
- Added day-to-day operator guidance for local work, media scripts, Playwright logs, and Lighthouse logs, including the supported passthrough patterns already used in the repo.
- Expanded the documented VPS bootstrap script section with verified options from local `--help` output and matched the service list to `docker-compose.yml`.
- Moved recruiter-facing value and "Tech Stack And Why Chosen" ahead of setup content so the README passes the hierarchy gate.
- Added the post view counter and `/api/views` interfaces to the public architecture coverage so README claims match the current app behavior.

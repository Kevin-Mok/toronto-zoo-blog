# ExecPlan: VPS Bootstrap Script

## Objective
Create a one-command VPS bootstrap workflow for this repository that handles:
- Ubuntu prep and firewall rules
- Docker Engine + Compose installation
- Host Nginx reverse proxy configuration
- Production config patching for domain/secrets
- Certbot certificate issuance via nginx plugin
- Stack startup and basic verification output

## Steps
- [x] Add `scripts/ops/bootstrap-vps.sh`
- [x] Document usage in `README.md`
- [x] Document usage in `docs/deploy-porkbun-ubuntu-vps.md`
- [x] Validate script syntax and help output

## Review
- Added a single bootstrap script that configures Ubuntu dependencies, Docker/Compose, UFW, host Nginx site config, domain/secrets in compose, Certbot nginx issuance, and stack startup.
- Updated compose to expose `web` on `127.0.0.1:3000` for host-nginx proxying and removed in-stack proxy service.
- Updated quick-start and deployment docs from Caddy flow to Nginx flow.
- Added automatic app-port collision avoidance: compose now maps `web` to `127.0.0.1:${APP_HOST_PORT:-3001}:3000`, script auto-picks a free port (or accepts `--app-port`), persists it in `.env`, and writes matching nginx proxy config.
- Validated with:
  - `bash -n scripts/ops/bootstrap-vps.sh`
  - `scripts/ops/bootstrap-vps.sh --help`
  - `docker compose config`

# Operations

## Local Docker Stack

```bash
docker compose up -d --build
```

Services:

- `postgres` for Prisma operational writes.
- `directus` for CMS content authoring.
- `web` for Next.js SSR app.
- Host `nginx` for reverse proxy and TLS termination.
- `backup` for daily compressed Postgres dumps.

## Backups

- Backup loop script: `scripts/ops/backup-loop.sh`
- Writes `*.sql.gz` to docker volume `backups`.
- Retention window: 14 days.

## Health and Recovery

- Postgres healthcheck via `pg_isready`.
- Rollback path: redeploy previous image tag and restore latest SQL dump.
- Cache invalidation: `POST /api/revalidate` with secret token.

## DNS Monitoring

- DNS provider watch script: `scripts/ops/watch-dns-provider.sh`
- Default target domain: `torontozooreport.com`
- Default refresh interval: every 5 seconds

```bash
chmod +x scripts/ops/watch-dns-provider.sh
scripts/ops/watch-dns-provider.sh
```

Run a single check without watch loop:

```bash
scripts/ops/watch-dns-provider.sh --once
```

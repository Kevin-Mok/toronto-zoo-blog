#!/usr/bin/env bash
set -euo pipefail

REQUIRED_SERVICES=(postgres directus web backup)
CHECK_RETRIES="${CHECK_RETRIES:-20}"
CHECK_DELAY_SECONDS="${CHECK_DELAY_SECONDS:-2}"

failures=0

pass() {
  echo "PASS: $1"
}

fail() {
  echo "FAIL: $1"
  failures=$((failures + 1))
}

retry_check() {
  local label="$1"
  shift

  local attempt=1
  while (( attempt <= CHECK_RETRIES )); do
    if "$@" >/dev/null 2>&1; then
      pass "${label}"
      return 0
    fi

    if (( attempt < CHECK_RETRIES )); then
      sleep "${CHECK_DELAY_SECONDS}"
    fi
    attempt=$((attempt + 1))
  done

  fail "${label}"
  return 1
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

check_required_services_running() {
  local running
  running="$(docker compose ps --services --status running || true)"

  local service
  for service in "${REQUIRED_SERVICES[@]}"; do
    if grep -Fxq "${service}" <<<"${running}"; then
      pass "service '${service}' is running"
    else
      fail "service '${service}' is running"
    fi
  done
}

check_postgres_ready() {
  docker compose exec -T postgres pg_isready -U zoo -d zoo_blog
}

check_directus_health() {
  docker compose exec -T directus node -e "fetch('http://127.0.0.1:8055/server/health').then(async (r) => { const body = await r.json().catch(() => ({})); process.exit(r.ok && body.status === 'ok' ? 0 : 1); }).catch(() => process.exit(1));"
}

check_web_health() {
  docker compose exec -T web node -e "const hosts=[process.env.HOSTNAME,'127.0.0.1','localhost'].filter(Boolean);(async()=>{for(const h of hosts){try{const r=await fetch('http://'+h+':3000');if(r.ok){process.exit(0)}}catch{}}process.exit(1)})()"
}

check_backup_artifacts() {
  docker compose exec -T backup sh -lc "ls -1 /backups/*.sql.gz >/dev/null 2>&1"
}

main() {
  require_command docker

  echo "Running Docker compose health checks..."
  check_required_services_running

  retry_check "postgres accepts connections" check_postgres_ready
  retry_check "directus health endpoint responds OK" check_directus_health
  retry_check "web root endpoint responds OK" check_web_health
  retry_check "backup artifacts exist in /backups" check_backup_artifacts

  if (( failures > 0 )); then
    echo "Health check completed with ${failures} failure(s)."
    exit 1
  fi

  echo "Health check completed successfully."
}

main "$@"

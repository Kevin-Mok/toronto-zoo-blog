#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="/backups"
mkdir -p "${BACKUP_DIR}"

while true; do
  timestamp="$(date +%Y-%m-%d-%H-%M-%S)"
  file="${BACKUP_DIR}/zoo-blog-${timestamp}.sql.gz"
  pg_dump -h postgres -U zoo zoo_blog | gzip > "${file}"
  echo "Created backup ${file}"
  find "${BACKUP_DIR}" -type f -name '*.sql.gz' -mtime +14 -delete
  sleep 86400
done

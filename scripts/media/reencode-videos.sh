#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/kevin/coding/zoo-blog/public/media/toronto-zoo/2026-02-28/videos"
TMP_DIR="${ROOT}/.tmp"
mkdir -p "${TMP_DIR}"

for video in "${ROOT}"/*.mp4; do
  [ -f "${video}" ] || continue
  base_name="$(basename "${video}")"
  out_path="${TMP_DIR}/${base_name}"

  ffmpeg -y -i "${video}" \
    -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p \
    -crf 18 -preset slow \
    -c:a aac -b:a 192k -movflags +faststart \
    "${out_path}"

  mv "${out_path}" "${video}"
  echo "Re-encoded ${base_name}"
done

rmdir "${TMP_DIR}" 2>/dev/null || true

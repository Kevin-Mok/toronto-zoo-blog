#!/usr/bin/env bash
set -euo pipefail

VIDEO_DIR="/home/kevin/coding/zoo-blog/public/media/toronto-zoo/2026-02-28/videos"
IMAGE_DIR="/home/kevin/coding/zoo-blog/public/media/toronto-zoo/2026-02-28/images"

mkdir -p "${IMAGE_DIR}"

for video in "${VIDEO_DIR}"/*-highlight.mp4; do
  [ -f "${video}" ] || continue
  base_name="$(basename "${video}" .mp4)"
  poster_name="${base_name/-highlight/-video-poster}.webp"

  ffmpeg -y -i "${video}" -ss 00:00:01.000 -vframes 1 -vf "scale=1080:1080:force_original_aspect_ratio=increase,crop=1080:1080" "${IMAGE_DIR}/${poster_name}"
  echo "Generated ${poster_name}"
done

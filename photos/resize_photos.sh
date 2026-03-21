#!/usr/bin/env bash
# Resize original photos → full (1600px) + thumb (480px) versions
# Usage: bash photos/resize_photos.sh
# Requires: magick (ImageMagick), jpegoptim

set -euo pipefail

GALLERY_DIR="photos/static/gallery"
FULL_DIR="$GALLERY_DIR/full"
THUMB_DIR="$GALLERY_DIR/thumb"

mkdir -p "$FULL_DIR" "$THUMB_DIR"

for src in "$GALLERY_DIR"/*.jpg; do
  [ -f "$src" ] || continue
  name="$(basename "$src")"

  # Full version (1600px max dimension)
  if [ ! -f "$FULL_DIR/$name" ]; then
    echo "Creating full: $name"
    magick "$src" -resize '1600x1600>' -quality 80 -strip -interlace Plane "$FULL_DIR/$name"
    jpegoptim --strip-all --max=80 "$FULL_DIR/$name" 2>/dev/null || true
  fi

  # Thumb version (480px max dimension)
  if [ ! -f "$THUMB_DIR/$name" ]; then
    echo "Creating thumb: $name"
    magick "$src" -resize '480x480>' -quality 60 -strip -interlace Plane "$THUMB_DIR/$name"
    jpegoptim --strip-all --max=60 "$THUMB_DIR/$name" 2>/dev/null || true
  fi
done

echo "Done. Full: $(ls "$FULL_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ') | Thumb: $(ls "$THUMB_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ')"

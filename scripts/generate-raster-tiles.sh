#!/usr/bin/env bash
# Map-6 — Generate XYZ raster tiles from a source map image (when available)
# Requires: gdal2tiles.py (GDAL)
#
# Usage:
#   ./scripts/generate-raster-tiles.sh path/to/leonida-map.png

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <map-image.png>"
  echo "Example: $0 assets/leonida-map.png"
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INPUT="$1"
OUTPUT_DIR="$ROOT/public/tiles/raster"

if ! command -v gdal2tiles.py &>/dev/null && ! command -v gdal2tiles &>/dev/null; then
  echo "❌ GDAL not found. Install: brew install gdal"
  exit 1
fi

GDAL2TILES=$(command -v gdal2tiles.py || command -v gdal2tiles)

mkdir -p "$OUTPUT_DIR"

echo "🗺️  Generating raster tiles from $INPUT"

$GDAL2TILES -z 0-6 -w none --xyz "$INPUT" "$OUTPUT_DIR"

echo "✅ Tiles in $OUTPUT_DIR"
echo ""
echo "Set in .env.local:"
echo "  NEXT_PUBLIC_RASTER_TILES_URL=/tiles/raster/{z}/{x}/{y}.png"

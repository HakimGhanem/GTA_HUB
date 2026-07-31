#!/usr/bin/env bash
# Map-6 — Generate PMTiles from GeoJSON regions + location POIs
# Requires: tippecanoe (https://github.com/felt/tippecanoe)
#
# Usage:
#   ./scripts/generate-pmtiles.sh
#   ./scripts/generate-pmtiles.sh path/to/custom.geojson

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INPUT="${1:-$ROOT/data/regions.geojson}"
OUTPUT_DIR="$ROOT/public/tiles"
OUTPUT="$OUTPUT_DIR/leonida.pmtiles"

mkdir -p "$OUTPUT_DIR"

if ! command -v tippecanoe &>/dev/null; then
  echo "❌ tippecanoe not found. Install: brew install tippecanoe"
  exit 1
fi

if [[ ! -f "$INPUT" ]]; then
  echo "❌ Input not found: $INPUT"
  exit 1
fi

echo "🗺️  Map-6 PMTiles generation"
echo "   Input:  $INPUT"
echo "   Output: $OUTPUT"

tippecanoe \
  -o "$OUTPUT" \
  -Z0 -z10 \
  --drop-densest-as-needed \
  --extend-zooms-if-still-dropping \
  --generate-ids \
  --layer=regions \
  --name="GTA 6 Map" \
  --attribution="Map-6" \
  --force \
  "$INPUT"

echo "✅ Done: $(du -h "$OUTPUT" | cut -f1)"
echo ""
echo "Set in .env.local:"
echo "  NEXT_PUBLIC_PMTILES_URL=/tiles/leonida.pmtiles"

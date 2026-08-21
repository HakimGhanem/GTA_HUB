#!/usr/bin/env bash
# Map-6 — Fetch GTADB GTA V satellite tiles + landmarks (CC BY 4.0)
# https://github.com/rolux/gtadb.org
#
# Usage:
#   npm run tiles:fetch-gtadb-gta5
#   npm run tiles:fetch-gtadb-gta5 -- radar

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CACHE="$ROOT/.cache/gtadb.org"
TILE_SET="${1:-satellite}"
GTADB_URL="https://github.com/rolux/gtadb.org.git"
TILE_SRC="maps/tiles/5/${TILE_SET}"
DATA_SRC="map/data/5"
PUBLIC_TILES="$ROOT/public/tiles/gtadb/5/${TILE_SET}"
PUBLIC_DATA="$ROOT/data/gtadb-gta5"

echo "=========================================="
echo "Map-6 — Fetch GTADB GTA V tiles"
echo "=========================================="
echo "   Tile set: ${TILE_SET}"
echo ""

if ! command -v git &>/dev/null; then
  echo "git is required"
  exit 1
fi

if [[ -d "$CACHE/.git" ]]; then
  echo "Updating existing clone…"
  git -C "$CACHE" fetch --depth=1 origin main
  git -C "$CACHE" checkout main
  git -C "$CACHE" pull --ff-only origin main 2>/dev/null || true
else
  echo "Sparse-cloning gtadb.org (GTA V tiles + landmarks only)…"
  mkdir -p "$(dirname "$CACHE")"
  git clone --filter=blob:none --sparse --depth=1 "$GTADB_URL" "$CACHE"
fi

echo "Sparse-checkout add: ${TILE_SRC} + ${DATA_SRC}"
if git -C "$CACHE" sparse-checkout add "$TILE_SRC" "$DATA_SRC" 2>/dev/null; then
  :
else
  git -C "$CACHE" sparse-checkout set "$TILE_SRC" "$DATA_SRC"
fi

if [[ ! -d "$CACHE/$TILE_SRC" ]]; then
  echo "Tile set not found: $CACHE/$TILE_SRC"
  echo "   Available: satellite | hybrid | terrain | roadmap | radar"
  exit 1
fi

echo "Copying tiles → public/tiles/gtadb/5/…"
rm -rf "$ROOT/public/tiles/gtadb/5/${TILE_SET}"
mkdir -p "$PUBLIC_TILES"
cp -R "$CACHE/$TILE_SRC/." "$PUBLIC_TILES/"

mkdir -p "$PUBLIC_DATA"
if [[ -f "$CACHE/$DATA_SRC/landmarks.json" ]]; then
  cp "$CACHE/$DATA_SRC/landmarks.json" "$PUBLIC_DATA/landmarks.json"
  echo "Landmarks copied → data/gtadb-gta5/landmarks.json"
fi

echo "Stitching max-zoom tiles for MapLibre fallback…"
VENV="$ROOT/.cache/venv"
if [[ ! -d "$VENV" ]]; then
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install -q Pillow
elif ! "$VENV/bin/python3" -c "import PIL" 2>/dev/null; then
  "$VENV/bin/pip" install -q Pillow
fi

if command -v python3 &>/dev/null; then
  "$VENV/bin/python3" "$ROOT/scripts/stitch-gtadb-tiles.py" \
    "$PUBLIC_TILES" \
    "$ROOT/public/tiles/los-santos-stitched.jpg" \
    "$TILE_SET" \
    "$ROOT/public/tiles/gtadb-gta5-manifest.json" \
    "/tiles/los-santos-stitched.jpg"
else
  echo "python3 not found — skip stitch"
fi

echo "Configuring .env.local…"
node "$ROOT/scripts/configure-gtadb-gta5-env.mjs" "$TILE_SET"

if [[ -f "$PUBLIC_DATA/landmarks.json" ]]; then
  echo "Importing GTA V POIs…"
  node "$ROOT/scripts/import-gtadb-gta5-poi.mjs" || echo "POI import skipped (non-fatal)"
fi

echo ""
echo "GTADB GTA V fetch complete."
echo ""
echo "Next:"
echo "  npm run dev"
echo "  open http://localhost:3000/map?game=gta5"
echo ""
echo "Attribution required:"
echo "  GTA V map tiles © GTADB.ORG and contributors — CC BY 4.0"
echo "  https://gtadb.org"

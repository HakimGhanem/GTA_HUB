#!/usr/bin/env bash
# Map-6 — Fetch GTADB map tiles + landmarks (CC BY 4.0)
# https://github.com/rolux/gtadb.org
#
# Usage:
#   npm run tiles:fetch-gtadb
#   npm run tiles:fetch-gtadb -- dupzor,51

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CACHE="$ROOT/.cache/gtadb.org"
TILE_SET="${1:-yanis,13}"
GTADB_URL="https://github.com/rolux/gtadb.org.git"
TILE_SRC="maps/tiles/6/${TILE_SET}"
DATA_SRC="map/data/6"
PUBLIC_TILES="$ROOT/public/tiles/gtadb/6/${TILE_SET}"
PUBLIC_DATA="$ROOT/data/gtadb"

echo "=========================================="
echo "🗺️  Map-6 — Fetch GTADB tiles"
echo "=========================================="
echo "   Tile set: ${TILE_SET}"
echo ""

if ! command -v git &>/dev/null; then
  echo "❌ git is required"
  exit 1
fi

if [[ -d "$CACHE/.git" ]]; then
  echo "📥 Updating existing clone…"
  git -C "$CACHE" fetch --depth=1 origin main
  git -C "$CACHE" checkout main
  git -C "$CACHE" pull --ff-only origin main 2>/dev/null || true
else
  echo "📥 Sparse-cloning gtadb.org (tiles + landmarks only)…"
  mkdir -p "$(dirname "$CACHE")"
  git clone --filter=blob:none --sparse --depth=1 "$GTADB_URL" "$CACHE"
fi

echo "📂 Sparse-checkout: ${TILE_SRC} + ${DATA_SRC}"
git -C "$CACHE" sparse-checkout set "$TILE_SRC" "$DATA_SRC"

if [[ ! -d "$CACHE/$TILE_SRC" ]]; then
  echo "❌ Tile set not found: $CACHE/$TILE_SRC"
  echo "   Available sets: yanis,13 | dupzor,51 | martipk,5 | rickrick,3"
  exit 1
fi

echo "📋 Copying tiles → public/tiles/gtadb/…"
rm -rf "$ROOT/public/tiles/gtadb"
mkdir -p "$PUBLIC_TILES"
cp -R "$CACHE/$TILE_SRC/." "$PUBLIC_TILES/"

mkdir -p "$PUBLIC_DATA"
if [[ -f "$CACHE/$DATA_SRC/landmarks.json" ]]; then
  cp "$CACHE/$DATA_SRC/landmarks.json" "$PUBLIC_DATA/landmarks.json"
  echo "📍 Landmarks copied → data/gtadb/landmarks.json"
fi

echo "🧩 Stitching zoom-6 tiles for MapLibre…"
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
    "$ROOT/public/tiles/leonida-stitched.jpg" \
    "$TILE_SET"
else
  echo "⚠️  python3 not found — skip stitch"
fi

echo "⚙️  Configuring .env.local…"
node "$ROOT/scripts/configure-gtadb-env.mjs" "$TILE_SET"

if [[ -f "$PUBLIC_DATA/landmarks.json" ]]; then
  echo "📍 Importing GTADB POIs…"
  node "$ROOT/scripts/import-gtadb-poi.mjs" || echo "⚠️  POI import skipped (non-fatal)"
fi

echo ""
echo "✅ GTADB fetch complete!"
echo ""
echo "Next steps:"
echo "  1. npm run dev"
echo "  2. Open http://localhost:3000/map"
echo "  3. Add attribution in footer (CC BY 4.0 — GTADB)"
echo ""
echo "Attribution required:"
echo "  Map tiles © GTADB / GTA VI Mapping Community — CC BY 4.0"
echo "  https://gtadb.org"

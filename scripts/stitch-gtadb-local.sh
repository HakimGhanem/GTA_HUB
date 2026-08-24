#!/usr/bin/env bash
# Re-stitch GTADB tiles already in public/tiles/gtadb/ (no git clone).
# Usage: npm run tiles:stitch-gtadb

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENV="$ROOT/.cache/venv"

if [[ ! -d "$VENV" ]]; then
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install -q Pillow
elif ! "$VENV/bin/python3" -c "import PIL" 2>/dev/null; then
  "$VENV/bin/pip" install -q Pillow
fi

GTA6_SET="${1:-yanis,13}"
GTA5_SET="${2:-satellite}"

echo "Stitching GTA VI ($GTA6_SET)…"
"$VENV/bin/python3" "$ROOT/scripts/stitch-gtadb-tiles.py" \
  "$ROOT/public/tiles/gtadb/6/$GTA6_SET" \
  "$ROOT/public/tiles/leonida-stitched.jpg" \
  "$GTA6_SET" \
  "$ROOT/public/tiles/gtadb-manifest.json" \
  "/tiles/leonida-stitched.jpg"

echo "Stitching GTA V ($GTA5_SET)…"
"$VENV/bin/python3" "$ROOT/scripts/stitch-gtadb-tiles.py" \
  "$ROOT/public/tiles/gtadb/5/$GTA5_SET" \
  "$ROOT/public/tiles/los-santos-stitched.jpg" \
  "$GTA5_SET" \
  "$ROOT/public/tiles/gtadb-gta5-manifest.json" \
  "/tiles/los-santos-stitched.jpg"

echo "Done. leonida-stitched.jpg + los-santos-stitched.jpg updated."

#!/usr/bin/env bash
# Fetch classic GTA basemap images (MIT / community attribution)
# - Vice City: huncrys/vcmp-livemap (MIT) → upscaled vc-map.png
# - San Andreas: stitch SAMAP sat.3 tiles → hi-res sa-map.png
#
# Usage: npm run tiles:fetch-classic

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/tiles"
mkdir -p "$OUT"
export OUT

VC_URL="https://raw.githubusercontent.com/huncrys/vcmp-livemap/master/static/map.png"
VENV="$ROOT/.cache/venv"

echo "=========================================="
echo "Map-6 — Fetch classic map images"
echo "=========================================="

if [[ ! -d "$VENV" ]]; then
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install -q Pillow
elif ! "$VENV/bin/python3" -c "import PIL" 2>/dev/null; then
  "$VENV/bin/pip" install -q Pillow
fi

echo "Downloading Vice City map (vcmp-livemap MIT)…"
curl -fsSL "$VC_URL" -o "$OUT/vc-map-src.png"
echo "Upscaling VC map 1024→2048 (LANCZOS) for sharper mid-zoom…"
"$VENV/bin/python3" - <<PY
from PIL import Image
from pathlib import Path
out = Path("$OUT")
src = Image.open(out / "vc-map-src.png").convert("RGB")
hi = src.resize((2048, 2048), Image.Resampling.LANCZOS)
hi.save(out / "vc-map.png", optimize=True)
print(f"  → {out / 'vc-map.png'} {hi.size}")
PY

echo "Stitching San Andreas sat.3 tiles (SAMAP)…"
"$VENV/bin/python3" "$ROOT/scripts/stitch-samap-sat.py"

ENV_FILE="$ROOT/.env.local"
touch "$ENV_FILE"
if ! grep -q 'NEXT_PUBLIC_VC_MAP_IMAGE' "$ENV_FILE" 2>/dev/null; then
  cat >> "$ENV_FILE" <<'EOF'

# Classic maps (npm run tiles:fetch-classic)
NEXT_PUBLIC_VC_MAP_IMAGE=/tiles/vc-map.png
NEXT_PUBLIC_SA_MAP_IMAGE=/tiles/sa-map.png
EOF
  echo "Appended VC/SA image env to .env.local"
else
  echo ".env.local already has NEXT_PUBLIC_VC_MAP_IMAGE — left unchanged"
fi

echo ""
echo "Done. Restart next / redeploy. Open ?game=vc / ?game=sa"
echo "Attribution: VC © Kristóf Bach (MIT) · SA sat tiles SAMAP / Charles Blackwood"

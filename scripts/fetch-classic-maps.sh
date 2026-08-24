#!/usr/bin/env bash
# Fetch classic GTA basemap images (MIT / community attribution)
# - Vice City: huncrys/vcmp-livemap (MIT) → public/tiles/vc-map.png
# - San Andreas: DeAardbolMan/SAMAP map.png → public/tiles/sa-map.png
#
# Usage: npm run tiles:fetch-classic

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/tiles"
mkdir -p "$OUT"

VC_URL="https://raw.githubusercontent.com/huncrys/vcmp-livemap/master/static/map.png"
SA_URL="https://raw.githubusercontent.com/DeAardbolMan/SAMAP/master/images/tiles/map.png"

echo "=========================================="
echo "Map-6 — Fetch classic map images"
echo "=========================================="

echo "Downloading Vice City map (vcmp-livemap MIT)…"
curl -fsSL "$VC_URL" -o "$OUT/vc-map.png"
echo "  → $OUT/vc-map.png ($(wc -c < "$OUT/vc-map.png") bytes)"

echo "Downloading San Andreas map (SAMAP / Charles Blackwood)…"
curl -fsSL "$SA_URL" -o "$OUT/sa-map.png"
echo "  → $OUT/sa-map.png ($(wc -c < "$OUT/sa-map.png") bytes)"

# Ensure .env.local hints (do not overwrite secrets)
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
echo "Done. Restart next dev and open ?game=vc / ?game=sa"
echo "Attribution: VC © Kristóf Bach (MIT) · SA map via SAMAP (Charles Blackwood)"

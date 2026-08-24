#!/usr/bin/env bash
# Fetch / refresh all game basemaps + import POI data.
# Usage: npm run tiles:fetch-all
#
# Requires: git, curl, python3 (Pillow installed via venv in sub-scripts)

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "=========================================="
echo "Map-6 — Fetch all game maps + POIs"
echo "=========================================="

npm run tiles:fetch-gtadb
npm run tiles:fetch-gtadb-gta5
npm run tiles:fetch-classic

echo ""
echo "Importing POI datasets…"
npm run pois:import-classic
npm run pois:import-vc
npm run pois:import-gta5-world

echo ""
echo "All maps + POIs ready."
echo "  ?game=gta6  Leonida (GTADB)"
echo "  ?game=gta5  Los Santos (GTADB)"
echo "  ?game=vc    Vice City"
echo "  ?game=sa    San Andreas"

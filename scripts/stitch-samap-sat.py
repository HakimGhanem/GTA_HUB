#!/usr/bin/env python3
"""Stitch SAMAP sat.z tiles into a single high-res SA basemap PNG."""

from __future__ import annotations

import sys
import urllib.request
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow required: pip install Pillow", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "tiles" / "sa-map.png"
CACHE = ROOT / ".cache" / "samap-sat"
ZOOM = 3
# SAMAP sat.3 uses x=0..7, y=0..7
N = 8
BASE = "https://raw.githubusercontent.com/DeAardbolMan/SAMAP/master/images/tiles"


def fetch(z: int, x: int, y: int) -> Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    name = f"sat.{z}.{x}.{y}.png"
    dest = CACHE / name
    if dest.exists() and dest.stat().st_size > 1000:
        return dest
    url = f"{BASE}/{name}"
    print(f"  GET {name}")
    urllib.request.urlretrieve(url, dest)
    return dest


def main() -> None:
    print(f"Stitching SAMAP sat.{ZOOM} ({N}×{N}) → {OUT}")
    tiles = []
    for y in range(N):
        row = []
        for x in range(N):
            path = fetch(ZOOM, x, y)
            row.append(Image.open(path).convert("RGB"))
        tiles.append(row)

    tw, th = tiles[0][0].size
    canvas = Image.new("RGB", (tw * N, th * N))
    for y, row in enumerate(tiles):
        for x, im in enumerate(row):
            canvas.paste(im, (x * tw, y * th))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, optimize=True)
    print(f"Wrote {OUT} ({canvas.size[0]}×{canvas.size[1]})")


if __name__ == "__main__":
    main()

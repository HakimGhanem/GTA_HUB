#!/usr/bin/env python3
"""Stitch GTADB tiles at max zoom into a MapLibre-compatible JPEG (max 8192px)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("❌ Pillow required: pip3 install Pillow")
    sys.exit(1)

# From rolux/gtadb.org maps/maps.js — tileSetRanges
TILE_RANGES: dict[str, dict[int, list[list[int]]]] = {
    "yanis,13": {6: [[0, 34], [155, 190]]},
    "yanis,12": {6: [[1, 34], [155, 190]]},
    "dupzor,51": {6: [[1, 34], [155, 188]]},
}

MAP_W = 32768
MAP_H = 32768
ZERO_X = 16384
ZERO_Y = 16384
TILE_SIZE = 256
MAX_Z = 6
# WebGL max texture size on most GPUs
MAX_TEXTURE_PX = 8192


def pixel_to_game(px: float, py: float, z: int) -> tuple[float, float]:
    map_size = 1024 * (2**z)
    mppx = map_size / MAP_W
    game_x = px / mppx - ZERO_X
    game_y = ZERO_Y - py / mppx
    return round(game_x, 3), round(game_y, 3)


def downscale(img: Image.Image, max_px: int) -> Image.Image:
    w, h = img.size
    if w <= max_px and h <= max_px:
        return img
    scale = min(max_px / w, max_px / h)
    new_size = (max(1, int(w * scale)), max(1, int(h * scale)))
    print(f"   Downscaling {w}×{h} → {new_size[0]}×{new_size[1]} (WebGL limit)")
    return img.resize(new_size, Image.Resampling.LANCZOS)


def stitch(tile_dir: Path, output: Path, tile_set: str) -> None:
    ranges = TILE_RANGES.get(tile_set) or TILE_RANGES["yanis,13"]
    [[x0, y0], [x1, y1]] = ranges[MAX_Z]
    cols = x1 - x0 + 1
    rows = y1 - y0 + 1
    width = cols * TILE_SIZE
    height = rows * TILE_SIZE

    print(f"   Grid: {cols}×{rows} tiles → {width}×{height}px")

    canvas = Image.new("RGB", (width, height), (10, 14, 23))
    missing = 0

    for ty in range(y0, y1 + 1):
        for tx in range(x0, x1 + 1):
            tile_path = tile_dir / str(MAX_Z) / f"{MAX_Z},{ty},{tx}.jpg"
            if not tile_path.exists():
                missing += 1
                continue
            tile = Image.open(tile_path)
            canvas.paste(tile, ((tx - x0) * TILE_SIZE, (ty - y0) * TILE_SIZE))

    output.parent.mkdir(parents=True, exist_ok=True)

    preview = downscale(canvas, MAX_TEXTURE_PX)
    preview.save(output, "JPEG", quality=85, optimize=True)
    print(f"   Saved: {output} ({output.stat().st_size // 1024} KB, {missing} missing tiles)")

    tl_x, tl_y = pixel_to_game(x0 * TILE_SIZE, y0 * TILE_SIZE, MAX_Z)
    br_x, br_y = pixel_to_game((x1 + 1) * TILE_SIZE, (y1 + 1) * TILE_SIZE, MAX_Z)

    manifest = {
        "source": "gtadb.org",
        "license": "CC BY 4.0",
        "attribution": "Map tiles © GTADB / GTA VI Mapping Community — CC BY 4.0",
        "attributionUrl": "https://gtadb.org",
        "tileSet": tile_set,
        "imageUrl": "/tiles/leonida-stitched.jpg",
        "bounds": {
            "minX": min(tl_x, br_x),
            "maxX": max(tl_x, br_x),
            "minY": min(tl_y, br_y),
            "maxY": max(tl_y, br_y),
        },
        "center": {
            "x": round((min(tl_x, br_x) + max(tl_x, br_x)) / 2, 3),
            "y": round((min(tl_y, br_y) + max(tl_y, br_y)) / 2, 3),
        },
        "maxZoom": MAX_Z,
    }

    manifest_path = output.parent / "gtadb-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"   Manifest: {manifest_path}")


def main() -> None:
    if len(sys.argv) < 4:
        print("Usage: stitch-gtadb-tiles.py <tile_dir> <output.jpg> <tile_set>")
        sys.exit(1)
    stitch(Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3])


if __name__ == "__main__":
    main()

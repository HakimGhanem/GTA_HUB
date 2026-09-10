import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * Footprint of assets/og/basemap-leonida.jpg, a downscale of
 * public/tiles/leonida-stitched.jpg. Bounds mirror public/tiles/gtadb-manifest.json
 * and are hardcoded because the image is baked at those bounds — unlike MAP_BOUNDS,
 * which is env-driven and differs between local and prod.
 */
const BASEMAP = {
  file: "basemap-leonida.jpg",
  width: 2543,
  height: 2560,
  minX: -16384,
  maxX: 3584,
  minY: -8064,
  maxY: 12032,
} as const;

const SPAN_X = BASEMAP.maxX - BASEMAP.minX;
const SPAN_Y = BASEMAP.maxY - BASEMAP.minY;

/**
 * Usable part of the basemap. The stitched map is a poster: it carries a
 * legend panel and contributor thumbnails in the empty west, plus a grid-label
 * gutter along its edges. Every view stays inside this box so none of that
 * furniture reaches the frame.
 */
const CONTENT = { minX: -9800, maxX: 2750, minY: -7650, maxY: 8500 } as const;

/** Horizontal game units covered by a location crop — roughly 30% of Leonida. */
const LOCATION_VIEW_WIDTH = 6000;

/** Wider, less specific framing for editorial pages with no single coordinate. */
export const EDITORIAL_FOCUS = { x: -1800, y: 900, viewWidth: 11000 } as const;

type OgAssets = {
  /** Base64 data URI: Satori reads <img src> synchronously. */
  basemap: string;
  regular: Buffer;
  bold: Buffer;
};

let assets: Promise<OgAssets> | undefined;

function assetPath(file: string) {
  return join(process.cwd(), "assets/og", file);
}

export function loadOgAssets(): Promise<OgAssets> {
  assets ??= (async () => {
    const [basemap, regular, bold] = await Promise.all([
      readFile(assetPath(BASEMAP.file), "base64"),
      readFile(assetPath("Geist-Regular.ttf")),
      readFile(assetPath("Geist-Bold.ttf")),
    ]);
    return { basemap: `data:image/jpeg;base64,${basemap}`, regular, bold };
  })();
  return assets;
}

/** Absolute placement of the scaled basemap, in frame pixels. */
export type BasemapView = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Keeps a frame-sized window inside the content box. When the content is
 * narrower than the frame the constraint cannot hold, so it centers instead.
 */
function clampToContent(
  desired: number,
  frameSize: number,
  nearEdge: number,
  farEdge: number,
) {
  const min = frameSize - farEdge;
  const max = -nearEdge;
  if (min > max) return (frameSize - (nearEdge + farEdge)) / 2;
  return Math.min(max, Math.max(min, desired));
}

/** Centers the basemap on a game coordinate, keeping the frame fully covered. */
export function cropAround(
  x: number,
  y: number,
  viewWidth: number = LOCATION_VIEW_WIDTH,
): BasemapView {
  const scale = OG_SIZE.width / ((viewWidth / SPAN_X) * BASEMAP.width);
  const width = Math.round(BASEMAP.width * scale);
  const height = Math.round(BASEMAP.height * scale);

  const offsetX = ((x - BASEMAP.minX) / SPAN_X) * width;
  const offsetY = ((BASEMAP.maxY - y) / SPAN_Y) * height;

  return {
    width,
    height,
    left: Math.round(
      clampToContent(
        OG_SIZE.width / 2 - offsetX,
        OG_SIZE.width,
        ((CONTENT.minX - BASEMAP.minX) / SPAN_X) * width,
        ((CONTENT.maxX - BASEMAP.minX) / SPAN_X) * width,
      ),
    ),
    top: Math.round(
      clampToContent(
        OG_SIZE.height / 2 - offsetY,
        OG_SIZE.height,
        ((BASEMAP.maxY - CONTENT.maxY) / SPAN_Y) * height,
        ((BASEMAP.maxY - CONTENT.minY) / SPAN_Y) * height,
      ),
    ),
  };
}

/**
 * Places the whole content box against the right edge, scaled to the frame
 * height. Leonida is taller than wide, so the panel width falls out of its
 * aspect ratio — which is what leaves room for copy on the left.
 */
export function contentPanel(): { view: BasemapView; panelLeft: number } {
  const scale = OG_SIZE.height / (((CONTENT.maxY - CONTENT.minY) / SPAN_Y) * BASEMAP.height);
  const width = Math.round(BASEMAP.width * scale);
  const height = Math.round(BASEMAP.height * scale);

  const panelWidth = Math.round(((CONTENT.maxX - CONTENT.minX) / SPAN_X) * width);
  const left = Math.round(
    OG_SIZE.width - ((CONTENT.maxX - BASEMAP.minX) / SPAN_X) * width,
  );
  const top = Math.round(-((BASEMAP.maxY - CONTENT.maxY) / SPAN_Y) * height);

  return {
    view: { left, top, width, height },
    panelLeft: OG_SIZE.width - panelWidth,
  };
}

/** Where a game coordinate lands inside a placed basemap. */
export function project(view: BasemapView, x: number, y: number) {
  return {
    left: view.left + ((x - BASEMAP.minX) / SPAN_X) * view.width,
    top: view.top + ((BASEMAP.maxY - y) / SPAN_Y) * view.height,
  };
}

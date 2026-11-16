import type { Location } from "@/data/locations";

/**
 * GTADB serves its photos only to its own origin; the GitHub mirror is the
 * CC BY 4.0 copy anyone may reuse, and jsDelivr fronts it with a CDN.
 */
const PHOTO_BASE = "https://cdn.jsdelivr.net/gh/rolux/gtadb.org@main/map/photos/6";

export type PhotoKind = "ig" | "rl";

function upstreamId(slug: string): string | undefined {
  return /^gtadb-(l\d+)-/.exec(slug)?.[1]?.toUpperCase();
}

export function gtadbPhotoUrl(
  location: Pick<Location, "slug" | "photos">,
  kind: PhotoKind,
): string | undefined {
  const version = location.photos?.[kind];
  const id = upstreamId(location.slug);
  if (version == null || !id) return undefined;
  return `${PHOTO_BASE}/${id},${kind}.jpg?v=${version}`;
}

/** Both sides of the comparison exist — the only case worth a side-by-side. */
export function hasPhotoPair(location: Pick<Location, "slug" | "photos">): boolean {
  return Boolean(gtadbPhotoUrl(location, "ig") && gtadbPhotoUrl(location, "rl"));
}

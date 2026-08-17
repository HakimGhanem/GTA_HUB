/** Google AdSense publisher client ID — ca-pub-XXXXXXXXXXXXXXXX */
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9449600740636411";

/** Manual ad slot IDs from AdSense → Ads → By ad unit */
export const AD_SLOTS = {
  /** Horizontal banner — content pages footer area */
  banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER ?? "",
  /** In-article — guides & regional location pages */
  inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE ?? "",
} as const;

export const ADSENSE_ENABLED =
  process.env.NODE_ENV === "production" && ADSENSE_CLIENT.length > 0;

/**
 * Manual ad units (banner / in-article). Keep false while AdSense site is
 * "Getting ready" so empty shells never cover content. Script + ads.txt
 * still load for verification. Set NEXT_PUBLIC_ADSENSE_UNITS=true after approval.
 */
export const ADSENSE_UNITS_VISIBLE =
  process.env.NEXT_PUBLIC_ADSENSE_UNITS === "true";

/** Routes where ads must never render (UX + AdSense policy) */
const AD_EXCLUDED_SEGMENTS = ["map", "overlay"];

function pathWithoutLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  // /en/map → /map ; /map → /map
  const maybeLocale = parts[0];
  const rest =
    maybeLocale.length === 2 || maybeLocale.length === 5
      ? parts.slice(1)
      : parts;
  return rest.length ? `/${rest.join("/")}` : "/";
}

export function shouldShowAds(pathname: string): boolean {
  if (!ADSENSE_ENABLED || !ADSENSE_UNITS_VISIBLE) return false;
  const clean = pathWithoutLocale(pathname);
  return !AD_EXCLUDED_SEGMENTS.some(
    (seg) => clean === `/${seg}` || clean.startsWith(`/${seg}/`),
  );
}

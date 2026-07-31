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

/** Routes where ads must never render (UX + AdSense policy) */
const AD_EXCLUDED_PREFIXES = ["/map"];

export function shouldShowAds(pathname: string): boolean {
  if (!ADSENSE_ENABLED) return false;
  return !AD_EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

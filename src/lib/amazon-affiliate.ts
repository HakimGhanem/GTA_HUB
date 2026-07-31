/** Amazon Associates store tag — e.g. map6-21 (from partners.amazon.fr) */
export const AMAZON_AFFILIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG ?? "";

/** Primary storefront for affiliate links */
export const AMAZON_STORE =
  process.env.NEXT_PUBLIC_AMAZON_STORE ?? "https://www.amazon.fr";

export const AMAZON_ENABLED = AMAZON_AFFILIATE_TAG.length > 0;

/** Required by Amazon.fr Associates programme */
export const AMAZON_DISCLOSURE_FR =
  "En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.";

/** Required by Amazon.com Associates programme */
export const AMAZON_DISCLOSURE_EN =
  "As an Amazon Associate I earn from qualifying purchases.";

/** Build an affiliate product URL from an ASIN or full Amazon path */
export function buildAmazonAffiliateUrl(asinOrPath: string): string {
  const base = AMAZON_STORE.replace(/\/$/, "");
  const isFullUrl = asinOrPath.startsWith("http");
  const url = isFullUrl
    ? new URL(asinOrPath)
    : new URL(`/dp/${asinOrPath}`, base);

  if (AMAZON_AFFILIATE_TAG) {
    url.searchParams.set("tag", AMAZON_AFFILIATE_TAG);
  }

  return url.toString();
}

/** Curated GTA 6 launch products — fill ASINs after SiteStripe link generation */
export const AMAZON_PRODUCTS = {
  gta6Ps5: {
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_PS5 ?? "",
    label: "Grand Theft Auto VI — PS5",
  },
  gta6Xbox: {
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_XBOX ?? "",
    label: "Grand Theft Auto VI — Xbox Series X|S",
  },
  gta6CollectorsPs5: {
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_COLLECTORS_PS5 ?? "",
    label: "GTA 6 Collector's Edition — PS5",
  },
  gta6CollectorsXbox: {
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_COLLECTORS_XBOX ?? "",
    label: "GTA 6 Collector's Edition — Xbox",
  },
  ps5: {
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_PS5 ?? "",
    label: "PlayStation 5",
  },
  xboxSeriesX: {
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_XBOX_SERIES_X ?? "",
    label: "Xbox Series X",
  },
  dualsense: {
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_DUALSENSE ?? "",
    label: "DualSense Wireless Controller",
  },
} as const;

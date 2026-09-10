import { buildAmazonAffiliateUrl } from "@/lib/amazon-affiliate";

/**
 * Storefronts used by the GTA 6 price comparator. Amazon goes through
 * Associates; the French retailers go through an affiliate network (Awin,
 * Effiliation, Kwanko) once a `{url}` deep-link template is configured.
 * Official console stores are never affiliated — they are the price baseline.
 */
export const RETAILER_IDS = [
  "amazon_fr",
  "fnac",
  "cdiscount",
  "carrefour",
  "ps_store",
  "xbox_store",
] as const;

export type RetailerId = (typeof RETAILER_IDS)[number];

export type Retailer = {
  id: RetailerId;
  label: string;
  /** Official stores set the MSRP; retailers are the ones that discount it */
  kind: "retailer" | "official";
  /** Markets where the offer is purchasable */
  markets: string[];
};

export const RETAILERS: Record<RetailerId, Retailer> = {
  amazon_fr: { id: "amazon_fr", label: "Amazon.fr", kind: "retailer", markets: ["fr"] },
  fnac: { id: "fnac", label: "Fnac", kind: "retailer", markets: ["fr"] },
  cdiscount: { id: "cdiscount", label: "Cdiscount", kind: "retailer", markets: ["fr"] },
  carrefour: { id: "carrefour", label: "Carrefour", kind: "retailer", markets: ["fr"] },
  ps_store: { id: "ps_store", label: "PlayStation Store", kind: "official", markets: ["fr"] },
  xbox_store: { id: "xbox_store", label: "Microsoft Store", kind: "official", markets: ["fr"] },
};

/**
 * Affiliate deep-link templates. Each must contain `{url}`, which is replaced
 * by the URL-encoded destination — the shape every FR network uses:
 * `https://track.effiliation.com/servlet/effi.redir?id_compteur=XXX&url={url}`
 * Next.js inlines `NEXT_PUBLIC_*` at build time, so read them statically.
 */
const DEEPLINK_TEMPLATES: Partial<Record<RetailerId, string | undefined>> = {
  fnac: process.env.NEXT_PUBLIC_FNAC_DEEPLINK,
  cdiscount: process.env.NEXT_PUBLIC_CDISCOUNT_DEEPLINK,
  carrefour: process.env.NEXT_PUBLIC_CARREFOUR_DEEPLINK,
};

function deeplinkTemplate(id: RetailerId) {
  const template = DEEPLINK_TEMPLATES[id]?.trim();
  return template?.includes("{url}") ? template : undefined;
}

/** True when the outbound click earns a commission — drives `rel="sponsored"` */
export function isTrackedRetailer(id: RetailerId): boolean {
  if (id === "amazon_fr") return Boolean(process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG);
  return Boolean(deeplinkTemplate(id));
}

/** Wrap a destination URL with the retailer's tracking when it is configured */
export function buildRetailerUrl(id: RetailerId, destination: string): string {
  if (id === "amazon_fr") return buildAmazonAffiliateUrl(destination);

  const template = deeplinkTemplate(id);
  return template
    ? template.replace("{url}", encodeURIComponent(destination))
    : destination;
}

export function relForRetailer(id: RetailerId): string {
  return isTrackedRetailer(id)
    ? "nofollow sponsored noopener noreferrer"
    : "nofollow noopener noreferrer";
}

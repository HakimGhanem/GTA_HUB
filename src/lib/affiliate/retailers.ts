import { AMAZON_ENABLED, buildAmazonAffiliateUrl } from "@/lib/amazon-affiliate";
import {
  isPartnerTracked,
  wrapWithPartnerBase,
  type PartnerId,
} from "@/lib/affiliate/partner-bases";

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
 * Comparator retailers that route through a partner network. Bases live in
 * `partner-bases.ts` so the same env var monetises this table and the
 * multi-locale offer buttons — the two used to read different names, which
 * left the comparator donating every Fnac click.
 */
const PARTNER_BY_RETAILER: Partial<Record<RetailerId, PartnerId>> = {
  fnac: "fnac",
  cdiscount: "cdiscount",
  carrefour: "carrefour",
};

/** True when the outbound click earns a commission — drives `rel="sponsored"` */
export function isTrackedRetailer(id: RetailerId): boolean {
  if (id === "amazon_fr") return AMAZON_ENABLED;
  const partner = PARTNER_BY_RETAILER[id];
  return partner ? isPartnerTracked(partner) : false;
}

/** Wrap a destination URL with the retailer's tracking when it is configured */
export function buildRetailerUrl(id: RetailerId, destination: string): string {
  if (id === "amazon_fr") return buildAmazonAffiliateUrl(destination);

  const partner = PARTNER_BY_RETAILER[id];
  return partner ? wrapWithPartnerBase(partner, destination) : destination;
}

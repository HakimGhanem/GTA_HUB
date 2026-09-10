import { AMAZON_STORE, buildAmazonAffiliateUrl } from "@/lib/amazon-affiliate";

export type PreorderProduct = {
  /** Env key suffix — e.g. GTA6_PS5 → NEXT_PUBLIC_AMAZON_ASIN_GTA6_PS5 */
  envKey: string;
  asin: string;
  label: string;
  description: string;
  platform: "PS5" | "Xbox" | "PC" | "Multi";
  edition: "standard" | "ultimate" | "collectors" | "hardware" | "accessory";
  badge?: string;
};

/**
 * Fill ASINs via SiteStripe → paste into .env or Cloud Build substitutions.
 * Amazon.fr lists Standard only (PS5 + Xbox, code-in-box). Ultimate is
 * store-exclusive digital, and no Collector's SKU exists — those slots stay empty.
 */
export const PREORDER_PRODUCTS: PreorderProduct[] = [
  {
    envKey: "GTA6_PS5",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_PS5 ?? "B0GZW5D8YF",
    label: "Grand Theft Auto VI — PS5",
    description:
      "Standard edition for PlayStation 5, code-in-box (no disc). Amazon.fr has listed it under the €79.99 RRP; stock comes and goes because Rockstar allots key quotas.",
    platform: "PS5",
    edition: "standard",
    badge: "Most popular",
  },
  {
    envKey: "GTA6_XBOX",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_XBOX ?? "B0GZW3TCF7",
    label: "Grand Theft Auto VI — Xbox Series X|S",
    description:
      "Standard edition for Xbox Series X and Series S, code-in-box (no disc). Same discounted Amazon.fr pricing and same quota-driven stock swings as the PS5 SKU.",
    platform: "Xbox",
    edition: "standard",
  },
  {
    envKey: "GTA6_ULTIMATE_PS5",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_ULTIMATE_PS5 ?? "",
    label: "GTA 6 Ultimate Edition — PS5",
    description:
      "Official $99.99 US premium tier — digital extras. No physical Ultimate listed.",
    platform: "PS5",
    edition: "ultimate",
    badge: "Ultimate",
  },
  {
    envKey: "GTA6_ULTIMATE_XBOX",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_ULTIMATE_XBOX ?? "",
    label: "GTA 6 Ultimate Edition — Xbox",
    description: "Official Ultimate Edition for Xbox Series X|S.",
    platform: "Xbox",
    edition: "ultimate",
    badge: "Ultimate",
  },
  {
    envKey: "GTA6_COLLECTORS_PS5",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_COLLECTORS_PS5 ?? "",
    label: "GTA 6 Collector's Edition — PS5",
    description:
      "Premium bundle with exclusive in-game items and physical collectibles (when available).",
    platform: "PS5",
    edition: "collectors",
    badge: "Premium",
  },
  {
    envKey: "GTA6_COLLECTORS_XBOX",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_COLLECTORS_XBOX ?? "",
    label: "GTA 6 Collector's Edition — Xbox",
    description: "Premium bundle for Xbox Series X|S with exclusive extras.",
    platform: "Xbox",
    edition: "collectors",
    badge: "Premium",
  },
  {
    envKey: "PS5",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_PS5 ?? "B0FX2VBNMF",
    label: "PlayStation 5 Console",
    description: "Need a console for launch day? Bundle a PS5 with your GTA 6 preorder.",
    platform: "PS5",
    edition: "hardware",
  },
  {
    envKey: "XBOX_SERIES_X",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_XBOX_SERIES_X ?? "B08H93ZRLL",
    label: "Xbox Series X",
    description: "Microsoft's most powerful console — ready for Vice City at 4K.",
    platform: "Xbox",
    edition: "hardware",
  },
  {
    envKey: "DUALSENSE",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_DUALSENSE ?? "B094WLFGD3",
    label: "DualSense Wireless Controller",
    description: "Extra controller for co-op sessions and long Vice City nights.",
    platform: "PS5",
    edition: "accessory",
  },
];

export function getConfiguredProducts() {
  return PREORDER_PRODUCTS.filter((p) => p.asin.length > 0);
}

export function getProductHref(asin: string) {
  return asin ? buildAmazonAffiliateUrl(asin) : AMAZON_STORE;
}

/** Human-readable env var name for a product slot */
export function productEnvVar(envKey: string) {
  return `NEXT_PUBLIC_AMAZON_ASIN_${envKey}`;
}

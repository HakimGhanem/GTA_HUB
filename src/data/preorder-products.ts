import { AMAZON_STORE, buildAmazonAffiliateUrl } from "@/lib/amazon-affiliate";

export type PreorderProduct = {
  /** Env key suffix — e.g. GTA6_PS5 → NEXT_PUBLIC_AMAZON_ASIN_GTA6_PS5 */
  envKey: string;
  asin: string;
  label: string;
  description: string;
  platform: "PS5" | "Xbox" | "PC" | "Multi";
  edition: "standard" | "collectors" | "hardware" | "accessory";
  badge?: string;
};

/** Fill ASINs via SiteStripe → paste into .env or Cloud Run env vars */
export const PREORDER_PRODUCTS: PreorderProduct[] = [
  {
    envKey: "GTA6_PS5",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_PS5 ?? "",
    label: "Grand Theft Auto VI — PS5",
    description: "Standard edition for PlayStation 5. Digital or physical — check Amazon for current availability.",
    platform: "PS5",
    edition: "standard",
    badge: "Most popular",
  },
  {
    envKey: "GTA6_XBOX",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_XBOX ?? "",
    label: "Grand Theft Auto VI — Xbox Series X|S",
    description: "Standard edition for Xbox Series X and Series S consoles.",
    platform: "Xbox",
    edition: "standard",
  },
  {
    envKey: "GTA6_COLLECTORS_PS5",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA6_COLLECTORS_PS5 ?? "",
    label: "GTA 6 Collector's Edition — PS5",
    description: "Premium bundle with exclusive in-game items and physical collectibles (when available).",
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
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_PS5 ?? "",
    label: "PlayStation 5 Console",
    description: "Need a console for launch day? Bundle a PS5 with your GTA 6 preorder.",
    platform: "PS5",
    edition: "hardware",
  },
  {
    envKey: "XBOX_SERIES_X",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_XBOX_SERIES_X ?? "",
    label: "Xbox Series X",
    description: "Microsoft's most powerful console — ready for Vice City at 4K.",
    platform: "Xbox",
    edition: "hardware",
  },
  {
    envKey: "DUALSENSE",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_DUALSENSE ?? "",
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

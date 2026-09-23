import { PREORDER_PRODUCTS, type PreorderProduct } from "@/data/preorder-products";
import type { AffiliateIntent } from "./intents";

/** Map product slots → funnel intents (what page / article should surface). */
const PRODUCT_INTENTS: Record<string, AffiliateIntent[]> = {
  GTA6_PS5: ["preorder_standard"],
  GTA6_XBOX: ["preorder_standard"],
  GTA6_ULTIMATE_PS5: ["preorder_collectors"],
  GTA6_ULTIMATE_XBOX: ["preorder_collectors"],
  GTA6_COLLECTORS_PS5: ["preorder_collectors"],
  GTA6_COLLECTORS_XBOX: ["preorder_collectors"],
  PS5: ["console_upgrade"],
  XBOX_SERIES_X: ["console_upgrade"],
  DUALSENSE: ["controller"],
  DUALSENSE_WHITE: ["controller"],
  XBOX_PAD: ["controller"],
  DUALSENSE_EDGE: ["controller"],
  PULSE_3D: ["headset"],
  ARCTIS_NOVA: ["headset"],
  SSD_1TB: ["storage_ssd"],
  HDMI_21_TV: ["display_120hz"],
  CAPTURE_CARD: ["streaming_setup"],
  CHARGE_DOCK: ["controller", "streaming_setup"],
  GTA5_PS5: ["retro_gta", "wallet_topup"],
  PS_STORE_20: ["wallet_topup"],
  PS_STORE_50: ["wallet_topup"],
  XBOX_GIFT_20: ["wallet_topup"],
  STEAM_WALLET_20: ["wallet_topup"],
};

/**
 * Extended funnel SKUs — defaults are verified amazon.fr ASINs (Aug 2026).
 * Override via NEXT_PUBLIC_AMAZON_ASIN_* anytime.
 */
export const EXTENDED_PRODUCTS: PreorderProduct[] = [
  {
    envKey: "DUALSENSE_WHITE",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_DUALSENSE_WHITE ?? "B08H99BPJN",
    label: "DualSense — Cosmic White",
    description: "Second DualSense for co-op / couch sessions in Vice City.",
    platform: "PS5",
    edition: "accessory",
  },
  {
    envKey: "XBOX_PAD",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_XBOX_PAD ?? "B08SRMPBRF",
    label: "Xbox Wireless Controller",
    description: "Official Series X|S pad — share button ready for clips.",
    platform: "Xbox",
    edition: "accessory",
  },
  {
    envKey: "DUALSENSE_EDGE",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_DUALSENSE_EDGE ?? "B0DSPX3R62",
    label: "DualSense Edge (pro)",
    description: "Swappable sticks & back buttons — streamer / sweat setup.",
    platform: "PS5",
    edition: "accessory",
    badge: "Pro",
  },
  {
    envKey: "PULSE_3D",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_PULSE_3D ?? "B0DSPWT99L",
    label: "Pulse Elite Wireless Headset",
    description: "Official PS5 lossless Link audio — clear chat for long Vice City nights.",
    platform: "PS5",
    edition: "accessory",
  },
  {
    envKey: "ARCTIS_NOVA",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_ARCTIS_NOVA ?? "B0D1KCF7L2",
    label: "SteelSeries Arctis Nova 5P",
    description: "Wireless PS5 gaming headset — strong mid-funnel accessory EPC.",
    platform: "PS5",
    edition: "accessory",
  },
  {
    envKey: "SSD_1TB",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_SSD_1TB ?? "B0B7CKZGN6",
    label: "WD_BLACK SN850X 2TB (heatsink)",
    description: "PS5-compatible NVMe with heatsink — headroom for GTA 6 + captures.",
    platform: "Multi",
    edition: "accessory",
    badge: "Storage",
  },
  {
    envKey: "CAPTURE_CARD",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_CAPTURE_CARD ?? "B09V1KJ3J4",
    label: "Elgato HD60 X",
    description: "Clean console capture for Kick / TikTok / OBS + Map-6 overlay.",
    platform: "Multi",
    edition: "accessory",
    badge: "Creators",
  },
  {
    envKey: "CHARGE_DOCK",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_CHARGE_DOCK ?? "B08S3FMVV7",
    label: "DualSense charging dock",
    description: "Keep two pads topped up for marathon launch-week sessions.",
    platform: "PS5",
    edition: "accessory",
  },
  {
    envKey: "HDMI_21_TV",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_HDMI_21_TV ?? "",
    label: "4K HDMI 2.1 Gaming TV",
    description: "120Hz-ready display picks for launch-week performance modes.",
    platform: "Multi",
    edition: "hardware",
    badge: "Setup",
  },
  {
    envKey: "GTA5_PS5",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA5_PS5 ?? "B09WZ7TKNB",
    label: "Grand Theft Auto V — PS5",
    description: "Replay Los Santos on the classics map while waiting for GTA 6.",
    platform: "PS5",
    edition: "standard",
  },
  {
    envKey: "PS_STORE_20",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_PS_STORE_20 ?? "B00I3P3DXK",
    label: "PlayStation Store — €20 card",
    description:
      "France PSN email code. Redeem on the console, then buy official GTA Online Shark Cards or other store games. Not a GTA 6 SKU.",
    platform: "PS5",
    edition: "gift_card",
    badge: "Wallet",
    commerce: { format: "digital", streetEur: 20 },
  },
  {
    envKey: "PS_STORE_50",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_PS_STORE_50 ?? "B00OQSZG6U",
    label: "PlayStation Store — €50 card",
    description:
      "Larger France PSN top-up for PS Plus, Shark Cards, or a future GTA 6 digital checkout on that account.",
    platform: "PS5",
    edition: "gift_card",
    badge: "Wallet",
    commerce: { format: "digital", streetEur: 50 },
  },
  {
    envKey: "XBOX_GIFT_20",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_XBOX_GIFT_20 ?? "B0186L6E3G",
    label: "Xbox gift card — €20",
    description:
      "Official Xbox digital credit — Game Pass, GTA Online Shark Cards on Xbox, or store games. Region-locked to the listing.",
    platform: "Xbox",
    edition: "gift_card",
    badge: "Wallet",
    commerce: { format: "digital", streetEur: 20 },
  },
  {
    envKey: "STEAM_WALLET_20",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_STEAM_WALLET_20 ?? "B00HRG5GQI",
    label: "Steam Wallet — €20 card",
    description:
      "Euro Steam wallet listing. Stock swings — if Amazon is empty, use the tagged search. Funds GTA V / Online on PC, not a GTA 6 pre-order.",
    platform: "PC",
    edition: "gift_card",
    badge: "Steam",
    commerce: { format: "digital", streetEur: 20 },
  },
];

export function allCatalogProducts(): PreorderProduct[] {
  return [...PREORDER_PRODUCTS, ...EXTENDED_PRODUCTS];
}

export function productsForIntent(intent: AffiliateIntent): PreorderProduct[] {
  return allCatalogProducts().filter((p) =>
    (PRODUCT_INTENTS[p.envKey] ?? []).includes(intent),
  );
}

export function productsForIntents(intents: AffiliateIntent[]): PreorderProduct[] {
  const seen = new Set<string>();
  const out: PreorderProduct[] = [];
  for (const intent of intents) {
    for (const p of productsForIntent(intent)) {
      if (seen.has(p.envKey)) continue;
      seen.add(p.envKey);
      out.push(p);
    }
  }
  return out;
}

/** Prefer live ASINs only — never fall back to empty SiteStripe shells. */
export function liveProductsForIntent(intent: AffiliateIntent): PreorderProduct[] {
  return productsForIntent(intent).filter((p) => p.asin.length > 0);
}

/**
 * Honest retailer search query — product label / edition, never a fake SKU.
 */
export function searchQueryForProduct(product: PreorderProduct): string {
  switch (product.envKey) {
    case "GTA6_PS5":
      return "GTA 6 PS5";
    case "GTA6_ULTIMATE_PS5":
      return "GTA 6 Ultimate PS5";
    case "GTA6_XBOX":
      return "GTA 6 Xbox";
    case "GTA6_ULTIMATE_XBOX":
      return "GTA 6 Ultimate Xbox";
    case "GTA5_PS5":
      return "GTA 5 PS5";
    case "PS_STORE_20":
      return "Carte PlayStation Store 20 euros";
    case "PS_STORE_50":
      return "Carte PlayStation Store 50 euros";
    case "XBOX_GIFT_20":
      return "Carte cadeau Xbox 20 euros";
    case "STEAM_WALLET_20":
      return "Carte Steam 20 euros";
    default:
      return product.label.replace(/\s+/g, " ").trim();
  }
}

import { PREORDER_PRODUCTS, type PreorderProduct } from "@/data/preorder-products";
import type { AffiliateIntent } from "./intents";

/** Map product slots → funnel intents (what page / article should surface). */
const PRODUCT_INTENTS: Record<string, AffiliateIntent[]> = {
  GTA6_PS5: ["preorder_standard"],
  GTA6_XBOX: ["preorder_standard"],
  GTA6_COLLECTORS_PS5: ["preorder_collectors"],
  GTA6_COLLECTORS_XBOX: ["preorder_collectors"],
  PS5: ["console_upgrade"],
  XBOX_SERIES_X: ["console_upgrade"],
  DUALSENSE: ["controller"],
  PULSE_3D: ["headset"],
  SSD_1TB: ["storage_ssd"],
  HDMI_21_TV: ["display_120hz"],
  CAPTURE_CARD: ["streaming_setup"],
  GTA5_PS5: ["retro_gta"],
};

/** Extra ASIN slots beyond preorder guide — fill when SiteStripe ready. */
export const EXTENDED_PRODUCTS: PreorderProduct[] = [
  {
    envKey: "PULSE_3D",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_PULSE_3D ?? "",
    label: "Pulse 3D Wireless Headset",
    description: "Official PS5 headset — clear chat for co-op and long Vice City sessions.",
    platform: "PS5",
    edition: "accessory",
  },
  {
    envKey: "SSD_1TB",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_SSD_1TB ?? "",
    label: "1TB NVMe SSD (console / PC)",
    description: "Free up space before a huge open-world install — check console compatibility.",
    platform: "Multi",
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
    envKey: "CAPTURE_CARD",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_CAPTURE_CARD ?? "",
    label: "Capture card (Kick / TikTok)",
    description: "Clean console capture for launch-day clips and map overlays.",
    platform: "Multi",
    edition: "accessory",
    badge: "Creators",
  },
  {
    envKey: "GTA5_PS5",
    asin: process.env.NEXT_PUBLIC_AMAZON_ASIN_GTA5_PS5 ?? "",
    label: "Grand Theft Auto V — PS5",
    description: "Replay Los Santos on the classics map while waiting for GTA 6.",
    platform: "PS5",
    edition: "standard",
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

/** Prefer live ASINs; fall back to empty slots so UI still shows the funnel. */
export function liveProductsForIntent(intent: AffiliateIntent): PreorderProduct[] {
  const all = productsForIntent(intent);
  const live = all.filter((p) => p.asin.length > 0);
  return live.length > 0 ? live : all;
}

import type { AffiliateIntent } from "@/lib/affiliate/intents";

/** Guides that should render purchase-intent product grids. */
export const GUIDE_AFFILIATE_INTENTS: Record<string, AffiliateIntent[]> = {
  "gta-6-preorder-guide": [
    "preorder_standard",
    "preorder_collectors",
    "console_upgrade",
  ],
  "gta-6-preorder-ps5-guide": [
    "preorder_standard",
    "preorder_collectors",
    "controller",
    "headset",
  ],
  "gta-6-preorder-price-editions": [
    "preorder_standard",
    "preorder_collectors",
    "console_upgrade",
  ],
  "gta-6-ultimate-edition-vs-standard": [
    "preorder_collectors",
    "preorder_standard",
  ],
  "gta-6-release-date": ["preorder_standard", "console_upgrade", "storage_ssd"],
  "best-setup-gta-6-ps5-xbox": [
    "console_upgrade",
    "headset",
    "storage_ssd",
    "display_120hz",
    "controller",
  ],
  "gta-6-collectors-edition": [
    "preorder_collectors",
    "preorder_standard",
    "console_upgrade",
  ],
  "gta-6-map-clip-kit": ["streaming_setup", "headset", "display_120hz"],
  "gta-6-pc-release-date": ["console_upgrade", "preorder_standard"],
  "gta-6-pc-recommended-specs": ["storage_ssd", "display_120hz", "headset"],
  "gta-6-ps5-vs-xbox": [
    "console_upgrade",
    "preorder_standard",
    "controller",
  ],
  "gta-6-price-france": ["preorder_standard", "preorder_collectors"],
  "gta-6-faq": ["preorder_standard"],
};

export function affiliateIntentsForGuide(
  slug: string,
): AffiliateIntent[] | undefined {
  return GUIDE_AFFILIATE_INTENTS[slug];
}

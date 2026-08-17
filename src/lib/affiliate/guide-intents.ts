import type { AffiliateIntent } from "@/lib/affiliate/intents";

/** Guides that should render purchase-intent product grids. */
export const GUIDE_AFFILIATE_INTENTS: Record<string, AffiliateIntent[]> = {
  "gta-6-preorder-guide": [
    "preorder_standard",
    "preorder_collectors",
    "console_upgrade",
  ],
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
};

export function affiliateIntentsForGuide(
  slug: string,
): AffiliateIntent[] | undefined {
  return GUIDE_AFFILIATE_INTENTS[slug];
}

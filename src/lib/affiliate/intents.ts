/**
 * Purchase / clip intents that actually convert near a GTA launch.
 * Content engine + product grids key off these — not generic “news”.
 */
export const AFFILIATE_INTENTS = [
  "preorder_standard",
  "preorder_collectors",
  "console_upgrade",
  "controller",
  "headset",
  "display_120hz",
  "storage_ssd",
  "streaming_setup",
  "retro_gta",
] as const;

export type AffiliateIntent = (typeof AFFILIATE_INTENTS)[number];

export type IntentMeta = {
  id: AffiliateIntent;
  /** Short label for UI / cards */
  label: string;
  /** What the visitor is trying to do */
  jobToBeDone: string;
  /** Expected EPC tier relative to other intents */
  payoutTier: "high" | "medium" | "low";
  /** Clip / short-form angle */
  clipAngle: string;
  /** Keyword substrings that signal this intent */
  signals: string[];
};

export const INTENT_META: Record<AffiliateIntent, IntentMeta> = {
  preorder_standard: {
    id: "preorder_standard",
    label: "Pre-order (standard)",
    jobToBeDone: "Lock a day-one copy on PS5 or Xbox",
    payoutTier: "high",
    clipAngle: "Where to pre-order before stocks sell out",
    signals: [
      "preorder",
      "pre-order",
      "précommande",
      "buy gta 6",
      "preorder price",
      "standard edition",
    ],
  },
  preorder_collectors: {
    id: "preorder_collectors",
    label: "Collector's edition",
    jobToBeDone: "Compare premium bundles and memorabilia",
    payoutTier: "high",
    clipAngle: "Is the Collector's Edition worth it?",
    signals: [
      "collector",
      "collectors",
      "ultimate edition",
      "edition limitée",
      "premium edition",
    ],
  },
  console_upgrade: {
    id: "console_upgrade",
    label: "Console upgrade",
    jobToBeDone: "Buy/upgrade PS5 or Series X before launch",
    payoutTier: "high",
    clipAngle: "Best console for GTA 6 launch week",
    signals: ["ps5", "playstation 5", "xbox series", "console", "bundle"],
  },
  controller: {
    id: "controller",
    label: "Controller",
    jobToBeDone: "Extra DualSense / Xbox pad for co-op",
    payoutTier: "medium",
    clipAngle: "DualSense vs Xbox pad for Vice City nights",
    signals: ["dualsense", "controller", "manette", "gamepad"],
  },
  headset: {
    id: "headset",
    label: "Headset",
    jobToBeDone: "Hear footsteps / chat during long sessions",
    payoutTier: "medium",
    clipAngle: "Best headset for GTA Online / GTA 6",
    signals: ["headset", "casque", "pulse 3d", "turtle beach", "steelseries"],
  },
  display_120hz: {
    id: "display_120hz",
    label: "120Hz display",
    jobToBeDone: "TV/monitor ready for 4K/120 launch builds",
    payoutTier: "high",
    clipAngle: "Do you need a 120Hz TV for GTA 6?",
    signals: ["120hz", "4k tv", "hdmi 2.1", "gaming monitor", "oled"],
  },
  storage_ssd: {
    id: "storage_ssd",
    label: "SSD / storage",
    jobToBeDone: "Free space + fast load times for a huge title",
    payoutTier: "medium",
    clipAngle: "How much storage for GTA 6?",
    signals: ["ssd", "storage", "external drive", "espace disque"],
  },
  streaming_setup: {
    id: "streaming_setup",
    label: "Streaming kit",
    jobToBeDone: "Mic / capture for Kick TikTok clips of the map",
    payoutTier: "medium",
    clipAngle: "Streamer setup for GTA 6 launch day",
    signals: ["stream", "kick", "tiktok", "elgato", "microphone", "capture card"],
  },
  retro_gta: {
    id: "retro_gta",
    label: "Classic GTA",
    jobToBeDone: "Replay V / SA while waiting for VI",
    payoutTier: "low",
    clipAngle: "Play GTA 5 / SA on the Map-6 classics maps",
    signals: ["gta 5", "gta v", "san andreas", "definitive", "trilogy"],
  },
};

/** Score how strongly text matches a purchase/clip intent (0–100). */
export function scoreAffiliateIntent(text: string): {
  intent: AffiliateIntent;
  score: number;
}[] {
  const lower = text.toLowerCase();
  return AFFILIATE_INTENTS.map((id) => {
    const meta = INTENT_META[id];
    let score = 0;
    for (const signal of meta.signals) {
      if (lower.includes(signal)) score += 20;
    }
    if (meta.payoutTier === "high" && score > 0) score += 10;
    return { intent: id, score: Math.min(100, score) };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function primaryAffiliateIntent(text: string): AffiliateIntent | undefined {
  return scoreAffiliateIntent(text)[0]?.intent;
}

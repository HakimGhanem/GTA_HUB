/** Contract between the Map-6 pipeline and Remotion. Compositions stay dumb. */

export const FACTORY_TEMPLATES = [
  "poi-countdown",
  "deal-stack",
  "ugc-credit",
] as const;

export type FactoryTemplate = (typeof FACTORY_TEMPLATES)[number];

export const FACTORY_LOCALES = ["en", "fr", "es", "de", "it", "pt"] as const;
export type FactoryLocale = (typeof FACTORY_LOCALES)[number];

export const BRIEF_SOURCES = [
  "map-data",
  "detect-news",
  "ugc",
  "prompt",
] as const;
export type BriefSource = (typeof BRIEF_SOURCES)[number];

export type CaptionCue = {
  startSec: number;
  endSec: number;
  text: string;
};

export type PoiBeat = {
  slug: string;
  name: string;
  region: string;
  line: string;
  x: number;
  y: number;
  mapPath: string;
};

export type DealBeat = {
  label: string;
  platform: string;
  edition: string;
  price: string;
  note: string;
};

export type UgcCredit = {
  handle: string;
  sourceUrl?: string;
  waiverId: string;
};

export type VideoBrief = {
  id: string;
  template: FactoryTemplate;
  locale: FactoryLocale;
  hook: string;
  /** Platform caption — not burned in (except hook/cta). */
  caption: string;
  ctaLabel: string;
  ctaUrl: string;
  items: PoiBeat[] | DealBeat[];
  cues?: CaptionCue[];
  credit?: UgcCredit;
  voiceoverPath?: string;
  footagePath?: string;
  createdAt: string;
  source: BriefSource;
  eventKey: string;
  disclaimer: string;
};

export const COMPOSITION_IDS: Record<FactoryTemplate, string> = {
  "poi-countdown": "PoiCountdown",
  "deal-stack": "DealStack",
  "ugc-credit": "UgcCredit",
};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const HOOK_SEC = 1.6;
export const BEAT_SEC = 1.85;
export const END_SEC = 2.6;
export const UGC_BUMPER_SEC = 2.4;

export function isPoiBeat(item: PoiBeat | DealBeat): item is PoiBeat {
  return "slug" in item;
}

export function briefDurationSec(brief: VideoBrief): number {
  if (brief.template === "ugc-credit") {
    return UGC_BUMPER_SEC + END_SEC + 8;
  }
  return HOOK_SEC + brief.items.length * BEAT_SEC + END_SEC;
}

export function briefDurationFrames(brief: VideoBrief): number {
  return Math.round(briefDurationSec(brief) * FPS);
}

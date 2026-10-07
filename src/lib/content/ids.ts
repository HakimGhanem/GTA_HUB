/** Named story buckets — one live article per family, not one per calendar day. */
export const STORY_FAMILIES = [
  "vice-city-collection",
  "ttwo-preorder-mix",
  "ultimate-mix",
  "dualsense-gta6",
  "gta6-pc",
  "preload-physical",
  "vintage-pack",
  "launch-calendar",
  "leonida-hubs",
  "leaks-policy",
  "extended-look",
  "preorder-generic",
] as const;

export type StoryFamily = (typeof STORY_FAMILIES)[number] | "other";

/**
 * Collapse RSS churn into one desk story. The 17:00 cron used to mint a fresh
 * eventKey every day, which is why /news filled with six $400-box briefs.
 */
export function storyFamily(text: string): StoryFamily {
  const t = text.toLowerCase();

  if (
    /goodtime|vice city collection|collector'?s? box|coffret|399\.99|\$400|400\s?\$/.test(
      t,
    )
  ) {
    return "vice-city-collection";
  }
  if (
    /(zelnick|take-?two|ttwo|net bookings|earnings|cnbc)/.test(t) &&
    /(pre-?order|précommande|ultimate|gta)/.test(t)
  ) {
    return "ttwo-preorder-mix";
  }
  if (/89\s?%|90\s?%|ultimate.*(lead|skew|surge|m[eè]ne)/.test(t)) {
    return "ultimate-mix";
  }
  if (/dualsense|manette/.test(t) && /gta|vice city|limited/.test(t)) {
    return "dualsense-gta6";
  }
  if (
    /(\bpc\b|steam|epic games)/.test(t) &&
    /(gta|release|launch|date|sortie|annonc)/.test(t)
  ) {
    return "gta6-pc";
  }
  if (/pre-?load|précharg|code-in-box|code in a box|boîte-code/.test(t)) {
    return "preload-physical";
  }
  if (/vintage vice|gta\+|gta plus/.test(t)) {
    return "vintage-pack";
  }
  if (
    /(six weeks|j-4|countdown|calendrier|preload window|launch calendar)/.test(t)
  ) {
    return "launch-calendar";
  }
  if (
    /(named hub|leonida hubs|six hubs|hubs nomm)/.test(t) ||
    (/(grassrivers|port gellhorn|mount kalaga|ambrosia)/.test(t) &&
      /(map|carte|hub)/.test(t))
  ) {
    return "leonida-hubs";
  }
  if (
    /(leak map|teapotuber|refuse.*leak|ignore.*leak|cartes? issues? de fuites)/.test(
      t,
    )
  ) {
    return "leaks-policy";
  }
  if (/extended look/.test(t)) {
    return "extended-look";
  }
  if (/pre-?order|précommande/.test(t)) {
    return "preorder-generic";
  }
  return "other";
}

/** Stable dedup key from a headline. Day argument kept for callers; ignored. */
export function eventKeyFromHeadline(
  headline: string,
  _day = new Date(),
): string {
  const family = storyFamily(headline);
  if (family !== "other") return `story-${family}`;
  return `story-${slugify(headline).slice(0, 48)}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

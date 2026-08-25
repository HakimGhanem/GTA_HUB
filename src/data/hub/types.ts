export type HubKind = "character" | "vehicle" | "weapon";

export type HubConfidence = "confirmed" | "trailer" | "unconfirmed";

export type HubSource = {
  label: string;
  url: string;
  date: string;
};

export type HubLocaleHint = {
  name?: string;
  summary?: string;
};

export type HubEntity = {
  slug: string;
  name: string;
  kind: HubKind;
  summary: string;
  /** 3–6 short paragraphs. Facts only; no invented stats. */
  body: string[];
  sources: HubSource[];
  confidence: HubConfidence;
  localeHints?: Partial<Record<string, HubLocaleHint>>;
};

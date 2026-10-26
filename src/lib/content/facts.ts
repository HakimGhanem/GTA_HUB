import { promises as fs } from "fs";
import path from "path";

export const FACT_STATUSES = [
  "confirmed",
  "reported",
  "not_announced",
] as const;
export type FactStatus = (typeof FACT_STATUSES)[number];

export const FACT_SOURCE_TYPES = ["primary", "secondary"] as const;
export type FactSourceType = (typeof FACT_SOURCE_TYPES)[number];

export type Fact = {
  id: string;
  value: string | number | string[] | null;
  status: FactStatus;
  source_url: string;
  source_type: FactSourceType;
  checkedAt: string;
};

export function factsPath(): string {
  return path.join(process.cwd(), "content", "facts.json");
}

export async function loadFacts(): Promise<Fact[]> {
  const raw = await fs.readFile(factsPath(), "utf8");
  const parsed = JSON.parse(raw) as Fact[];
  if (!Array.isArray(parsed)) throw new Error("facts.json must be an array");
  return parsed;
}

export async function factsById(): Promise<Map<string, Fact>> {
  return new Map((await loadFacts()).map((f) => [f.id, f]));
}

export function factValueText(fact: Fact): string {
  if (fact.value == null) return "";
  if (Array.isArray(fact.value)) return fact.value.join(", ");
  return String(fact.value);
}

export const MONTHS_EN = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
export const MONTHS_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function dateVariants(iso: string): string[] {
  const [year, month, day] = iso.split("-");
  const mi = Number(month) - 1;
  const d = String(Number(day));
  const en = MONTHS_EN[mi];
  const fr = MONTHS_FR[mi];
  if (!en) return [iso];
  return [
    iso,
    `${en} ${d}, ${year}`,
    `${en} ${d} ${year}`,
    `${d} ${en} ${year}`,
    `${d} ${fr} ${year}`,
  ];
}

/** Tokens we expect to still appear on the primary page for this fact. */
export function factCheckTokens(fact: Fact): string[] {
  if (fact.status === "not_announced") return [];
  if (fact.value == null) return [];
  const values = Array.isArray(fact.value) ? fact.value.map(String) : [String(fact.value)];
  const extra: string[] = [];
  for (const text of values) {
    extra.push(text);
    for (const iso of text.match(/\d{4}-\d{2}-\d{2}/g) ?? []) {
      extra.push(...dateVariants(iso));
    }
    extra.push(...(text.match(/\d+\.\d{2}/g) ?? []));
    extra.push(
      ...text
        .split(/[,;|/]/)
        .map((p) => p.trim())
        .filter((p) => p.length >= 4),
    );
  }
  return [...new Set(extra)];
}

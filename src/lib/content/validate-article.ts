import { franc } from "franc-min";
import { verifiedTrailerTimecodes } from "../../data/launch-trailer-shots";
import { factValueText, type Fact } from "./facts";
import { extractMarkdownImages } from "./markdown";
import { isIndexableNewsArticle } from "./news-canonical";
import type { Article, ArticleClaim, PageType } from "./schema";
import { countMarkdownWords } from "./word-count";

export type ValidateInput = {
  article: Pick<
    Article,
    | "slug"
    | "locale"
    | "title"
    | "description"
    | "bodyMarkdown"
    | "primaryKeyword"
    | "pageType"
    | "claims"
    | "factIds"
    | "refreshOf"
    | "sources"
    | "lastVerifiedAt"
  >;
  facts: Fact[];
  existing: Article[];
  excerpts?: string[];
};

export type ValidateResult = {
  pass: boolean;
  reasons: string[];
};

const FRANC_LOCALE: Record<string, string> = { en: "eng", fr: "fra" };

const BANNED = [
  /leak confirmed/i,
  /available on pc/i,
  /disponible sur pc/i,
  /sort(ie|ira) sur pc/i,
];

const STOCK_ADVICE =
  /\b(buy|sell|price target|acheter|vendre|objectif de cours)\b.{0,40}\b(stock|action|ttwo|take-?two)\b/i;

const VOICE_NAME =
  /\b(voiced by|voice actor|doubl[ée](?:e)? par|acteur(?:s)? de doublage)\b.{0,40}\b[A-ZÉÈÀ][\p{L}'’-]+/iu;

const FILE_SIZE_CLAIM =
  /\b(?:gta\s*6|gta\s*vi|grand theft auto(?:\s*vi|\s*6)?)\b.{0,40}\b(\d{2,4})\s*go\b|\b(\d{2,4})\s*(?:gb|go)\b.{0,40}\b(?:gta\s*6|install|télécharg)/i;

const MIN_WORDS: Record<PageType, number> = {
  news: 600,
  howto: 600,
  tool: 600,
  status: 900,
  entity: 900,
};

function tokens(text: string): string[] {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
      .match(/[\p{L}\p{N}'’-]+/gu) ?? []
  );
}

function fiveGrams(text: string): Set<string> {
  const words = tokens(text).filter((w) => w.length > 2);
  const grams = new Set<string>();
  for (let i = 0; i <= words.length - 5; i++) {
    grams.add(words.slice(i, i + 5).join(" "));
  }
  return grams;
}

function overlapRatio(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let hit = 0;
  for (const g of a) if (b.has(g)) hit++;
  return hit / a.size;
}

function claimPool(article: ValidateInput["article"], facts: Fact[]): string {
  const parts: string[] = [];
  for (const c of article.claims ?? []) {
    parts.push(c.text, c.factId ?? "", c.sourceUrl ?? "");
  }
  for (const fact of facts) {
    parts.push(fact.id, factValueText(fact), fact.source_url);
  }
  for (const s of article.sources ?? []) parts.push(s.url, s.title);
  parts.push(article.title, article.description);
  if (article.lastVerifiedAt) parts.push(article.lastVerifiedAt);
  return parts.join(" \n ").toLowerCase();
}

function extractClaimsToTrace(body: string): string[] {
  const found = new Set<string>();
  for (const m of body.matchAll(/\$\s*(\d+(?:\.\d{2})?)/g)) found.add(m[1]);
  for (const m of body.matchAll(/\b(\d+\.\d{2})\b/g)) found.add(m[1]);
  for (const m of body.matchAll(/\b(20\d{2}-\d{2}-\d{2})\b/g)) found.add(m[1]);
  const names = [
    "Jason Duval",
    "Lucia Caminos",
    "Cal Hampton",
    "Boobie Ike",
    "Dre'Quan Priest",
    "Real Dimez",
    "Bae-Luxe",
    "Roxy",
    "Raul Bautista",
    "Brian Heder",
    "Vintage Vice City Pack",
  ];
  const lower = body.toLowerCase();
  for (const name of names) {
    if (lower.includes(name.toLowerCase())) found.add(name);
  }
  return [...found];
}

function contradictsFacts(body: string, facts: Fact[]): string[] {
  const reasons: string[] = [];
  const byId = new Map(facts.map((f) => [f.id, f]));
  const text = body.toLowerCase();

  const pc = byId.get("pc");
  if (pc?.status === "not_announced") {
    if (
      /\b(available on pc|pc (?:release|launch|date) (?:is|on)|sortie pc confirm)/i.test(
        body,
      )
    ) {
      reasons.push("contradicts pc:not_announced");
    }
  }

  const standard = byId.get("price_usd_standard");
  if (standard?.status === "confirmed") {
    if (/\b(?:standard).{0,24}(?:\$|usd)?\s*69\.99\b/i.test(body)) {
      reasons.push("wrong Standard price (not 79.99)");
    }
  }

  const size = byId.get("file_size");
  if (size?.status === "not_announced" && FILE_SIZE_CLAIM.test(body)) {
    reasons.push("invented file size while file_size is not_announced");
  }

  const unlock = byId.get("unlock_time");
  if (
    unlock?.status === "not_announced" &&
    /\bunlock(?:s)? at\b|\bheure de d[ée]blocage\b.{0,20}\d{1,2}\s*h/i.test(body)
  ) {
    reasons.push("invented unlock time while unlock_time is not_announced");
  }

  const embargo = byId.get("review_embargo");
  if (
    embargo?.status === "not_announced" &&
    /\bembargo.{0,20}\d{1,2}:\d{2}\b/i.test(body)
  ) {
    reasons.push("invented embargo time while review_embargo is not_announced");
  }

  if (text.includes("leak confirmed")) {
    reasons.push("contains 'leak confirmed'");
  }

  reasons.push(...trailerTimecodeReasons(body));

  return reasons;
}

const TRAILER_CONTEXT = /trailer|bande-annonce|timecode|timestamp|horodat/i;
const TIMECODE_IN_TEXT = /(?<![\d:])(\d):([0-5]\d)(?![\d:])(?!\s*(?:am|pm|a\.m|p\.m)\b)/gi;

/**
 * Nobody watches the video for the loop, so a trailer timecode is only
 * publishable once a human has logged it in `LAUNCH_TRAILER_SHOTS`.
 */
function trailerTimecodeReasons(body: string): string[] {
  const verified = verifiedTrailerTimecodes();
  const reasons = new Set<string>();
  for (const sentence of body.split(/(?<=[.!?])\s+|\n+/)) {
    if (!TRAILER_CONTEXT.test(sentence)) continue;
    for (const m of sentence.matchAll(TIMECODE_IN_TEXT)) {
      const t = `${m[1]}:${m[2]}`;
      if (!verified.has(t)) reasons.add(`unverified trailer timecode: ${t}`);
    }
  }
  return [...reasons];
}

export function minWordsFor(pageType?: PageType): number {
  return pageType ? MIN_WORDS[pageType] : 600;
}

export async function validateArticle(
  input: ValidateInput,
): Promise<ValidateResult> {
  const reasons: string[] = [];
  const { article, facts, existing, excerpts = [] } = input;
  const body = `${article.title}\n${article.description}\n${article.bodyMarkdown}`;
  const pageType = article.pageType;

  const words = countMarkdownWords(article.bodyMarkdown);
  const min = minWordsFor(pageType);
  if (words < min) reasons.push(`word count ${words} < ${min}`);

  const expected = FRANC_LOCALE[article.locale];
  if (expected) {
    const detected = franc(article.bodyMarkdown, { minLength: 40 });
    if (detected !== "und" && detected !== expected) {
      reasons.push(`franc language ${detected} != locale ${article.locale}`);
    }
  }

  const pool = claimPool(article, facts);
  for (const claim of extractClaimsToTrace(body)) {
    if (!pool.includes(claim.toLowerCase())) {
      reasons.push(`untraced claim: ${claim}`);
    }
  }

  reasons.push(...contradictsFacts(body, facts));

  for (const re of BANNED) {
    if (re.test(body)) reasons.push(`banned phrase: ${re.source}`);
  }

  const isTtwo =
    /take-?two|ttwo|resultats|résultats|earnings|q2/i.test(
      `${article.slug} ${article.primaryKeyword}`,
    );
  if (isTtwo && STOCK_ADVICE.test(body)) {
    reasons.push("stock buy/sell/price-target language");
  }

  if (VOICE_NAME.test(body)) {
    reasons.push("names a voice actor");
  }

  const grams = fiveGrams(article.bodyMarkdown);
  for (const other of existing) {
    if (other.slug === article.slug && other.locale === article.locale) continue;
    const ratio = overlapRatio(grams, fiveGrams(other.bodyMarkdown));
    if (ratio > 0.25) {
      reasons.push(
        `5-gram overlap ${(ratio * 100).toFixed(0)}% with ${other.locale}/${other.slug}`,
      );
    }
  }
  for (const excerpt of excerpts) {
    const ratio = overlapRatio(grams, fiveGrams(excerpt));
    if (ratio > 0.25) {
      reasons.push(`5-gram overlap ${(ratio * 100).toFixed(0)}% with a source excerpt`);
    }
  }

  const kw = article.primaryKeyword.trim().toLowerCase();
  const refreshing = Boolean(
    article.refreshOf ||
      existing.some(
        (o) =>
          o.slug === article.slug &&
          o.locale === article.locale &&
          o.status === "published",
      ),
  );
  if (kw && !refreshing) {
    const clash = existing.find(
      (o) =>
        o.status === "published" &&
        isIndexableNewsArticle(o) &&
        o.primaryKeyword.trim().toLowerCase() === kw &&
        !(o.slug === article.slug && o.locale === article.locale),
    );
    if (clash) {
      reasons.push(
        `primaryKeyword already used by ${clash.locale}/${clash.slug} — refresh instead`,
      );
    }
  }

  const images = extractMarkdownImages(article.bodyMarkdown);
  const rawImages = [
    ...article.bodyMarkdown.matchAll(/!\[([^\]]*)]\(([^)]+)\)/g),
  ];
  if (rawImages.some((m) => !m[1].trim())) {
    reasons.push("image missing alt");
  }
  void images;

  const claims: ArticleClaim[] = article.claims ?? [];
  if (pageType && claims.length === 0) {
    reasons.push("gated draft missing claims[]");
  }

  return { pass: reasons.length === 0, reasons };
}

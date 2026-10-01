#!/usr/bin/env npx tsx
/**
 * Build a VideoBrief from Map-6 data, detect-news topics, or a prompt.
 *
 *   npm run factory:brief
 *   npm run factory:brief -- --template deal
 *   npm run factory:brief -- --limit 8 --locale fr
 *   npm run factory:brief -- --prompt "Vice City neon pins"
 *   npm run factory:brief -- --from-detect
 */
import { SITE } from "../../src/lib/constants.ts";
import { getAllLocations } from "../../src/data/all-locations.ts";
import { getBrowsableLocations } from "../../src/lib/location-indexing.ts";
import { PREORDER_PRODUCTS } from "../../src/data/preorder-products.ts";
import { listTopics } from "../../src/lib/content/repository.ts";
import type { Location } from "../../src/data/locations.ts";
import {
  BEAT_SEC,
  END_SEC,
  GAMEPLAY_DEFAULT_SEC,
  HOOK_SEC,
  type DealBeat,
  type FactoryLocale,
  type FactoryTemplate,
  type GameplayClip,
  type PoiBeat,
  type VideoBrief,
} from "../src/schema/brief.ts";
import {
  argValue,
  DISCLAIMER,
  hasFlag,
  loadManifest,
  paths,
  saveBrief,
  slugify,
} from "./_shared.mts";
import path from "path";

const TEMPLATE_ALIASES: Record<string, FactoryTemplate> = {
  poi: "poi-countdown",
  "poi-countdown": "poi-countdown",
  deal: "deal-stack",
  "deal-stack": "deal-stack",
  ugc: "ugc-credit",
  "ugc-credit": "ugc-credit",
  play: "gameplay-cut",
  gameplay: "gameplay-cut",
  "gameplay-cut": "gameplay-cut",
};

function oneLine(text: string, max = 96): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max - 1).trimEnd()}…`;
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;
}

function mapUrl(locale: FactoryLocale, loc?: string): string {
  const base = `${siteUrl()}/${locale}/map`;
  const params = new URLSearchParams({ theme: "neon", ref: "map6shorts" });
  if (loc) params.set("loc", loc);
  return `${base}?${params.toString()}`;
}

function toPoiBeat(loc: Location, locale: FactoryLocale): PoiBeat {
  return {
    slug: loc.slug,
    name: loc.name,
    region: loc.region,
    line: oneLine(loc.description),
    x: loc.x,
    y: loc.y,
    mapPath: `/${locale}/map?loc=${loc.slug}&theme=neon&ref=map6shorts`,
  };
}

function scoreLocation(loc: Location, query: string): number {
  const hay = `${loc.name} ${loc.region} ${loc.description} ${loc.slug}`.toLowerCase();
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  let score = 0;
  for (const w of words) if (hay.includes(w)) score += 2;
  if (loc.confidence === "confirmed") score += 3;
  if (loc.category === "landmark") score += 1;
  return score;
}

function pickLocations(query?: string, limit = 7): Location[] {
  const pool = getBrowsableLocations(getAllLocations());
  if (!query) {
    return [...pool]
      .sort((a, b) => {
        const ac = a.confidence === "confirmed" ? 1 : 0;
        const bc = b.confidence === "confirmed" ? 1 : 0;
        return bc - ac || a.name.localeCompare(b.name);
      })
      .slice(0, limit);
  }
  return [...pool]
    .map((loc) => ({ loc, s: scoreLocation(loc, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.loc);
}

function dealBeats(): DealBeat[] {
  return PREORDER_PRODUCTS.filter(
    (p) => p.edition === "standard" || p.edition === "ultimate",
  )
    .slice(0, 6)
    .map((p) => {
      const eur = p.commerce?.streetEur ?? p.commerce?.msrpEur;
      const usd = p.commerce?.msrpUsd;
      const price = eur
        ? `€${eur}`
        : usd
          ? `$${usd}`
          : "Price pending";
      return {
        label: p.label,
        platform: p.platform,
        edition: p.edition,
        price,
        note: oneLine(p.description, 110),
      };
    });
}

function templateHook(
  template: FactoryTemplate,
  count: number,
  query?: string,
): string {
  if (template === "deal-stack") return "Street price vs RRP — before launch week";
  if (template === "ugc-credit") return "Community clip · credited";
  if (template === "gameplay-cut") {
    return query ? query.slice(0, 60) : "Own capture. Cut, caption, post.";
  }
  if (query) return `${count} ${query} pins on the fan map`;
  return `${count} Leonida pins worth opening tonight`;
}

function templateCaption(brief: Pick<VideoBrief, "hook" | "ctaUrl" | "template">) {
  if (brief.template === "deal-stack") {
    return `${brief.hook} Compare GTA 6 editions on Map-6. Affiliate links may earn a commission. ${brief.ctaUrl}`;
  }
  if (brief.template === "gameplay-cut") {
    return `${brief.hook} Own capture on Map-6. Licensed bed only. ${brief.ctaUrl}`;
  }
  return `${brief.hook} Free GTA 6 fan map — not Rockstar. ${brief.ctaUrl}`;
}

function resolveAsset(relOrAbs: string): string {
  return path.isAbsolute(relOrAbs)
    ? relOrAbs
    : path.join(paths.assets, relOrAbs);
}

function pickGameplay(query?: string, limit = 1): GameplayClip[] {
  const own = loadManifest().clips.filter((c) => c.licence === "own");
  const words = (query ?? "").toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const ranked = [...own]
    .map((c) => {
      const hay = `${c.id} ${c.tags.join(" ")} ${c.notes ?? ""}`.toLowerCase();
      const s = words.reduce((n, w) => n + (hay.includes(w) ? 2 : 0), 0);
      return { c, s };
    })
    .sort((a, b) => b.s - a.s || a.c.id.localeCompare(b.c.id));
  const picked = (words.length ? ranked.filter((x) => x.s > 0) : ranked)
    .slice(0, limit)
    .map((x) => x.c);
  return picked.map((c) => ({
    id: c.id,
    path: resolveAsset(c.path),
    durationSec: c.durationSec ?? GAMEPLAY_DEFAULT_SEC,
    tags: c.tags,
    label: c.id,
  }));
}

function pickBed(query?: string): string | undefined {
  const beds = loadManifest().audio.filter((a) => a.licence === "licensed-music");
  if (!beds.length) return undefined;
  const words = (query ?? "").toLowerCase().split(/\s+/);
  const hit = beds.find((a) =>
    words.some((w) => `${a.id} ${a.tags.join(" ")}`.toLowerCase().includes(w)),
  );
  return resolveAsset((hit ?? beds[0]).path);
}

async function maybeLlmHook(
  template: FactoryTemplate,
  names: string[],
  query?: string,
): Promise<string | null> {
  const key = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  if (!key || hasFlag("--no-llm")) return null;
  const useGroq = Boolean(process.env.GROQ_API_KEY);
  const url = useGroq
    ? "https://api.groq.com/openai/v1/chat/completions"
    : "https://api.openai.com/v1/chat/completions";
  const model = useGroq
    ? process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
    : process.env.OPENAI_MODEL || "gpt-4o-mini";
  const prompt = `Write one YouTube Short hook (max 9 words) for a vertical GTA 6 map video.
Template: ${template}
Pins/items: ${names.join(", ")}
Angle: ${query || "fan map pins"}
No leak claims. No "official Rockstar". No emoji. Return only the hook.`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text || text.length > 80) return null;
    return text.replace(/^["']|["']$/g, "");
  } catch {
    return null;
  }
}

async function fromDetect(): Promise<string | undefined> {
  const topics = await listTopics();
  const pick = topics
    .filter((t) => t.status === "scored" || t.status === "new")
    .sort((a, b) => (b.funnelScore ?? b.score) - (a.funnelScore ?? a.score))[0];
  if (!pick) return undefined;
  console.log(`detect-news topic: ${pick.headline}`);
  return pick.clipHook || pick.headline;
}

async function main() {
  const rawTemplate = argValue("--template") ?? "poi";
  const template = TEMPLATE_ALIASES[rawTemplate];
  if (!template) {
    throw new Error(`Unknown template: ${rawTemplate}`);
  }
  if (template === "ugc-credit") {
    throw new Error("Use npm run factory:ugc for community clips.");
  }

  const locale = (argValue("--locale") ?? "en") as FactoryLocale;
  const limit = Number(argValue("--limit") ?? (template === "gameplay-cut" ? 1 : 7));
  const query =
    argValue("--prompt") ??
    (hasFlag("--from-detect") ? await fromDetect() : undefined);

  const briefId = slugify(
    `${template}-${query ?? "daily"}-${new Date().toISOString().slice(0, 10)}`,
  );

  let items: PoiBeat[] | DealBeat[] = [];
  let clips: GameplayClip[] | undefined;
  let footagePath: string | undefined;
  let bedPath: string | undefined;
  let gameplaySec: number | undefined;

  if (template === "gameplay-cut") {
    clips = pickGameplay(query, limit);
    if (!clips.length) {
      throw new Error(
        "No own gameplay in factory/data/assets/manifest.json. Run: npm run factory:ingest -- --file ./clip.mp4 --tags gta5,chase",
      );
    }
    footagePath = clips[0].path;
    gameplaySec = Math.min(clips[0].durationSec, 18);
    bedPath = argValue("--bed") ?? pickBed(query);
  } else if (template === "deal-stack") {
    items = dealBeats();
  } else {
    items = pickLocations(query, limit).map((loc) => toPoiBeat(loc, locale));
    if (!items.length) {
      throw new Error("No browsable locations matched. Drop --prompt or widen it.");
    }
  }

  const names =
    clips?.map((c) => c.label) ??
    items.map((i) => ("name" in i ? i.name : i.label));
  const hook =
    argValue("--hook") ??
    (await maybeLlmHook(template, names, query)) ??
    templateHook(template, items.length || clips?.length || 1, query);

  const ctaUrl =
    template === "deal-stack"
      ? `${siteUrl()}/${locale}/guides/gta-6-preorder-guide`
      : template === "gameplay-cut"
        ? `${siteUrl()}/${locale}/maps/gta5`
        : mapUrl(locale, "slug" in (items[0] ?? {}) ? items[0].slug : undefined);

  const brief: VideoBrief = {
    id: briefId,
    template,
    locale,
    hook,
    caption: "",
    ctaLabel:
      template === "deal-stack"
        ? "Compare editions on Map-6"
        : template === "gameplay-cut"
          ? "More on the Map-6 GTA 5 map"
          : "Open these pins on Map-6",
    ctaUrl,
    items,
    footagePath,
    bedPath,
    clips,
    gameplaySec,
    cues: [
      { startSec: 0, endSec: HOOK_SEC, text: hook },
      {
        startSec: HOOK_SEC + items.length * BEAT_SEC,
        endSec: HOOK_SEC + items.length * BEAT_SEC + END_SEC,
        text: "Open the pin on Map-6",
      },
    ],
    createdAt: new Date().toISOString(),
    source: query
      ? hasFlag("--from-detect")
        ? "detect-news"
        : "prompt"
      : "map-data",
    eventKey: briefId,
    disclaimer: DISCLAIMER,
  };
  brief.caption = templateCaption(brief);

  const file = saveBrief(brief, { openScriptGate: true });
  console.log(`Brief ${brief.id}`);
  console.log(`  template=${brief.template} items=${brief.items.length}`);
  console.log(`  hook=${brief.hook}`);
  console.log(`  wrote ${file}`);
  console.log(`Next: npm run factory:review -- --approve-script ${brief.id}`);
  console.log(`  or:  npm run factory:desk`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

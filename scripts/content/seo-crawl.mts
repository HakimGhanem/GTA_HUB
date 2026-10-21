#!/usr/bin/env npx tsx
/**
 * Crawl every sitemap URL and write a SEO CSV + flag report.
 *
 *   npm run content:seo-crawl
 *   npm run content:seo-crawl -- --base https://map-6.com --limit 20
 */
import { mkdirSync, writeFileSync } from "fs";
import { franc } from "franc-min";
import { argValue } from "./_shared.mts";

const BASE = (argValue("--base") ?? "https://map-6.com").replace(/\/$/, "");
const LIMIT = Number(argValue("--limit") ?? 0);
const CONCURRENCY = Number(argValue("--concurrency") ?? 6);
const HOME_LOCALES = ["en", "fr"];

const ISO3_TO_LOCALE: Record<string, string> = {
  eng: "en",
  fra: "fr",
  spa: "es",
  por: "pt",
  deu: "de",
  ita: "it",
};

type Row = {
  url: string;
  locale: string;
  robots: string;
  canonical: string;
  hreflang: string;
  bodyLang: string;
  words: number;
  flagNoindexFromHome: string;
  flagFrNotFrench: string;
  flagCanonicalLocale: string;
  flagThin: string;
};

function localeFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    const m = path.match(/^\/([a-z]{2})(?:\/|$)/);
    return m?.[1] ?? "";
  } catch {
    return "";
  }
}

function stripTags(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, " ")
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html: string, name: string): string {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`,
    "i",
  );
  return re.exec(html)?.[1] ?? re2.exec(html)?.[1] ?? "";
}

function canonicalHref(html: string): string {
  const a = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i.exec(html);
  const b = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i.exec(html);
  return a?.[1] ?? b?.[1] ?? "";
}

function hreflangSet(html: string): string {
  const pairs: string[] = [];
  const re =
    /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi;
  const re2 =
    /<link[^>]+hreflang=["']([^"']+)["'][^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["']/gi;
  for (const rx of [re, re2]) {
    rx.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = rx.exec(html))) {
      pairs.push(`${m[1]}:${m[2]}`);
    }
  }
  return [...new Set(pairs)].sort().join(" | ");
}

function csvEscape(value: string | number): string {
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

async function fetchText(url: string): Promise<{ status: number; html: string; finalUrl: string }> {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "Map-6 seo-crawl/1.0" },
    signal: AbortSignal.timeout(25000),
  });
  const html = await res.text();
  return { status: res.status, html, finalUrl: res.url };
}

async function sitemapUrls(): Promise<string[]> {
  const { html } = await fetchText(`${BASE}/sitemap.xml`);
  return [...html.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

function pageLinks(html: string): string[] {
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const out: string[] = [];
  for (const href of hrefs) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("javascript:")) {
      continue;
    }
    try {
      const abs = new URL(href, BASE).href;
      if (abs.startsWith(BASE)) out.push(abs.split("#")[0]);
    } catch {
      /* skip */
    }
  }
  return [...new Set(out)];
}

async function pool<T, R>(items: T[], size: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, () => worker()));
  return results;
}

async function main() {
  let urls = await sitemapUrls();
  if (LIMIT > 0) urls = urls.slice(0, LIMIT);
  console.log(`Crawling ${urls.length} sitemap URLs from ${BASE}`);

  const homeLinks = new Set<string>();
  for (const loc of HOME_LOCALES) {
    try {
      const { html } = await fetchText(`${BASE}/${loc}`);
      for (const link of pageLinks(html)) homeLinks.add(link);
    } catch (err) {
      console.warn(`home ${loc} failed:`, err);
    }
  }

  const rows = await pool(urls, CONCURRENCY, async (url): Promise<Row> => {
    const locale = localeFromUrl(url);
    try {
      const { html } = await fetchText(url);
      const robots = metaContent(html, "robots") || "index, follow";
      const canonical = canonicalHref(html);
      const hreflang = hreflangSet(html);
      const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html)?.[1] ?? html;
      const text = stripTags(main);
      const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
      const iso3 = words >= 20 ? franc(text, { minLength: 20 }) : "und";
      const bodyLang = ISO3_TO_LOCALE[iso3] ?? iso3;
      const noindex = /noindex/i.test(robots);
      const canonLocale = canonical ? localeFromUrl(canonical) : "";
      const flagNoindexFromHome = noindex && homeLinks.has(url) ? "YES" : "";
      const flagFrNotFrench =
        locale === "fr" && bodyLang && bodyLang !== "fr" && bodyLang !== "und"
          ? `YES:${bodyLang}`
          : "";
      const flagCanonicalLocale =
        canonical && canonLocale && locale && canonLocale !== locale ? `YES:${canonLocale}` : "";
      const flagThin = words > 0 && words < 300 ? "YES" : "";
      return {
        url,
        locale,
        robots,
        canonical,
        hreflang,
        bodyLang,
        words,
        flagNoindexFromHome,
        flagFrNotFrench,
        flagCanonicalLocale,
        flagThin,
      };
    } catch (err) {
      return {
        url,
        locale,
        robots: `ERROR:${err instanceof Error ? err.message : String(err)}`,
        canonical: "",
        hreflang: "",
        bodyLang: "",
        words: 0,
        flagNoindexFromHome: "",
        flagFrNotFrench: "",
        flagCanonicalLocale: "",
        flagThin: "",
      };
    }
  });

  const header = [
    "url",
    "locale",
    "robots",
    "canonical",
    "hreflang",
    "body_lang",
    "word_count",
    "flag_noindex_from_home",
    "flag_fr_not_french",
    "flag_canonical_other_locale",
    "flag_under_300_words",
  ];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        r.url,
        r.locale,
        r.robots,
        r.canonical,
        r.hreflang,
        r.bodyLang,
        r.words,
        r.flagNoindexFromHome,
        r.flagFrNotFrench,
        r.flagCanonicalLocale,
        r.flagThin,
      ]
        .map(csvEscape)
        .join(","),
    ),
  ];

  mkdirSync("data/reports", { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const csvPath = `data/reports/seo-crawl-${stamp}.csv`;
  writeFileSync(csvPath, `${lines.join("\n")}\n`);

  const noindexHome = rows.filter((r) => r.flagNoindexFromHome);
  const frNotFr = rows.filter((r) => r.flagFrNotFrench);
  const canon = rows.filter((r) => r.flagCanonicalLocale);
  const thin = rows.filter((r) => r.flagThin);
  const errors = rows.filter((r) => r.robots.startsWith("ERROR"));

  console.log(`\nWrote ${csvPath} (${rows.length} rows)`);
  console.log(`noindex linked from homepage: ${noindexHome.length}`);
  for (const r of noindexHome) console.log(`  ${r.url}  robots=${r.robots}`);
  console.log(`/fr body not French: ${frNotFr.length}`);
  for (const r of frNotFr.slice(0, 40)) console.log(`  ${r.url}  ${r.flagFrNotFrench}  ${r.words}w`);
  console.log(`canonical → other locale: ${canon.length}`);
  for (const r of canon.slice(0, 40)) console.log(`  ${r.url}  → ${r.canonical}`);
  console.log(`under 300 words: ${thin.length}`);
  for (const r of thin.slice(0, 40)) console.log(`  ${r.url}  ${r.words}w`);
  if (errors.length) {
    console.log(`fetch errors: ${errors.length}`);
    for (const r of errors) console.log(`  ${r.url}  ${r.robots}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

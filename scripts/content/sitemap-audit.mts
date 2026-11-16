#!/usr/bin/env npx tsx
/**
 * Fetch every sitemap URL with redirects off. Report 3xx, 404, and
 * canonicals that do not point at the requested URL.
 *
 *   npm run content:sitemap-audit
 *   npm run content:sitemap-audit -- --base https://map-6.com --limit 20
 */
import { mkdirSync, writeFileSync } from "fs";
import { argValue } from "./_shared.mts";

const BASE = (argValue("--base") ?? "https://map-6.com").replace(/\/$/, "");
const LIMIT = Number(argValue("--limit") ?? 0);
const CONCURRENCY = Number(argValue("--concurrency") ?? 8);

type Finding = {
  url: string;
  status: number;
  finalUrl: string;
  canonical: string;
  issue: "3xx" | "404" | "canonical-elsewhere" | "error";
  detail: string;
};

function canonicalHref(html: string): string {
  const a = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i.exec(html);
  const b = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i.exec(html);
  return a?.[1] ?? b?.[1] ?? "";
}

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    const path = parsed.pathname.replace(/\/+$/, "") || "/";
    return `${parsed.origin}${path}${parsed.search}`;
  } catch {
    return url.replace(/\/+$/, "");
  }
}

async function fetchManual(
  url: string,
): Promise<{ status: number; html: string; location: string; finalUrl: string }> {
  const res = await fetch(url, {
    redirect: "manual",
    headers: { "User-Agent": "Map-6 sitemap-audit/1.0" },
    signal: AbortSignal.timeout(25000),
  });
  const html = res.status === 200 ? await res.text() : "";
  return {
    status: res.status,
    html,
    location: res.headers.get("location") ?? "",
    finalUrl: res.url,
  };
}

async function sitemapUrls(): Promise<string[]> {
  const res = await fetch(`${BASE}/sitemap.xml`, {
    headers: { "User-Agent": "Map-6 sitemap-audit/1.0" },
    signal: AbortSignal.timeout(30000),
  });
  const xml = await res.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
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
  console.log(`Auditing ${urls.length} sitemap URLs from ${BASE}`);

  const findings = (
    await pool(urls, CONCURRENCY, async (url): Promise<Finding | null> => {
      try {
        const { status, html, location } = await fetchManual(url);
        if (status >= 300 && status < 400) {
          return {
            url,
            status,
            finalUrl: location,
            canonical: "",
            issue: "3xx",
            detail: location || "(no Location header)",
          };
        }
        if (status === 404 || status === 410) {
          return {
            url,
            status,
            finalUrl: url,
            canonical: "",
            issue: "404",
            detail: `HTTP ${status}`,
          };
        }
        if (status !== 200) {
          return {
            url,
            status,
            finalUrl: url,
            canonical: "",
            issue: "error",
            detail: `HTTP ${status}`,
          };
        }
        const canonical = canonicalHref(html);
        if (canonical && normalizeUrl(canonical) !== normalizeUrl(url)) {
          return {
            url,
            status,
            finalUrl: url,
            canonical,
            issue: "canonical-elsewhere",
            detail: canonical,
          };
        }
        return null;
      } catch (err) {
        return {
          url,
          status: 0,
          finalUrl: "",
          canonical: "",
          issue: "error",
          detail: err instanceof Error ? err.message : String(err),
        };
      }
    })
  ).filter((row): row is Finding => Boolean(row));

  const stamp = new Date().toISOString().slice(0, 10);
  mkdirSync("data/reports", { recursive: true });
  const csvPath = `data/reports/sitemap-audit-${stamp}.csv`;
  const lines = [
    "url,status,issue,detail,canonical",
    ...findings.map((f) =>
      [f.url, f.status, f.issue, f.detail, f.canonical]
        .map((value) => {
          const s = String(value);
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(","),
    ),
  ];
  writeFileSync(csvPath, `${lines.join("\n")}\n`);

  const byIssue = {
    "3xx": findings.filter((f) => f.issue === "3xx"),
    "404": findings.filter((f) => f.issue === "404"),
    "canonical-elsewhere": findings.filter((f) => f.issue === "canonical-elsewhere"),
    error: findings.filter((f) => f.issue === "error"),
  };

  console.log(`\nWrote ${csvPath}`);
  console.log(`OK: ${urls.length - findings.length} / ${urls.length}`);
  for (const [issue, rows] of Object.entries(byIssue)) {
    console.log(`${issue}: ${rows.length}`);
    for (const row of rows) {
      console.log(`  ${row.status}  ${row.url}  → ${row.detail}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

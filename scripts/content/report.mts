#!/usr/bin/env npx tsx
/**
 * Traffic + earnings in one place: Search Console, GA4, AdSense.
 *
 *   npm run content:report
 *   npm run content:report -- --days 7
 *   npm run content:report -- --save-metrics   # feeds keyword_metrics.json
 *   npm run content:report -- --json
 *
 * Search Console and GA4 read through a service account. AdSense does NOT support
 * service accounts, so it needs a one-off OAuth refresh token — see --auth-url.
 * Each source is independent: missing credentials skip that block, they don't fail
 * the run.
 */
import { createSign, randomUUID } from "crypto";
import { existsSync, readFileSync } from "fs";
import { SITE } from "../../src/lib/constants.ts";
import { saveKeywordMetrics } from "../../src/lib/content/repository.ts";
import type { KeywordMetric } from "../../src/lib/content/schema.ts";
import { argValue, hasFlag } from "./_shared.mts";

const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const ADSENSE_SCOPE = "https://www.googleapis.com/auth/adsense.readonly";

type ServiceAccount = { client_email: string; private_key: string };

type Totals = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type Row = { key: string; clicks: number; impressions: number; ctr: number; position: number };

function days(): number {
  return Number(argValue("--days") ?? 28);
}

function isoDay(offsetDays: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

/** GSC lags ~2 days; asking for today returns empty rows. */
const WINDOW_END_LAG = 2;

function window_(): { startDate: string; endDate: string } {
  return { startDate: isoDay(days() + WINDOW_END_LAG), endDate: isoDay(WINDOW_END_LAG) };
}

function serviceAccount(): ServiceAccount | undefined {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (inline) return JSON.parse(inline) as ServiceAccount;
  const file = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (file && existsSync(file)) {
    return JSON.parse(readFileSync(file, "utf8")) as ServiceAccount;
  }
  return undefined;
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** JWT bearer grant — avoids pulling in googleapis for three GET calls. */
async function serviceAccountToken(sa: ServiceAccount, scope: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: sa.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64url(
    JSON.stringify(claims),
  )}`;
  const signature = createSign("RSA-SHA256")
    .update(unsigned)
    .sign(sa.private_key.replace(/\\n/g, "\n"));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${b64url(signature)}`,
    }),
  });
  const body = (await res.json()) as { access_token?: string; error_description?: string };
  if (!res.ok || !body.access_token) {
    throw new Error(`Token exchange failed: ${body.error_description ?? res.status}`);
  }
  return body.access_token;
}

async function adsenseToken(): Promise<string> {
  const clientId = process.env.ADSENSE_CLIENT_ID;
  const clientSecret = process.env.ADSENSE_CLIENT_SECRET;
  const refresh = process.env.ADSENSE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refresh) {
    throw new Error("ADSENSE_CLIENT_ID / _CLIENT_SECRET / _REFRESH_TOKEN missing");
  }
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refresh,
    }),
  });
  const body = (await res.json()) as { access_token?: string; error_description?: string };
  if (!res.ok || !body.access_token) {
    throw new Error(`AdSense token refresh failed: ${body.error_description ?? res.status}`);
  }
  return body.access_token;
}

async function getJson<T>(url: string, token: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${url}\n${text}`);
  return JSON.parse(text) as T;
}

// ── Search Console ────────────────────────────────────────────────────────────

type GscRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };

function gscProperty(): string {
  // A domain property ("sc-domain:map-6.com") reports every subdomain and scheme;
  // a URL-prefix property only reports that exact prefix.
  return process.env.GSC_SITE_URL ?? `sc-domain:${new URL(SITE.url).hostname}`;
}

async function gscQuery(
  token: string,
  dimensions: string[],
  rowLimit = 20,
): Promise<GscRow[]> {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    gscProperty(),
  )}/searchAnalytics/query`;
  const body = await getJson<{ rows?: GscRow[] }>(url, token, {
    method: "POST",
    body: JSON.stringify({ ...window_(), dimensions, rowLimit }),
  });
  return body.rows ?? [];
}

function toRows(rows: GscRow[]): Row[] {
  return rows.map((r) => ({
    key: r.keys?.[0] ?? "(total)",
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));
}

async function searchConsole(sa: ServiceAccount) {
  const token = await serviceAccountToken(sa, GSC_SCOPE);
  const [total] = await gscQuery(token, [], 1);
  const pages = toRows(await gscQuery(token, ["page"]));
  const queries = toRows(await gscQuery(token, ["query"]));
  const totals: Totals = total
    ? {
        clicks: total.clicks,
        impressions: total.impressions,
        ctr: total.ctr,
        position: total.position,
      }
    : { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  return { totals, pages, queries };
}

// ── GA4 ───────────────────────────────────────────────────────────────────────

type Ga4Response = {
  rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
  totals?: { metricValues: { value: string }[] }[];
};

async function ga4(sa: ServiceAccount) {
  const property = process.env.GA4_PROPERTY_ID;
  if (!property) throw new Error("GA4_PROPERTY_ID missing");
  const token = await serviceAccountToken(sa, GA4_SCOPE);
  const { startDate, endDate } = window_();
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`;

  const byChannel = await getJson<Ga4Response>(url, token, {
    method: "POST",
    body: JSON.stringify({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    }),
  });

  const byPage = await getJson<Ga4Response>(url, token, {
    method: "POST",
    body: JSON.stringify({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 15,
    }),
  });

  return {
    totals: {
      sessions: Number(byChannel.totals?.[0]?.metricValues?.[0]?.value ?? 0),
      users: Number(byChannel.totals?.[0]?.metricValues?.[1]?.value ?? 0),
      pageViews: Number(byChannel.totals?.[0]?.metricValues?.[2]?.value ?? 0),
    },
    channels: (byChannel.rows ?? []).map((r) => ({
      key: r.dimensionValues[0]?.value ?? "",
      sessions: Number(r.metricValues[0]?.value ?? 0),
      users: Number(r.metricValues[1]?.value ?? 0),
    })),
    pages: (byPage.rows ?? []).map((r) => ({
      key: r.dimensionValues[0]?.value ?? "",
      pageViews: Number(r.metricValues[0]?.value ?? 0),
      sessions: Number(r.metricValues[1]?.value ?? 0),
    })),
  };
}

// ── AdSense ───────────────────────────────────────────────────────────────────

type AdsenseReport = {
  headers?: { name: string; currencyCode?: string }[];
  totals?: { cells: { value: string }[] };
  rows?: { cells: { value: string }[] }[];
};

type PolicyIssue = {
  entityType?: string;
  action?: string;
  uri?: string;
  policyTopics?: { topic?: string; mustFix?: boolean }[];
  firstDetectedDate?: { year: number; month: number; day: number };
};

const ADSENSE_METRICS = [
  "ESTIMATED_EARNINGS",
  "PAGE_VIEWS",
  "IMPRESSIONS",
  "CLICKS",
  "PAGE_VIEWS_RPM",
  "IMPRESSIONS_CTR",
  "AD_REQUESTS_COVERAGE",
];

function dateParams(prefix: "startDate" | "endDate", day: string): string[] {
  const [y, m, d] = day.split("-");
  return [`${prefix}.year=${y}`, `${prefix}.month=${Number(m)}`, `${prefix}.day=${Number(d)}`];
}

async function adsense() {
  const token = await adsenseToken();
  const accounts = await getJson<{ accounts?: { name: string; displayName?: string }[] }>(
    "https://adsense.googleapis.com/v2/accounts",
    token,
  );
  const account = accounts.accounts?.[0];
  if (!account) throw new Error("No AdSense account on this login");

  const { startDate, endDate } = window_();
  const query = [
    ...ADSENSE_METRICS.map((m) => `metrics=${m}`),
    ...dateParams("startDate", startDate),
    ...dateParams("endDate", endDate),
  ].join("&");
  const report = await getJson<AdsenseReport>(
    `https://adsense.googleapis.com/v2/${account.name}/reports:generate?${query}`,
    token,
  );

  const byPage = await getJson<AdsenseReport>(
    `https://adsense.googleapis.com/v2/${account.name}/reports:generate?${query}&dimensions=PAGE_URL&orderBy=-ESTIMATED_EARNINGS&limit=10`,
    token,
  );

  // Policy issues and alerts are why AdSense silently stops filling slots.
  const issues = await getJson<{ policyIssues?: PolicyIssue[] }>(
    `https://adsense.googleapis.com/v2/${account.name}/policyIssues`,
    token,
  );
  const alerts = await getJson<{ alerts?: { severity?: string; message?: string }[] }>(
    `https://adsense.googleapis.com/v2/${account.name}/alerts`,
    token,
  );

  const names = (report.headers ?? []).map((h) => h.name);
  const cells = report.totals?.cells ?? [];
  const totals = Object.fromEntries(
    ADSENSE_METRICS.map((m) => [m, cells[names.indexOf(m)]?.value ?? "0"]),
  );
  const currency =
    report.headers?.find((h) => h.name === "ESTIMATED_EARNINGS")?.currencyCode ?? "";

  return {
    account: account.displayName ?? account.name,
    currency,
    totals,
    pages: (byPage.rows ?? []).map((r) => ({
      key: r.cells[0]?.value ?? "",
      earnings: r.cells[1]?.value ?? "0",
    })),
    policyIssues: issues.policyIssues ?? [],
    alerts: alerts.alerts ?? [],
  };
}

// ── Output ────────────────────────────────────────────────────────────────────

function pct(v: number): string {
  return `${(v * 100).toFixed(2)}%`;
}

function table(rows: { key: string; [k: string]: unknown }[], cols: string[], width = 52) {
  for (const row of rows) {
    const label = row.key.length > width ? `${row.key.slice(0, width - 1)}…` : row.key;
    const values = cols.map((c) => String(row[c])).join("  ");
    console.log(`  ${label.padEnd(width)} ${values}`);
  }
}

function authUrl() {
  const clientId = process.env.ADSENSE_CLIENT_ID;
  if (!clientId) throw new Error("ADSENSE_CLIENT_ID missing");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", "http://localhost");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", ADSENSE_SCOPE);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  console.log(`1. Open:\n${url}\n`);
  console.log(`2. Approve, then copy the ?code= value out of the localhost URL.`);
  console.log(`3. Exchange it for a refresh token:

curl -s https://oauth2.googleapis.com/token \\
  -d client_id=$ADSENSE_CLIENT_ID \\
  -d client_secret=$ADSENSE_CLIENT_SECRET \\
  -d redirect_uri=http://localhost \\
  -d grant_type=authorization_code \\
  -d code=PASTE_CODE

4. Put refresh_token in .env.local as ADSENSE_REFRESH_TOKEN.`);
}

async function main() {
  if (hasFlag("--auth-url")) {
    authUrl();
    return;
  }

  const { startDate, endDate } = window_();
  const sa = serviceAccount();
  const out: Record<string, unknown> = { window: { startDate, endDate } };

  console.log(`Map-6 report — ${startDate} → ${endDate} (${days()} days)\n`);

  if (!sa) {
    console.log("Search Console / GA4: skipped (GOOGLE_SERVICE_ACCOUNT_JSON missing)\n");
  } else {
    try {
      const gsc = await searchConsole(sa);
      out.searchConsole = gsc;
      const t = gsc.totals;
      console.log(
        `Search Console (${gscProperty()}): ${t.clicks} clicks, ${t.impressions} impressions, ` +
          `CTR ${pct(t.ctr)}, avg position ${t.position.toFixed(1)}`,
      );
      if (gsc.queries.length) {
        console.log("\n  Top queries");
        table(gsc.queries.slice(0, 10), ["clicks", "impressions"]);
      }
      if (gsc.pages.length) {
        console.log("\n  Top pages");
        table(gsc.pages.slice(0, 10), ["clicks", "impressions"]);
      }
      if (hasFlag("--save-metrics")) {
        const now = new Date().toISOString();
        const metrics: KeywordMetric[] = gsc.queries.map((q) => ({
          id: randomUUID(),
          keywordId: q.key,
          impressions: q.impressions,
          clicks: q.clicks,
          ctr: q.ctr,
          position: q.position,
          importedAt: now,
        }));
        await saveKeywordMetrics(metrics);
        console.log(`\n  Saved ${metrics.length} keyword metrics`);
      }
      console.log();
    } catch (err) {
      console.log(`Search Console: ${(err as Error).message}\n`);
    }

    try {
      const ga = await ga4(sa);
      out.ga4 = ga;
      console.log(
        `GA4 (${process.env.GA4_PROPERTY_ID}): ${ga.totals.sessions} sessions, ` +
          `${ga.totals.users} users, ${ga.totals.pageViews} page views`,
      );
      if (ga.channels.length) {
        console.log("\n  Channels");
        table(ga.channels, ["sessions", "users"], 28);
      }
      if (ga.pages.length) {
        console.log("\n  Top pages");
        table(ga.pages.slice(0, 10), ["pageViews"]);
      }
      console.log();
    } catch (err) {
      console.log(`GA4: ${(err as Error).message}\n`);
    }
  }

  try {
    const ads = await adsense();
    out.adsense = ads;
    const t = ads.totals;
    console.log(
      `AdSense (${ads.account}): ${t.ESTIMATED_EARNINGS} ${ads.currency}, ` +
        `${t.PAGE_VIEWS} page views, RPM ${t.PAGE_VIEWS_RPM}, ` +
        `${t.IMPRESSIONS} impressions, ${t.CLICKS} clicks, CTR ${t.IMPRESSIONS_CTR}, ` +
        `coverage ${t.AD_REQUESTS_COVERAGE}`,
    );
    if (ads.pages.length) {
      console.log("\n  Top earning pages");
      table(ads.pages, ["earnings"]);
    }
    if (ads.policyIssues.length) {
      console.log(`\n  ⚠ ${ads.policyIssues.length} policy issue(s)`);
      for (const i of ads.policyIssues) {
        const topics = (i.policyTopics ?? []).map((t) => t.topic).join(", ");
        console.log(`  - [${i.action ?? "?"}] ${i.uri ?? i.entityType ?? "?"} ${topics}`);
      }
    } else {
      console.log("\n  No policy issues");
    }
    for (const a of ads.alerts) {
      console.log(`  [${a.severity ?? "INFO"}] ${a.message ?? ""}`);
    }
    console.log();
  } catch (err) {
    console.log(`AdSense: ${(err as Error).message}`);
    console.log("  AdSense has no service-account support — run with --auth-url to set it up.\n");
  }

  if (hasFlag("--json")) console.log(JSON.stringify(out, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

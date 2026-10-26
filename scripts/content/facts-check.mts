#!/usr/bin/env npx tsx
/**
 * Re-fetch primary URLs from content/facts.json and print diffs.
 * Never writes facts.json.
 *
 *   npm run facts:check
 */
import { factCheckTokens, loadFacts, type Fact } from "../../src/lib/content/facts.ts";

const UA = "Map-6 facts-check/1.0 (+https://map-6.com)";

async function fetchText(url: string): Promise<{ ok: boolean; status: number; text: string }> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,application/json,text/plain" },
      redirect: "follow",
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      text: err instanceof Error ? err.message : String(err),
    };
  }
}

function haystack(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function printFact(fact: Fact, fetched: { ok: boolean; status: number; text: string }) {
  const tokens = factCheckTokens(fact);
  const body = haystack(fetched.text);
  const missing = tokens.filter((t) => !body.includes(t.toLowerCase()));
  const found = tokens.filter((t) => body.includes(t.toLowerCase()));

  console.log(`\n[${fact.id}] ${fact.status} source_type=${fact.source_type}`);
  console.log(`  url: ${fact.source_url}`);
  console.log(`  checkedAt: ${fact.checkedAt}  http: ${fetched.status}`);
  console.log(`  stored value: ${JSON.stringify(fact.value)}`);

  if (!fetched.ok) {
    console.log(`  DIFF: fetch failed — cannot confirm stored value`);
    return;
  }

  if (fact.status === "not_announced") {
    const leaks = [
      "gb",
      "unlock",
      "embargo",
      "metacritic",
      "voice actor",
      "pc release",
    ].filter((needle) => body.includes(needle));
    console.log(
      leaks.length
        ? `  NOTE: page mentions ${leaks.join(", ")} — re-read before changing facts.json`
        : `  OK: not_announced and no obvious new figure in excerpt`,
    );
    return;
  }

  if (!tokens.length) {
    console.log(`  SKIP: no tokens to match`);
    return;
  }
  if (!found.length) {
    console.log(`  DIFF: none of the stored tokens appear on the fetched HTML`);
    console.log(`  looked for → ${tokens.slice(0, 8).join(" | ")}`);
  } else if (missing.length) {
    console.log(`  PARTIAL: present → ${found.slice(0, 8).join(" | ")}`);
    console.log(`  not on this HTML → ${missing.slice(0, 8).join(" | ")}`);
  } else {
    console.log(`  OK: all stored tokens still present`);
  }
}

async function main() {
  const facts = await loadFacts();
  console.log(`facts:check — ${facts.length} rows (read-only, will not edit facts.json)\n`);

  const byUrl = new Map<string, Promise<{ ok: boolean; status: number; text: string }>>();
  for (const fact of facts) {
    if (!byUrl.has(fact.source_url)) {
      byUrl.set(fact.source_url, fetchText(fact.source_url));
    }
  }

  for (const fact of facts) {
    printFact(fact, await byUrl.get(fact.source_url)!);
  }

  console.log("\nDone. Edit content/facts.json by hand if a DIFF is a real change.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

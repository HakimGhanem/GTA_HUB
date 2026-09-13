/**
 * Affiliate coverage audit.
 *
 * Per locale: how many product cards carry a monetised Amazon link, whether it
 * points at a real product or at tagged search results, and which marketplace
 * tags are still missing. With --check-links it also resolves every /dp/ URL,
 * because an ASIN from another marketplace 404s silently and earns nothing.
 *
 *   npm run affiliate:audit
 *   npm run affiliate:audit -- --check-links
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

// Must run before the product modules evaluate: they read ASINs and tags at
// import time, so a late load would audit an empty configuration.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: path.join(root, ".env.local"), quiet: true });
loadEnv({ path: path.join(root, ".env"), quiet: true });

const { routing } = await import("../src/i18n/routing");
const { PREORDER_PRODUCTS } = await import("../src/data/preorder-products");
const { EXTENDED_PRODUCTS } = await import("../src/lib/affiliate/catalog");
const {
  AMAZON_STORE_IDS,
  amazonAsinEnvVar,
  amazonTagEnvVar,
  asinForAmazonStore,
} = await import("../src/lib/affiliate/amazon-markets");
const { STORES } = await import("../src/lib/affiliate/stores");
const { offersForProduct } = await import("../src/lib/affiliate/store-links");

const checkLinks = process.argv.includes("--check-links");
const products = [...PREORDER_PRODUCTS, ...EXTENDED_PRODUCTS];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

console.log("── Marketplace tags ─────────────────────────────");
for (const id of AMAZON_STORE_IDS) {
  const store = STORES.find((s) => s.id === id);
  const state = store?.enabled ? "enabled " : "DISABLED";
  console.log(`${state} ${id.padEnd(13)} ${amazonTagEnvVar(id)}`);
}

let missingAmazon = 0;

for (const locale of routing.locales) {
  const rows = products
    .map((product) => ({ product, offers: offersForProduct(product, locale) }))
    .filter((row) => row.offers.length > 0);

  const amazonRows = rows.filter((r) =>
    r.offers.some((o) => o.variant === "amazon"),
  );
  const exact = rows.filter((r) =>
    r.offers.some((o) => o.variant === "amazon" && o.target === "product"),
  );

  console.log(`\n── /${locale} ───────────────────────────────────`);
  console.log(
    `${amazonRows.length}/${rows.length} cards with an Amazon link ` +
      `(${exact.length} exact product, ${amazonRows.length - exact.length} search fallback)`,
  );
  if (amazonRows.length === 0) {
    missingAmazon++;
    console.log("  !! no monetised Amazon link on this locale");
  }
  for (const { product, offers } of rows) {
    const amazon = offers.filter((o) => o.variant === "amazon");
    const detail = amazon.length
      ? amazon.map((o) => `${o.id}:${o.target}`).join(" ")
      : "— none —";
    console.log(`  ${product.envKey.padEnd(22)} ${detail}`);
  }
}

if (checkLinks) {
  console.log("\n── Link health (/dp/ URLs) ──────────────────────");
  for (const product of products) {
    for (const id of AMAZON_STORE_IDS) {
      const asin = asinForAmazonStore(product, id);
      if (!asin) continue;
      const base = STORES.find((s) => s.id === id)?.baseUrl ?? "";
      const url = `${base}/dp/${asin}`;
      let verdict = "unreachable";
      try {
        const res = await fetch(url, { headers: { "User-Agent": UA } });
        const html = await res.text();
        const title = /<title>([^<]*)<\/title>/.exec(html)?.[1]?.trim() ?? "";
        const dead = /Page Not Found|Sorry, we just need/i.test(title);
        verdict = `${res.status} ${dead ? "DEAD" : "ok"} — ${title.slice(0, 60)}`;
      } catch {
        /* keep default verdict */
      }
      console.log(`  ${product.envKey.padEnd(22)} ${asin} ${id.padEnd(13)} ${verdict}`);
      await new Promise((r) => setTimeout(r, 900));
    }
  }
}

console.log("\n── Gaps to fill ─────────────────────────────────");
for (const id of AMAZON_STORE_IDS) {
  if (!STORES.find((s) => s.id === id)?.enabled) continue;
  const missing = products.filter((p) => !asinForAmazonStore(p, id));
  if (missing.length === 0) continue;
  console.log(`${id}: ${missing.length} slots on search fallback`);
  for (const p of missing) console.log(`  ${amazonAsinEnvVar(id, p.envKey)}=`);
}

if (missingAmazon > 0) {
  console.log(
    `\n${missingAmazon} locale(s) earn nothing on Amazon — set their marketplace tag.`,
  );
}

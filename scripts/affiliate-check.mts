/**
 * Affiliate invariants. Fails loudly instead of silently demonetising.
 *
 * Covers the three failure modes that cost money without breaking a build:
 *  - a tracking env var that the bundle can never read (dynamic process.env),
 *  - an env var declared in code but absent from the Docker build args,
 *  - an outbound link shipped without its partner tag.
 *
 *   npm run affiliate:check
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: path.join(root, ".env.local"), quiet: true });
loadEnv({ path: path.join(root, ".env"), quiet: true });

const { PREORDER_PRODUCTS } = await import("../src/data/preorder-products");
const { EXTENDED_PRODUCTS } = await import("../src/lib/affiliate/catalog");
const {
  AMAZON_STORE_IDS,
  amazonAsinEnvVar,
  asinForAmazonStore,
  hasAsinEnvOverride,
} = await import("../src/lib/affiliate/amazon-markets");
const { STORES } = await import("../src/lib/affiliate/stores");
const { offersForProduct } = await import("../src/lib/affiliate/store-links");
const {
  PARTNER_IDS,
  applyAffiliateBase,
  partnerBaseEnvVar,
  untrackedPartners,
} = await import("../src/lib/affiliate/partner-bases");
const { isPriceSurveyStale, PRICE_SURVEY_DATE, PRICE_SURVEY_MAX_AGE_DAYS, priceSurveyAgeDays } =
  await import("../src/data/gta6-retailers");

const products = [...PREORDER_PRODUCTS, ...EXTENDED_PRODUCTS];
const dockerfile = readFileSync(path.join(root, "Dockerfile"), "utf8");

let failed = 0;
let passed = 0;

function check(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  ok   ${name}`);
  } catch (error) {
    failed++;
    const message = error instanceof Error ? error.message : String(error);
    console.log(`  FAIL ${name}\n       ${message.split("\n")[0]}`);
  }
}

console.log("── Env plumbing ─────────────────────────────────");

/** Comments in these modules quote the forbidden pattern to explain it. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

check("no dynamic process.env lookup in the affiliate layer", () => {
  // The Cloud Run runner stage carries no NEXT_PUBLIC_* vars and Next inlines
  // literal reads only, so a computed key is permanently "" in production.
  const offenders: string[] = [];
  for (const file of [
    "src/lib/affiliate/partner-bases.ts",
    "src/lib/affiliate/stores.ts",
    "src/lib/affiliate/store-links.ts",
    "src/lib/affiliate/retailers.ts",
    "src/lib/affiliate/amazon-markets.ts",
    "src/lib/amazon-affiliate.ts",
  ]) {
    const source = stripComments(readFileSync(path.join(root, file), "utf8"));
    if (/process\.env\[/.test(source)) offenders.push(file);
  }
  assert.deepEqual(offenders, [], `dynamic env read in ${offenders.join(", ")}`);
});

check("every partner base env var is wired into the Dockerfile", () => {
  const missing = PARTNER_IDS.filter((id) => {
    const name = partnerBaseEnvVar(id);
    return !dockerfile.includes(`ARG ${name}=`) || !dockerfile.includes(`ENV ${name}=`);
  }).map(partnerBaseEnvVar);
  assert.deepEqual(missing, [], `not declared in Dockerfile: ${missing.join(", ")}`);
});

check("every overridable ASIN env var is wired into the Dockerfile", () => {
  const missing: string[] = [];
  for (const store of AMAZON_STORE_IDS) {
    if (store === "amazon_fr") continue;
    for (const product of products) {
      if (!hasAsinEnvOverride(store, product.envKey)) continue;
      const name = amazonAsinEnvVar(store, product.envKey);
      if (!dockerfile.includes(`ARG ${name}=`)) missing.push(name);
    }
  }
  assert.deepEqual(missing, [], `not declared in Dockerfile: ${missing.join(", ")}`);
});

console.log("\n── Link building ────────────────────────────────");

check("applyAffiliateBase honours every supported base shape", () => {
  const dest = "https://www.fnac.com/x?a=1";
  assert.equal(
    applyAffiliateBase("https://t.net/r?url={url}", dest, "gta 6"),
    `https://t.net/r?url=${encodeURIComponent(dest)}`,
  );
  assert.equal(
    applyAffiliateBase("https://t.net/s?q={q}", dest, "gta 6"),
    "https://t.net/s?q=gta%206",
  );
  assert.equal(
    applyAffiliateBase("https://t.net/r?url=", dest, "gta 6"),
    `https://t.net/r?url=${encodeURIComponent(dest)}`,
  );
  // An unset base must leave a working link rather than a broken one.
  assert.equal(applyAffiliateBase("", dest, "gta 6"), dest);
  assert.equal(applyAffiliateBase("   ", dest, "gta 6"), dest);
});

check("every Amazon offer carries its marketplace tag", () => {
  const untagged: string[] = [];
  for (const locale of ["en", "fr"]) {
    for (const product of products) {
      for (const offer of offersForProduct(product, locale)) {
        if (offer.variant !== "amazon") continue;
        const tag = STORES.find((s) => s.id === offer.id)?.tag;
        if (!tag || !offer.href.includes(`tag=${tag}`)) {
          untagged.push(`${locale}/${product.envKey}/${offer.id}`);
        }
      }
    }
  }
  assert.deepEqual(untagged, [], `untagged: ${untagged.slice(0, 5).join(", ")}`);
});

check("no /dp/ link uses another marketplace's ASIN", () => {
  const wrong: string[] = [];
  for (const locale of ["en", "fr"]) {
    for (const product of products) {
      for (const offer of offersForProduct(product, locale)) {
        const asin = /\/dp\/([A-Z0-9]+)/.exec(offer.href)?.[1];
        if (!asin) continue;
        const expected = asinForAmazonStore(product, offer.id as never);
        if (asin !== expected) {
          wrong.push(`${locale}/${product.envKey}/${offer.id}: ${asin}`);
        }
      }
    }
  }
  assert.deepEqual(wrong, [], `mismatched: ${wrong.slice(0, 5).join(", ")}`);
});

check("a product link is never a bare storefront homepage", () => {
  const bare: string[] = [];
  for (const locale of ["en", "fr"]) {
    for (const product of products) {
      for (const offer of offersForProduct(product, locale)) {
        const { pathname, search } = new URL(offer.href);
        if (pathname.replace(/\/$/, "") === "" && !search) {
          bare.push(`${locale}/${product.envKey}/${offer.id}`);
        }
      }
    }
  }
  assert.deepEqual(bare, [], `homepage links: ${bare.slice(0, 5).join(", ")}`);
});

console.log("\n── Price survey ─────────────────────────────────");

check(`survey is at most ${PRICE_SURVEY_MAX_AGE_DAYS} days old`, () => {
  assert.ok(
    !isPriceSurveyStale(),
    `surveyed ${PRICE_SURVEY_DATE}, ${priceSurveyAgeDays()} days ago — re-check the merchant pages and bump PRICE_SURVEY_DATE`,
  );
});

console.log("\n── Revenue gaps (warnings) ──────────────────────");

const donating = untrackedPartners();
if (donating.length > 0) {
  console.log(
    `  ${donating.length}/${PARTNER_IDS.length} merchants send traffic for free:`,
  );
  for (const id of donating) console.log(`    ${id.padEnd(15)} ${partnerBaseEnvVar(id)}=`);
} else {
  console.log("  every partner merchant is tracked");
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);

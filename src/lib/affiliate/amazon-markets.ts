/**
 * Amazon marketplace registry.
 *
 * ASINs are marketplace-specific: the amazon.fr ASIN of a game is not valid on
 * amazon.co.uk or amazon.com. Every storefront therefore resolves its own ASIN,
 * and a product without an ASIN for that marketplace falls back to a tagged
 * search link rather than a dead /dp/ page.
 *
 * Kept free of app imports so both `stores.ts` and the product data modules can
 * depend on it without a cycle.
 */

export const AMAZON_STORE_IDS = [
  "amazon_fr",
  "amazon_co_uk",
  "amazon_com",
  "amazon_de",
  "amazon_es",
  "amazon_it",
] as const;

export type AmazonStoreId = (typeof AMAZON_STORE_IDS)[number];

export function isAmazonStoreId(id: string): id is AmazonStoreId {
  return (AMAZON_STORE_IDS as readonly string[]).includes(id);
}

/**
 * Env-var infix per marketplace. amazon.fr is the historical default and keeps
 * the unprefixed names (NEXT_PUBLIC_AMAZON_AFFILIATE_TAG /
 * NEXT_PUBLIC_AMAZON_ASIN_<KEY>) so existing deployments keep working.
 */
const ENV_INFIX: Record<AmazonStoreId, string> = {
  amazon_fr: "",
  amazon_co_uk: "UK_",
  amazon_com: "US_",
  amazon_de: "DE_",
  amazon_es: "ES_",
  amazon_it: "IT_",
};

/** e.g. amazon_co_uk → NEXT_PUBLIC_AMAZON_UK_TAG */
export function amazonTagEnvVar(storeId: AmazonStoreId): string {
  return storeId === "amazon_fr"
    ? "NEXT_PUBLIC_AMAZON_AFFILIATE_TAG"
    : `NEXT_PUBLIC_AMAZON_${ENV_INFIX[storeId]}TAG`;
}

/** e.g. (amazon_co_uk, GTA6_PS5) → NEXT_PUBLIC_AMAZON_UK_ASIN_GTA6_PS5 */
export function amazonAsinEnvVar(
  storeId: AmazonStoreId,
  envKey: string,
): string {
  return `NEXT_PUBLIC_AMAZON_${ENV_INFIX[storeId]}ASIN_${envKey}`;
}

/** Structural shape shared by PREORDER_PRODUCTS and EXTENDED_PRODUCTS. */
export type AmazonAsinSource = {
  envKey: string;
  /** amazon.fr ASIN (already env-resolved at module load) */
  asin: string;
  asinByStore?: Partial<Record<AmazonStoreId, string>>;
};

/**
 * ASIN for one marketplace, or "" when we have none. Env wins over the
 * hardcoded default so ops can fix a link without a code change.
 */
export function asinForAmazonStore(
  product: AmazonAsinSource,
  storeId: AmazonStoreId,
): string {
  if (storeId === "amazon_fr") return product.asin.trim();
  const fromEnv = process.env[amazonAsinEnvVar(storeId, product.envKey)]?.trim();
  if (fromEnv) return fromEnv;
  return product.asinByStore?.[storeId]?.trim() ?? "";
}

/**
 * Whether Amazon carries this product at all, in any marketplace.
 *
 * Gates the search fallback: digital-only tiers (Ultimate) and unannounced SKUs
 * (Collector's) have no ASIN anywhere, so they must not get an Amazon link that
 * lands on empty search results.
 */
export function existsOnAmazon(product: AmazonAsinSource): boolean {
  return AMAZON_STORE_IDS.some(
    (id) => asinForAmazonStore(product, id).length > 0,
  );
}

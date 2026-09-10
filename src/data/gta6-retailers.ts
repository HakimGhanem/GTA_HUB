import { buildRetailerUrl, RETAILERS, type RetailerId } from "@/lib/affiliate/retailers";

export type OfferPlatform = "PS5" | "Xbox";
export type OfferEdition = "standard" | "ultimate";
/** Physical GTA 6 boxes hold a download code, not a disc */
export type OfferFormat = "code_in_box" | "digital";
export type OfferAvailability = "in_stock" | "restocking" | "unlisted";

/** Wording lives in the i18n layer so the dataset stays language-neutral */
export type OfferBonusKey = "vintage_pack" | "vintage_pack_gta_plus" | "none";
export type OfferPolicyKey =
  | "charge_on_ship"
  | "cancel_until_ship"
  | "store_credit_refund"
  | "no_refund_after_release";

export type RetailerOffer = {
  retailer: RetailerId;
  platform: OfferPlatform;
  edition: OfferEdition;
  format: OfferFormat;
  /** Price TTC in EUR — null when the retailer does not list the SKU */
  priceEur: number | null;
  availability: OfferAvailability;
  bonus: OfferBonusKey;
  policy: OfferPolicyKey;
  /** Destination before affiliate wrapping — merchant search, never a guessed SKU path */
  url: string;
  /** ISO date this row was last checked against the merchant page */
  verifiedAt: string;
};

/** Publisher MSRP for the FR market — the "you save" baseline */
export const MSRP_EUR = 79.99;
export const PRICE_CURRENCY = "EUR";

/**
 * Manual price survey. Re-check the merchant pages and bump both this date and
 * every `verifiedAt` you touch — the page renders the date, so a stale value
 * is worse than no comparator at all.
 */
export const PRICE_SURVEY_DATE = "2026-09-09";

const CHECKED = PRICE_SURVEY_DATE;

export const RETAILER_OFFERS: RetailerOffer[] = [
  // ── Retailers: code-in-box Standard, discounted below MSRP ──────
  {
    retailer: "amazon_fr",
    platform: "PS5",
    edition: "standard",
    format: "code_in_box",
    priceEur: 60,
    availability: "restocking",
    bonus: "vintage_pack",
    policy: "charge_on_ship",
    url: "https://www.amazon.fr/s?k=Grand+Theft+Auto+VI+PS5",
    verifiedAt: CHECKED,
  },
  {
    retailer: "amazon_fr",
    platform: "Xbox",
    edition: "standard",
    format: "code_in_box",
    priceEur: 60,
    availability: "restocking",
    bonus: "vintage_pack",
    policy: "charge_on_ship",
    url: "https://www.amazon.fr/s?k=Grand+Theft+Auto+VI+Xbox+Series+X",
    verifiedAt: CHECKED,
  },
  {
    retailer: "fnac",
    platform: "PS5",
    edition: "standard",
    format: "code_in_box",
    priceEur: 60,
    availability: "in_stock",
    bonus: "vintage_pack",
    policy: "cancel_until_ship",
    url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=Grand+Theft+Auto+VI+PS5",
    verifiedAt: CHECKED,
  },
  {
    retailer: "fnac",
    platform: "Xbox",
    edition: "standard",
    format: "code_in_box",
    priceEur: 60,
    availability: "in_stock",
    bonus: "vintage_pack",
    policy: "cancel_until_ship",
    url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=Grand+Theft+Auto+VI+Xbox",
    verifiedAt: CHECKED,
  },
  {
    retailer: "cdiscount",
    platform: "PS5",
    edition: "standard",
    format: "code_in_box",
    priceEur: 60,
    availability: "in_stock",
    bonus: "vintage_pack",
    policy: "cancel_until_ship",
    url: "https://www.cdiscount.com/search/10/grand+theft+auto+vi+ps5.html",
    verifiedAt: CHECKED,
  },
  {
    retailer: "cdiscount",
    platform: "Xbox",
    edition: "standard",
    format: "code_in_box",
    priceEur: 60,
    availability: "in_stock",
    bonus: "vintage_pack",
    policy: "cancel_until_ship",
    url: "https://www.cdiscount.com/search/10/grand+theft+auto+vi+xbox.html",
    verifiedAt: CHECKED,
  },
  {
    retailer: "carrefour",
    platform: "PS5",
    edition: "standard",
    format: "code_in_box",
    priceEur: 60,
    availability: "in_stock",
    bonus: "vintage_pack",
    policy: "cancel_until_ship",
    url: "https://www.carrefour.fr/s?q=Grand%20Theft%20Auto%20VI%20PS5",
    verifiedAt: CHECKED,
  },
  {
    retailer: "carrefour",
    platform: "Xbox",
    edition: "standard",
    format: "code_in_box",
    priceEur: 60,
    availability: "in_stock",
    bonus: "vintage_pack",
    policy: "cancel_until_ship",
    url: "https://www.carrefour.fr/s?q=Grand%20Theft%20Auto%20VI%20Xbox",
    verifiedAt: CHECKED,
  },

  // ── Official stores: full MSRP, never out of stock ──────────────
  {
    retailer: "ps_store",
    platform: "PS5",
    edition: "standard",
    format: "digital",
    priceEur: MSRP_EUR,
    availability: "in_stock",
    bonus: "vintage_pack_gta_plus",
    policy: "no_refund_after_release",
    url: "https://store.playstation.com/fr-fr/search/Grand%20Theft%20Auto%20VI",
    verifiedAt: CHECKED,
  },
  {
    retailer: "ps_store",
    platform: "PS5",
    edition: "ultimate",
    format: "digital",
    priceEur: 99.99,
    availability: "in_stock",
    bonus: "vintage_pack_gta_plus",
    policy: "no_refund_after_release",
    url: "https://store.playstation.com/fr-fr/search/Grand%20Theft%20Auto%20VI",
    verifiedAt: CHECKED,
  },
  {
    retailer: "xbox_store",
    platform: "Xbox",
    edition: "standard",
    format: "digital",
    priceEur: MSRP_EUR,
    availability: "in_stock",
    bonus: "vintage_pack_gta_plus",
    policy: "no_refund_after_release",
    url: "https://www.xbox.com/fr-FR/games/store/search?q=Grand%20Theft%20Auto%20VI",
    verifiedAt: CHECKED,
  },
  {
    retailer: "xbox_store",
    platform: "Xbox",
    edition: "ultimate",
    format: "digital",
    priceEur: 99.99,
    availability: "in_stock",
    bonus: "vintage_pack_gta_plus",
    policy: "no_refund_after_release",
    url: "https://www.xbox.com/fr-FR/games/store/search?q=Grand%20Theft%20Auto%20VI",
    verifiedAt: CHECKED,
  },
];

export function offersForPlatform(platform: OfferPlatform): RetailerOffer[] {
  return RETAILER_OFFERS.filter((o) => o.platform === platform).sort(
    (a, b) => (a.priceEur ?? Infinity) - (b.priceEur ?? Infinity),
  );
}

export function lowestPriceEur(offers = RETAILER_OFFERS): number | null {
  const prices = offers
    .map((o) => o.priceEur)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}

export function highestPriceEur(offers = RETAILER_OFFERS): number | null {
  const prices = offers
    .map((o) => o.priceEur)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.max(...prices) : null;
}

/** Savings versus MSRP, rounded to whole euros for headline copy */
export function savingsVsMsrp(priceEur: number | null): number {
  if (priceEur === null) return 0;
  return Math.max(0, Math.round(MSRP_EUR - priceEur));
}

/** Number only — the copy layer owns the € sign and its position */
export function formatEur(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : locale, {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function offerLabel(offer: RetailerOffer): string {
  return RETAILERS[offer.retailer].label;
}

export function offerHref(offer: RetailerOffer): string {
  return buildRetailerUrl(offer.retailer, offer.url);
}

export function offerKey(offer: RetailerOffer): string {
  return `${offer.retailer}-${offer.platform}-${offer.edition}`;
}

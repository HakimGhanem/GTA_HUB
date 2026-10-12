/**
 * Partner tracking bases for every non-Amazon merchant.
 *
 * Single source of truth: `stores.ts` (multi-locale offer buttons) and
 * `retailers.ts` (FR price comparator) both read from here, so a merchant
 * cannot be monetised on one surface and donated on the other.
 *
 * Every lookup below is a literal `process.env.NEXT_PUBLIC_*` member access.
 * That is load-bearing, not style: Next inlines those at build time, and the
 * Cloud Run runner stage carries no NEXT_PUBLIC_* vars, so a dynamic
 * `process.env[key]` lookup resolves to "" in production no matter how the
 * deploy is configured.
 */

export const PARTNER_IDS = [
  "fnac",
  "cdiscount",
  "carrefour",
  "bestbuy",
  "instant_gaming",
  "eneba",
  "cdkeys",
] as const;

export type PartnerId = (typeof PARTNER_IDS)[number];

const PARTNER_BASES: Record<PartnerId, string> = {
  fnac: process.env.NEXT_PUBLIC_FNAC_AFFILIATE_BASE ?? "",
  cdiscount: process.env.NEXT_PUBLIC_CDISCOUNT_AFFILIATE_BASE ?? "",
  carrefour: process.env.NEXT_PUBLIC_CARREFOUR_AFFILIATE_BASE ?? "",
  bestbuy: process.env.NEXT_PUBLIC_BESTBUY_AFFILIATE_BASE ?? "",
  instant_gaming: process.env.NEXT_PUBLIC_INSTANT_GAMING_AFFILIATE_BASE ?? "",
  eneba: process.env.NEXT_PUBLIC_ENEBA_AFFILIATE_BASE ?? "",
  cdkeys: process.env.NEXT_PUBLIC_CDKEYS_AFFILIATE_BASE ?? "",
};

const ENV_INFIX: Record<PartnerId, string> = {
  fnac: "FNAC",
  cdiscount: "CDISCOUNT",
  carrefour: "CARREFOUR",
  bestbuy: "BESTBUY",
  instant_gaming: "INSTANT_GAMING",
  eneba: "ENEBA",
  cdkeys: "CDKEYS",
};

/** Env var that enables this merchant — printed by the audit script. */
export function partnerBaseEnvVar(id: PartnerId): string {
  return `NEXT_PUBLIC_${ENV_INFIX[id]}_AFFILIATE_BASE`;
}

/** Configured tracking base, or "" when the merchant earns nothing. */
export function partnerBase(id: PartnerId): string {
  return PARTNER_BASES[id].trim();
}

/** True when an outbound click is commissioned — drives `rel="sponsored"`. */
export function isPartnerTracked(id: PartnerId): boolean {
  return partnerBase(id).length > 0;
}

export function untrackedPartners(): PartnerId[] {
  return PARTNER_IDS.filter((id) => !isPartnerTracked(id));
}

/**
 * Apply a partner base to an official destination.
 * Supports `{url}` / `{q}` placeholders or a tracking URL that already ends
 * with `=`. Never invents partner IDs: an unset base returns the destination
 * untouched so the link still works, it just earns nothing.
 */
export function applyAffiliateBase(
  base: string,
  destination: string,
  query: string,
): string {
  const trimmed = base.trim();
  if (!trimmed) return destination;
  if (trimmed.includes("{url}")) {
    return trimmed.replaceAll("{url}", encodeURIComponent(destination));
  }
  if (trimmed.includes("{q}")) {
    return trimmed.replaceAll("{q}", encodeURIComponent(query));
  }
  if (trimmed.endsWith("=")) {
    return `${trimmed}${encodeURIComponent(destination)}`;
  }
  return trimmed;
}

/** Wrap an official destination with this merchant's tracking when configured. */
export function wrapWithPartnerBase(
  id: PartnerId,
  destination: string,
  query = "",
): string {
  return applyAffiliateBase(partnerBase(id), destination, query);
}

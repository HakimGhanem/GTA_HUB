import { trackEvent } from "./track";

/**
 * Where the click happened. Keep these stable: they are the dimension you
 * group by in GA4 to tell a converting surface from a decorative one.
 */
export type AffiliatePlacement =
  | "preorder_guide"
  | "best_price_comparator"
  | "guide_grid"
  | "news_article"
  | "hub_banner";

export type AffiliateClick = {
  placement: AffiliatePlacement;
  /** Store / retailer id — `amazon_fr`, `fnac`, `ps_store`… */
  merchant: string;
  /** False for official stores and unconfigured partners: traffic we donate. */
  monetised: boolean;
  /** Product slot (`GTA6_PS5`) or comparator row key. */
  item: string;
  edition?: string;
  platform?: string;
  locale: string;
  /** `product` lands on the item, `search` on tagged results. */
  target?: "product" | "search";
  /** 0-based rank in the list as rendered — primary CTA is 0. */
  position?: number;
  /** Listed price, when the surface shows one. */
  value?: number;
  currency?: string;
};

/**
 * One event name for every outbound merchant click, on every surface.
 *
 * `monetised` is the parameter that matters: comparing it against total clicks
 * is how you see traffic leaving for free, which no commission report shows
 * because an untracked click simply never reaches the network.
 */
export function trackAffiliateClick(click: AffiliateClick): void {
  trackEvent("affiliate_click", {
    placement: click.placement,
    merchant: click.merchant,
    monetised: click.monetised,
    item_slot: click.item,
    edition: click.edition,
    platform: click.platform,
    page_locale: click.locale,
    link_target: click.target,
    position: click.position,
    value: click.value,
    currency: click.value != null ? (click.currency ?? "EUR") : undefined,
  });
}

import { AmazonProductCard } from "@/components/affiliate/AmazonProductCard";
import { liveProductsForIntent, productsForIntents } from "@/lib/affiliate/catalog";
import type { AffiliateIntent } from "@/lib/affiliate/intents";
import { INTENT_META } from "@/lib/affiliate/intents";

type AffiliateProductGridProps = {
  intents: AffiliateIntent[];
  /**
   * Prefer only ASINs that are filled.
   * Defaults to true so content surfaces never show empty SiteStripe shells.
   */
  liveOnly?: boolean;
  /**
   * Dev-only: keep empty ASIN cards for SiteStripe wiring.
   * No effect in production.
   */
  showPlaceholders?: boolean;
  className?: string;
  /** Pass null to suppress the heading (parent provides one) */
  title?: string | null;
};

/**
 * Funnel brick: render product cards for one or more purchase intents.
 * Use on guides / news with affiliate monetization.
 */
export function AffiliateProductGrid({
  intents,
  liveOnly = true,
  showPlaceholders = false,
  className,
  title,
}: AffiliateProductGridProps) {
  const allowPlaceholders =
    showPlaceholders && process.env.NODE_ENV !== "production";

  const products =
    liveOnly && !allowPlaceholders
      ? intents.flatMap((i) => liveProductsForIntent(i))
      : productsForIntents(intents);

  // Dedupe by envKey
  const seen = new Set<string>();
  const unique = products.filter((p) => {
    if (seen.has(p.envKey)) return false;
    seen.add(p.envKey);
    return true;
  });

  const visible = allowPlaceholders
    ? unique
    : unique.filter((p) => p.asin.length > 0);

  if (visible.length === 0) return null;

  const heading =
    title === null
      ? null
      : (title ??
        (intents.length === 1
          ? INTENT_META[intents[0]].label
          : "Gear & editions"));

  return (
    <div className={className}>
      {heading ? (
        <h2 className="mb-4 text-xl font-semibold text-white">{heading}</h2>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <AmazonProductCard
            key={product.envKey}
            product={product}
            showPlaceholders={allowPlaceholders}
          />
        ))}
      </div>
    </div>
  );
}

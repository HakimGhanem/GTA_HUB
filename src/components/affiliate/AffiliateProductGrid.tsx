import { AmazonProductCard } from "@/components/affiliate/AmazonProductCard";
import { liveProductsForIntent, productsForIntents } from "@/lib/affiliate/catalog";
import type { AffiliateIntent } from "@/lib/affiliate/intents";
import { INTENT_META } from "@/lib/affiliate/intents";

type AffiliateProductGridProps = {
  intents: AffiliateIntent[];
  /** Prefer only ASINs that are filled */
  liveOnly?: boolean;
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
  liveOnly = false,
  className,
  title,
}: AffiliateProductGridProps) {
  const products = liveOnly
    ? intents.flatMap((i) => liveProductsForIntent(i))
    : productsForIntents(intents);

  // Dedupe by envKey
  const seen = new Set<string>();
  const unique = products.filter((p) => {
    if (seen.has(p.envKey)) return false;
    seen.add(p.envKey);
    return true;
  });

  if (unique.length === 0) return null;

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
        {unique.map((product) => (
          <AmazonProductCard key={product.envKey} product={product} />
        ))}
      </div>
    </div>
  );
}

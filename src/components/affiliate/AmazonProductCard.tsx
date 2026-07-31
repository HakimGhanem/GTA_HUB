import { AmazonAffiliateLink } from "@/components/affiliate/AmazonAffiliateLink";
import type { PreorderProduct } from "@/data/preorder-products";
import { productEnvVar } from "@/data/preorder-products";

const PLATFORM_COLORS: Record<PreorderProduct["platform"], string> = {
  PS5: "bg-blue-500/20 text-blue-300",
  Xbox: "bg-green-500/20 text-green-300",
  PC: "bg-purple-500/20 text-purple-300",
  Multi: "bg-white/10 text-white/70",
};

type AmazonProductCardProps = {
  product: PreorderProduct;
};

export function AmazonProductCard({ product }: AmazonProductCardProps) {
  const hasAsin = product.asin.length > 0;

  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-pink-400/30">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${PLATFORM_COLORS[product.platform]}`}
        >
          {product.platform}
        </span>
        {product.badge && (
          <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-xs font-medium text-pink-300">
            {product.badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white">{product.label}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
        {product.description}
      </p>

      {hasAsin ? (
        <AmazonAffiliateLink
          asin={product.asin}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#FF9900] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#FFB84D]"
        >
          View on Amazon →
        </AmazonAffiliateLink>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-4 py-3">
          <p className="text-xs font-medium text-white/50">
            ASIN slot — paste SiteStripe link
          </p>
          <code className="mt-1 block text-[10px] text-white/30">
            {productEnvVar(product.envKey)}=B0XXXXXXXX
          </code>
        </div>
      )}
    </div>
  );
}

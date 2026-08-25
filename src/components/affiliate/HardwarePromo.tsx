import { AffiliateProductGrid } from "@/components/affiliate/AffiliateProductGrid";
import { Link } from "@/i18n/navigation";

/**
 * Compact purchase-intent strip — hardware that converts before GTA 6 ASINs exist.
 */
export function HardwarePromo({
  title = "Ready for launch day?",
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <section className={className} aria-labelledby="hardware-promo-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="hardware-promo-heading" className="text-2xl font-bold text-white">
            {title}
          </h2>
          <p className="mt-1 text-sm text-white/55">
            Consoles & accessories from Amazon, Fnac, Best Buy, PlayStation Store
            and Xbox Store — official search when a SKU is not live yet.
          </p>
        </div>
        <Link
          href="/guides/gta-6-preorder-guide"
          className="text-sm text-pink-300 hover:text-pink-200"
        >
          Full pre-order guide →
        </Link>
      </div>
      <AffiliateProductGrid
        intents={[
          "console_upgrade",
          "controller",
          "headset",
          "storage_ssd",
          "streaming_setup",
        ]}
        liveOnly
        title={null}
      />
    </section>
  );
}

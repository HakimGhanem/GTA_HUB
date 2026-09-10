import { useTranslations } from "next-intl";
import { AffiliateProductGrid } from "@/components/affiliate/AffiliateProductGrid";
import { Link } from "@/i18n/navigation";

/**
 * Compact purchase-intent strip — hardware that converts before GTA 6 ASINs exist.
 */
export function HardwarePromo({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  const t = useTranslations("affiliate");

  return (
    <section className={className} aria-labelledby="hardware-promo-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="hardware-promo-heading" className="text-2xl font-bold text-white">
            {title ?? t("hardwareTitle")}
          </h2>
          <p className="mt-1 text-sm text-white/55">{t("hardwareSubtitle")}</p>
        </div>
        <Link
          href="/guides/gta-6-preorder-guide"
          className="text-sm text-pink-300 hover:text-pink-200"
        >
          {t("hardwareGuideLink")}
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

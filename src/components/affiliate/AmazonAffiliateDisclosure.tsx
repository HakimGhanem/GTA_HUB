import { getTranslations } from "next-intl/server";

/** Legal Amazon Associates disclosure — required on all pages. */
export async function AmazonAffiliateDisclosure() {
  const t = await getTranslations("footer");

  return (
    <p className="mx-auto mt-3 max-w-5xl px-4 text-xs leading-relaxed text-white/30">
      {t("affiliate")}
    </p>
  );
}

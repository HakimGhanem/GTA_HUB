import { getLocale, getTranslations } from "next-intl/server";
import type { Location } from "@/data/locations";
import type { RegionalLocationSeo } from "@/data/location-seo-content";
import { AdUnit } from "@/components/ads/AdUnit";
import { Cs2ExploreBlock } from "@/components/locations/Cs2ExploreBlock";
import { AD_SLOTS } from "@/lib/ads-config";
import {
  getConfidenceBadgeStyle,
  resolveConfidence,
} from "@/lib/location-confidence";
import { getConfidenceLabel } from "@/lib/location-display";

type Props = {
  name: string;
  seo: RegionalLocationSeo;
  location: Pick<Location, "source" | "confidence">;
};

export async function LocationRichContent({ name, seo, location }: Props) {
  const t = await getTranslations("locations");
  const tRoot = await getTranslations();
  const locale = await getLocale();
  const confidence = resolveConfidence(location);

  return (
    <article className="prose prose-invert max-w-none">
      <section className="mb-10">
        <p className="mb-3 not-prose">
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-white/15"
            style={getConfidenceBadgeStyle(confidence)}
          >
            {getConfidenceLabel(confidence, tRoot)}
          </span>
        </p>
        <h2 className="mb-4 text-2xl font-bold text-white">
          {t("aboutTitle", { name })}
        </h2>
        <div className="space-y-4 text-white/70">
          {seo.about.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <Cs2ExploreBlock locale={locale} locationName={name} />

      {AD_SLOTS.inArticle && (
        <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />
      )}

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          {t("findTitle", { name })}
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-white/70">
          {seo.poiTypes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">{t("faqTitle")}</h2>
        <dl className="space-y-4">
          {seo.faq.map(({ question, answer }) => (
            <div
              key={question}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <dt className="font-semibold text-white">{question}</dt>
              <dd className="mt-2 text-sm text-white/60">{answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}

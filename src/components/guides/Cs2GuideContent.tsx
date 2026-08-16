import { Link } from "@/i18n/navigation";
import { AdUnit } from "@/components/ads/AdUnit";
import { getCs2GuideCopy } from "@/data/cs2-guide-i18n";
import { REGIONAL_LOCATION_SLUGS } from "@/data/location-seo-types";
import { AD_SLOTS } from "@/lib/ads-config";
import { CS2_GTA6_MAP, getCs2SteamUrl } from "@/lib/cities-skylines";

const REGION_NAMES: Record<(typeof REGIONAL_LOCATION_SLUGS)[number], string> = {
  "vice-city": "Vice City",
  "ocean-drive": "Ocean Drive",
  grassrivers: "Grassrivers",
  "leonida-keys": "Leonida Keys",
  "port-gellhorn": "Port Gellhorn",
  "ambrosia-island": "Ambrosia Island",
  "mount-kalaga": "Mount Kalaga",
};

type Props = { locale: string };

export function Cs2GuideContent({ locale }: Props) {
  const copy = getCs2GuideCopy(locale);
  const steamUrl = getCs2SteamUrl(locale);

  return (
    <article className="prose prose-invert mt-8 max-w-none">
      <p className="text-lg leading-relaxed text-white/80">{copy.intro}</p>

      <h2 className="mt-10 text-2xl font-bold text-white">{copy.whatTitle}</h2>
      <p className="leading-relaxed text-white/80">{copy.whatBody}</p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-white/70">
        {CS2_GTA6_MAP.areas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>

      <div className="not-prose my-8 flex flex-wrap gap-3">
        <a
          href={steamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-[#1b2838] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a475e]"
        >
          {copy.ctaSteam}
        </a>
        <Link
          href="/map"
          className="inline-flex rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-400"
        >
          {copy.ctaMap}
        </Link>
      </div>
      <p className="text-sm text-white/50">
        {copy.ctaGuideNote.replace("{id}", CS2_GTA6_MAP.mapId)}
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />

      <h2 className="mt-10 text-2xl font-bold text-white">{copy.howTitle}</h2>
      <ol className="list-decimal space-y-3 pl-5 text-white/80">
        {copy.howSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-white">{copy.map6Title}</h2>
      <p className="leading-relaxed text-white/80">{copy.map6Body}</p>

      <h2 className="mt-10 text-2xl font-bold text-white">{copy.regionsTitle}</h2>
      <div className="not-prose mt-4 grid gap-3 sm:grid-cols-2">
        {REGIONAL_LOCATION_SLUGS.map((slug) => (
          <Link
            key={slug}
            href={`/locations/${slug}`}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-pink-400/40"
          >
            {REGION_NAMES[slug]}
            <span className="mt-1 block text-xs font-normal text-white/40">
              {copy.regionLinksLabel}
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold text-white">
        {copy.disclaimerTitle}
      </h2>
      <p className="leading-relaxed text-white/60">{copy.disclaimerBody}</p>

      <h2 className="mt-10 text-2xl font-bold text-white">{copy.faqTitle}</h2>
      <dl className="space-y-4">
        {copy.faq.map(({ question, answer }) => (
          <div
            key={question}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <dt className="font-semibold text-white">{question}</dt>
            <dd className="mt-2 text-sm text-white/60">{answer}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

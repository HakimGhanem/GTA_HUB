import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  formatTrailerEvidenceLine,
  getLocationTrailerEvidence,
} from "@/lib/location-evidence";

type Props = {
  slug: string;
  sourceUrl?: string;
};

export async function LocationTrailerEvidence({ slug, sourceUrl }: Props) {
  const locale = await getLocale();
  const t = await getTranslations("locations");
  const hits = getLocationTrailerEvidence(slug, locale);
  if (hits.length === 0 && !sourceUrl) return null;

  const unverified = hits.some((hit) => !hit.verified);

  return (
    <section className="mb-10 max-w-2xl rounded-xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-xl font-bold text-white">{t("trailerBeatsTitle")}</h2>
      <p className="mt-2 text-sm text-white/55">{t("trailerBeatsHint")}</p>
      {hits.length > 0 && (
        <ul className="mt-4 space-y-3">
          {hits.map((hit) => (
            <li key={`${hit.beatId}-${hit.at}`}>
              <a
                href={hit.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-pink-300 hover:text-pink-200"
              >
                {formatTrailerEvidenceLine(hit)}
              </a>
              {hit.look ? (
                <p className="mt-1 text-sm text-white/60">{hit.look}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm">
        <Link
          href="/trailer"
          className="font-medium text-pink-300 underline hover:text-pink-200"
        >
          {t("trailerPageLink")}
        </Link>
        {sourceUrl ? (
          <>
            {" · "}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline hover:text-white"
            >
              {t("officialSource")}
            </a>
          </>
        ) : null}
      </p>
      {unverified ? (
        <p className="mt-3 text-xs text-white/40">{t("trailerEstimateNote")}</p>
      ) : null}
    </section>
  );
}

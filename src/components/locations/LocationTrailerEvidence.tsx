import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { REGIONAL_LOCATION_SLUGS } from "@/data/location-seo-types";
import {
  formatTrailerEvidenceLine,
  getLocationTrailerEvidence,
} from "@/lib/location-evidence";

type Props = {
  slug: string;
  name?: string;
  sourceUrl?: string;
};

const REGIONAL = new Set<string>(REGIONAL_LOCATION_SLUGS);

export async function LocationTrailerEvidence({ slug, name, sourceUrl }: Props) {
  const locale = await getLocale();
  const t = await getTranslations("locations");
  const hits = getLocationTrailerEvidence(slug, locale);
  const isHub = REGIONAL.has(slug);
  if (hits.length === 0 && !sourceUrl && !isHub) return null;

  const unverified = hits.some((hit) => !hit.verified);

  return (
    <section className="mb-10 max-w-2xl rounded-xl border border-foreground/10 bg-foreground/5 p-5">
      <h2 className="text-xl font-bold text-foreground">{t("trailerBeatsTitle")}</h2>
      <p className="mt-2 text-sm text-foreground/55">{t("trailerBeatsHint")}</p>
      {isHub ? (
        <figure className="mt-4 overflow-hidden rounded-lg border border-foreground/10">
          <img
            src={`/api/og/location/${slug}`}
            alt={t("hubStillCaption", { name: name ?? slug })}
            width={1200}
            height={630}
            className="h-auto w-full"
          />
          <figcaption className="px-3 py-2 text-[11px] text-foreground/45">
            {t("hubStillCaption", { name: name ?? slug })}
          </figcaption>
        </figure>
      ) : null}
      {hits.length > 0 && (
        <ul className="mt-4 space-y-3">
          {hits.map((hit) => (
            <li key={`${hit.beatId}-${hit.at}`}>
              <a
                href={hit.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent hover:text-accent/80"
              >
                {formatTrailerEvidenceLine(hit)}
              </a>
              {hit.look ? (
                <p className="mt-1 text-sm text-foreground/60">{hit.look}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm">
        <Link
          href="/trailer"
          className="font-medium text-accent underline hover:text-accent/80"
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
              className="text-foreground/60 underline hover:text-foreground"
            >
              {t("officialSource")}
            </a>
          </>
        ) : null}
      </p>
      {unverified ? (
        <p className="mt-3 text-xs text-foreground/40">{t("trailerEstimateNote")}</p>
      ) : null}
    </section>
  );
}

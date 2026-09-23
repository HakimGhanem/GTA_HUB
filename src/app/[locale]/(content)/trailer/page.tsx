import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AdUnit } from "@/components/ads/AdUnit";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedMapLinks } from "@/components/seo/RelatedMapLinks";
import {
  TrailerScrub,
  type TrailerBeatRow,
} from "@/components/trailer/TrailerScrub";
import { getLocationBySlug } from "@/data/locations";
import {
  getTrailerCopy,
  hasTrailerTranslation,
  trailerHreflangLocales,
} from "@/data/trailer-i18n";
import {
  TRAILERS,
  trailerPlayerUrl,
  trailerThumbnailUrl,
  trailerWatchUrl,
} from "@/data/trailers";
import { AD_SLOTS } from "@/lib/ads-config";
import { mapLocationHref } from "@/lib/map-links";
import { buildMetadata, jsonLdTrailerPage } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/trailer";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = getTrailerCopy(locale);
  const translated = hasTrailerTranslation(locale);

  return buildMetadata({
    locale,
    title: `${copy.title} | Map-6`,
    description: copy.description,
    path: PATH,
    openGraphType: "article",
    canonicalLocale: translated ? locale : "en",
    hreflangLocales: trailerHreflangLocales(),
    robots: translated
      ? { index: true, follow: true }
      : { index: false, follow: true },
  });
}

export default async function TrailerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = getTrailerCopy(locale);
  const tNav = await getTranslations("nav");

  const structuredData = jsonLdTrailerPage({
    name: copy.title,
    description: copy.description,
    path: PATH,
    locale,
    answer: copy.answer,
    breadcrumb: [{ name: tNav("news"), path: "/news" }, { name: copy.title }],
    videos: TRAILERS.map((trailer) => ({
      slug: trailer.slug,
      name: copy.trailers[trailer.slug]?.name ?? trailer.slug,
      description: copy.trailers[trailer.slug]?.summary ?? copy.description,
      uploadDate: trailer.publishedAt,
      duration: trailer.duration,
      embedUrl: trailerPlayerUrl(trailer),
      watchUrl: trailerWatchUrl(trailer),
      thumbnailUrl: trailerThumbnailUrl(trailer),
    })),
    faq: copy.faq,
  });

  const anyEstimated = TRAILERS.some((t) => !t.timestampsVerified);

  return (
    <>
      <JsonLd data={structuredData} />

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/news"
          className="mb-4 inline-block text-sm text-foreground/50 hover:text-foreground"
        >
          {copy.backToNews}
        </Link>

        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-300">
          {copy.eyebrow}
        </p>
        <h1 className="text-3xl font-bold leading-tight">{copy.title}</h1>

        <AnswerBox label={copy.answerLabel}>{copy.answer}</AnswerBox>

        <p className="mt-6 text-lg leading-relaxed text-foreground/80">
          {copy.intro}
        </p>

        <h2 className="mt-10 text-2xl font-bold text-foreground">{copy.howTitle}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-foreground/70">
          {copy.howSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h2 className="mt-10 text-2xl font-bold text-foreground">
          {copy.beatsTitle}
        </h2>
        <p className="mt-2 text-foreground/60">{copy.beatsIntro}</p>
        {anyEstimated && (
          <p className="mt-3 rounded-xl border border-amber-400/25 bg-amber-500/5 p-4 text-sm text-amber-200/80">
            {copy.estimateNotice}
          </p>
        )}

        {TRAILERS.map((trailer) => {
          const rows: TrailerBeatRow[] = trailer.beats.map((beat) => {
            const beatCopy = copy.beats[beat.id];
            const location = beat.locationSlug
              ? getLocationBySlug(beat.locationSlug)
              : undefined;

            return {
              id: beat.id,
              at: beat.at,
              title: beatCopy?.title ?? beat.id,
              look: beatCopy?.look ?? "",
              ...(location
                ? {
                    mapHref: mapLocationHref({
                      slug: location.slug,
                      x: location.x,
                      y: location.y,
                    }),
                    regionName: location.name,
                  }
                : {}),
            };
          });

          return (
            <TrailerScrub
              key={trailer.slug}
              trailer={trailer}
              name={copy.trailers[trailer.slug]?.name ?? trailer.slug}
              summary={copy.trailers[trailer.slug]?.summary ?? ""}
              rows={rows}
              copy={copy}
            />
          );
        })}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/map"
            className="inline-flex rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-pink-400"
          >
            {copy.ctaMap}
          </Link>
          <Link
            href="/news"
            className="inline-flex rounded-full border border-foreground/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-pink-400/40"
          >
            {copy.ctaNews}
          </Link>
        </div>

        <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />

        <h2 className="mt-10 text-2xl font-bold text-foreground">
          {copy.rightsTitle}
        </h2>
        <p className="mt-2 leading-relaxed text-foreground/60">{copy.rightsBody}</p>

        <h2 className="mt-10 text-2xl font-bold text-foreground">{copy.faqTitle}</h2>
        <dl className="mt-4 space-y-4">
          {copy.faq.map(({ question, answer }) => (
            <div
              key={question}
              className="rounded-xl border border-foreground/10 bg-foreground/5 p-5"
            >
              <dt className="font-semibold text-foreground">{question}</dt>
              <dd className="mt-2 text-sm text-foreground/60">{answer}</dd>
            </div>
          ))}
        </dl>

        <RelatedMapLinks locale={locale} />
      </main>
    </>
  );
}

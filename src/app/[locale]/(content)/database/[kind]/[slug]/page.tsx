import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  CONFIDENCE_BLURB,
  CONFIDENCE_LABEL,
  HUB_KIND_PARAMS,
  KIND_TITLE,
  getEntitiesByParam,
  getEntity,
  isHubKindParam,
  jsonLdHubEntity,
  type HubKindParam,
} from "@/data/hub";
import {
  hasHubKindTranslation,
  hubKindLocales,
} from "@/data/hub/kind-content";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; kind: string; slug: string }>;
};

export function generateStaticParams() {
  return HUB_KIND_PARAMS.flatMap((kind) =>
    getEntitiesByParam(kind).map((entity) => ({
      kind,
      slug: entity.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, kind, slug } = await params;
  if (!isHubKindParam(kind)) return {};
  const entity = getEntity(kind, slug);
  if (!entity) return {};

  // Entity prose is English-only — point other locales at /en instead of
  // publishing six indexable copies of the same text.
  const translated = hasHubKindTranslation(kind, locale);

  return buildMetadata({
    locale,
    title: `${entity.name} — GTA 6 ${KIND_TITLE[kind]} | ${SITE.name}`,
    description: entity.summary,
    path: `/database/${kind}/${slug}`,
    openGraphType: "article",
    canonicalLocale: translated ? locale : "en",
    hreflangLocales: hubKindLocales(kind),
    robots: { index: false, follow: true },
  });
}

export default async function DatabaseEntityPage({ params }: Props) {
  const { locale, kind, slug } = await params;
  setRequestLocale(locale);
  if (!isHubKindParam(kind)) notFound();
  const kindParam = kind as HubKindParam;
  const entity = getEntity(kindParam, slug);
  if (!entity) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdHubEntity(entity, locale)),
        }}
      />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href={`/database/${kindParam}`}
          className="mb-4 inline-block text-sm text-foreground/50 hover:text-foreground"
        >
          ← {KIND_TITLE[kindParam]}
        </Link>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-accent">
            {KIND_TITLE[kindParam]}
          </span>
          <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground/70">
            {CONFIDENCE_LABEL[entity.confidence]}
          </span>
        </div>
        <h1 className="text-3xl font-bold">{entity.name}</h1>
        <p className="mt-4 text-foreground/60">{entity.summary}</p>
        <p className="mt-2 text-xs text-foreground/40">
          {CONFIDENCE_BLURB[entity.confidence]}
        </p>

        <article className="mt-8 space-y-4 text-foreground/70">
          {entity.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </article>

        <section className="mt-10">
          <h2 className="mb-3 text-xl font-semibold text-foreground">Sources</h2>
          <ul className="space-y-2 text-sm">
            {entity.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:text-accent/80"
                >
                  {source.label}
                </a>
                <span className="text-foreground/40"> · {source.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-sm text-foreground/50">
          Place these names against geography on the{" "}
          <Link href="/map" className="text-accent underline">
            interactive map
          </Link>
          . Map-6 is fan-made — not Rockstar or Take-Two.
        </p>
      </main>
    </>
  );
}

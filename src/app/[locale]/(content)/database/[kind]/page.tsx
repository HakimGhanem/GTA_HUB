import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import {
  CONFIDENCE_LABEL,
  HUB_KIND_PARAMS,
  getEntitiesByParam,
  isHubKindParam,
  type HubKindParam,
} from "@/data/hub";
import {
  getHubKindContent,
  hasHubKindTranslation,
  hubKindLocales,
  type EvidenceTier,
} from "@/data/hub/kind-content";
import { SITE } from "@/lib/constants";
import { buildMetadata, jsonLdCollectionPage } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; kind: string }> };

const TIER_STYLE: Record<EvidenceTier, string> = {
  official: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  trailer: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  precedent: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  policy: "border-foreground/15 bg-foreground/5 text-foreground/60",
};

export function generateStaticParams() {
  return HUB_KIND_PARAMS.map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, kind } = await params;
  if (!isHubKindParam(kind)) return {};

  const content = getHubKindContent(kind, locale);
  const translated = hasHubKindTranslation(kind, locale);

  return buildMetadata({
    locale,
    title: `${content.title} — GTA 6 Database | ${SITE.name}`,
    description: content.blurb,
    path: `/database/${kind}`,
    canonicalLocale: translated ? locale : "en",
    hreflangLocales: hubKindLocales(kind),
    robots: { index: false, follow: true },
  });
}

export default async function DatabaseKindPage({ params }: Props) {
  const { locale, kind } = await params;
  setRequestLocale(locale);
  if (!isHubKindParam(kind)) notFound();
  const kindParam = kind as HubKindParam;
  const entities = getEntitiesByParam(kindParam);
  const content = getHubKindContent(kindParam, locale);

  const reviewedAt = new Date(content.reviewedAt).toLocaleDateString(
    locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const structuredData = jsonLdCollectionPage({
    name: content.title,
    description: content.blurb,
    path: `/database/${kindParam}`,
    locale: hasHubKindTranslation(kindParam, locale) ? locale : "en",
    breadcrumb: [
      { name: "Database", path: "/database" },
      { name: content.title, path: `/database/${kindParam}` },
    ],
    items: entities.map((entity) => ({
      name: entity.name,
      path: `/database/${kindParam}/${entity.slug}`,
    })),
    faq: content.faq.length ? content.faq : undefined,
  });

  return (
    <>
      <JsonLd data={structuredData} />

      <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
        <Link
          href="/database"
          className="mb-4 inline-block text-sm text-foreground/50 hover:text-foreground"
        >
          {content.backLabel}
        </Link>
        <h1 className="text-3xl font-bold">{content.title}</h1>
        <p className="mt-3 max-w-2xl text-foreground/60">{content.blurb}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-foreground/75">
          {content.intro}
        </p>

        {entities.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-foreground/20 bg-foreground/[0.03] p-6 text-foreground/60">
            <p className="font-semibold text-foreground">
              {content.empty?.heading ?? "Nothing official to list yet"}
            </p>
            {content.empty?.body ? (
              <p className="mt-2 text-sm leading-relaxed">
                {content.empty.body}
              </p>
            ) : null}
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {entities.map((entity) => (
              <li key={entity.slug}>
                <Link
                  href={`/database/${kindParam}/${entity.slug}`}
                  className="block rounded-xl border border-foreground/10 bg-foreground/5 p-5 transition-colors hover:border-pink-400/40"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      {entity.name}
                    </h2>
                    <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/70">
                      {CONFIDENCE_LABEL[entity.confidence]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/60">{entity.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {content.sections.length > 0 && (
          <div className="mt-12 max-w-2xl space-y-10">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${TIER_STYLE[section.tier]}`}
                >
                  {content.tierLabels[section.tier]}
                </span>
                <h2 className="mt-2 text-xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-foreground/75">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            <p className="text-xs text-foreground/40">
              {content.reviewedLabel} — {reviewedAt}
            </p>
          </div>
        )}

        {content.faq.length > 0 && (
          <section className="mt-12 max-w-2xl" aria-labelledby="kind-faq">
            <h2 id="kind-faq" className="mb-4 text-xl font-bold">
              FAQ
            </h2>
            <dl className="space-y-4">
              {content.faq.map(({ question, answer }) => (
                <div
                  key={question}
                  className="rounded-xl border border-foreground/10 bg-foreground/5 p-5"
                >
                  <dt className="font-semibold text-foreground">{question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </main>
    </>
  );
}

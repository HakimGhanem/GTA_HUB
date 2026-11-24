import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastVerified } from "@/components/seo/LastVerified";
import {
  ChecklistTracker,
  type ChecklistSection,
} from "@/components/collectibles/ChecklistTracker";
import {
  COLLECTIBLE_SOURCES,
  COLLECTIBLE_TYPES,
  COLLECTIBLES_CHECKED_AT,
  collectibleDescription,
  collectibleName,
} from "@/data/collectibles";
import { getCollectiblesHubSeo } from "@/data/collectibles-seo";
import { CHECKLIST_100 } from "@/data/checklist-100";
import { buildMetadata, jsonLdCollectionPage } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const seo = getCollectiblesHubSeo(locale);

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.metaDescription,
    path: "/collectibles",
  });
}

export default async function CollectiblesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("collectibles");
  const tNav = await getTranslations("nav");
  const seo = getCollectiblesHubSeo(locale);
  const fr = locale === "fr";

  const sections: ChecklistSection[] = CHECKLIST_100.map((group) => ({
    id: group.id,
    label: fr ? group.fr : group.en,
    rows: group.items.map((item) => ({
      id: item.id,
      label: fr ? item.fr : item.en,
      required: item.required,
      total: item.total,
      href: item.collectible ? `/collectibles/${item.collectible}` : undefined,
    })),
  }));

  const structuredData = jsonLdCollectionPage({
    name: t("title"),
    description: seo.metaDescription,
    path: "/collectibles",
    locale,
    breadcrumb: [{ name: tNav("collectibles"), path: "/collectibles" }],
    items: COLLECTIBLE_TYPES.map((type) => ({
      name: collectibleName(type, locale),
      path: `/collectibles/${type.slug}`,
    })),
    faq: [...seo.faq],
  });

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <JsonLd data={structuredData} />

      <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-4 max-w-2xl text-foreground/60">{t("subtitle")}</p>
      <LastVerified date={COLLECTIBLES_CHECKED_AT} locale={locale} />

      <article className="my-10 space-y-4 text-foreground/70">
        {seo.about.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </article>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-foreground">{t("checklistTitle")}</h2>
        <ChecklistTracker sections={sections} />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-foreground">{t("typesTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {COLLECTIBLE_TYPES.map((type) => (
            <Link
              key={type.slug}
              href={`/collectibles/${type.slug}`}
              className="group rounded-xl border border-foreground/10 bg-foreground/5 p-6 transition-colors hover:border-pink-400/40 hover:bg-foreground/10"
            >
              <span className="text-3xl">{type.icon}</span>
              <h3 className="mt-3 text-xl font-semibold group-hover:text-accent">
                {collectibleName(type, locale)}
              </h3>
              <p className="mt-2 text-sm text-foreground/60">
                {collectibleDescription(type, locale)}
              </p>
              {type.required ? (
                <p className="mt-4 font-mono text-xs text-foreground/50">
                  {type.total
                    ? t("requiredOf", { required: type.required, total: type.total })
                    : t("requiredOnly", { required: type.required })}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-foreground">{t("howToTrack")}</h2>
        <ol className="list-decimal space-y-2 pl-5 text-foreground/70">
          {seo.howToTrack.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-foreground/50">
          <Link href="/map" className="text-accent underline">
            {t("openMap")}
          </Link>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-foreground">FAQ</h2>
        <dl className="space-y-4">
          {seo.faq.map(({ question, answer }) => (
            <div
              key={question}
              className="rounded-xl border border-foreground/10 bg-foreground/5 p-5"
            >
              <dt className="font-semibold text-foreground">{question}</dt>
              <dd className="mt-2 text-sm text-foreground/60">{answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-xs text-foreground/45">
        {t("sources")}{" "}
        {COLLECTIBLE_SOURCES.map((s, i) => (
          <span key={s.url}>
            {i ? " · " : ""}
            <a href={s.url} rel="noopener" target="_blank" className="underline">
              {s.name}
            </a>
          </span>
        ))}
      </p>
    </main>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  COLLECTIBLE_SOURCES,
  COLLECTIBLE_TYPES,
  COLLECTIBLES_CHECKED_AT,
  collectibleDescription,
  collectibleName,
  getCollectibleType,
  getCollectiblesByType,
} from "@/data/collectibles";
import { getCollectibleTypeSeo } from "@/data/collectibles-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastVerified } from "@/components/seo/LastVerified";
import { buildMetadata, jsonLdCollectionPage } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; type: string }> };

export function generateStaticParams() {
  return COLLECTIBLE_TYPES.map((t) => ({ type: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, type } = await params;
  const collectibleType = getCollectibleType(type);
  if (!collectibleType) return {};
  const seo = getCollectibleTypeSeo(type, locale);
  const name = collectibleName(collectibleType, locale);
  const count = collectibleType.total ? `${collectibleType.total} ` : "";

  return buildMetadata({
    locale,
    title:
      locale === "fr"
        ? `GTA 6 : ${count}${name} — emplacements et 100 % | Map-6`
        : `GTA 6 ${count}${name} — Locations & 100% Guide | Map-6`,
    description: seo?.metaDescription ?? collectibleDescription(collectibleType, locale),
    path: `/collectibles/${type}`,
    image: `/api/og/collectible/${type}`,
  });
}

export default async function CollectibleTypePage({ params }: Props) {
  const { locale, type } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("collectibles");
  const collectibleType = getCollectibleType(type);
  if (!collectibleType) notFound();

  const items = getCollectiblesByType(type);
  const seo = getCollectibleTypeSeo(type, locale);
  const tNav = await getTranslations("nav");
  const name = collectibleName(collectibleType, locale);
  const description = seo?.metaDescription ?? collectibleDescription(collectibleType, locale);

  const structuredData = jsonLdCollectionPage({
    name: `${name} — GTA 6`,
    description,
    path: `/collectibles/${type}`,
    locale,
    breadcrumb: [
      { name: tNav("collectibles"), path: "/collectibles" },
      { name, path: `/collectibles/${type}` },
    ],
    items: [],
    faq: seo?.faq ? [...seo.faq] : undefined,
  });

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <JsonLd data={structuredData} />

      <Link
        href="/collectibles"
        className="mb-4 inline-block text-sm text-foreground/50 hover:text-foreground"
      >
        ← {t("title")}
      </Link>

      <span className="text-4xl">{collectibleType.icon}</span>
      <h1 className="mt-2 text-3xl font-bold">{name}</h1>
      <p className="mt-2 max-w-2xl text-foreground/60">{description}</p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <dt className="text-xs uppercase tracking-wide text-foreground/50">{t("total")}</dt>
          <dd className="mt-1 text-2xl font-bold text-foreground">
            {collectibleType.total ?? t("totalUnpublished")}
          </dd>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <dt className="text-xs uppercase tracking-wide text-foreground/50">{t("forHundred")}</dt>
          <dd className="mt-1 text-2xl font-bold text-accent">{collectibleType.required ?? "—"}</dd>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <dt className="text-xs uppercase tracking-wide text-foreground/50">{t("inGameMenu")}</dt>
          <dd className="mt-1 text-sm text-foreground/80">
            {locale === "fr" ? collectibleType.track.fr : collectibleType.track.en}
          </dd>
        </div>
      </dl>
      <div className="mt-4">
        <LastVerified date={COLLECTIBLES_CHECKED_AT} locale={locale} />
      </div>

      {seo ? (
        <article className="mt-10 space-y-4 text-foreground/70">
          {seo.about.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </article>
      ) : null}

      {seo ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{t("howToTrack")}</h2>
          <ul className="list-disc space-y-2 pl-5 text-foreground/70">
            {seo.howToTrack.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-foreground/50">
            <Link href="/collectibles" className="text-accent underline">
              {t("checklistTitle")}
            </Link>
            {" · "}
            <Link href="/map" className="text-accent underline">
              {t("openMap")}
            </Link>
          </p>
        </section>
      ) : null}

      {items.length ? (
        <>
          <h2 className="mt-12 mb-4 text-2xl font-bold text-foreground">{t("onTheMap")}</h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/map?loc=${item.slug}&x=${item.x}&y=${item.y}`}
                  className="block rounded-xl border border-foreground/10 bg-foreground/5 p-4 transition-colors hover:border-pink-400/40"
                >
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="mt-1 text-sm text-foreground/60">{item.description}</p>
                  <p className="mt-2 font-mono text-xs text-foreground/40">{item.region}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {seo ? (
        <section className="mt-12">
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
      ) : null}

      <p className="mt-10 text-xs text-foreground/45">
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

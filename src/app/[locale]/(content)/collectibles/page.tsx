import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  COLLECTIBLE_TYPES,
  COLLECTIBLES_TOTALS_NOTE,
  getCollectiblesByType,
} from "@/data/collectibles";
import { COLLECTIBLES_HUB_SEO } from "@/data/collectibles-seo";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: t("collectiblesTitle"),
    description: COLLECTIBLES_HUB_SEO.metaDescription,
    path: "/collectibles",
  });
}

export default async function CollectiblesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("collectibles");

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-2 max-w-2xl text-white/60">{t("subtitle")}</p>
      <p className="mb-8 max-w-2xl text-sm text-white/45">{COLLECTIBLES_TOTALS_NOTE}</p>

      <article className="mb-12 space-y-4 text-white/70">
        {COLLECTIBLES_HUB_SEO.about.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </article>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">How to track on Map-6</h2>
        <ol className="list-decimal space-y-2 pl-5 text-white/70">
          {COLLECTIBLES_HUB_SEO.howToTrack.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-white/50">
          Open the{" "}
          <Link href="/map" className="text-pink-300 underline">
            interactive map
          </Link>{" "}
          or read the{" "}
          <Link href="/guides/hidden-packages-gta-6" className="text-pink-300 underline">
            hidden packages guide
          </Link>
          .
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {COLLECTIBLE_TYPES.map((type) => {
          const found = getCollectiblesByType(type.slug).length;
          return (
            <Link
              key={type.slug}
              href={`/collectibles/${type.slug}`}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-pink-400/40 hover:bg-white/10"
            >
              <span className="text-3xl">{type.icon}</span>
              <h2 className="mt-3 text-xl font-semibold group-hover:text-pink-300">
                {type.name}
              </h2>
              <p className="mt-2 text-sm text-white/60">{type.description}</p>
              <p className="mt-4 text-xs text-white/40">
                {t("samples", { current: found })}
              </p>
            </Link>
          );
        })}
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold text-white">FAQ</h2>
        <dl className="space-y-4">
          {COLLECTIBLES_HUB_SEO.faq.map(({ question, answer }) => (
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
    </main>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HardwarePromo } from "@/components/affiliate/HardwarePromo";
import { HomeMapHero } from "@/components/home/HomeMapHero";
import { LocationCard } from "@/components/locations/LocationCard";
import { ClassicMapsPromo } from "@/components/map/ClassicMapsPromo";
import { LOCATIONS } from "@/data/locations";
import { listPublishedArticles } from "@/lib/content/repository";
import { buildMetadata, jsonLdFAQ } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: t("homeTitle"),
    description: t("homeDesc"),
    path: "/",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tLoc = await getTranslations("locations");
  const featured = LOCATIONS.slice(0, 4);
  const latestNews = (await listPublishedArticles(locale)).slice(0, 3);

  const faq = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(faq)) }}
      />

      <HomeMapHero
        locale={locale}
        brand={t("title")}
        ctaFullscreen={t("ctaMap")}
        ctaGuides={t("ctaSetup")}
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="mb-4 text-center text-base text-white/55 sm:text-lg">
          {t("subtitle")}
        </p>

        <div className="mb-10 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="mb-3 text-xl font-bold text-white">{t("introTitle")}</h2>
          <p className="text-sm leading-relaxed text-white/65 sm:text-base">
            {t("introBody")}
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/collectibles"
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-pink-400/40"
          >
            <h2 className="text-xl font-semibold">{t("collectiblesCardTitle")}</h2>
            <p className="mt-2 text-sm text-white/60">{t("collectiblesCardDesc")}</p>
          </Link>
          <Link
            href="/guides"
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-pink-400/40"
          >
            <h2 className="text-xl font-semibold">{t("guidesCardTitle")}</h2>
            <p className="mt-2 text-sm text-white/60">{t("guidesCardDesc")}</p>
          </Link>
        </div>

        <h2 className="mb-6 text-2xl font-bold">{t("featuredTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((loc) => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>

        <div className="mt-10">
          <ClassicMapsPromo
            title={tLoc("classicMapsTitle")}
            hint={tLoc("classicMapsHint")}
            maps={[
              {
                game: "gta5",
                href: "/map?game=gta5",
                label: tLoc("classicGta5"),
                desc: tLoc("classicGta5Desc"),
              },
              {
                game: "vc",
                href: "/map?game=vc",
                label: tLoc("classicVc"),
                desc: tLoc("classicVcDesc"),
              },
              {
                game: "sa",
                href: "/map?game=sa",
                label: tLoc("classicSa"),
                desc: tLoc("classicSaDesc"),
              },
            ]}
          />
        </div>

        <HardwarePromo className="mt-16" title={t("hardwareTitle")} />

        {latestNews.length > 0 ? (
          <section className="mt-16" aria-labelledby="news-heading">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 id="news-heading" className="text-2xl font-bold">
                {t("newsTitle")}
              </h2>
              <Link
                href="/news"
                className="text-sm text-pink-300 hover:text-pink-200"
              >
                {t("newsAll")}
              </Link>
            </div>
            <div className="space-y-3">
              {latestNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="block rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-pink-400/40"
                >
                  <p className="text-xs uppercase tracking-wider text-pink-400/80">
                    {article.cluster}
                    {article.publishedAt
                      ? ` · ${article.publishedAt.slice(0, 10)}`
                      : ""}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{article.title}</h3>
                  <p className="mt-1 text-sm text-white/60">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-6 text-2xl font-bold">
            {t("faqTitle")}
          </h2>
          <dl className="space-y-4">
            {faq.map(({ question, answer }) => (
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
      </section>
    </main>
  );
}

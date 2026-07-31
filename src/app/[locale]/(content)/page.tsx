import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocationCard } from "@/components/locations/LocationCard";
import { LOCATIONS } from "@/data/locations";
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
  const featured = LOCATIONS.slice(0, 4);

  const faq = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
  ];

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(faq)) }}
      />
      <section className="relative overflow-hidden px-4 py-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#f472b620_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-pink-400">
            {t("badge")}
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mb-10 text-lg text-white/60">{t("subtitle")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/map"
              className="rounded-full bg-pink-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-pink-400"
            >
              {t("ctaMap")}
            </Link>
            <Link
              href="/locations"
              className="rounded-full border border-white/20 px-8 py-3 font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              {t("ctaLocations")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
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

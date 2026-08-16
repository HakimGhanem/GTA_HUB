import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Cs2GuideContent } from "@/components/guides/Cs2GuideContent";
import { getCs2GuideCopy } from "@/data/cs2-guide-i18n";
import { getGuideBySlug } from "@/data/guides";
import { buildMetadata, jsonLdArticle, jsonLdFAQ } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const SLUG = "gta-6-map-cities-skylines-2";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = getCs2GuideCopy(locale);

  return buildMetadata({
    locale,
    title: `${copy.title} | Map-6`,
    description: copy.description,
    path: `/guides/${SLUG}`,
    openGraphType: "article",
  });
}

export default async function Cs2GuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const guide = getGuideBySlug(SLUG);
  const copy = getCs2GuideCopy(locale);
  if (!guide) return null;

  const article = {
    ...guide,
    title: copy.title,
    description: copy.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdArticle(article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ(copy.faq)),
        }}
      />

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/guides"
          className="mb-4 inline-block text-sm text-white/50 hover:text-white"
        >
          {copy.backToGuides}
        </Link>

        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-300">
          {copy.eyebrow}
        </p>
        <h1 className="text-3xl font-bold leading-tight">{copy.title}</h1>
        <p className="mt-4 text-white/60">{copy.description}</p>
        <p className="mt-2 text-xs text-white/40">
          {guide.readTime} min · {guide.publishedAt}
        </p>

        <Cs2GuideContent locale={locale} />
      </main>
    </>
  );
}

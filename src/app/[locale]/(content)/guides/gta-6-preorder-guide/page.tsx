import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PreorderGuideContent } from "@/components/guides/PreorderGuideContent";
import { getGuideBySlug } from "@/data/guides";
import { getPreorderGuideCopy } from "@/data/preorder-guide-i18n";
import { buildMetadata, jsonLdArticle } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const SLUG = "gta-6-preorder-guide";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = getPreorderGuideCopy(locale);

  return buildMetadata({
    locale,
    title: `${copy.title} | Map-6`,
    description: copy.description,
    path: `/guides/${SLUG}`,
    openGraphType: "article",
  });
}

export default async function PreorderGuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const guide = getGuideBySlug(SLUG);
  const copy = getPreorderGuideCopy(locale);
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

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/guides"
          className="mb-4 inline-block text-sm text-white/50 hover:text-white"
        >
          {copy.backToGuides}
        </Link>

        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-pink-400">
          {copy.eyebrow}
        </p>
        <h1 className="text-3xl font-bold leading-tight">{copy.title}</h1>
        <p className="mt-4 text-white/60">{copy.description}</p>
        <p className="mt-2 text-xs text-white/40">
          {guide.readTime} min · {guide.publishedAt}
        </p>

        <PreorderGuideContent locale={locale} />

        <div className="mt-10 rounded-xl border border-pink-400/30 bg-pink-500/10 p-6">
          <p className="font-semibold text-pink-200">{copy.ctaTitle}</p>
          <p className="mt-1 text-sm text-white/60">{copy.ctaBody}</p>
          <Link
            href="/map"
            className="mt-4 inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-400"
          >
            {copy.ctaButton}
          </Link>
        </div>
      </main>
    </>
  );
}

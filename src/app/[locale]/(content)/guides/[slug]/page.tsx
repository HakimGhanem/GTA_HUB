import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getGuideBySlug, GUIDES } from "@/data/guides";
import { getLocalizedGuide } from "@/data/guides-i18n";
import { buildMetadata, jsonLdArticle } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

const DEDICATED_GUIDE_SLUGS = new Set([
  "gta-6-preorder-guide",
  "gta-6-map-cities-skylines-2",
]);

const UI = {
  en: {
    back: "← All guides",
    ctaTitle: "Ready to explore?",
    ctaBody: "Open the interactive map and start tracking locations.",
    ctaButton: "Open Interactive Map",
  },
  fr: {
    back: "← Tous les guides",
    ctaTitle: "Prêt à explorer ?",
    ctaBody: "Ouvrez la carte interactive et suivez les lieux.",
    ctaButton: "Ouvrir la carte interactive",
  },
} as const;

export function generateStaticParams() {
  return GUIDES.filter((g) => !DEDICATED_GUIDE_SLUGS.has(g.slug)).map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const localized = getLocalizedGuide(slug, locale);
  if (!localized) return {};

  return buildMetadata({
    locale,
    title: `${localized.title} | Map-6`,
    description: localized.description,
    path: `/guides/${slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = getGuideBySlug(slug);
  const localized = getLocalizedGuide(slug, locale);
  if (!guide || !localized) notFound();

  const ui = locale === "fr" ? UI.fr : UI.en;
  const jsonLdGuide = {
    ...guide,
    title: localized.title,
    description: localized.description,
    content: localized.content,
    readTime: localized.readTime,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdArticle(jsonLdGuide)),
        }}
      />

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/guides"
          className="mb-4 inline-block text-sm text-white/50 hover:text-white"
        >
          {ui.back}
        </Link>

        <h1 className="text-3xl font-bold leading-tight">{localized.title}</h1>
        <p className="mt-4 text-white/60">{localized.description}</p>
        <p className="mt-2 text-xs text-white/40">
          {localized.readTime} min read · {guide.publishedAt}
        </p>

        <article className="prose prose-invert mt-8 max-w-none">
          {localized.content.map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-white/80">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-10 rounded-xl border border-pink-400/30 bg-pink-500/10 p-6">
          <p className="font-semibold text-pink-200">{ui.ctaTitle}</p>
          <p className="mt-1 text-sm text-white/60">{ui.ctaBody}</p>
          <Link
            href="/map"
            className="mt-4 inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-400"
          >
            {ui.ctaButton}
          </Link>
        </div>
      </main>
    </>
  );
}

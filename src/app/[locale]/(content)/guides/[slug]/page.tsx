import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getGuideBySlug, GUIDES } from "@/data/guides";
import { buildMetadata, jsonLdArticle } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return GUIDES.filter((g) => g.slug !== "gta-6-preorder-guide").map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return buildMetadata({
    locale,
    title: `${guide.title} | Map-6`,
    description: guide.description,
    path: `/guides/${slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdArticle(guide)),
        }}
      />

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/guides"
          className="mb-4 inline-block text-sm text-white/50 hover:text-white"
        >
          ← All guides
        </Link>

        <h1 className="text-3xl font-bold leading-tight">{guide.title}</h1>
        <p className="mt-4 text-white/60">{guide.description}</p>
        <p className="mt-2 text-xs text-white/40">
          {guide.readTime} min read · {guide.publishedAt}
        </p>

        <article className="prose prose-invert mt-8 max-w-none">
          {guide.content.map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-white/80">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-10 rounded-xl border border-pink-400/30 bg-pink-500/10 p-6">
          <p className="font-semibold text-pink-200">Ready to explore?</p>
          <p className="mt-1 text-sm text-white/60">
            Open the interactive map and start tracking locations.
          </p>
          <Link
            href="/map"
            className="mt-4 inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-400"
          >
            Open Interactive Map
          </Link>
        </div>
      </main>
    </>
  );
}

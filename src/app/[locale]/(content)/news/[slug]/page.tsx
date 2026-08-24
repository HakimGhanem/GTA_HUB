import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArticleBody } from "@/components/news/ArticleBody";
import { AffiliateProductGrid } from "@/components/affiliate/AffiliateProductGrid";
import {
  getArticleBySlug,
  listPublishedArticles,
} from "@/lib/content/repository";
import type { AffiliateIntent } from "@/lib/affiliate/intents";
import { buildMetadata, jsonLdNewsArticle } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const articles = await listPublishedArticles("en");
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);
  if (!article || article.status !== "published") {
    return { robots: { index: false, follow: false } };
  }

  return buildMetadata({
    locale,
    title: `${article.title} | Map-6`,
    description: article.description,
    path: `/news/${slug}`,
    image: article.heroImage || "/og-default.png",
    openGraphType: "article",
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug, locale);
  if (!article || article.status !== "published") notFound();

  const showAffiliate =
    article.cluster === "preorder" ||
    article.cluster === "release" ||
    article.cluster === "setup" ||
    article.cluster === "trailer" ||
    article.funnelKind === "purchase" ||
    article.funnelKind === "mixed" ||
    article.funnelKind === "clip_kit";

  // Prefer live hardware until GTA6 game ASINs exist — never show empty SiteStripe shells on news
  const affiliateIntents = (
    article.affiliateIntents?.length
      ? [
          ...article.affiliateIntents,
          "console_upgrade",
          "controller",
          "headset",
        ]
      : ["console_upgrade", "controller", "headset", "preorder_standard"]
  ) as AffiliateIntent[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdNewsArticle({
              title: article.title,
              description: article.description,
              slug: article.slug,
              locale: article.locale,
              publishedAt: article.publishedAt || article.createdAt,
              updatedAt: article.updatedAt,
              image: article.heroImage,
              author: article.author,
            }),
          ),
        }}
      />

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/news"
          className="mb-4 inline-block text-sm text-white/50 hover:text-white"
        >
          ← All news
        </Link>

        <p className="mb-2 text-xs uppercase tracking-wider text-pink-400">
          {article.cluster}
        </p>
        <h1 className="text-3xl font-bold leading-tight">{article.title}</h1>
        <p className="mt-4 text-white/60">{article.description}</p>
        <p className="mt-2 text-xs text-white/40">
          {article.publishedAt?.slice(0, 10)} · {article.author}
          {article.primaryKeyword ? ` · ${article.primaryKeyword}` : ""}
        </p>

        <ArticleBody markdown={article.bodyMarkdown} />

        {article.sources.length > 0 ? (
          <section className="mt-10 border-t border-white/10 pt-6">
            <h2 className="mb-3 text-lg font-semibold">Sources</h2>
            <ul className="space-y-2 text-sm text-white/60">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-300 underline hover:text-pink-200"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {showAffiliate ? (
          <div className="mt-8">
            <AffiliateProductGrid
              intents={affiliateIntents.slice(0, 4)}
              liveOnly
              title="Launch gear (available now)"
            />
            <p className="mt-3 text-xs text-white/40">
              Game edition cards appear when official Amazon ASINs go live.{" "}
              <Link
                href="/guides/gta-6-preorder-guide"
                className="text-pink-300/80 underline hover:text-pink-200"
              >
                Pre-order guide
              </Link>
              {" · "}
              <Link
                href="/guides/best-setup-gta-6-ps5-xbox"
                className="text-pink-300/80 underline hover:text-pink-200"
              >
                Best setup checklist
              </Link>
            </p>
          </div>
        ) : null}

        <div className="mt-10 rounded-xl border border-pink-400/30 bg-pink-500/10 p-6">
          <p className="font-semibold text-pink-200">Explore the map</p>
          <p className="mt-1 text-sm text-white/60">
            Track trailer locations and collectibles on the interactive GTA 6 map.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/map"
              className="inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-400"
            >
              Open Interactive Map
            </Link>
            {article.relatedLocationSlugs[0] ? (
              <Link
                href={`/locations/${article.relatedLocationSlugs[0]}`}
                className="inline-block rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white/80 hover:border-white/40"
              >
                Related location
              </Link>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { isIndexableLocale } from "@/i18n/routing";
import { isIndexableNewsArticle } from "@/lib/content/news-canonical";
import { listPublishedArticles } from "@/lib/content/repository";
import { articleOgImagePath, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    title: t("newsTitle"),
    description: t("newsDesc"),
    path: "/news",
  });
}

export default async function NewsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const articles = isIndexableLocale(locale)
    ? (await listPublishedArticles(locale)).filter(isIndexableNewsArticle)
    : [];

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-2 max-w-2xl text-foreground/60">{t("subtitle")}</p>
      <p className="mb-8 max-w-2xl text-xs text-foreground/40">
        Verified sources only — no fake leaks or invented trailer calendars.{" "}
        <Link href="/about" className="text-accent/80 underline hover:text-accent/80">
          About our standards
        </Link>
      </p>

      {articles.length === 0 ? (
        <p className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 text-foreground/60">
          {t("empty")}
        </p>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => {
            const image = articleOgImagePath(article.locale, article.slug);
            const featured = index === 0;
            return (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group block overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 transition-colors hover:border-pink-400/40 hover:bg-foreground/10"
              >
                {featured ? (
                  <img
                    src={image}
                    alt=""
                    width={1200}
                    height={630}
                    className="aspect-[1200/630] w-full object-cover"
                  />
                ) : null}
                <div
                  className={
                    featured
                      ? "p-6"
                      : "flex gap-4 p-4 sm:items-center sm:p-5"
                  }
                >
                  {featured ? null : (
                    <img
                      src={image}
                      alt=""
                      width={320}
                      height={168}
                      className="hidden h-24 w-40 shrink-0 rounded-lg object-cover sm:block"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-foreground/40">
                      <span className="rounded-full bg-foreground/10 px-2 py-0.5 capitalize">
                        {article.cluster}
                      </span>
                      {article.publishedAt ? (
                        <time dateTime={article.publishedAt}>
                          {article.publishedAt.slice(0, 10)}
                        </time>
                      ) : null}
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-accent">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-foreground/60">
                      {article.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

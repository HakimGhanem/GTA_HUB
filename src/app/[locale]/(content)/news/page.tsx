import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { listPublishedArticles } from "@/lib/content/repository";
import { buildMetadata } from "@/lib/seo";

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
  const articles = await listPublishedArticles(locale);

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-2 max-w-2xl text-white/60">{t("subtitle")}</p>
      <p className="mb-8 max-w-2xl text-xs text-white/40">
        Verified sources only — no fake leaks or invented trailer calendars.{" "}
        <Link href="/about" className="text-pink-300/80 underline hover:text-pink-200">
          About our standards
        </Link>
      </p>

      {articles.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/60">
          {t("empty")}
        </p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-pink-400/40 hover:bg-white/10"
            >
              <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-white/40">
                <span className="rounded-full bg-white/10 px-2 py-0.5 capitalize">
                  {article.cluster}
                </span>
                {article.publishedAt ? (
                  <time dateTime={article.publishedAt}>
                    {article.publishedAt.slice(0, 10)}
                  </time>
                ) : null}
              </div>
              <h2 className="text-xl font-semibold group-hover:text-pink-300">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-white/60">{article.description}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

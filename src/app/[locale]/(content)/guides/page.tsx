import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GUIDES } from "@/data/guides";
import { getPreorderGuideCopy } from "@/data/preorder-guide-i18n";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: t("guidesTitle"),
    description: t("guidesDesc"),
    path: "/guides",
  });
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("guides");
  const preorder = getPreorderGuideCopy(locale);

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-8 max-w-2xl text-white/60">{t("subtitle")}</p>

      <div className="space-y-4">
        {GUIDES.map((guide) => {
          const isPreorder = guide.slug === "gta-6-preorder-guide";
          const title = isPreorder ? preorder.title : guide.title;
          const description = isPreorder
            ? preorder.description
            : guide.description;

          return (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-pink-400/40 hover:bg-white/10"
            >
              <div className="mb-2 flex items-center gap-3 text-xs text-white/40">
                <span className="rounded-full bg-white/10 px-2 py-0.5">
                  {t(`categories.${guide.category}`)}
                </span>
                <span>{t("readMin", { min: guide.readTime })}</span>
              </div>
              <h2 className="text-xl font-semibold group-hover:text-pink-300">
                {title}
              </h2>
              <p className="mt-2 text-sm text-white/60">{description}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

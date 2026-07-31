import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { COLLECTIBLE_TYPES, getCollectiblesByType } from "@/data/collectibles";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: t("collectiblesTitle"),
    description: t("collectiblesDesc"),
    path: "/collectibles",
  });
}

export default async function CollectiblesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("collectibles");

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-8 max-w-2xl text-white/60">{t("subtitle")}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {COLLECTIBLE_TYPES.map((type) => {
          const found = getCollectiblesByType(type.slug).length;
          return (
            <Link
              key={type.slug}
              href={`/collectibles/${type.slug}`}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-pink-400/40 hover:bg-white/10"
            >
              <span className="text-3xl">{type.icon}</span>
              <h2 className="mt-3 text-xl font-semibold group-hover:text-pink-300">
                {type.name}
              </h2>
              <p className="mt-2 text-sm text-white/60">{type.description}</p>
              <p className="mt-4 text-xs text-white/40">
                {t("mapped", { current: found, total: type.total })}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  COLLECTIBLE_TYPES,
  getCollectibleType,
  getCollectiblesByType,
} from "@/data/collectibles";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; type: string }> };

export function generateStaticParams() {
  return COLLECTIBLE_TYPES.map((t) => ({ type: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, type } = await params;
  const collectibleType = getCollectibleType(type);
  if (!collectibleType) return {};

  return buildMetadata({
    locale,
    title: `${collectibleType.name} — GTA 6 Map | Map-6`,
    description: collectibleType.description,
    path: `/collectibles/${type}`,
  });
}

export default async function CollectibleTypePage({ params }: Props) {
  const { locale, type } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("collectibles");
  const collectibleType = getCollectibleType(type);
  if (!collectibleType) notFound();

  const items = getCollectiblesByType(type);

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <Link
        href="/collectibles"
        className="mb-4 inline-block text-sm text-white/50 hover:text-white"
      >
        ← {t("title")}
      </Link>

      <span className="text-4xl">{collectibleType.icon}</span>
      <h1 className="mt-2 text-3xl font-bold">{collectibleType.name}</h1>
      <p className="mt-2 max-w-2xl text-white/60">{collectibleType.description}</p>
      <p className="mt-4 text-sm text-white/40">
        {t("mapped", { current: items.length, total: collectibleType.total })}
      </p>

      <ul className="mt-8 space-y-3">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/map?x=${item.x}&y=${item.y}`}
              className="block rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-pink-400/40"
            >
              <h2 className="font-semibold text-white">{item.name}</h2>
              <p className="mt-1 text-sm text-white/60">{item.description}</p>
              <p className="mt-2 font-mono text-xs text-white/40">
                {item.region} · X: {item.x}, Y: {item.y}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  COLLECTIBLE_TYPES,
  COLLECTIBLES_TOTALS_NOTE,
  getCollectibleType,
  getCollectiblesByType,
} from "@/data/collectibles";
import { getCollectibleTypeSeo } from "@/data/collectibles-seo";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; type: string }> };

export function generateStaticParams() {
  return COLLECTIBLE_TYPES.map((t) => ({ type: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, type } = await params;
  const collectibleType = getCollectibleType(type);
  if (!collectibleType) return {};
  const seo = getCollectibleTypeSeo(type);

  return buildMetadata({
    locale,
    title: `${collectibleType.name} — GTA 6 Map | Map-6`,
    description: seo?.metaDescription ?? collectibleType.description,
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
  const seo = getCollectibleTypeSeo(type);

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
      <p className="mt-2 max-w-2xl text-white/60">
        {seo?.metaDescription ?? collectibleType.description}
      </p>
      <p className="mt-4 text-sm text-white/40">
        {t("samples", { current: items.length })}
      </p>
      <p className="mt-1 text-xs text-white/35">{COLLECTIBLES_TOTALS_NOTE}</p>

      {seo ? (
        <article className="mt-10 space-y-4 text-white/70">
          {seo.about.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </article>
      ) : null}

      {seo ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-white">How to track</h2>
          <ul className="list-disc space-y-2 pl-5 text-white/70">
            {seo.howToTrack.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/50">
            <Link href="/map" className="text-pink-300 underline">
              Open interactive map
            </Link>
            {" · "}
            <Link href="/guides" className="text-pink-300 underline">
              All guides
            </Link>
          </p>
        </section>
      ) : null}

      <h2 className="mt-12 mb-4 text-2xl font-bold text-white">Sample pins</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/map?loc=${item.slug}&x=${item.x}&y=${item.y}`}
              className="block rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-pink-400/40"
            >
              <h3 className="font-semibold text-white">{item.name}</h3>
              <p className="mt-1 text-sm text-white/60">{item.description}</p>
              <p className="mt-2 font-mono text-xs text-white/40">
                {item.region} · X: {item.x}, Y: {item.y}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {seo ? (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-white">FAQ</h2>
          <dl className="space-y-4">
            {seo.faq.map(({ question, answer }) => (
              <div
                key={question}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <dt className="font-semibold text-white">{question}</dt>
                <dd className="mt-2 text-sm text-white/60">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </main>
  );
}

import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  CONFIDENCE_BLURB,
  CONFIDENCE_LABEL,
  HUB_KIND_PARAMS,
  KIND_BLURB,
  KIND_TITLE,
  countByKind,
} from "@/data/hub";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `GTA 6 Database — Characters, Vehicles, Weapons | ${SITE.name}`,
    description:
      "Source-tagged GTA 6 encyclopedia: confirmed characters, trailer-visible vehicle types, and an empty weapons list until Rockstar publishes one. No leak catalogs.",
    path: "/database",
  });
}

export default async function DatabaseHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const counts = countByKind();

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <p className="text-xs uppercase tracking-wider text-pink-400/80">
        {SITE.hubName}
      </p>
      <h1 className="mt-2 text-3xl font-bold">GTA 6 database</h1>
      <p className="mt-4 max-w-2xl text-white/60">
        A small encyclopedia of what Rockstar has actually published. Every row
        carries a source URL and a confidence label. If it is not on Newswire
        or rockstargames.com/VI, it is not here.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {HUB_KIND_PARAMS.map((kind) => (
          <Link
            key={kind}
            href={`/database/${kind}`}
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-pink-400/40"
          >
            <h2 className="text-xl font-semibold">{KIND_TITLE[kind]}</h2>
            <p className="mt-2 text-sm text-white/60">{KIND_BLURB[kind]}</p>
            <p className="mt-4 text-xs text-white/40">
              {counts[kind]} sourced {counts[kind] === 1 ? "entry" : "entries"}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">How we label sources</h2>
        <dl className="space-y-4">
          {(["confirmed", "trailer", "unconfirmed"] as const).map((level) => (
            <div
              key={level}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <dt className="font-semibold text-white">
                {CONFIDENCE_LABEL[level]}
              </dt>
              <dd className="mt-2 text-sm text-white/60">
                {CONFIDENCE_BLURB[level]}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 text-sm text-white/50">
        Geography lives on the{" "}
        <Link href="/map" className="text-pink-300 underline">
          interactive map
        </Link>
        . Shopping lives in{" "}
        <Link href="/guides/gta-6-preorder-guide" className="text-pink-300 underline">
          pre-order guides
        </Link>
        . This hub does not invent leak casts, weapon stats, or collectible
        totals.
      </p>
    </main>
  );
}

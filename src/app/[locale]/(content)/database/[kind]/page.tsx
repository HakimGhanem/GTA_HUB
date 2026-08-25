import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  CONFIDENCE_LABEL,
  HUB_KIND_PARAMS,
  KIND_BLURB,
  KIND_TITLE,
  getEntitiesByParam,
  isHubKindParam,
  type HubKindParam,
} from "@/data/hub";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; kind: string }> };

export function generateStaticParams() {
  return HUB_KIND_PARAMS.map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, kind } = await params;
  if (!isHubKindParam(kind)) return {};
  return buildMetadata({
    locale,
    title: `${KIND_TITLE[kind]} — GTA 6 Database | ${SITE.name}`,
    description: KIND_BLURB[kind],
    path: `/database/${kind}`,
  });
}

export default async function DatabaseKindPage({ params }: Props) {
  const { locale, kind } = await params;
  setRequestLocale(locale);
  if (!isHubKindParam(kind)) notFound();
  const kindParam = kind as HubKindParam;
  const entities = getEntitiesByParam(kindParam);

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <Link
        href="/database"
        className="mb-4 inline-block text-sm text-white/50 hover:text-white"
      >
        ← Database
      </Link>
      <h1 className="text-3xl font-bold">{KIND_TITLE[kindParam]}</h1>
      <p className="mt-3 max-w-2xl text-white/60">{KIND_BLURB[kindParam]}</p>

      {entities.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-white/60">
          <p className="font-semibold text-white">Nothing official to list yet</p>
          <p className="mt-2 text-sm">
            Rockstar has not published a GTA 6 weapons catalog. Map-6 will not
            invent Glock / AK / carbine rows from paused trailer frames. When
            Newswire or rockstargames.com/VI names weapons, they appear here
            with citations.
          </p>
        </div>
      ) : (
        <ul className="mt-10 space-y-3">
          {entities.map((entity) => (
            <li key={entity.slug}>
              <Link
                href={`/database/${kindParam}/${entity.slug}`}
                className="block rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-pink-400/40"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-white">
                    {entity.name}
                  </h2>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/70">
                    {CONFIDENCE_LABEL[entity.confidence]}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/60">{entity.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

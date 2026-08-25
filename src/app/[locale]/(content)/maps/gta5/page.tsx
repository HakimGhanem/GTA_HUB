import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProgressBackup } from "@/components/map/ProgressBackup";
import { SITE } from "@/lib/constants";
import { buildMetadata, jsonLdFAQ } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const FAQ = [
  {
    question: "Does Map-6 have a GTA 5 interactive map?",
    answer:
      "Yes. Open /map?game=gta5 for Los Santos and Blaine County with community POIs, collectible filters, and an unlimited local found tracker.",
  },
  {
    question: "How is this different from MapGenie?",
    answer:
      "MapGenie is the established GTA 5 tracker with a free cap (100 marks) and a PRO tier. Map-6 stores found pins locally with no cap, and the same UI also covers GTA 6, Vice City, and San Andreas. We do not claim more official data than community sources provide.",
  },
  {
    question: "Are GTA 6 collectible totals on this page?",
    answer:
      "No. GTA 6 category totals are unconfirmed until Rockstar publishes them. This landing is for GTA 5 (and the classic switcher). GTA 6 sample pins live under /collectibles and are labeled as samples.",
  },
  {
    question: "Who made the tiles?",
    answer:
      "GTA 5 satellite / landmark layers come from community datasets (including GTADB under CC BY 4.0 where enabled). GTA 6 basemap tiles are likewise community cartography, not Rockstar files.",
  },
];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `GTA 5 Interactive Map — Los Santos Tracker | ${SITE.name}`,
    description:
      "Free GTA 5 interactive map on Map-6: Los Santos POIs, collectibles, unlimited local progress (no 100-pin cap), plus Vice City and San Andreas. Switch with ?game=gta5.",
    path: "/maps/gta5",
  });
}

export default async function Gta5MapLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(FAQ)) }}
      />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <p className="text-xs uppercase tracking-wider text-pink-400/80">
          Classic maps
        </p>
        <h1 className="mt-2 text-3xl font-bold">GTA 5 interactive map</h1>
        <p className="mt-4 text-white/60">
          Explore Los Santos and Blaine County in the browser — then stay for
          GTA 6 when November 19, 2026 arrives. Same Map-6 tools: filters,
          coordinates, share links, and a found tracker that does not stop at
          100 pins.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/map?game=gta5"
            className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-400"
          >
            Open GTA 5 map
          </Link>
          <Link
            href="/map?game=vc"
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10"
          >
            Vice City
          </Link>
          <Link
            href="/map?game=sa"
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10"
          >
            San Andreas
          </Link>
        </div>

        <article className="mt-10 space-y-4 text-white/70">
          <p>
            Most people who type “GTA 5 interactive map” already know MapGenie.
            That product earned the category: dense categories, a mobile app,
            and a PRO upgrade. Map-6 is a different job. It is the same
            browser you will use for Leonida — classics included so you can
            practice collectible routes now, then flip <code>?game=gta6</code>{" "}
            without learning a second UI.
          </p>
          <p>
            On GTA 5, open the map and filter collectibles, shops, and
            landmarks. Mark finds locally. There is no free-tier cap of 100
            marks: the checklist lives in your browser under{" "}
            <code>map6-progress:gta5</code>. Export JSON below if you switch
            machines. Import replaces that game’s set — it does not upload to
            us.
          </p>
          <p>
            Data is community-sourced. GTADB satellite tiles and imported
            world POIs are credited under CC BY 4.0 where those assets are
            enabled. Classic Vice City and San Andreas maps use other
            community basemaps (see the map HUD attribution). None of this is
            an official Rockstar file dump.
          </p>
          <p>
            GTA 6 is the primary product. Pins on Leonida mix editorial hubs
            with community GTADB landmarks. Collectible category totals for VI
            are not official — we show sample pins only. If you landed here
            for “all GTA 6 hidden packages,” that list does not exist yet.
            Use <Link href="/collectibles" className="text-pink-300 underline">/collectibles</Link>{" "}
            for honest category pages and{" "}
            <Link href="/map" className="text-pink-300 underline">/map</Link> for
            trailer geography.
          </p>
          <p>
            Creators can overlay the same engine:{" "}
            <Link href="/overlay?game=gta5" className="text-pink-300 underline">
              /overlay?game=gta5
            </Link>{" "}
            plus streamer theme and a <code>ref=</code> handle. The clip kit
            explains Share URLs. Credit community tiles when you talk basemap
            on camera.
          </p>
          <p>
            Related Map-6 reading: the beginner GTA 6 map guide, hidden-packages
            theory (historical patterns, not fake VI counts), pre-order and
            setup guides if you are also shopping for November, and the{" "}
            <Link href="/database" className="text-pink-300 underline">
              source-tagged GTA 6 database
            </Link>
            . Map-6 is a fan hub — not Rockstar, not Take-Two, not MapGenie.
          </p>
        </article>

        <ProgressBackup defaultGame="gta5" className="mt-10 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-white/70" />

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">FAQ</h2>
          <dl className="space-y-4">
            {FAQ.map(({ question, answer }) => (
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
      </main>
    </>
  );
}

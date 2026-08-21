import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `About Map-6 | ${SITE.name}`,
    description:
      "About Map-6: free interactive GTA 6 map for Vice City & Leonida, editorial standards, GTADB attribution, advertising, and contact for map-6.com.",
    path: "/about",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-white/50 hover:text-white"
      >
        ← Home
      </Link>

      <h1 className="mb-2 text-3xl font-bold">About Map-6</h1>
      <p className="mb-8 text-sm text-white/50">
        Independent GTA 6 map & guide site — not affiliated with Rockstar Games
        or Take-Two Interactive.
      </p>

      <div className="space-y-8 text-white/70">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">What we do</h2>
          <p>
            {SITE.name} ({SITE.url}) is a free interactive map and editorial
            guide for <em>Grand Theft Auto VI</em>. Our job is practical: help
            you explore Leonida before and after launch, open location pages with
            real context, track collectible <em>categories</em> without fake
            100% lists, and read news grounded in official sources.
          </p>
          <p className="mt-3">
            The map is the product. Guides, news, and regional hubs exist so the
            map is not a blank pin board — they explain districts, tools, and
            how to separate Rockstar confirmation from community speculation.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <Link href="/map" className="text-pink-300 underline">
                Interactive map
              </Link>{" "}
              — filters, coordinates, measure, shareable deep links
            </li>
            <li>
              <Link href="/locations" className="text-pink-300 underline">
                Locations directory
              </Link>{" "}
              — regional hubs (Vice City, Ocean Drive, Grassrivers, and more)
            </li>
            <li>
              <Link href="/guides" className="text-pink-300 underline">
                Guides
              </Link>{" "}
              — beginner map use, lore, setup, clip kit
            </li>
            <li>
              <Link href="/news" className="text-pink-300 underline">
                News & trailer updates
              </Link>{" "}
              — sourced posts, rumors labeled
            </li>
            <li>
              <Link href="/collectibles" className="text-pink-300 underline">
                Collectibles hub
              </Link>{" "}
              — category methods, not invented totals
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Who Map-6 is for
          </h2>
          <p>
            Players who want a launch-ready map without scrolling twenty Discord
            servers for the same screenshot. Creators who need shareable pins and
            OBS overlays. Readers who want Florida / Leonida geography explained
            in plain language — with clear labels when something is still
            unconfirmed.
          </p>
          <p className="mt-3">
            We are not a leak blog. We will not invent Trailer 3 dates, datamined
            “exclusives,” or fabricated store interiors. If a claim is rumor, we
            say so. If a landmark is clearly visible in an official trailer, it
            earns a pin and a regional blurb.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Editorial standards
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-white/90">No fake leaks</strong> — we do
              not invent trailer dates, datamined exclusives, or fabricated
              screenshots.
            </li>
            <li>
              <strong className="text-white/90">Rumors labeled</strong> —
              unverified claims are never presented as Rockstar confirmation.
            </li>
            <li>
              <strong className="text-white/90">Sources listed</strong> — news
              articles cite Rockstar or reputable outlets when we state facts.
            </li>
            <li>
              <strong className="text-white/90">Map attribution</strong> —
              community tiles and landmark data from GTADB / contributors under{" "}
              <a
                href="https://gtadb.org"
                className="text-pink-300 underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                CC BY 4.0
              </a>{" "}
              where applicable. We clone data responsibly; we do not scrape live
              gtadb.org.
            </li>
            <li>
              <strong className="text-white/90">Thin auto-POIs stay out of
              search</strong>{" "}
              — mass community imports without unique prose are noindex so the
              public index stays editorial.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            How the map is built
          </h2>
          <p>
            Map-6 runs on MapLibre in the browser. Game coordinates are projected
            into a MapLibre-safe space so pins line up with community tiles.
            Multi-game support (GTA 6 default, GTA 5 / San Andreas when tiles are
            configured) uses the same UI chrome: filters, sidebar, measure, share.
          </p>
          <p className="mt-3">
            Basemap imagery is community-sourced, not an official Rockstar
            product. Treat every pre-launch pin as provisional until you can
            verify it in the retail build after November 19, 2026 (console
            launch date announced by Rockstar / Take-Two communications — PC
            timing may differ and stays unconfirmed here unless Rockstar says
            otherwise).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Advertising</h2>
          <p>
            We may show Google AdSense units, always labeled{" "}
            <strong className="text-white/90">Advertisement</strong>, and Amazon
            Associates links where relevant (also disclosed). Ads help keep the
            map free. We keep ads off the fullscreen map and overlay routes so
            gameplay tools stay usable. Details:{" "}
            <Link href="/privacy" className="text-pink-300 underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="mt-3">
            Cookie preferences: essential vs all — see the consent banner and
            privacy page for how AdSense and analytics cookies are described.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Contact</h2>
          <p>
            Privacy & partnership:{" "}
            <a
              href="mailto:privacy@map-6.com"
              className="text-pink-300 underline"
            >
              privacy@map-6.com
            </a>
          </p>
          <p className="mt-2 text-sm text-white/50">
            Rockstar Games, Grand Theft Auto, and GTA are trademarks of their
            respective owners. Map-6 is a fan project. We are not endorsed by
            Rockstar Games or Take-Two Interactive.
          </p>
        </section>
      </div>
    </main>
  );
}

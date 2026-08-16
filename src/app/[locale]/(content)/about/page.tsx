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
      "About Map-6: free interactive GTA 6 map, editorial standards, advertising, and contact for map-6.com.",
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
            {SITE.name} ({SITE.url}) is a free interactive map and guide for{" "}
            <em>Grand Theft Auto VI</em>. Explore Leonida, open location pages,
            track collectibles, and read news grounded in official sources.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <Link href="/map" className="text-pink-300 underline">
                Interactive map
              </Link>
            </li>
            <li>
              <Link href="/locations" className="text-pink-300 underline">
                Locations directory
              </Link>
            </li>
            <li>
              <Link href="/guides" className="text-pink-300 underline">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-pink-300 underline">
                News & trailer updates
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Editorial standards
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-white/90">No fake leaks</strong> — we do
              not invent trailer dates, datamined “exclusives,” or fabricated
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
              community tiles from GTADB (CC BY 4.0) where applicable.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Advertising</h2>
          <p>
            We may show Google AdSense units, always labeled{" "}
            <strong className="text-white/90">Advertisement</strong>, and
            Amazon Associates links where relevant (also disclosed). Ads help
            keep the map free. Details:{" "}
            <Link href="/privacy" className="text-pink-300 underline">
              Privacy Policy
            </Link>
            .
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
            respective owners. Map-6 is a fan project.
          </p>
        </section>
      </div>
    </main>
  );
}

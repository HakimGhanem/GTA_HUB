import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  return buildMetadata({
    locale,
    title: `Privacy Policy | ${SITE.name}`,
    description:
      "Privacy policy for Map-6 (map-6.com): cookies, Google AdSense, analytics, and how we handle your data.",
    path: "/privacy",
  });
}

const LAST_UPDATED = "August 2, 2026";

export default async function PrivacyPage({ params }: Props) {
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

      <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-sm text-white/50">Last updated: {LAST_UPDATED}</p>

      <div className="space-y-8 text-white/70">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            1. Who we are
          </h2>
          <p>
            {SITE.name} ({SITE.url}) is a free interactive map and guide website
            for Grand Theft Auto VI. This policy explains what information is
            collected when you visit our site and how it is used.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            2. Information we collect
          </h2>
          <p className="mb-3">
            We do not require account registration. When you use {SITE.name}, the
            following data may be collected automatically by us or our partners:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-white/90">Usage data</strong> — pages
              visited, referrer, browser type, device type, approximate location
              (country/region), and timestamps.
            </li>
            <li>
              <strong className="text-white/90">Cookies and similar
              technologies</strong> — small files stored on your device to
              measure traffic, deliver ads, and improve the site.
            </li>
            <li>
              <strong className="text-white/90">Map interactions</strong> —
              coordinates you view or copy on the interactive map are processed
              locally in your browser and are not stored on our servers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            3. Third-party services
          </h2>
          <p className="mb-3">
            We use trusted third-party services that may collect data under
            their own privacy policies:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="text-white/90">Google AdSense</strong> — displays
              advertisements. Google may use cookies to serve ads based on your
              prior visits to this site or other websites.{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline hover:text-pink-300"
              >
                Google Advertising Policies
              </a>
              {" · "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline hover:text-pink-300"
              >
                Ad Settings
              </a>
            </li>
            <li>
              <strong className="text-white/90">Google Analytics (GA4)</strong> —
              helps us understand how visitors use the site (page views, traffic
              sources).{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline hover:text-pink-300"
              >
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong className="text-white/90">Microsoft Clarity</strong>{" "}
              (optional) — session recordings and heatmaps to improve usability.{" "}
              <a
                href="https://privacy.microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline hover:text-pink-300"
              >
                Microsoft Privacy Statement
              </a>
            </li>
            <li>
              <strong className="text-white/90">GTADB map tiles</strong> — map
              imagery is sourced from the GTA VI Mapping Community (GTADB) under
              CC BY 4.0. Loading tiles may involve requests to our hosting
              provider; no personal data is sent to GTADB through your browser.
            </li>
            <li>
              <strong className="text-white/90">Amazon Associates</strong> — some
              pages may include affiliate links to Amazon.fr. If you purchase
              through these links, we may earn a commission at no extra cost to
              you.{" "}
              <a
                href="https://affiliate-program.amazon.fr/help/operating/policies/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline hover:text-pink-300"
              >
                Amazon Associates Programme Policies
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            4. Cookies
          </h2>
          <p className="mb-3">Cookies we or our partners may set include:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Essential cookies — required for the site to function.</li>
            <li>Analytics cookies — to measure audience and performance.</li>
            <li>Advertising cookies — to show relevant ads via Google AdSense.</li>
          </ul>
          <p className="mt-3">
            You can block or delete cookies in your browser settings. Note that
            disabling cookies may affect site functionality or ad personalization.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            5. Legal bases (EEA/UK visitors)
          </h2>
          <p>
            Where applicable under GDPR, we process data based on: (a) your
            consent (advertising/analytics cookies where required), (b) legitimate
            interest in operating and improving a free map service, and (c)
            compliance with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            6. Your rights
          </h2>
          <p className="mb-3">
            Depending on your location, you may have the right to access, correct,
            delete, or restrict processing of your personal data, or to object to
            processing and data portability.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Opt out of personalized ads:{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline hover:text-pink-300"
              >
                Google Ad Settings
              </a>
            </li>
            <li>
              Opt out of Google Analytics:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline hover:text-pink-300"
              >
                Google Analytics Opt-out
              </a>
            </li>
            <li>
              EU users:{" "}
              <a
                href="https://www.youronlinechoices.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline hover:text-pink-300"
              >
                Your Online Choices
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            7. Children
          </h2>
          <p>
            {SITE.name} is not directed at children under 13 (or 16 in the EEA).
            We do not knowingly collect personal information from children. GTA VI
            is rated Mature (17+); parents should supervise minors&apos; use of
            this fan site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            8. Data retention
          </h2>
          <p>
            Analytics and advertising partners retain data according to their own
            policies (typically 2–26 months for GA4). We do not maintain a user
            account database on {SITE.name}.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            9. Changes to this policy
          </h2>
          <p>
            We may update this page when we add services or change practices. The
            &quot;Last updated&quot; date at the top will reflect the latest
            revision. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            10. Contact
          </h2>
          <p>
            For privacy-related questions about {SITE.name}, contact us at{" "}
            <a
              href="mailto:privacy@map-6.com"
              className="text-pink-400 underline hover:text-pink-300"
            >
              privacy@map-6.com
            </a>
            .
          </p>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm">
          <p>
            <strong className="text-white/90">Disclaimer:</strong> {SITE.name} is
            a fan-made interactive map and is not affiliated with, endorsed by, or
            connected to Rockstar Games or Take-Two Interactive. Grand Theft Auto
            and GTA are trademarks of their respective owners.
          </p>
        </section>
      </div>
    </main>
  );
}

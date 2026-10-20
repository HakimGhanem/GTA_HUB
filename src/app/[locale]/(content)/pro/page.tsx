import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProgressBackup } from "@/components/map/ProgressBackup";
import { BuyProButton } from "@/components/pro/BuyProButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import { buildMetadata, jsonLdFAQ } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const PRO_FAQ = [
  {
    question: "What is Map-6 Pro?",
    answer:
      "Map-6 Pro is a one-time €3.99 unlock for the GTA 6 interactive map: no ads on content pages, collectible tracker with cloud sync, CSV pin export, and the full streamer overlay kit. There is no subscription.",
  },
  {
    question: "Do I need Pro to use the GTA 6 map?",
    answer:
      "No. The fullscreen map, guides, news and local collectible tracking stay free. Pro removes ads and adds cloud sync plus CSV export.",
  },
  {
    question: "Is Map-6 Pro a subscription?",
    answer:
      "No. €3.99 is charged once. Stripe stores the email used at checkout so you can restore Pro on another device.",
  },
];

const COMPARISON: [string, string, string][] = [
  ["Interactive map", "✓", "✓"],
  ["All guides & news", "✓", "✓"],
  ["Ads on content pages", "Shown", "None"],
  ["Collectible tracker", "Local", "Cloud sync"],
  ["JSON progress backup", "✓", "✓"],
  ["CSV pin export", "✗", "✓"],
  ["Streamer overlay kit", "Basic", "Full"],
];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `Map-6 Pro — GTA 6 Launch Edition | ${SITE.name}`,
    description:
      "Lifetime Map-6 Pro for €3.99 once: no ads, collectible tracker with cloud sync, CSV pin export, streamer overlay kit. One payment. No subscription.",
    path: "/pro",
    canonicalLocale: "en",
    hreflangLocales: ["en"],
  });
}

export default async function ProPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <JsonLd data={jsonLdFAQ(PRO_FAQ)} />
      <p className="text-xs uppercase tracking-wider text-pink-400/80">Pro</p>
      <h1 className="mt-2 text-3xl font-bold">
        Map-6 Pro — GTA 6 Launch Edition
      </h1>
      <p className="mt-4 text-foreground/60">
        <strong className="text-foreground">€3.99 once. Pro forever.</strong> No
        subscription, no renewal. Stripe collects the email — no Map-6 account
        required. Local found marks and JSON export stay free.
      </p>

      <ul className="mt-8 space-y-3 text-foreground/70">
        <li className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <strong className="text-foreground">No ads</strong> — content pages hide
          AdSense for Pro. The fullscreen map and overlay stay ad-free either
          way.
        </li>
        <li className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <strong className="text-foreground">Collectible tracker + cloud sync</strong>{" "}
          — same found set on a second device when Firestore is on. Free tier
          stays unlimited local only.
        </li>
        <li className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <strong className="text-foreground">CSV pin export</strong> — download your
          pins. JSON backup below already works for everyone.
        </li>
        <li className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <strong className="text-foreground">Streamer overlay kit</strong> — keep{" "}
          <code className="text-foreground/80">ref=</code> plus cleaner creator
          chrome. See the{" "}
          <Link href="/creators" className="text-accent underline">
            overlay kit
          </Link>
          .
        </li>
      </ul>

      <table className="mt-10 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-foreground/10 text-foreground/50">
            <th className="py-2 font-medium">Feature</th>
            <th className="py-2 font-medium">Free</th>
            <th className="py-2 font-medium">Pro</th>
          </tr>
        </thead>
        <tbody className="text-foreground/70">
          {COMPARISON.map(([feature, free, pro]) => (
            <tr key={feature} className="border-b border-foreground/5">
              <td className="py-2 text-foreground">{feature}</td>
              <td className="py-2">{free}</td>
              <td className="py-2">{pro}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-10">
        <span className="text-4xl font-bold">€3.99</span>
        <span className="text-sm text-foreground/50"> once · lifetime access</span>
      </p>

      <BuyProButton />

      <p className="mt-4 text-sm text-foreground/50">
        Already paid?{" "}
        <Link href="/pro/restore" className="text-accent underline">
          Restore Pro on this device
        </Link>
        .
      </p>

      <ProgressBackup className="mt-8 rounded-xl border border-foreground/10 bg-foreground/5 p-5 text-sm text-foreground/70" />

      <section className="mt-12 space-y-4">
        <h2 className="text-lg font-semibold">Questions</h2>
        {PRO_FAQ.map((item) => (
          <div key={item.question}>
            <h3 className="font-medium text-foreground">{item.question}</h3>
            <p className="mt-1 text-sm text-foreground/60">{item.answer}</p>
          </div>
        ))}
      </section>

      <p className="mt-10 text-sm text-foreground/50">
        Launch week:{" "}
        <Link href="/guides/gta-6-release-time" className="text-accent underline">
          unlock time
        </Link>
        ,{" "}
        <Link href="/guides/gta-6-preload" className="text-accent underline">
          preload
        </Link>
        ,{" "}
        <Link href="/guides/gta-6-file-size" className="text-accent underline">
          storage
        </Link>
        . GTA 5 practice:{" "}
        <Link href="/maps/gta5" className="text-accent underline">
          GTA 5 map landing
        </Link>
        . Map-6 is not Rockstar.
      </p>
    </main>
  );
}

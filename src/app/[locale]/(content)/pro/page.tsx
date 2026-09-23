import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProgressBackup } from "@/components/map/ProgressBackup";
import { BuyProButton } from "@/components/pro/BuyProButton";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

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

      <BuyProButton />

      <p className="mt-4 text-sm text-foreground/50">
        Already paid?{" "}
        <Link href="/pro/restore" className="text-accent underline">
          Restore Pro on this device
        </Link>
        .
      </p>

      <ProgressBackup className="mt-8 rounded-xl border border-foreground/10 bg-foreground/5 p-5 text-sm text-foreground/70" />

      <p className="mt-10 text-sm text-foreground/50">
        GTA 5 practice:{" "}
        <Link href="/maps/gta5" className="text-accent underline">
          GTA 5 map landing
        </Link>
        . Map-6 is not Rockstar.
      </p>
    </main>
  );
}

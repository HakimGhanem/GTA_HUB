import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProgressBackup } from "@/components/map/ProgressBackup";
import { ProWaitlist } from "@/components/pro/ProWaitlist";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `Map-6 Pro — Tracker Sync & Overlay (coming) | ${SITE.name}`,
    description:
      "Map-6 Pro is planned before GTA 6 launch: cloud progress sync, optional no-ads, branded overlay. 2.99–3.99 €/mo framing. Waitlist only — no Stripe yet. Local export works today.",
    path: "/pro",
  });
}

export default async function ProPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <p className="text-xs uppercase tracking-wider text-pink-400/80">Pro</p>
      <h1 className="mt-2 text-3xl font-bold">Map-6 Pro — coming before launch</h1>
      <p className="mt-4 text-white/60">
        Target price band: <strong className="text-white">2.99–3.99 €/month</strong>.
        No checkout today. Local found marks and JSON export already work for
        free — Pro is for people who want that checklist on a second device
        and fewer ads on guide pages.
      </p>

      <ul className="mt-8 space-y-3 text-white/70">
        <li className="rounded-xl border border-white/10 bg-white/5 p-4">
          <strong className="text-white">Cloud sync (soon)</strong> — same found
          set on phone and desktop. Free tier stays unlimited local only.
        </li>
        <li className="rounded-xl border border-white/10 bg-white/5 p-4">
          <strong className="text-white">Optional no-ads</strong> — content
          pages only. The fullscreen map and overlay stay ad-free either way.
        </li>
        <li className="rounded-xl border border-white/10 bg-white/5 p-4">
          <strong className="text-white">Branded overlay</strong> — keep{" "}
          <code className="text-white/80">ref=</code> plus a cleaner creator
          chrome when the paid tier ships.
        </li>
        <li className="rounded-xl border border-white/10 bg-white/5 p-4">
          <strong className="text-white">Export / import today</strong> — JSON
          backup below. We do not store your file on a server.
        </li>
      </ul>

      <ProWaitlist />

      <ProgressBackup className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-white/70" />

      <p className="mt-10 text-sm text-white/50">
        Creators: start with the{" "}
        <Link href="/creators" className="text-pink-300 underline">
          overlay kit
        </Link>
        . GTA 5 practice:{" "}
        <Link href="/maps/gta5" className="text-pink-300 underline">
          GTA 5 map landing
        </Link>
        . Map-6 is not Rockstar.
      </p>
    </main>
  );
}

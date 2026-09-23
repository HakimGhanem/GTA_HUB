import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RestoreProForm } from "@/components/pro/RestoreProForm";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `Restore Map-6 Pro | ${SITE.name}`,
    description:
      "Restore Map-6 Pro on this device with the email used at Stripe checkout.",
    path: "/pro/restore",
    canonicalLocale: "en",
    hreflangLocales: ["en"],
    robots: { index: false, follow: true },
  });
}

export default async function ProRestorePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-xl flex-1 px-4 py-10">
      <p className="text-xs uppercase tracking-wider text-pink-400/80">Pro</p>
      <h1 className="mt-2 text-3xl font-bold">Restore Pro on this device</h1>
      <p className="mt-4 text-foreground/60">
        Use the same email you entered on Stripe. We look up the purchase and
        unlock Pro locally — no login, no subscription.
      </p>
      <RestoreProForm />
      <p className="mt-8 text-sm text-foreground/50">
        New here?{" "}
        <Link href="/pro" className="text-accent underline">
          Get Map-6 Pro — €3.99 once
        </Link>
        .
      </p>
    </main>
  );
}

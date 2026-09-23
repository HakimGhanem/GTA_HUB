import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SetProCookie } from "@/components/pro/SetProCookie";
import { SITE } from "@/lib/constants";
import { isStripeConfigured, retrievePaidProSession } from "@/lib/stripe";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: `You're Pro | ${SITE.name}`,
    description: "Map-6 Pro is active on this device — no ads, full tracker, CSV export.",
    path: "/pro/success",
    canonicalLocale: "en",
    hreflangLocales: ["en"],
    robots: { index: false, follow: false },
  });
}

export default async function ProSuccessPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { session_id: sessionId } = await searchParams;
  setRequestLocale(locale);

  let email = "";
  let paid = false;

  if (sessionId && isStripeConfigured()) {
    try {
      const session = await retrievePaidProSession(sessionId);
      paid = session.paid;
      email = session.email;
    } catch {
      paid = false;
    }
  }

  return (
    <main className="mx-auto max-w-xl flex-1 px-4 py-20 text-center">
      <SetProCookie sessionId={sessionId} email={email} paid={paid} />
      <p className="text-5xl">🗺️</p>
      <h1 className="mt-4 text-3xl font-bold">
        {paid ? "You're Pro." : "Payment not confirmed"}
      </h1>
      <p className="mt-4 text-foreground/60">
        {paid ? (
          <>
            {email ? `Confirmation sent to ${email}. ` : null}
            No ads, full tracker, CSV export — active on this device now.
          </>
        ) : (
          <>
            We could not verify this checkout session. If you were charged, open{" "}
            <Link href="/pro/restore" className="text-accent underline">
              restore Pro
            </Link>{" "}
            with the same email or write to{" "}
            <a
              href="mailto:hello@map-6.com?subject=Map-6%20Pro%20receipt"
              className="text-accent underline"
            >
              hello@map-6.com
            </a>
            .
          </>
        )}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/map"
          className="rounded-lg bg-pink-500 px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-pink-400"
        >
          Open the Map →
        </Link>
        <Link
          href="/guides"
          className="rounded-lg border border-foreground/15 px-6 py-3 text-sm text-foreground/80 hover:border-foreground/30"
        >
          Browse Guides
        </Link>
      </div>

      <p className="mt-12 text-xs text-foreground/40">
        Pro is stored on this device. To restore on another device, use the same
        email at{" "}
        <Link href="/pro/restore" className="text-accent underline">
          /pro/restore
        </Link>
        .
      </p>
    </main>
  );
}

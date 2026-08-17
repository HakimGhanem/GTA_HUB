import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { OverlayPageClient } from "./OverlayPageClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Map-6 Overlay · OBS / Kick",
    description: "Transparent Map-6 browser source for OBS, Kick, and Twitch.",
    robots: { index: false, follow: false },
    alternates: { canonical: `https://map-6.com/${locale}/overlay` },
  };
}

export default async function OverlayPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main
      id="main-content"
      className="fixed inset-0 z-50 h-[100dvh] w-screen overflow-hidden bg-transparent"
    >
      <OverlayPageClient />
    </main>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { MapPageClient } from "./MapPageClient";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: t("mapTitle"),
    description: t("mapDesc"),
    path: "/map",
  });
}

function MapLoading() {
  return (
    <div className="flex h-full items-center justify-center bg-[#0a0e17] text-white/50">
      Loading map…
    </div>
  );
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="h-[calc(100dvh-3.5rem)] flex-1">
      <Suspense fallback={<MapLoading />}>
        <MapPageClient />
      </Suspense>
    </main>
  );
}

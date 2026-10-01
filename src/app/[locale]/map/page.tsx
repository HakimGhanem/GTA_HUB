import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ConversionStrip } from "@/components/newsletter/ConversionStrip";
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
    <div className="flex h-full items-center justify-center bg-background text-foreground/50">
      Loading map…
    </div>
  );
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");

  return (
    <main
      id="main-content"
      className="flex h-[calc(100dvh-3.5rem)] flex-1 flex-col"
    >
      <div className="shrink-0 border-b border-foreground/10 bg-background px-3 py-1.5 sm:px-4">
        <h1 className="text-sm font-semibold tracking-tight text-foreground">
          {t("mapH1")}
        </h1>
        <p className="text-[11px] text-foreground/50">{t("mapLead")}</p>
      </div>
      <ConversionStrip variant="map" />
      <div className="min-h-0 flex-1">
        <Suspense fallback={<MapLoading />}>
          <MapPageClient />
        </Suspense>
      </div>
    </main>
  );
}

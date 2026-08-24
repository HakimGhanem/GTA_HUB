import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { Analytics } from "@/components/analytics/Analytics";
import { ConsentBridge } from "@/components/analytics/ConsentBridge";
import { ConsentDefaultsScript, GaScript } from "@/components/analytics/GaScript";
import { GtmNoScript, GtmScript } from "@/components/analytics/GtmScript";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { Header } from "@/components/layout/Header";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { routing } from "@/i18n/routing";
import { ADSENSE_CLIENT } from "@/lib/ads-config";
import {
  buildMetadata,
  jsonLdOrganization,
  jsonLdWebApplication,
  jsonLdWebSite,
} from "@/lib/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_VERIFICATION;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    ...buildMetadata({
      locale,
      title: t("homeTitle"),
      description: t("homeDesc"),
      path: "/",
    }),
    verification: {
      ...(gscVerification ? { google: gscVerification } : {}),
      other: {
        ...(bingVerification ? { "msvalidate.01": bingVerification } : {}),
        ...(ADSENSE_CLIENT
          ? { "google-adsense-account": ADSENSE_CLIENT }
          : {}),
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tHeader = await getTranslations("header");

  const structuredData = [
    jsonLdWebSite(locale),
    jsonLdOrganization(),
    jsonLdWebApplication(locale),
  ];

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ConsentDefaultsScript />
        <GtmScript />
        <GaScript />
        <AdSenseScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex h-full flex-col bg-[#0a0e17] text-white">
        <GtmNoScript />
        <NextIntlClientProvider messages={messages}>
          <ConsentBridge />
          <a href="#main-content" className="skip-link">
            {tHeader("skipToContent")}
          </a>
          <ChromeGate>
            <Header />
          </ChromeGate>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <Analytics />
          <ChromeGate>
            <CookieConsent />
          </ChromeGate>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

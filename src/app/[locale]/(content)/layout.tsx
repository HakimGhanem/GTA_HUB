import { Footer } from "@/components/layout/Footer";
import { AdBanner } from "@/components/ads/AdBanner";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div id="main-content" className="flex flex-1 flex-col">
        {children}
      </div>
      <AdBanner />
      <Footer />
    </>
  );
}

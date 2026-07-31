import { ADSENSE_CLIENT } from "@/lib/ads-config";

/** Required by AdSense — https://map-6.com/ads.txt */
export function GET() {
  if (!ADSENSE_CLIENT) {
    return new Response("# AdSense not configured\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const publisherId = ADSENSE_CLIENT.replace(/^ca-pub-/, "pub-");

  return new Response(
    `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    },
  );
}

import { ImageResponse } from "next/og";
import type { ReactElement } from "react";
import { OG_SIZE, loadOgAssets } from "./basemap";

/** Shared by every OG route: same size, fonts and cache policy. */
export async function ogImageResponse(
  card: (basemap: string) => ReactElement,
): Promise<ImageResponse> {
  const { basemap, regular, bold } = await loadOgAssets();

  return new ImageResponse(card(basemap), {
    ...OG_SIZE,
    fonts: [
      { name: "Geist", data: regular, weight: 400, style: "normal" },
      { name: "Geist", data: bold, weight: 700, style: "normal" },
    ],
    headers: {
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

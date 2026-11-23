import { mapPanelOgCard } from "@/components/og/MapPanelOgCard";
import {
  getCollectibleType,
  getCollectiblesByType,
} from "@/data/collectibles";
import { ogImageResponse } from "@/lib/og/response";

export const revalidate = 86400;

type Context = { params: Promise<{ type: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { type } = await params;
  const collectibleType = getCollectibleType(type);
  if (!collectibleType) return new Response("Unknown type", { status: 404 });

  const items = getCollectiblesByType(type);

  return ogImageResponse((basemap) =>
    mapPanelOgCard({
      kicker: "Collectibles",
      title: collectibleType.name,
      statValue: collectibleType.total ?? collectibleType.required ?? 0,
      statLabel: collectibleType.total
        ? `in game · ${collectibleType.required} for 100%`
        : "scans for 100%",
      pins: items.map(({ x, y }) => ({ x, y })),
      basemap,
    }),
  );
}

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
      statValue: items.length,
      statLabel: `pins mapped of ${collectibleType.total}`,
      pins: items.map(({ x, y }) => ({ x, y })),
      basemap,
    }),
  );
}

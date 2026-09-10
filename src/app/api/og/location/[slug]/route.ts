import { locationOgCard } from "@/components/og/LocationOgCard";
import { getLocationBySlug } from "@/data/all-locations";
import { cropAround } from "@/lib/og/basemap";
import { ogImageResponse } from "@/lib/og/response";

export const revalidate = 86400;

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return new Response("Unknown location", { status: 404 });

  return ogImageResponse((basemap) =>
    locationOgCard({
      name: location.name,
      region: location.region,
      category: location.category,
      x: location.x,
      y: location.y,
      view: cropAround(location.x, location.y),
      basemap,
    }),
  );
}

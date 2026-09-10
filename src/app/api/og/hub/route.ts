import { mapPanelOgCard } from "@/components/og/MapPanelOgCard";
import { getAllLocations } from "@/data/all-locations";
import { ogImageResponse } from "@/lib/og/response";

export const revalidate = 86400;

/** Enough pins to read as density, few enough to keep Satori fast. */
const MAX_PINS = 140;

export async function GET() {
  const locations = getAllLocations();
  const step = Math.max(1, Math.ceil(locations.length / MAX_PINS));
  const pins = locations
    .filter((_, index) => index % step === 0)
    .map(({ x, y }) => ({ x, y }));

  return ogImageResponse((basemap) =>
    mapPanelOgCard({
      kicker: "State of Leonida",
      title: "GTA 6 Interactive Map",
      statValue: locations.length,
      statLabel: "mapped locations",
      pins,
      basemap,
    }),
  );
}

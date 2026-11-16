import { SITE } from "@/lib/constants";
import { getLocationChangelog } from "@/lib/location-freshness";

/** Map changelog RSS — https://map-6.com/updates.xml (?lang=fr for French) */
export function GET(request: Request) {
  const fr = new URL(request.url).searchParams.get("lang") === "fr";
  const locale = fr ? "fr" : "en";

  const items = getLocationChangelog()
    .map((entry) => {
      const link = `${SITE.url}/${locale}/updates#${entry.date}`;
      const title =
        entry.added != null
          ? fr
            ? `Carte GTA 6 : +${entry.added} pins, ${entry.updated ?? 0} mis à jour`
            : `GTA 6 map: +${entry.added} pins, ${entry.updated ?? 0} updated`
          : fr
            ? `Carte GTA 6 : import de référence (${entry.total} pins)`
            : `GTA 6 map: baseline import (${entry.total} pins)`;
      const names = [...(entry.samples?.added ?? []), ...(entry.samples?.updated ?? [])]
        .slice(0, 8)
        .map((s) => s.name)
        .join(", ");
      const description = fr
        ? `${entry.total} pins GTADB après synchronisation, dont ${entry.identified} rapprochés d’un bâtiment réel.${names ? ` Notamment : ${names}.` : ""}`
        : `${entry.total} GTADB pins after this sync, ${entry.identified} matched to a real building.${names ? ` Including: ${names}.` : ""}`;
      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${entry.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${fr ? "Map-6 — Mises à jour de la carte GTA 6" : "Map-6 — GTA 6 Map Updates"}</title>
    <link>${SITE.url}/${locale}/updates</link>
    <description>${fr ? "Pins ajoutés et bâtiments ré-identifiés sur la carte GTA 6 de Map-6." : "Pins added and buildings re-identified on Map-6's GTA 6 map."}</description>
    <language>${locale}</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}

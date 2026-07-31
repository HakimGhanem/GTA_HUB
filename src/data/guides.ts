export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: "beginner" | "exploration" | "collectibles" | "lore";
  readTime: number;
  publishedAt: string;
  content: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "gta-6-preorder-guide",
    title: "GTA 6 Pre-Order Guide — PS5, Xbox & Collector's Edition",
    description:
      "Where to pre-order GTA 6 on Amazon: Standard and Collector's editions for PS5 and Xbox, plus hardware picks for launch day.",
    category: "beginner",
    readTime: 7,
    publishedAt: "2026-07-27",
    content: [
      "Grand Theft Auto VI launches November 19, 2026 on PS5 and Xbox Series X|S.",
      "This guide lists Amazon product slots ready for your SiteStripe affiliate ASINs.",
    ],
  },
  {
    slug: "gta-6-map-guide",
    title: "GTA 6 Interactive Map — Complete Beginner's Guide",
    description:
      "Learn how to use the Map-6 interactive map to explore Vice City, track coordinates, and find every collectible.",
    category: "beginner",
    readTime: 5,
    publishedAt: "2026-07-01",
    content: [
      "Map-6 helps you explore Grand Theft Auto VI's open world — Vice City, the Keys, Port Gellhorn, and beyond.",
      "Use the coordinate display on the map to copy exact X/Y positions. Share these with friends or cross-reference with community discoveries.",
      "Filter locations by category — landmarks, collectibles, shops, missions, and secrets — to focus your session. Every POI links to a dedicated page.",
      "Bookmark Map-6 before launch day. We update as new trailers and community data surface.",
    ],
  },
  {
    slug: "vice-city-locations",
    title: "Vice City — Every Known Location in GTA 6",
    description:
      "A region-by-region breakdown of Vice City: Ocean Drive, Little Vice, the beachfront, and downtown high-rises confirmed from trailers.",
    category: "exploration",
    readTime: 8,
    publishedAt: "2026-07-05",
    content: [
      "Vice City returns as the beating heart of GTA 6, inspired by Miami's South Beach and art deco district. Ocean Drive is the most photographed area — expect hotels, nightclubs, and high-end shops.",
      "Little Vice offers a grittier contrast: warehouses, street art, and back-alley missions. Our map marks every confirmed trailer location.",
      "The Vice City beachfront connects to the Keys via causeways. Watch for hidden packages along the shoreline and stunt jumps off pier ramps.",
    ],
  },
  {
    slug: "hidden-packages-gta-6",
    title: "Hidden Packages in GTA 6 — What We Know So Far",
    description:
      "Will hidden packages return in GTA 6? Everything we know about classic collectibles so far.",
    category: "collectibles",
    readTime: 6,
    publishedAt: "2026-07-10",
    content: [
      "Hidden packages have been a GTA staple since the series' 3D era. Rockstar has teased a return to classic collectibles in GTA 6, and community dataminers expect at least 100 packages across the map.",
      "Packages typically spawn in hard-to-reach spots: rooftops, underwater alcoves, and behind destructible objects. Our map tracks every confirmed and rumored location.",
      "Collecting all packages may unlock exclusive rewards — vehicle liveries, property discounts, or Social Club achievements. We'll update rewards the moment they're datamined.",
    ],
  },
  {
    slug: "leonida-lore-overview",
    title: "GTA 6 World — Lore & Geography Overview",
    description:
      "From Ambrosia Island to the Grassrivers: understand the geography and fiction of GTA 6's setting.",
    category: "lore",
    readTime: 10,
    publishedAt: "2026-07-12",
    content: [
      "GTA 6's world is Rockstar's fictional take on Florida — luxury yachts, swamp country, spring break tourism, and organized crime.",
      "Ambrosia Island mirrors real-world Fisher Island and Star Island — ultra-exclusive real estate for the 1%. Expect story missions involving high-society heists.",
      "Port Gellhorn represents the industrial Panhandle: shipping yards, military installations, and smuggling routes. The Grassrivers are the Everglades — airboat chases and wildlife photography.",
      "Map-6 maps every region with searchable POIs so you never lose context while exploring.",
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: Guide["category"]) {
  return GUIDES.filter((g) => g.category === category);
}

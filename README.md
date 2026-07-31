# Map-6 — Interactive GTA 6 Map

Interactive map for GTA 6 built with Next.js, MapLibre GL, and PMTiles.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Generate map tiles

### GTADB community tiles (recommended)

Downloads [gtadb.org](https://github.com/rolux/gtadb.org) yanis tiles (CC BY 4.0), stitches them for MapLibre, imports POIs:

```bash
npm run tiles:fetch-gtadb   # auto-installs Pillow in .cache/venv
npm run dev
```

Optional tile set: `npm run tiles:fetch-gtadb -- dupzor,51`

**Attribution required:** Map tiles © GTADB / GTA VI Mapping Community — [CC BY 4.0](https://gtadb.org)

### Custom vector regions (PMTiles)

```bash
brew install tippecanoe   # once
npm run tiles:generate
# → public/tiles/leonida.pmtiles
```

**Raster from map image (when you have the Leonida artwork):**

```bash
brew install gdal         # once
npm run tiles:raster -- path/to/leonida-map.png
```

Copy `.env.example` → `.env.local` and set tile URLs.

## Deploy (Vercel)

```bash
npx vercel
```

1. Set `NEXT_PUBLIC_SITE_URL` to your production domain
2. Set `NEXT_PUBLIC_GSC_VERIFICATION` from [Google Search Console](https://search.google.com/search-console)
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## SEO pages

| Route | Purpose |
|-------|---------|
| `/` | Landing |
| `/map` | Full-screen interactive map |
| `/locations/[slug]` | POI pages (SSG) |
| `/collectibles/[type]` | Collectible categories |
| `/guides/[slug]` | Long-form guides |

Add content in `src/data/locations.ts`, `collectibles.ts`, `guides.ts`.

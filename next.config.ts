import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import {
  RETIRED_COLLECTIBLE_TYPES,
  RETIRED_GUIDES,
  RETIRED_SAMPLE_PIN_PREFIXES,
} from "./src/data/retired-guides";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  // Basemap + fonts are read from disk by the OG image routes, so file tracing
  // cannot discover them on its own.
  outputFileTracingIncludes: {
    "/api/og/**": ["./assets/og/**"],
  },
  // Next streams metadata for any UA outside its bot allowlist, which leaves
  // <title> and <meta description> at the end of <body>. Googlebot and every
  // AI crawler we invite in robots.txt are outside that list, so they read a
  // head with no title or description. Block metadata for everyone instead.
  htmlLimitedBots: /.*/,
  transpilePackages: ["maplibre-gl", "react-map-gl"],
  serverExternalPackages: ["firebase-admin"],
  poweredByHeader: false,
  async redirects() {
    return [
      ...Object.entries(RETIRED_GUIDES).map(([from, to]) => ({
        source: `/:locale/guides/${from}`,
        destination: `/:locale${to}`,
        permanent: true,
      })),
      ...Object.entries(RETIRED_COLLECTIBLE_TYPES).map(([from, to]) => ({
        source: `/:locale/collectibles/${from}`,
        destination: `/:locale/collectibles/${to}`,
        permanent: true,
      })),
      ...Object.entries(RETIRED_SAMPLE_PIN_PREFIXES).map(([prefix, to]) => ({
        source: `/:locale/locations/${prefix}-:n(\\d+)`,
        destination: `/:locale/collectibles/${to}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/tiles/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

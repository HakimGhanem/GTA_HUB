import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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
    // Two PC guides said the same thing as gta-6-pc-requirements, which also
    // covers the release date. Merged there; keep the old URLs reachable.
    const retiredGuides: Record<string, string> = {
      "gta-6-pc-release-date": "gta-6-pc-requirements",
      "gta-6-pc-recommended-specs": "gta-6-pc-requirements",
    };
    return Object.entries(retiredGuides).map(([from, to]) => ({
      source: `/:locale/guides/${from}`,
      destination: `/:locale/guides/${to}`,
      permanent: true,
    }));
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

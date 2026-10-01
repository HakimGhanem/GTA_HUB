import { NextResponse } from "next/server";
import { getLiveDirectorySafe } from "@/lib/twitch/directory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const directory = await getLiveDirectorySafe();

  // The CDN absorbs the traffic; the cache inside getLiveDirectory keeps the
  // origin off Helix if the edge misses.
  const cacheControl = directory.error
    ? "public, s-maxage=15"
    : "public, s-maxage=60, stale-while-revalidate=600";

  return NextResponse.json(directory, {
    headers: { "Cache-Control": cacheControl },
  });
}

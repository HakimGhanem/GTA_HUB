import type { NextRequest } from "next/server";
import { locales } from "@/i18n/routing";
import { buildLlmsFullTxt } from "@/lib/ai/llms";

export const dynamic = "force-dynamic";

function requestedLocale(request: NextRequest): string {
  const lang = request.nextUrl.searchParams.get("lang");
  return lang && (locales as readonly string[]).includes(lang) ? lang : "en";
}

/** Full editorial corpus for retrieval — https://map-6.com/llms-full.txt */
export async function GET(request: NextRequest) {
  const body = await buildLlmsFullTxt(requestedLocale(request));

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

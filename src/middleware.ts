import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Canonical production host — all other domains redirect here */
const CANONICAL_HOST = process.env.NEXT_PUBLIC_CANONICAL_HOST ?? "map-6.com";

const REDIRECT_HOSTS = new Set(["map6.live", "www.map6.live", "www.map-6.com"]);

/** Upgrade temporary locale redirects to permanent for SEO/GSC. */
function toPermanentRedirect(response: NextResponse, request: NextRequest) {
  if (response.status !== 307 && response.status !== 302) return response;

  const location = response.headers.get("location");
  if (!location) return response;

  const url = new URL(location, request.url);
  const permanent = NextResponse.redirect(url, 308);

  response.cookies.getAll().forEach((cookie) => {
    permanent.cookies.set(cookie.name, cookie.value);
  });

  return permanent;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";

  if (REDIRECT_HOSTS.has(host)) {
    const target = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      `https://${CANONICAL_HOST}`,
    );
    return NextResponse.redirect(target, 301);
  }

  const response = intlMiddleware(request);
  return toPermanentRedirect(response, request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

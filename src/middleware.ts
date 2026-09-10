import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Single public origin. Aliases 301 here — never the reverse. */
const CANONICAL_HOST = process.env.NEXT_PUBLIC_CANONICAL_HOST ?? "map-6.com";

const REDIRECT_HOSTS = new Set(["map6.live", "www.map6.live", "www.map-6.com"]);

/**
 * Answer-engine and training crawlers. Matched only to emit a structured log
 * line — none of them are blocked, see `src/app/robots.ts`.
 */
const AI_CRAWLER_PATTERN =
  /(GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|Applebot-Extended|CCBot|Bytespider|meta-externalagent|FacebookBot|cohere-ai|Amazonbot|DuckAssistBot|MistralAI-User|YouBot|Diffbot|Timpibot|AI2Bot|SemrushBot-OCOB)/i;

function requestHost(request: NextRequest): string {
  return request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
}

function skipIntl(pathname: string): boolean {
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/md")) return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/_vercel")) return true;
  return pathname.includes(".");
}

/** One structured line per AI-crawler hit — queryable in Cloud Logging. */
function logAiCrawler(request: NextRequest) {
  const agent = request.headers.get("user-agent") ?? "";
  const match = agent.match(AI_CRAWLER_PATTERN);
  if (!match) return;

  console.info(
    JSON.stringify({
      event: "ai_crawler_hit",
      bot: match[1],
      path: request.nextUrl.pathname,
    }),
  );
}

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
  const host = requestHost(request);

  if (host && host !== CANONICAL_HOST && REDIRECT_HOSTS.has(host)) {
    const target = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      `https://${CANONICAL_HOST}`,
    );
    return NextResponse.redirect(target, 301);
  }

  logAiCrawler(request);

  // `/en/guides/foo.md` → markdown mirror, without shadowing the HTML route.
  if (request.nextUrl.pathname.endsWith(".md")) {
    const target = request.nextUrl.clone();
    target.pathname = `/md${request.nextUrl.pathname.slice(0, -3)}`;
    return NextResponse.rewrite(target);
  }

  if (skipIntl(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const response = intlMiddleware(request);
  return toPermanentRedirect(response, request);
}

export const config = {
  // Include sitemap.xml / robots.txt / ads.txt — aliases must 301 too.
  matcher: ["/((?!_next/static|_next/image|_vercel).*)"],
};

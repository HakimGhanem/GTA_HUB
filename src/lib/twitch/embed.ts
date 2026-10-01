import { SITE } from "@/lib/constants";

/**
 * Twitch refuses to render the iframe unless every ancestor host is listed in
 * `parent`. The site host plus localhost covers prod and dev; Vercel preview
 * domains have to be added through NEXT_PUBLIC_TWITCH_PARENTS.
 */
function siteHost(): string {
  try {
    return new URL(SITE.url).hostname;
  } catch {
    return "map-6.com";
  }
}

export function twitchParents(): string[] {
  const extra = (process.env.NEXT_PUBLIC_TWITCH_PARENTS ?? "")
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);

  return [...new Set([siteHost(), "localhost", ...extra])];
}

function parentQuery(): string {
  return twitchParents()
    .map((host) => `parent=${encodeURIComponent(host)}`)
    .join("&");
}

export function playerEmbedUrl(login: string, muted = false): string {
  return `https://player.twitch.tv/?channel=${encodeURIComponent(
    login,
  )}&${parentQuery()}&autoplay=true&muted=${muted}`;
}

export function chatEmbedUrl(login: string): string {
  return `https://www.twitch.tv/embed/${encodeURIComponent(
    login,
  )}/chat?${parentQuery()}&darkpopout`;
}

export function channelUrl(login: string): string {
  return `https://www.twitch.tv/${encodeURIComponent(login)}`;
}

/**
 * Helix hands back a template with `{width}`/`{height}` placeholders. The file
 * behind it only rotates every few minutes, so the cache buster is tied to the
 * directory fetch rather than to render time.
 */
export function thumbnailUrl(
  template: string,
  width: number,
  height: number,
  bust?: string,
): string {
  const url = template
    .replace("{width}", String(width))
    .replace("{height}", String(height));
  return bust ? `${url}?t=${encodeURIComponent(bust)}` : url;
}

/** Hosts worth a preconnect before the viewer clicks play. */
export const TWITCH_PRECONNECT = [
  "https://player.twitch.tv",
  "https://static-cdn.jtvnw.net",
  "https://usher.ttvnw.net",
] as const;

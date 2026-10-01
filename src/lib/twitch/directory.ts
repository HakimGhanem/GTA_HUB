import { unstable_cache } from "next/cache";
import {
  getGames,
  getStreamsByGameIds,
  isTwitchConfigured,
  type HelixStream,
} from "./client";

/**
 * GTA V carries GTA Online *and* the whole FiveM roleplay scene, which is
 * where most of the live GTA audience actually is. San Andreas and Vice City
 * are here because the hub ships classic maps too.
 */
export const LIVE_CATEGORIES = [
  "Grand Theft Auto VI",
  "Grand Theft Auto V",
  "Grand Theft Auto: San Andreas",
  "Grand Theft Auto: Vice City",
] as const;

export type LiveStream = {
  id: string;
  login: string;
  displayName: string;
  title: string;
  game: string;
  viewers: number;
  language: string;
  startedAt: string;
  thumbnailTemplate: string;
  isMature: boolean;
  featured: boolean;
};

export type LiveDirectory = {
  configured: boolean;
  fetchedAt: string;
  streams: LiveStream[];
  /** Set when Twitch answered badly and the list is a stale-empty fallback. */
  error?: string;
};

function featuredLogins(): Set<string> {
  return new Set(
    (process.env.TWITCH_FEATURED_LOGINS ?? "")
      .split(",")
      .map((login) => login.trim().toLowerCase())
      .filter(Boolean),
  );
}

function toLiveStream(stream: HelixStream, featured: Set<string>): LiveStream {
  return {
    id: stream.id,
    login: stream.user_login,
    displayName: stream.user_name || stream.user_login,
    title: stream.title,
    game: stream.game_name,
    viewers: stream.viewer_count,
    language: stream.language,
    startedAt: stream.started_at,
    thumbnailTemplate: stream.thumbnail_url,
    isMature: stream.is_mature,
    featured: featured.has(stream.user_login.toLowerCase()),
  };
}

async function fetchLiveDirectory(): Promise<LiveDirectory> {
  const fetchedAt = new Date().toISOString();

  if (!isTwitchConfigured()) {
    return { configured: false, fetchedAt, streams: [] };
  }

  const games = await getGames(LIVE_CATEGORIES);
  const streams = await getStreamsByGameIds(games.map((game) => game.id));
  const featured = featuredLogins();

  return {
    configured: true,
    fetchedAt,
    streams: streams
      .map((stream) => toLiveStream(stream, featured))
      // Partners first, then raw audience. Per-visitor language ordering is
      // left to the client so this payload stays cacheable for everyone.
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.viewers - a.viewers;
      }),
  };
}

/**
 * Shared by the page's first paint and by the polling endpoint, so Helix is
 * called at most once a minute whatever the traffic. Twitch allows 800
 * points/min per client id and treats repeated hammering as abuse.
 */
export const getLiveDirectory = unstable_cache(
  fetchLiveDirectory,
  ["twitch-live-directory"],
  { revalidate: 60, tags: ["twitch-live"] },
);

/** Empty list rather than an exception: the UI has a "nobody live" state. */
export async function getLiveDirectorySafe(): Promise<LiveDirectory> {
  try {
    return await getLiveDirectory();
  } catch (err) {
    console.warn("[live] Twitch directory failed:", err);
    return {
      configured: true,
      fetchedAt: new Date().toISOString(),
      streams: [],
      error: "upstream",
    };
  }
}

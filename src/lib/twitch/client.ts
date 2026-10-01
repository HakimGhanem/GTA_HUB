const TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const HELIX_URL = "https://api.twitch.tv/helix";

export type HelixGame = {
  id: string;
  name: string;
};

export type HelixStream = {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  tags: string[] | null;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  is_mature: boolean;
};

export function isTwitchConfigured(): boolean {
  return Boolean(
    process.env.TWITCH_CLIENT_ID && process.env.TWITCH_CLIENT_SECRET,
  );
}

/**
 * App access tokens live ~60 days. Keeping one in module scope means a warm
 * lambda reuses it instead of asking Twitch for a new one on every refresh —
 * their docs treat repeated token requests as abuse.
 */
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAppToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const body = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID ?? "",
    client_secret: process.env.TWITCH_CLIENT_SECRET ?? "",
    grant_type: "client_credentials",
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Twitch token request failed (${res.status})`);
  }

  const json = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    token: json.access_token,
    expiresAt: Date.now() + Math.max(json.expires_in - 60, 60) * 1000,
  };

  return cachedToken.token;
}

async function helix<T>(
  path: string,
  params: [string, string][],
): Promise<T[]> {
  const token = await getAppToken();
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${HELIX_URL}/${path}?${query}`, {
    headers: {
      "Client-Id": process.env.TWITCH_CLIENT_ID ?? "",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    cachedToken = null;
  }
  if (!res.ok) {
    throw new Error(`Twitch ${path} failed (${res.status})`);
  }

  const json = (await res.json()) as { data: T[] };
  return json.data ?? [];
}

/**
 * Resolved by name rather than hardcoded: GTA V's id is stable but the GTA VI
 * category will only exist once Twitch creates it, and unknown names come back
 * absent instead of erroring.
 */
export async function getGames(names: readonly string[]): Promise<HelixGame[]> {
  return helix<HelixGame>(
    "games",
    names.map((name) => ["name", name] as [string, string]),
  );
}

export async function getStreamsByGameIds(
  gameIds: readonly string[],
  limit = 100,
): Promise<HelixStream[]> {
  if (gameIds.length === 0) return [];

  return helix<HelixStream>("streams", [
    ...gameIds.slice(0, 10).map((id) => ["game_id", id] as [string, string]),
    ["type", "live"],
    ["first", String(Math.min(limit, 100))],
  ]);
}

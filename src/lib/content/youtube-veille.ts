/**
 * YouTube Data API v3 — metadata-only niche watch.
 * No downloads. Search is 100 quota units; videos.list is 1.
 */

const API = "https://www.googleapis.com/youtube/v3";
const GTA6_RE = /gta\s*(6|vi)|grand theft auto\s*(6|vi)/i;
const GTA5_ONLY_RE = /\bgta\s*(5|v)\b|\bgta online\b/i;

const SEARCHES = [
  {
    q: 'GTA 6 OR "GTA VI"',
    order: "date" as const,
    publishedAfterHours: 48,
    maxResults: 15,
  },
  {
    q: 'GTA 6 map OR Leonida OR "GTA 6 collectibles"',
    order: "viewCount" as const,
    publishedAfterHours: 168,
    maxResults: 10,
  },
  {
    q: 'GTA 6 preorder OR "Ultimate Edition" OR "GTA 6 price"',
    order: "date" as const,
    publishedAfterHours: 168,
    maxResults: 10,
  },
];

type SearchItem = {
  id?: { videoId?: string };
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    publishedAt?: string;
  };
};

type VideoItem = {
  id?: string;
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    publishedAt?: string;
  };
  statistics?: { viewCount?: string; likeCount?: string };
  contentDetails?: { duration?: string };
};

export type YoutubeVideoSignal = {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  url: string;
  viewCount: number;
  durationSec: number;
  viewsPerHour: number;
  extraScore: number;
  summary: string;
};

export type YoutubeVeilleResult = {
  status: "ok" | "no_key" | "error";
  videos: YoutubeVideoSignal[];
  quotaUsed: number;
  error?: string;
};

export function youtubeApiKey(): string | undefined {
  const key = process.env.YOUTUBE_API_KEY?.trim();
  return key || undefined;
}

/** PT1M23S → seconds. */
export function parseIsoDuration(iso?: string): number {
  if (!iso) return 0;
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i.exec(iso);
  if (!m) return 0;
  return (
    Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0)
  );
}

function isoHoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 36e5).toISOString();
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function formatDuration(sec: number): string {
  if (sec <= 0) return "?";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m ? `${m}:${String(s).padStart(2, "0")}` : `${s}s`;
}

export function scoreYoutubeVelocity(input: {
  title: string;
  channelTitle: string;
  viewCount: number;
  durationSec: number;
  publishedAt: string;
}): number {
  const ageH = Math.max(
    1,
    (Date.now() - new Date(input.publishedAt).getTime()) / 36e5,
  );
  const vph = input.viewCount / ageH;
  let extra = 0;
  if (vph >= 5000) extra += 16;
  else if (vph >= 1000) extra += 10;
  else if (vph >= 200) extra += 5;
  if (input.viewCount >= 250_000) extra += 6;
  if (/rockstar/i.test(input.channelTitle)) extra += 15;
  else if (/ign|gamespot|bloomberg|polygon|kotaku/i.test(input.channelTitle))
    extra += 8;
  if (
    input.durationSec > 0 &&
    input.durationSec <= 60 &&
    /map|leonida|location|collectible|pin/i.test(input.title)
  ) {
    extra += 4;
  }
  return Math.min(18, extra);
}

function isGta6Video(title: string, description: string): boolean {
  const text = `${title} ${description}`;
  if (GTA6_RE.test(text)) return true;
  if (GTA5_ONLY_RE.test(text) && !GTA6_RE.test(text)) return false;
  return false;
}

async function ytGet<T>(
  path: string,
  params: Record<string, string>,
  key: string,
): Promise<T> {
  const url = new URL(`${API}/${path}`);
  url.searchParams.set("key", key);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, {
    headers: { "User-Agent": "Map6ContentBot/1.0 (+https://map-6.com)" },
  });
  const body = (await res.json()) as T & {
    error?: { code?: number; message?: string };
  };
  if (!res.ok || body.error) {
    throw new Error(
      body.error?.message || `YouTube ${path} → ${res.status}`,
    );
  }
  return body;
}

export async function fetchYoutubeVeille(): Promise<YoutubeVeilleResult> {
  const key = youtubeApiKey();
  if (!key) {
    return { status: "no_key", videos: [], quotaUsed: 0 };
  }

  let quotaUsed = 0;
  try {
    const ids = new Set<string>();
    for (const search of SEARCHES) {
      const data = await ytGet<{ items?: SearchItem[] }>(
        "search",
        {
          part: "snippet",
          type: "video",
          q: search.q,
          order: search.order,
          publishedAfter: isoHoursAgo(search.publishedAfterHours),
          maxResults: String(search.maxResults),
          relevanceLanguage: "en",
        },
        key,
      );
      quotaUsed += 100;
      for (const item of data.items ?? []) {
        const id = item.id?.videoId;
        if (id) ids.add(id);
      }
    }

    if (ids.size === 0) {
      return { status: "ok", videos: [], quotaUsed };
    }

    const idList = [...ids];
    const videos: YoutubeVideoSignal[] = [];
    for (let i = 0; i < idList.length; i += 50) {
      const batch = idList.slice(i, i + 50);
      const data = await ytGet<{ items?: VideoItem[] }>(
        "videos",
        {
          part: "snippet,statistics,contentDetails",
          id: batch.join(","),
        },
        key,
      );
      quotaUsed += 1;
      for (const item of data.items ?? []) {
        const videoId = item.id;
        const title = (item.snippet?.title || "").trim();
        const description = (item.snippet?.description || "").trim();
        const channelTitle = (item.snippet?.channelTitle || "").trim();
        const publishedAt = item.snippet?.publishedAt || "";
        if (!videoId || !title || !publishedAt) continue;
        if (!isGta6Video(title, description)) continue;

        const viewCount = Number(item.statistics?.viewCount || 0) || 0;
        const durationSec = parseIsoDuration(item.contentDetails?.duration);
        const ageH = Math.max(
          1,
          (Date.now() - new Date(publishedAt).getTime()) / 36e5,
        );
        const viewsPerHour = viewCount / ageH;
        const extraScore = scoreYoutubeVelocity({
          title,
          channelTitle,
          viewCount,
          durationSec,
          publishedAt,
        });

        videos.push({
          videoId,
          title,
          channelTitle,
          publishedAt,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          viewCount,
          durationSec,
          viewsPerHour,
          extraScore,
          summary: `${channelTitle} · ${formatViews(viewCount)} views · ${formatDuration(durationSec)} · ${Math.round(viewsPerHour)}/h`,
        });
      }
    }

    return { status: "ok", videos, quotaUsed };
  } catch (err) {
    return {
      status: "error",
      videos: [],
      quotaUsed,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

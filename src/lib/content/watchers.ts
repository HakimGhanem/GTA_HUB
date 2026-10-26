import { appendDeskLog, appendRefreshTask, hashText, loadWatchHashes, saveWatchHashes } from "./desk-store";
import { emailDeskReview } from "./review-mail";
import { fetchExcerpt } from "./source-excerpt";

const WATCH_URLS = [
  {
    url: "https://www.rockstargames.com/newswire",
    label: "Rockstar Newswire",
    refreshOf: "gta-6-file-size",
    locale: "en" as const,
  },
  {
    url: "https://www.rockstargames.com/VI",
    label: "Rockstar VI",
    refreshOf: "gta-6-official-facts-roundup",
    locale: "en" as const,
  },
  {
    url: "https://www.take2games.com/ir",
    label: "Take-Two IR",
    refreshOf: "take-two-q2-fy27-november-9-gta-6",
    locale: "en" as const,
  },
  {
    url: "https://www.playstation.com/en-us/games/grand-theft-auto-vi/",
    label: "PlayStation store",
    refreshOf: "gta-6-download-time",
    locale: "en" as const,
  },
  {
    url: "https://www.xbox.com/en-US/games/grand-theft-auto-vi",
    label: "Xbox store",
    refreshOf: "gta-6-download-time",
    locale: "en" as const,
  },
  {
    url: "https://www.metacritic.com/game/grand-theft-auto-vi/",
    label: "Metacritic",
    refreshOf: "gta-6-reviews",
    locale: "en" as const,
  },
];

export type WatcherHit = {
  url: string;
  label: string;
  changed: boolean;
};

/** Hash primary URLs. On change, enqueue a refresh task and alert. Never edits facts.json. */
export async function runWatchers(): Promise<WatcherHit[]> {
  const prev = await loadWatchHashes();
  const next = { ...prev };
  const hits: WatcherHit[] = [];

  for (const target of WATCH_URLS) {
    const excerpt = await fetchExcerpt(target.url, target.label);
    if (!excerpt.ok || excerpt.text.length < 40) {
      hits.push({ url: target.url, label: target.label, changed: false });
      continue;
    }
    const hash = hashText(excerpt.text);
    const changed = Boolean(prev[target.url] && prev[target.url] !== hash);
    next[target.url] = hash;
    hits.push({ url: target.url, label: target.label, changed });

    if (!changed) continue;

    await appendRefreshTask({
      slug: `${target.refreshOf}-watch`,
      locale: target.locale,
      reason: `watcher hash change: ${target.label}`,
      refreshOf: target.refreshOf,
      createdAt: new Date().toISOString(),
      sourceUrl: target.url,
    });
    await appendDeskLog({
      at: new Date().toISOString(),
      event: "watcher-change",
      url: target.url,
      label: target.label,
    });
    await emailDeskReview({
      event: `watcher ${target.label}`,
      validation: { pass: false, reasons: [`Primary URL changed: ${target.url}`] },
      article: {
        id: `watch-${hash.slice(0, 8)}`,
        slug: target.refreshOf,
        locale: target.locale,
        title: `${target.label} changed`,
        description: "Primary source hash changed. Review facts.json by hand.",
        bodyMarkdown: excerpt.text.slice(0, 400),
        cluster: "release",
        primaryKeyword: target.label,
        secondaryKeywords: [],
        sources: [{ url: target.url, title: target.label }],
        status: "drafted",
        author: "Map-6 Desk",
        relatedLocationSlugs: [],
        relatedGuideSlugs: [],
        eventKey: `watch-${target.refreshOf}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  await saveWatchHashes(next);
  return hits;
}

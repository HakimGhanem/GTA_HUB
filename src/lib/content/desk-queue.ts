import { promises as fs } from "fs";
import path from "path";
import type { ContentCluster, PageType } from "./schema";

export type DeskTopicSource = { url: string; title?: string };

export type DeskTopic = {
  slug: string;
  locale: "en" | "fr";
  pageType: PageType;
  primaryKeyword: string;
  variants: string[];
  windowStart: string;
  windowEnd: string;
  factIds: string[];
  sources: DeskTopicSource[];
  refreshOf?: string;
  cluster?: ContentCluster;
};

const PAGE_TYPES = new Set(["status", "entity", "howto", "news", "tool"]);

export function deskTopicsPath(): string {
  return path.join(process.cwd(), "content", "topics.json");
}

export async function loadDeskTopics(): Promise<DeskTopic[]> {
  const raw = await fs.readFile(deskTopicsPath(), "utf8");
  const parsed = JSON.parse(raw) as DeskTopic[];
  if (!Array.isArray(parsed)) throw new Error("content/topics.json must be an array");
  return parsed.filter(isDeskTopic);
}

function isDeskTopic(row: DeskTopic): boolean {
  return Boolean(
    row.slug &&
      (row.locale === "en" || row.locale === "fr") &&
      PAGE_TYPES.has(row.pageType) &&
      row.primaryKeyword &&
      row.windowStart &&
      row.windowEnd,
  );
}

export function topicWindowOpen(topic: DeskTopic, now = new Date()): boolean {
  const day = now.toISOString().slice(0, 10);
  return day >= topic.windowStart && day <= topic.windowEnd;
}

export function openDeskTopics(topics: DeskTopic[], now = new Date()): DeskTopic[] {
  return topics.filter((t) => topicWindowOpen(t, now));
}

import { promises as fs } from "fs";
import path from "path";
import type { Article, KeywordMetric, Topic } from "./schema";

const ROOT = path.join(process.cwd(), "data", "content");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function readJsonArray<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw err;
  }
}

async function writeJsonArray<T>(file: string, rows: T[]) {
  await ensureDir(path.dirname(file));
  await fs.writeFile(file, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
}

export const fileStore = {
  articlesFile: () => path.join(ROOT, "articles.json"),
  topicsFile: () => path.join(ROOT, "topics.json"),
  metricsFile: () => path.join(ROOT, "keyword_metrics.json"),

  async listArticles(): Promise<Article[]> {
    return readJsonArray<Article>(fileStore.articlesFile());
  },

  async saveArticles(articles: Article[]) {
    await writeJsonArray(fileStore.articlesFile(), articles);
  },

  async listTopics(): Promise<Topic[]> {
    return readJsonArray<Topic>(fileStore.topicsFile());
  },

  async saveTopics(topics: Topic[]) {
    await writeJsonArray(fileStore.topicsFile(), topics);
  },

  async listMetrics(): Promise<KeywordMetric[]> {
    return readJsonArray<KeywordMetric>(fileStore.metricsFile());
  },

  async saveMetrics(metrics: KeywordMetric[]) {
    await writeJsonArray(fileStore.metricsFile(), metrics);
  },
};

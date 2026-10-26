import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { COLLECTIONS, getFirestore } from "./firestore";

const ROOT = () => path.join(process.cwd(), "content");

export type DeskWeekly = {
  week: string;
  newCount: number;
  refreshCount: number;
  lastPublishDate: string;
};

export type RefreshTask = {
  slug: string;
  locale: "en" | "fr";
  reason: string;
  refreshOf: string;
  createdAt: string;
  sourceUrl?: string;
};

function filePath(name: string): string {
  return path.join(ROOT(), name);
}

async function readFileJson<T>(name: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath(name), "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return fallback;
    throw err;
  }
}

async function writeFileJson(name: string, value: unknown): Promise<void> {
  await fs.mkdir(ROOT(), { recursive: true });
  await fs.writeFile(filePath(name), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function readMetaDoc<T>(id: string): Promise<T | null> {
  const db = await getFirestore();
  if (!db) return null;
  try {
    const snap = await db.collection(COLLECTIONS.deskMeta).doc(id).get();
    return snap.exists ? (snap.data() as T) : null;
  } catch (err) {
    console.warn("[desk-store] Firestore read failed:", err);
    return null;
  }
}

async function writeMetaDoc(id: string, value: Record<string, unknown>): Promise<void> {
  const db = await getFirestore();
  if (!db) return;
  try {
    await db.collection(COLLECTIONS.deskMeta).doc(id).set(value, { merge: true });
  } catch (err) {
    console.warn("[desk-store] Firestore write failed:", err);
  }
}

export async function loadWatchHashes(): Promise<Record<string, string>> {
  const remote = await readMetaDoc<Record<string, string>>("watch-hashes");
  if (remote && Object.keys(remote).length) return remote;
  return readFileJson<Record<string, string>>("watch-hashes.json", {});
}

export async function saveWatchHashes(hashes: Record<string, string>): Promise<void> {
  await writeFileJson("watch-hashes.json", hashes);
  await writeMetaDoc("watch-hashes", hashes);
}

export async function loadNoindexSlugs(): Promise<string[]> {
  const remote = await readMetaDoc<{ slugs?: string[] }>("noindex-slugs");
  if (remote?.slugs?.length) return remote.slugs;
  const file = await readFileJson<string[]>("noindex-slugs.json", []);
  return Array.isArray(file) ? file : [];
}

export async function saveNoindexSlugs(slugs: string[]): Promise<void> {
  const unique = [...new Set(slugs)].sort();
  await writeFileJson("noindex-slugs.json", unique);
  await writeMetaDoc("noindex-slugs", { slugs: unique });
}

export async function loadWeekly(): Promise<DeskWeekly> {
  const remote = await readMetaDoc<DeskWeekly>("weekly");
  if (remote?.week) return remote;
  return readFileJson<DeskWeekly>("desk-weekly.json", {
    week: "",
    newCount: 0,
    refreshCount: 0,
    lastPublishDate: "",
  });
}

export async function saveWeekly(weekly: DeskWeekly): Promise<void> {
  await writeFileJson("desk-weekly.json", weekly);
  await writeMetaDoc("weekly", weekly);
}

export async function loadRefreshQueue(): Promise<RefreshTask[]> {
  const remote = await readMetaDoc<{ tasks?: RefreshTask[] }>("refresh-queue");
  if (remote?.tasks) return remote.tasks;
  const file = await readFileJson<RefreshTask[]>("refresh-queue.json", []);
  return Array.isArray(file) ? file : [];
}

export async function saveRefreshQueue(tasks: RefreshTask[]): Promise<void> {
  await writeFileJson("refresh-queue.json", tasks);
  await writeMetaDoc("refresh-queue", { tasks });
}

export async function appendRefreshTask(task: RefreshTask): Promise<void> {
  const tasks = await loadRefreshQueue();
  const dup = tasks.some(
    (t) => t.refreshOf === task.refreshOf && t.locale === task.locale,
  );
  if (dup) return;
  tasks.push(task);
  await saveRefreshQueue(tasks);
}

export type DeskLogLine = {
  at: string;
  event: string;
  [key: string]: unknown;
};

export async function appendDeskLog(line: DeskLogLine): Promise<void> {
  const row = { ...line, at: line.at || new Date().toISOString() };
  await fs.mkdir(ROOT(), { recursive: true });
  await fs.appendFile(filePath("log.jsonl"), `${JSON.stringify(row)}\n`, "utf8");
  const db = await getFirestore();
  if (!db) return;
  try {
    await db.collection(COLLECTIONS.deskLog).add(row);
  } catch (err) {
    console.warn("[desk-store] log write failed:", err);
  }
}

export function isoWeek(date = new Date()): string {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export async function ensureWeekly(now = new Date()): Promise<DeskWeekly> {
  const week = isoWeek(now);
  const current = await loadWeekly();
  if (current.week === week) return current;
  const next: DeskWeekly = {
    week,
    newCount: 0,
    refreshCount: 0,
    lastPublishDate: current.lastPublishDate,
  };
  await saveWeekly(next);
  return next;
}

export function todayStamp(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

export function reviewToken(articleId: string): string {
  const secret = process.env.CONTENT_API_SECRET || "local-desk";
  return createHash("sha256")
    .update(`${secret}:${articleId}`)
    .digest("hex")
    .slice(0, 24);
}

export async function writeRefreshDraftFile(
  locale: string,
  slug: string,
  markdown: string,
): Promise<string> {
  const dest = path.join(ROOT(), "refresh-drafts", locale, `${slug}.md`);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, markdown, "utf8");
  return dest;
}

import { promises as fs } from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { loadFacts, type Fact } from "./facts";
import { KEY_NEWS_SLUGS } from "./key-news";
import { isIndexableNewsArticle } from "./news-canonical";
import { listArticles, updateArticleStatus, upsertArticle } from "./repository";
import type { Article } from "./schema";
import {
  loadNoindexSlugs,
  saveNoindexSlugs,
  writeRefreshDraftFile,
} from "./desk-store";
import { validateArticle } from "./validate-article";
import { countMarkdownWords } from "./word-count";

const VARIANTS = [
  "Grand Theft Auto VI",
  "GTA VI",
  "GTA 6",
  "GTA6",
  "Grand Theft Auto 6",
];

const HUBS: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: "/en/map", label: "interactive GTA 6 map" },
    { href: "/en/locations", label: "Leonida locations" },
    { href: "/en/guides/gta-6-map-guide", label: "map guide" },
  ],
  fr: [
    { href: "/fr/map", label: "carte interactive GTA 6" },
    { href: "/fr/locations", label: "lieux de Leonida" },
    { href: "/fr/guides/gta-6-map-guide", label: "guide de la carte" },
  ],
};

export type RefreshRow = {
  slug: string;
  locale: string;
  action: "draft" | "editorial-file" | "noindex" | "skip";
  pass: boolean;
  reasons: string[];
  path?: string;
};

function isEditorial(slug: string): boolean {
  return (KEY_NEWS_SLUGS as readonly string[]).includes(slug);
}

async function gscImpressions(): Promise<Map<string, number>> {
  const file = path.join(process.cwd(), "content", "gsc-pages.csv");
  try {
    const raw = await fs.readFile(file, "utf8");
    const rows = parse(raw, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    }) as Record<string, string>[];
    const map = new Map<string, number>();
    for (const row of rows) {
      const url = row.url || row.URL || row.page || row.Page || row["Top pages"] || "";
      const impressions = Number(
        String(row.impressions || row.Impressions || "0").replace(/[,\s]/g, ""),
      );
      const slug = url.match(/\/news\/([^/?#]+)/)?.[1];
      if (slug && Number.isFinite(impressions)) {
        map.set(slug, Math.max(map.get(slug) ?? 0, impressions));
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

export async function rankRefreshTargets(limit: number): Promise<Article[]> {
  const gsc = await gscImpressions();
  const published = (await listArticles({ status: "published" })).filter(
    (a) => isIndexableNewsArticle(a) && (a.locale === "en" || a.locale === "fr"),
  );
  return published
    .sort((a, b) => {
      const ia = gsc.get(a.slug);
      const ib = gsc.get(b.slug);
      if (gsc.size && (ia != null || ib != null)) return (ib ?? 0) - (ia ?? 0);
      const age = (a.updatedAt || a.publishedAt || "").localeCompare(
        b.updatedAt || b.publishedAt || "",
      );
      if (age !== 0) return age;
      return countMarkdownWords(a.bodyMarkdown) - countMarkdownWords(b.bodyMarkdown);
    })
    .slice(0, limit);
}

function stripStale(body: string, facts: Fact[]): string {
  let next = body;
  const size = facts.find((f) => f.id === "file_size");
  if (size?.status === "not_announced") {
    next = next.replace(
      /\bGTA\s*6\b[^.|]{0,40}\b1[0-9]{2}\s*(?:GB|Go)\b[^.]*\./gi,
      "Rockstar has not published a GTA 6 install size.",
    );
  }
  next = next.replace(/\bleak confirmed\b/gi, "reported leak, not confirmed");
  next = next.replace(
    /\b(?:is|now)\s+available on pc\b/gi,
    "is not announced on PC",
  );
  next = next.replace(
    /Standard(?: Edition)?(?: is| costs|:)?\s*\$?\s*69\.99/gi,
    "Standard Edition $79.99",
  );
  return next;
}

function ensureVariants(article: Article): Pick<Article, "title" | "secondaryKeywords"> {
  const present = VARIANTS.some(
    (v) =>
      article.title.includes(v) ||
      article.bodyMarkdown.includes(v) ||
      article.secondaryKeywords.includes(v),
  );
  const secondary = present
    ? article.secondaryKeywords
    : [...new Set([...article.secondaryKeywords, ...VARIANTS.slice(0, 3)])];
  return { title: article.title, secondaryKeywords: secondary };
}

function ensureHubLinks(article: Article): string {
  const hubs = HUBS[article.locale] ?? HUBS.en;
  const missing = hubs.filter((h) => !article.bodyMarkdown.includes(h.href));
  if (!missing.length) return article.bodyMarkdown;
  const list = missing
    .map((h) => `- [${h.label}](${h.href})`)
    .join("\n");
  return `${article.bodyMarkdown}\n\n${list}\n`;
}

function ensureVerified(article: Article, date: string): string {
  const line =
    article.locale === "fr"
      ? `Dernière vérification: ${date}`
      : `Last verified: ${date}`;
  if (/derni[eè]re v[ée]rification|last verified/i.test(article.bodyMarkdown)) {
    return article.bodyMarkdown.replace(
      /(?:Dernière vérification|Derniere verification|Last verified):[^\n]*/i,
      line,
    );
  }
  return `${article.bodyMarkdown}\n\n${line}\n`;
}

function localizeShell(article: Article): Pick<Article, "title" | "description"> {
  if (article.locale !== "fr") {
    return { title: article.title, description: article.description };
  }
  return { title: article.title, description: article.description };
}

async function loadFails(): Promise<Record<string, number>> {
  const file = path.join(process.cwd(), "content", "refresh-fails.json");
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as Record<string, number>;
  } catch {
    return {};
  }
}

async function saveFails(map: Record<string, number>): Promise<void> {
  const file = path.join(process.cwd(), "content", "refresh-fails.json");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(map, null, 2)}\n`, "utf8");
}

export async function refreshOne(article: Article): Promise<RefreshRow> {
  const facts = await loadFacts();
  const date = new Date().toISOString().slice(0, 10);
  const variants = ensureVariants(article);
  let body = stripStale(article.bodyMarkdown, facts);
  body = ensureHubLinks({ ...article, bodyMarkdown: body });
  body = ensureVerified({ ...article, bodyMarkdown: body }, date);
  const shell = localizeShell(article);

  const next: Article = {
    ...article,
    ...shell,
    ...variants,
    bodyMarkdown: body,
    lastVerifiedAt: date,
    updatedAt: new Date().toISOString(),
    notes: `${article.notes ?? ""} | refresh ${date}`.trim(),
  };

  const existing = await listArticles();
  const validation = await validateArticle({
    article: next,
    facts,
    existing,
  });

  const key = `${article.locale}:${article.slug}`;
  const fails = await loadFails();

  if (!validation.pass) {
    fails[key] = (fails[key] ?? article.failCount ?? 0) + 1;
    await saveFails(fails);
    if (fails[key] >= 2) {
      const slugs = await loadNoindexSlugs();
      if (!slugs.includes(article.slug)) {
        slugs.push(article.slug);
        await saveNoindexSlugs(slugs);
      }
      if (!isEditorial(article.slug)) {
        await updateArticleStatus(article.id, "noindex", {
          notes: `refresh failed twice: ${validation.reasons.join("; ")}`,
        });
      }
      return {
        slug: article.slug,
        locale: article.locale,
        action: "noindex",
        pass: false,
        reasons: validation.reasons,
      };
    }
    return {
      slug: article.slug,
      locale: article.locale,
      action: "skip",
      pass: false,
      reasons: validation.reasons,
    };
  }

  fails[key] = 0;
  await saveFails(fails);

  if (isEditorial(article.slug)) {
    const dest = await writeRefreshDraftFile(
      article.locale,
      article.slug,
      `# ${next.title}\n\n${next.description}\n\n${next.bodyMarkdown}\n`,
    );
    return {
      slug: article.slug,
      locale: article.locale,
      action: "editorial-file",
      pass: true,
      reasons: [],
      path: dest,
    };
  }

  const stamp = date.replace(/-/g, "");
  const {
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    seoScore: _seoScore,
    publishedAt: _publishedAt,
    ...rest
  } = next;
  const draft = await upsertArticle({
    ...rest,
    slug: `${article.slug}-r${stamp}`,
    status: "drafted",
    refreshOf: article.slug,
    failCount: 0,
  });
  return {
    slug: draft.slug,
    locale: draft.locale,
    action: "draft",
    pass: true,
    reasons: [],
    path: `/${draft.locale}/news/${draft.slug}`,
  };
}

export async function writeRefreshReport(rows: RefreshRow[]): Promise<string> {
  const dest = path.join(process.cwd(), "content", "refresh-report.md");
  const lines = [
    `# Refresh report`,
    ``,
    `Generated ${new Date().toISOString()}`,
    ``,
    `## Known-bad analogue`,
    ``,
    `\`gta-6-storage-prep\` does not exist. Guide \`/guides/gta-6-file-size\` still estimates ~150 GB while \`file_size\` is not_announced. Fix that guide by hand. Do not invent a second storage article.`,
    ``,
    `## Results`,
    ``,
    `| locale | slug | action | pass | reasons |`,
    `|---|---|---|---|---|`,
    ...rows.map(
      (r) =>
        `| ${r.locale} | ${r.slug} | ${r.action} | ${r.pass ? "yes" : "no"} | ${r.reasons.join("; ").replace(/\|/g, "/")} |`,
    ),
    ``,
  ];
  await fs.writeFile(dest, lines.join("\n"), "utf8");
  return dest;
}

export async function refreshBatch(limit: number): Promise<RefreshRow[]> {
  const targets = await rankRefreshTargets(limit);
  const rows: RefreshRow[] = [];
  for (const article of targets) {
    rows.push(await refreshOne(article));
  }
  await writeRefreshReport(rows);
  return rows;
}

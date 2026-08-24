#!/usr/bin/env npx tsx
/**
 * Upsert + publish specific articles to map-6.com (or SITE url).
 *
 *   npm run content:publish-ids -- --ids id1,id2
 */
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config as loadEnv } from "dotenv";
import type { Article } from "../../src/lib/content/schema.ts";
import { argValue } from "./_shared.mts";
import { updateArticleStatus } from "../../src/lib/content/repository.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
loadEnv({ path: path.join(root, ".env.local") });
loadEnv({ path: path.join(root, ".env") });

const base = (
  process.env.SITE_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://map-6.com"
).replace(/\/$/, "");

const secret = process.env.CONTENT_API_SECRET;
if (!secret) {
  console.error("CONTENT_API_SECRET required");
  process.exit(1);
}

async function post(apiPath: string, body: unknown) {
  const res = await fetch(`${base}${apiPath}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${apiPath} → ${res.status}: ${text.slice(0, 600)}`);
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { raw: text };
  }
}

async function main() {
  const idArg = argValue("--ids");
  if (!idArg) throw new Error("--ids id1,id2 required");

  const ids = new Set(idArg.split(",").map((s) => s.trim()).filter(Boolean));
  const file = path.join(root, "data/content/articles.json");
  const articles = JSON.parse(await fs.readFile(file, "utf8")) as Article[];
  const targets = articles.filter((a) => ids.has(a.id));

  if (!targets.length) throw new Error(`No articles for ids: ${idArg}`);

  console.log(`Target: ${base}`);
  for (const article of targets) {
    process.stdout.write(`upsert ${article.id} … `);
    await post("/api/content/upsert", { article });
    console.log("ok");

    process.stdout.write(`publish ${article.id} … `);
    const result = await post("/api/content/publish", {
      articleId: article.id,
      reviewer: "growth",
    });
    const publishedPath = String(result.path ?? "ok");
    console.log(publishedPath);

    await updateArticleStatus(article.id, "published", {
      reviewer: "growth",
      publishedAt: new Date().toISOString(),
    });
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

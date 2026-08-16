#!/usr/bin/env npx tsx
/**
 * Upsert published articles from data/content/articles.json to Cloud Run,
 * then call /api/content/publish for each. No local Firestore.
 *
 *   CONTENT_API_SECRET=… npm run content:publish-remote
 */
import { promises as fs } from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";
import type { Article } from "../../src/lib/content/schema.ts";

import { fileURLToPath } from "url";
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
  if (!res.ok) {
    throw new Error(`${apiPath} → ${res.status}: ${text.slice(0, 600)}`);
  }
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { raw: text };
  }
}

async function main() {
  const file = path.join(root, "data/content/articles.json");
  const articles = JSON.parse(await fs.readFile(file, "utf8")) as Article[];
  const now = new Date().toISOString();

  let repaired = false;
  for (const a of articles) {
    if (a.status !== "published") {
      a.status = "published";
      a.publishedAt = a.publishedAt || now;
      a.updatedAt = now;
      a.reviewer = a.reviewer || "ghanem";
      repaired = true;
    }
  }
  if (repaired) {
    await fs.writeFile(file, `${JSON.stringify(articles, null, 2)}\n`);
    console.log("Repaired local articles.json → published");
  }

  console.log(`Target: ${base}`);
  for (const article of articles) {
    process.stdout.write(`upsert ${article.id} … `);
    await post("/api/content/upsert", { article });
    console.log("ok");

    process.stdout.write(`publish ${article.id} … `);
    const result = await post("/api/content/publish", {
      articleId: article.id,
      reviewer: "ghanem",
    });
    console.log(String(result.path ?? "ok"));
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

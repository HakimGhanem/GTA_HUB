#!/usr/bin/env npx tsx
/**
 * Queue or send a QA-passed render. Official APIs only (Ayrshare / Postiz / BrightBean).
 * Local files are queued unless FACTORY_PUBLIC_MEDIA_BASE is set.
 *
 *   npm run factory:publish -- --brief <id> --dry-run
 *   npm run factory:publish -- --brief <id> --via ayrshare
 */
import path from "path";
import { PLATFORM_DAILY_CAPS, type PublishPlatform } from "../src/schema/job.ts";
import {
  argValue,
  bumpQuota,
  ensureDirs,
  hasFlag,
  loadBrief,
  loadJobs,
  loadQuota,
  paths,
  upsertJob,
  writeJson,
} from "./_shared.mts";

type Via = "ayrshare" | "postiz" | "brightbean" | "queue";

function platforms(): PublishPlatform[] {
  const raw = argValue("--platforms");
  if (!raw) return ["instagram", "tiktok", "youtube"];
  return raw.split(",").map((p) => p.trim()) as PublishPlatform[];
}

function publicMediaUrl(filename: string): string | undefined {
  const base = process.env.FACTORY_PUBLIC_MEDIA_BASE?.replace(/\/$/, "");
  if (!base) return undefined;
  return `${base}/${filename}`;
}

async function publishAyrshare(caption: string, mediaUrl: string, plats: string[]) {
  const key = process.env.AYRSHARE_API_KEY;
  if (!key) throw new Error("AYRSHARE_API_KEY missing");
  const res = await fetch("https://api.ayrshare.com/api/post", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: caption,
      platforms: plats,
      mediaUrls: [mediaUrl],
    }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Ayrshare ${res.status}: ${body}`);
  return body;
}

async function publishPostiz(caption: string, mediaUrl: string) {
  const key = process.env.POSTIZ_API_KEY;
  const base = (process.env.POSTIZ_URL ?? "https://api.postiz.com").replace(
    /\/$/,
    "",
  );
  if (!key) throw new Error("POSTIZ_API_KEY missing");
  const integration = process.env.POSTIZ_INTEGRATION_ID;
  if (!integration) throw new Error("POSTIZ_INTEGRATION_ID missing");
  const res = await fetch(`${base}/public/v1/posts`, {
    method: "POST",
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "now",
      date: new Date().toISOString(),
      posts: [
        {
          integration: { id: integration },
          value: [{ content: caption, image: [{ path: mediaUrl }] }],
        },
      ],
    }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Postiz ${res.status}: ${body}`);
  return body;
}

async function publishBrightbean(caption: string, mediaUrl: string) {
  const key = process.env.BRIGHTBEAN_API_KEY;
  const base = process.env.BRIGHTBEAN_URL?.replace(/\/$/, "");
  if (!key || !base) throw new Error("BRIGHTBEAN_API_KEY / BRIGHTBEAN_URL missing");
  const account = process.env.BRIGHTBEAN_ACCOUNT_ID;
  if (!account) throw new Error("BRIGHTBEAN_ACCOUNT_ID missing");
  const res = await fetch(`${base}/api/v1/posts/schedule`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account_id: account,
      caption,
      media_url: mediaUrl,
    }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`BrightBean ${res.status}: ${body}`);
  return body;
}

async function main() {
  const id = argValue("--brief");
  if (!id) throw new Error("Usage: factory:publish -- --brief <id>");
  ensureDirs();
  const brief = loadBrief(id);
  const job = loadJobs().find((j) => j.id === brief.id);
  if (!job || job.status !== "qa_passed") {
    throw new Error("QA must pass before publish. Run factory:qa.");
  }
  if (!job.outputPath) throw new Error("Job has no outputPath");

  const plats = platforms();
  const quota = loadQuota();
  for (const p of plats) {
    if (quota.counts[p] >= PLATFORM_DAILY_CAPS[p]) {
      throw new Error(`Daily cap hit for ${p} (${PLATFORM_DAILY_CAPS[p]})`);
    }
  }

  const filename = path.basename(job.outputPath);
  const mediaUrl = publicMediaUrl(filename);
  const via = (argValue("--via") ?? "queue") as Via;
  const dry = hasFlag("--dry-run") || via === "queue" || !mediaUrl;

  const payload = {
    briefId: brief.id,
    caption: brief.caption,
    ctaUrl: brief.ctaUrl,
    platforms: plats,
    file: job.outputPath,
    mediaUrl: mediaUrl ?? null,
    via,
    queuedAt: new Date().toISOString(),
  };
  const queueFile = path.join(paths.queue, `${brief.id}.json`);
  writeJson(queueFile, payload);

  if (dry) {
    console.log(`Queued ${queueFile}`);
    if (!mediaUrl) {
      console.log(
        "No FACTORY_PUBLIC_MEDIA_BASE — upload the mp4, then rerun with --via ayrshare|postiz|brightbean",
      );
    }
    upsertJob({
      ...job,
      status: "queued",
      platforms: plats,
      updatedAt: new Date().toISOString(),
    });
    return;
  }

  if (!mediaUrl) throw new Error("FACTORY_PUBLIC_MEDIA_BASE required to send");

  let receipt = "";
  if (via === "ayrshare") {
    receipt = await publishAyrshare(brief.caption, mediaUrl, plats);
  } else if (via === "postiz") {
    receipt = await publishPostiz(brief.caption, mediaUrl);
  } else if (via === "brightbean") {
    receipt = await publishBrightbean(brief.caption, mediaUrl);
  } else {
    throw new Error(`Unknown --via ${via}`);
  }

  bumpQuota(plats);
  upsertJob({
    ...job,
    status: "published",
    platforms: plats,
    updatedAt: new Date().toISOString(),
  });
  writeJson(path.join(paths.queue, `${brief.id}.receipt.json`), {
    receipt,
    sentAt: new Date().toISOString(),
  });
  console.log(`Published via ${via}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

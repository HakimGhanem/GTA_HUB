#!/usr/bin/env npx tsx
/**
 * Ingest a creator-submitted file + waiver. Does not scrape Instagram.
 *
 *   npm run factory:ugc -- --file ./clip.mp4 --handle someone --waiver
 *   npm run factory:ugc -- --file ./clip.mp4 --handle someone --source-url https://... --waiver
 */
import { copyFileSync, existsSync } from "fs";
import path from "path";
import { SITE } from "../../src/lib/constants.ts";
import type { VideoBrief } from "../src/schema/brief.ts";
import type { UgcSubmission } from "../src/schema/ugc.ts";
import {
  DISCLAIMER,
  argValue,
  ensureDirs,
  hasFlag,
  paths,
  saveBrief,
  saveUgc,
  slugify,
} from "./_shared.mts";

const WAIVER =
  "I own this clip or have the right to grant Map-6 a non-exclusive licence to republish it with on-screen credit. I remain the copyright holder.";

async function main() {
  const file = argValue("--file");
  const handle = (argValue("--handle") ?? "").replace(/^@/, "");
  if (!file || !handle) {
    throw new Error("Usage: factory:ugc -- --file <mp4> --handle <name> --waiver");
  }
  if (!hasFlag("--waiver")) {
    throw new Error(`Pass --waiver to accept: ${WAIVER}`);
  }
  if (!existsSync(file)) throw new Error(`File not found: ${file}`);

  ensureDirs();
  const id = slugify(`ugc-${handle}-${Date.now()}`);
  const dest = path.join(paths.ugc, `${id}${path.extname(file) || ".mp4"}`);
  copyFileSync(file, dest);

  const sub: UgcSubmission = {
    id,
    handle,
    sourceUrl: argValue("--source-url"),
    filePath: dest,
    waiverAccepted: true,
    waiverText: WAIVER,
    status: "needs_review",
    createdAt: new Date().toISOString(),
  };
  saveUgc(sub);

  const locale = argValue("--locale") ?? "en";
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;
  const brief: VideoBrief = {
    id,
    template: "ugc-credit",
    locale: locale as VideoBrief["locale"],
    hook: `via @${handle}`,
    caption: `Community clip via @${handle} — posted with permission. Fan map: ${site}/${locale}/map?ref=map6shorts`,
    ctaLabel: "More pins on Map-6",
    ctaUrl: `${site}/${locale}/map?theme=neon&ref=map6shorts`,
    items: [],
    credit: { handle, sourceUrl: sub.sourceUrl, waiverId: id },
    footagePath: dest,
    createdAt: sub.createdAt,
    source: "ugc",
    eventKey: id,
    disclaimer: DISCLAIMER,
  };
  saveBrief(brief);

  console.log(`UGC ${id} stored (needs_review)`);
  console.log(`  file ${dest}`);
  console.log("Review the clip, then: npm run factory:render -- --brief", id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

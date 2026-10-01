#!/usr/bin/env npx tsx
/**
 * Human gates — same idea as content:review, for shorts.
 *
 *   npm run factory:review
 *   npm run factory:review -- --approve-script <id>
 *   npm run factory:review -- --hook <id> --text "new hook"
 *   npm run factory:review -- --approve-render <id>
 *   npm run factory:review -- --reject <id> --gate script --notes "too template"
 */
import {
  canApproveRender,
  canRender,
  type ReviewGate,
} from "../src/schema/job.ts";
import {
  appendReview,
  argValue,
  getJob,
  loadBrief,
  loadJobs,
  patchJob,
  saveBrief,
} from "./_shared.mts";

function listQueue() {
  const open = loadJobs().filter((j) =>
    ["awaiting_script", "script_approved", "awaiting_render", "qa_failed"].includes(
      j.status,
    ),
  );
  if (!open.length) {
    console.log("Nothing to review.");
    return;
  }
  for (const j of open) {
    const brief = loadBrief(j.briefId);
    console.log(
      `${j.id}  [${j.status}]  ${j.template}\n  hook: ${brief.hook}\n  ${brief.caption.slice(0, 100)}`,
    );
    if (j.qaIssues.length) console.log(`  qa: ${j.qaIssues.join("; ")}`);
    console.log("");
  }
}

function reviewer() {
  return argValue("--reviewer") || process.env.USER || "editor";
}

function main() {
  const approveScript = argValue("--approve-script");
  const approveRender = argValue("--approve-render");
  const rejectId = argValue("--reject");
  const hookId = argValue("--hook");
  const notes = argValue("--notes");
  const humanSec = argValue("--seconds") ? Number(argValue("--seconds")) : undefined;

  if (!approveScript && !approveRender && !rejectId && !hookId) {
    listQueue();
    console.log(
      "Usage:\n  --approve-script <id>\n  --hook <id> --text \"...\"\n  --approve-render <id>\n  --reject <id> --gate script|render [--notes ...]\n  Desk: npm run factory:desk",
    );
    return;
  }

  if (hookId) {
    const text = argValue("--text");
    if (!text) throw new Error("--text required");
    const brief = loadBrief(hookId);
    const before = brief.hook;
    brief.hook = text;
    brief.caption = brief.caption.replace(before, text);
    if (brief.cues?.[0]) brief.cues[0].text = text;
    saveBrief(brief);
    const job = getJob(hookId);
    if (job) {
      patchJob(hookId, { editCount: job.editCount + 1 });
    }
    appendReview({
      at: new Date().toISOString(),
      jobId: hookId,
      gate: "script",
      action: "edit",
      reviewer: reviewer(),
      hookBefore: before,
      hookAfter: text,
      humanSec,
    });
    console.log(`Hook updated: ${text}`);
    return;
  }

  if (approveScript) {
    const job = getJob(approveScript);
    if (!job || job.status !== "awaiting_script") {
      throw new Error("Job is not awaiting script review.");
    }
    patchJob(approveScript, {
      status: "script_approved",
      reviewer: reviewer(),
      reviewNotes: notes,
      scriptApprovedAt: new Date().toISOString(),
    });
    appendReview({
      at: new Date().toISOString(),
      jobId: approveScript,
      gate: "script",
      action: "approve",
      reviewer: reviewer(),
      notes,
      humanSec,
    });
    console.log(`Script approved. Next: npm run factory:render -- --brief ${approveScript}`);
    return;
  }

  if (approveRender) {
    const job = getJob(approveRender);
    if (!job || !canApproveRender(job.status)) {
      throw new Error("Job is not awaiting render review (run factory:qa first).");
    }
    patchJob(approveRender, {
      status: "render_approved",
      reviewer: reviewer(),
      reviewNotes: notes,
      renderApprovedAt: new Date().toISOString(),
    });
    appendReview({
      at: new Date().toISOString(),
      jobId: approveRender,
      gate: "render",
      action: "approve",
      reviewer: reviewer(),
      notes,
      humanSec,
    });
    console.log(`Render approved. Next: npm run factory:publish -- --brief ${approveRender} --dry-run`);
    return;
  }

  if (rejectId) {
    const gate = (argValue("--gate") ?? "script") as ReviewGate;
    const job = getJob(rejectId);
    if (!job) throw new Error("Job not found");
    if (gate === "script" && job.status !== "awaiting_script") {
      throw new Error("Not awaiting script.");
    }
    if (gate === "render" && !canApproveRender(job.status) && !canRender(job.status)) {
      throw new Error("Not awaiting render.");
    }
    patchJob(rejectId, {
      status: gate === "script" ? "script_rejected" : "render_rejected",
      reviewer: reviewer(),
      reviewNotes: notes,
    });
    appendReview({
      at: new Date().toISOString(),
      jobId: rejectId,
      gate,
      action: "reject",
      reviewer: reviewer(),
      notes,
      humanSec,
    });
    console.log(`Rejected (${gate}): ${rejectId}`);
  }
}

main();

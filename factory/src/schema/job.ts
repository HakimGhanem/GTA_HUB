import type { FactoryTemplate } from "./brief";

export const JOB_STATUSES = [
  "awaiting_script",
  "script_approved",
  "script_rejected",
  "rendered",
  "qa_failed",
  "qa_passed",
  "awaiting_render",
  "render_approved",
  "render_rejected",
  "queued",
  "published",
  "skipped",
] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const PUBLISH_PLATFORMS = [
  "instagram",
  "tiktok",
  "youtube",
] as const;
export type PublishPlatform = (typeof PUBLISH_PLATFORMS)[number];

/** Daily caps from official APIs — see docs/content-factory-etat-de-lart.md */
export const PLATFORM_DAILY_CAPS: Record<PublishPlatform, number> = {
  instagram: 50,
  tiktok: 15,
  youtube: 100,
};

export type ReviewGate = "script" | "render";
export type ReviewAction = "approve" | "reject" | "edit";

export type ReviewEvent = {
  at: string;
  jobId: string;
  gate: ReviewGate;
  action: ReviewAction;
  reviewer: string;
  notes?: string;
  hookBefore?: string;
  hookAfter?: string;
  humanSec?: number;
};

export type FactoryJob = {
  id: string;
  briefId: string;
  eventKey: string;
  template: FactoryTemplate;
  status: JobStatus;
  outputPath?: string;
  sha256?: string;
  durationSec?: number;
  width?: number;
  height?: number;
  qaIssues: string[];
  platforms: PublishPlatform[];
  reviewer?: string;
  reviewNotes?: string;
  scriptApprovedAt?: string;
  renderApprovedAt?: string;
  editCount: number;
  createdAt: string;
  updatedAt: string;
};

export type DailyQuota = {
  day: string;
  counts: Record<PublishPlatform, number>;
};

export function normalizeStatus(status: string): JobStatus {
  if (status === "briefed") return "awaiting_script";
  if (status === "qa_passed") return "awaiting_render";
  return status as JobStatus;
}

export function canRender(status: JobStatus): boolean {
  return status === "script_approved" || status === "rendered" || status === "qa_failed";
}

export function canApproveRender(status: JobStatus): boolean {
  return status === "awaiting_render" || status === "qa_passed";
}

export function canPublish(status: JobStatus): boolean {
  return status === "render_approved";
}

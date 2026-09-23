import type { FactoryTemplate } from "./brief";

export const JOB_STATUSES = [
  "briefed",
  "rendered",
  "qa_failed",
  "qa_passed",
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
  createdAt: string;
  updatedAt: string;
};

export type DailyQuota = {
  day: string;
  counts: Record<PublishPlatform, number>;
};

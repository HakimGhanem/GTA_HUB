export const UGC_STATUSES = [
  "received",
  "needs_review",
  "approved",
  "rejected",
  "published",
] as const;
export type UgcStatus = (typeof UGC_STATUSES)[number];

/**
 * Creator-submitted clip. Credit is not a licence — waiver is required.
 * No Instagram scrape: the creator sends the file.
 */
export type UgcSubmission = {
  id: string;
  handle: string;
  sourceUrl?: string;
  filePath: string;
  waiverAccepted: true;
  waiverText: string;
  status: UgcStatus;
  rejectReason?: string;
  createdAt: string;
};

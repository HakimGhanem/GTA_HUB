export const ASSET_KINDS = ["clip", "audio", "overlay", "still"] as const;
export type AssetKind = (typeof ASSET_KINDS)[number];

export const ASSET_LICENCES = [
  "own",
  "rockstar-trailer",
  "licensed-music",
  "ugc-waiver",
] as const;
export type AssetLicence = (typeof ASSET_LICENCES)[number];

/** Entry in factory/data/assets/manifest.json */
export type MediaAsset = {
  id: string;
  kind: AssetKind;
  path: string;
  durationSec?: number;
  tags: string[];
  licence: AssetLicence;
  notes?: string;
};

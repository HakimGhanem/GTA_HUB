import React from "react";
import { Composition } from "remotion";
import { DealStack } from "./compositions/DealStack";
import { PoiCountdown } from "./compositions/PoiCountdown";
import { UgcCredit } from "./compositions/UgcCredit";
import {
  BEAT_SEC,
  END_SEC,
  FPS,
  HEIGHT,
  HOOK_SEC,
  UGC_BUMPER_SEC,
  WIDTH,
  type VideoBrief,
} from "./schema/brief";
import sampleDeal from "../fixtures/sample-deal-brief.json";
import samplePoi from "../fixtures/sample-poi-brief.json";

const defaultPoi = samplePoi as VideoBrief;
const defaultDeal = sampleDeal as VideoBrief;

function framesFor(brief: VideoBrief): number {
  if (brief.template === "ugc-credit") {
    return Math.round((UGC_BUMPER_SEC + END_SEC + 8) * FPS);
  }
  return Math.round((HOOK_SEC + brief.items.length * BEAT_SEC + END_SEC) * FPS);
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PoiCountdown"
        component={PoiCountdown}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={framesFor(defaultPoi)}
        defaultProps={{ brief: defaultPoi }}
        calculateMetadata={({ props }) => ({
          durationInFrames: framesFor(props.brief),
        })}
      />
      <Composition
        id="DealStack"
        component={DealStack}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={framesFor(defaultDeal)}
        defaultProps={{ brief: defaultDeal }}
        calculateMetadata={({ props }) => ({
          durationInFrames: framesFor(props.brief),
        })}
      />
      <Composition
        id="UgcCredit"
        component={UgcCredit}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={framesFor({ ...defaultPoi, template: "ugc-credit" })}
        defaultProps={{
          brief: {
            ...defaultPoi,
            template: "ugc-credit",
            credit: {
              handle: "creator",
              waiverId: "demo",
            },
          },
        }}
        calculateMetadata={({ props }) => ({
          durationInFrames: framesFor(props.brief),
        })}
      />
    </>
  );
};

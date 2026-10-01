import React from "react";
import { Composition } from "remotion";
import { DealStack } from "./compositions/DealStack";
import { GameplayCut } from "./compositions/GameplayCut";
import { PoiCountdown } from "./compositions/PoiCountdown";
import { UgcCredit } from "./compositions/UgcCredit";
import {
  FPS,
  HEIGHT,
  WIDTH,
  briefDurationFrames,
  type VideoBrief,
} from "./schema/brief";
import sampleDeal from "../fixtures/sample-deal-brief.json";
import samplePoi from "../fixtures/sample-poi-brief.json";

const defaultPoi = samplePoi as VideoBrief;
const defaultDeal = sampleDeal as VideoBrief;

function framesFor(brief: VideoBrief): number {
  return briefDurationFrames(brief);
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
      <Composition
        id="GameplayCut"
        component={GameplayCut}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={framesFor({ ...defaultPoi, template: "gameplay-cut" })}
        defaultProps={{
          brief: {
            ...defaultPoi,
            template: "gameplay-cut",
            hook: "Own capture. Licensed bed. No trending hits.",
            ctaLabel: "More pins on Map-6",
            gameplaySec: 12,
          },
        }}
        calculateMetadata={({ props }) => ({
          durationInFrames: framesFor(props.brief),
        })}
      />
    </>
  );
};

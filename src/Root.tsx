import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import {
  CLIP1_DURATION,
  CLIP2_DURATION,
  CLIP2_VOLTA_DURATION,
  CLIP_LAST_DURATION,
  TRANSITION_DURATION,
} from "./constants";

export const RemotionRoot: React.FC = () => {
  const totalDuration = CLIP1_DURATION + CLIP2_DURATION + CLIP2_VOLTA_DURATION + CLIP_LAST_DURATION - (TRANSITION_DURATION * 2);

  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={totalDuration}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

import "./index.css";
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import {
  CLIP1_DURATION,
  CLIP2_DURATION,
  TRANSITION_DURATION,
  REPETITIONS
} from "./constants";

export const RemotionRoot: React.FC = () => {
  const totalDuration = CLIP1_DURATION + (CLIP2_DURATION - TRANSITION_DURATION) * REPETITIONS;

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


import React from "react";
import { AbsoluteFill, Series, Html5Audio, useVideoConfig, spring, useCurrentFrame, interpolate } from "remotion";
import img3 from "./assets/images/3.png";
import img2 from "./assets/images/2.png";
import img1 from "./assets/images/1.png";
import sound from "./assets/audios/countdown.mp3";

const NumberDisplay: React.FC<{ src: string }> = ({ src }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: {
            stiffness: 100,
            damping: 10,
        },
    });

    const opacity = interpolate(frame, [25, 30], [1, 0], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill className="flex justify-center items-center">
            <Html5Audio src={sound} />
            <img
                src={src}
                style={{
                    width: 400,
                    height: 400,
                    transform: `scale(${scale})`,
                    opacity,
                }}
                alt="countdown"
            />
        </AbsoluteFill>
    );
};

export const Countdown: React.FC<{ durationPerNumber?: number }> = ({ durationPerNumber = 30 }) => {
    return (
        <AbsoluteFill>
            <Series>
                <Series.Sequence durationInFrames={durationPerNumber}>
                    <NumberDisplay src={img3} />
                </Series.Sequence>
                <Series.Sequence durationInFrames={durationPerNumber}>
                    <NumberDisplay src={img2} />
                </Series.Sequence>
                <Series.Sequence durationInFrames={durationPerNumber}>
                    <NumberDisplay src={img1} />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

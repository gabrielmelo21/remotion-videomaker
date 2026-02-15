import React from "react";
import { AbsoluteFill, Series, Html5Audio, useVideoConfig, spring, useCurrentFrame, interpolate, staticFile } from "remotion";

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
            <Html5Audio src={staticFile("assets/audios/countdown.mp3")} />
            <img
                src={staticFile(src)}
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
                    <NumberDisplay src="assets/images/3.png" />
                </Series.Sequence>
                <Series.Sequence durationInFrames={durationPerNumber}>
                    <NumberDisplay src="assets/images/2.png" />
                </Series.Sequence>
                <Series.Sequence durationInFrames={durationPerNumber}>
                    <NumberDisplay src="assets/images/1.png" />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

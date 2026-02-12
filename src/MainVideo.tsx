import React from "react";
import {
    AbsoluteFill,
    OffthreadVideo,
    interpolate, useCurrentFrame, useVideoConfig, spring,
    Html5Audio,
    Sequence
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import {
    CLIP1_DURATION,
    CLIP2_DURATION,
    TRANSITION_DURATION,
    REPETITIONS
} from "./constants";

import { loadFont } from "@remotion/google-fonts/Fredoka";
import video1 from "./assets/videos/clipe1.mp4";
import video2 from "./assets/videos/clipe2-veo.mp4";
import truckSound from "./assets/audios/truck-sound.mp3";
import swoshSound from "./assets/audios/swosh.mp3";
import IntroAudio from "./assets/audios/Aprenda-ingles-com-lingobot-v3.wav";
import backgroundMusic from "./assets/audios/background-music.mp3";


const { fontFamily } = loadFont("normal", {
    weights: ["700"],
});

const FloatingText: React.FC<{
    content: string;
    fontFamily: string;
    style?: React.CSSProperties
}> = ({ content, fontFamily, style }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: {
            stiffness: 150,
            damping: 10,
            mass: 1,
        },
    });

    const scale = interpolate(entrance, [0, 1], [0.5, 1], {
        extrapolateRight: "clamp",
    });

    const wobble = Math.sin(frame / 8) * 0.02 + 1;

    return (
        <AbsoluteFill
            className="flex flex-col items-center"
            style={{ ...style }}
        >
            <Html5Audio src={swoshSound} />
            <div
                className="text-3d-wrapper"
                style={{
                    transform: `scale(${scale * wobble})`,
                    ['--font-family' as any]: fontFamily,
                }}
            >
                <div className="text-3d-layer text-shadow-layer">
                    {content}
                </div>
                <div className="text-3d-layer text-main-layer">
                    {content}
                </div>
                <div className="text-3d-layer text-highlight-layer">
                    {content}
                </div>
            </div>
        </AbsoluteFill>
    );
};


export const MainVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
            {/* Música de Fundo: toca a partir do clipe 2 de forma corrida */}
            <Sequence from={CLIP1_DURATION - TRANSITION_DURATION}>
                <Html5Audio src={backgroundMusic} volume={0.3} />
            </Sequence>

            {/* Camada de Vídeo e Áudio com Transição */}
            <TransitionSeries>
                <TransitionSeries.Sequence durationInFrames={CLIP1_DURATION} name="clipe1">
                    <OffthreadVideo
                        src={video1}
                        trimBefore={21}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Html5Audio src={truckSound} />
                    <Html5Audio src={IntroAudio} />
                    <FloatingText
                        content={"Aprenda Inglês com \nLingobot!"}
                        fontFamily={fontFamily}
                        style={{ paddingTop: '350px' }}
                    />
                </TransitionSeries.Sequence>

                {/* Repetição do clipe 2 por REPETITIONS vezes */}
                {[...Array(REPETITIONS)].flatMap((_, i) => [
                    <TransitionSeries.Transition
                        key={`trans-${i}`}
                        presentation={slide({ direction: 'from-right' })}
                        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                    />,
                    <TransitionSeries.Sequence
                        key={`seq-${i}`}
                        durationInFrames={CLIP2_DURATION}
                        name={`clipe2-rep-${i}`}
                    >
                        <OffthreadVideo
                            src={video2}
                            volume={0}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <FloatingText
                            content={"Do you know the name of this is? "}
                            fontFamily={fontFamily}
                            style={{ justifyContent: 'flex-end', paddingBottom: '200px' }}
                        />
                    </TransitionSeries.Sequence>
                ])}
            </TransitionSeries>
        </AbsoluteFill>
    );
};
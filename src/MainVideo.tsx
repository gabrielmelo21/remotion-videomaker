import React from "react";
import {
    AbsoluteFill,
    OffthreadVideo,
    useCurrentFrame, useVideoConfig, spring,
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
import { Countdown } from "./Countdown";

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

const FloatingText: React.FC<{ content: string; fontFamily: string; style?: React.CSSProperties }> = ({ content, fontFamily, style }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: {
            stiffness: 100,
            damping: 15,
        },
        durationInFrames: 30,
    });

    const wobble = Math.sin(frame / 8) * 0.02 + 1;

    return (
        <AbsoluteFill
            className="flex items-center"
            style={{
                ...style,
                paddingLeft: '60px',
                paddingRight: '60px',
            }}
        >
            <Html5Audio src={swoshSound} />
            <div
                className="text-3d-wrapper"
                style={{
                    transform: `scale(${entrance * wobble})`,
                    opacity: entrance,
                    width: '100%',
                }}
            >
                {/* Camada de Sombra (Profundidade) */}
                <span className="text-3d-layer text-shadow-layer" style={{ "--font-family": fontFamily } as any}>
                    {content}
                </span>

                {/* Camada de Brilho (Topo) */}
                <span className="text-3d-layer text-main-layer" style={{ "--font-family": fontFamily } as any}>
                    {content}
                </span>
            </div>
        </AbsoluteFill>
    );
};


export const MainVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
            {/* Música de Fundo: toca a partir do clipe 2 */}
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
                        <Countdown />
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
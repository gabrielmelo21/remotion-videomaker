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
import { Arrow } from "./Arrow";

import { loadFont } from "@remotion/google-fonts/DynaPuff";
import video1 from "./assets/videos/clipe1.mp4";
import video2 from "./assets/videos/clipe2-veo.mp4";
import introVideo from "./assets/videos/pilotando-f1.mp4";
import truckSound from "./assets/audios/truck-sound.mp3";
import swoshSound from "./assets/audios/swosh.mp3";
import IntroAudio from "./assets/audios/Aprenda-ingles-com-lingobot-v3.wav";
import backgroundMusic from "./assets/audios/background-music.mp3";
import titleImage from "./assets/images/title.webp";

const { fontFamily } = loadFont("normal", {
    weights: ["400"],
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

                {/* Camada Principal (Topo + Contorno) */}
                <span className="text-3d-layer text-main-layer" style={{ "--font-family": fontFamily } as any}>
                    {content}
                </span>
            </div>
        </AbsoluteFill>
    );
};


const WatermarkCover: React.FC = () => {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '240px',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'right',
                pointerEvents: 'none',
            }}
        >
            <img
                src={titleImage}
                style={{
                    width: '120%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                }}
            />
        </div>
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
                        src={introVideo}
                        volume={0}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Html5Audio src={truckSound} />
                    <Html5Audio src={IntroAudio} />
                    <FloatingText
                        content={"Aprenda Inglês com \nLingobot!"}
                        fontFamily={fontFamily}
                        style={{ justifyContent: 'flex-end', paddingBottom: '350px' }}
                    />
                    <WatermarkCover />
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
                        <WatermarkCover />
                        <Arrow
                            x={-300}
                            y={-500}
                            rotation={180}
                            size={250}
                        />
                        <Countdown />
                        <FloatingText
                            content={"Do you know the name of this is? "}
                            fontFamily={fontFamily}
                            style={{ justifyContent: 'flex-end', paddingBottom: '400px' }}
                        />
                    </TransitionSeries.Sequence>
                ])}
            </TransitionSeries>
        </AbsoluteFill>
    );
};
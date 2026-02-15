import {
    AbsoluteFill,
    OffthreadVideo,
    Html5Audio,
    Sequence,
    Loop,
    staticFile,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
    CLIP1_DURATION,
    CLIP2_DURATION,
    CLIP2_VOLTA_DURATION,
    CLIP_LAST_DURATION,
    TRANSITION_DURATION,
    COUNTDOWN_TOTAL_DURATION,
} from "./constants";
import { z } from "zod";

// Componentes
import { FloatingText } from "./FloatingText";
import { WatermarkCover } from "./WatermarkCover";
import { Arrow } from "./Arrow";

// Fontes
import { loadFont } from "@remotion/google-fonts/DynaPuff";
import { Countdown } from "./Countdown";

const { fontFamily } = loadFont("normal", {
    weights: ["400"],
});

export const MainVideoSchema = z.object({
    backgroundMusic: z.string(),
    introVideo: z.string(),
    introSoundEffect: z.string(),
    introSpeech: z.string(),
    introText: z.string(),
    mainVideo: z.string(),
    mainVideoReversed: z.string(),
    question1Speech: z.string(),
    question1Text: z.string(),
    answer1Speech: z.string(),
    answer1TextEn: z.string(),
    answer1TextPt: z.string(),
    question2Speech: z.string(),
    question2Text: z.string(),
    answer2Speech: z.string(),
    answer2Text: z.string(),
    outroVideo: z.string(),
    outroTextEn: z.string(),
    outroTextPt: z.string(),
});

export type MainVideoProps = z.infer<typeof MainVideoSchema>;

export const MainVideo: React.FC<MainVideoProps> = ({
    backgroundMusic,
    introVideo,
    introSoundEffect,
    introSpeech,
    introText,
    mainVideo,
    mainVideoReversed,
    question1Speech,
    question1Text,
    answer1Speech,
    answer1TextEn,
    answer1TextPt,
    question2Speech,
    question2Text,
    answer2Speech,
    answer2Text,
    outroVideo,
    outroTextEn,
    outroTextPt,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>

            {/* Música de Fundo: toca a partir do clipe 2 até o início da transição final */}
            <Sequence from={CLIP1_DURATION - TRANSITION_DURATION} durationInFrames={CLIP2_DURATION + CLIP2_VOLTA_DURATION - TRANSITION_DURATION}>
                <Html5Audio src={staticFile(backgroundMusic)} volume={0.3} />
            </Sequence>

            {/* Camada de Vídeo e Áudio com Transição */}
            <TransitionSeries>

                {/* Intro */}
                <TransitionSeries.Sequence durationInFrames={CLIP1_DURATION} name="clipe1">
                    <OffthreadVideo
                        src={staticFile(introVideo)}
                        volume={0}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Html5Audio src={staticFile(introSoundEffect)} trimBefore={24 * 30} volume={0.5} />
                    <Html5Audio src={staticFile(introSpeech)} />
                    <FloatingText
                        content={introText}
                        fontFamily={fontFamily}
                        yPosition="bottom"
                        paddingBottom="350px"
                    />
                    <WatermarkCover />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                {/* Clipe 2: Ida (Normal) */}
                <TransitionSeries.Sequence durationInFrames={CLIP2_DURATION} name="clipe2-ida">
                    <OffthreadVideo
                        src={staticFile(mainVideo)}
                        volume={0}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <WatermarkCover />

                    <Sequence durationInFrames={85 + COUNTDOWN_TOTAL_DURATION}>
                        <Arrow x={-300} y={700} rotation={160} size={250} />
                        <FloatingText
                            content={question1Text}
                            fontFamily={fontFamily}
                            yPosition="top"
                            paddingTop="200px"
                            textSize="90px"
                        />
                    </Sequence>

                    <Html5Audio src={staticFile(question1Speech)} />
                    <Sequence from={85}>
                        <Countdown />
                    </Sequence>

                    <Sequence from={95 + COUNTDOWN_TOTAL_DURATION}>
                        <FloatingText
                            content={answer1TextEn}
                            fontFamily={fontFamily}
                            yPosition="bottom"
                            paddingBottom="350px"
                            textSize="120px"
                        />
                        <FloatingText
                            content={answer1TextPt}
                            fontFamily={fontFamily}
                            yPosition="bottom"
                            paddingBottom="250px"
                            textSize="80px"
                        />
                    </Sequence>


                    <Sequence from={85 + COUNTDOWN_TOTAL_DURATION}>
                        <Html5Audio src={staticFile(answer1Speech)} />
                    </Sequence>


                </TransitionSeries.Sequence>

                {/* Clipe 2: Volta (Normal) -> Colado sem transição */}
                <TransitionSeries.Sequence durationInFrames={CLIP2_VOLTA_DURATION} name="clipe2-volta">
                    <Loop durationInFrames={238}>
                        <OffthreadVideo
                            src={staticFile(mainVideoReversed)}
                            volume={0}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Loop>
                    <WatermarkCover />

                    <Sequence from={45} durationInFrames={112}>
                        <Html5Audio src={staticFile(question2Speech)} />

                        <FloatingText
                            content={question2Text}
                            fontFamily={fontFamily}
                            yPosition="top"
                            paddingTop="200px"
                            textSize="90px"
                        />
                    </Sequence>

                    <Sequence from={157}>
                        <Countdown />
                    </Sequence>

                    <Sequence from={157 + COUNTDOWN_TOTAL_DURATION + 30}>
                        <Html5Audio src={staticFile(answer2Speech)} />
                        <FloatingText
                            content={answer2Text}
                            fontFamily={fontFamily}
                            yPosition="bottom"
                            paddingBottom="350px"
                            textSize="120px"
                        />
                    </Sequence>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
                />

                <TransitionSeries.Sequence durationInFrames={CLIP_LAST_DURATION} name="last-clip">
                    <OffthreadVideo
                        src={staticFile(outroVideo)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    <Sequence>
                        <FloatingText
                            content={outroTextEn}
                            fontFamily={fontFamily}
                            yPosition="bottom"
                            paddingBottom="350px"
                            textSize="120px"
                        />
                        <FloatingText
                            content={outroTextPt}
                            fontFamily={fontFamily}
                            yPosition="bottom"
                            paddingBottom="250px"
                            textSize="80px"
                        />
                    </Sequence>


                    <WatermarkCover />
                </TransitionSeries.Sequence>

            </TransitionSeries>

        </AbsoluteFill>
    );
};
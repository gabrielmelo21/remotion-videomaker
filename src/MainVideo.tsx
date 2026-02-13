import {
    AbsoluteFill,
    OffthreadVideo,
    Html5Audio,
    Sequence,
    Loop,
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

// Componentes
import { FloatingText } from "./FloatingText";
import { WatermarkCover } from "./WatermarkCover";
import { Arrow } from "./Arrow";

// Fontes
import { loadFont } from "@remotion/google-fonts/DynaPuff";
import { Countdown } from "./Countdown";

// Áudios
import f1Sound from "./assets/tools/f1-sound.mp3";
import backgroundMusic from "./assets/audios/background-music.mp3";

// Videos 
import introVideo from "./assets/videos/pilotando-f1.mp4";
import mainVideo from "./assets/videos/cozinhando.mp4";
import mainVideoReversed from "./assets/videos/main-video-reversed.mp4";
import lastVideo from "./assets/videos/comendo-mingal.mp4";

// Falas
import say_intro from "./assets/falas/Aprenda-ingles-com-lingobot-v3.wav";
import say_asking1 from "./assets/falas/do you know what's the name of this.wav";
import say_response1 from "./assets/falas/pot.wav";
import say_asking2 from "./assets/falas/whats-lingobot-doin.mp3";
import say_response2 from "./assets/falas/hes-cooking.wav";

const { fontFamily } = loadFont("normal", {
    weights: ["400"],
});

export const MainVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>

            {/* Música de Fundo: toca a partir do clipe 2 */}
            <Sequence from={CLIP1_DURATION - TRANSITION_DURATION}>
                <Html5Audio src={backgroundMusic} volume={0.3} />
            </Sequence>

            {/* Camada de Vídeo e Áudio com Transição */}
            <TransitionSeries>

                {/* Intro */}
                <TransitionSeries.Sequence durationInFrames={CLIP1_DURATION} name="clipe1">
                    <OffthreadVideo
                        src={introVideo}
                        volume={0}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Html5Audio src={f1Sound} trimBefore={24 * 30} volume={0.5} />
                    <Html5Audio src={say_intro} />
                    <FloatingText
                        content={"Aprenda Inglês com \nLingobot!"}
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
                        src={mainVideo}
                        volume={0}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <WatermarkCover />

                    <Sequence durationInFrames={85 + COUNTDOWN_TOTAL_DURATION}>
                        <Arrow x={-300} y={700} rotation={180} size={250} />
                        <FloatingText
                            content={"Do you know the name of this is? "}
                            fontFamily={fontFamily}
                            yPosition="top"
                            paddingTop="200px"
                            textSize="90px"
                        />
                    </Sequence>

                    <Html5Audio src={say_asking1} />
                    <Sequence from={85}>
                        <Countdown />
                    </Sequence>

                    <Sequence from={95 + COUNTDOWN_TOTAL_DURATION}>
                        <FloatingText
                            content={"Pot"}
                            fontFamily={fontFamily}
                            yPosition="bottom"
                            paddingBottom="350px"
                            textSize="120px"
                        />
                        <FloatingText
                            content={"Panela"}
                            fontFamily={fontFamily}
                            yPosition="bottom"
                            paddingBottom="250px"
                            textSize="50px"
                        />
                    </Sequence>


                    <Sequence from={85 + COUNTDOWN_TOTAL_DURATION}>
                        <Html5Audio src={say_response1} />
                    </Sequence>


                </TransitionSeries.Sequence>









                {/* Clipe 2: Volta (Normal) -> Colado sem transição */}
                <TransitionSeries.Sequence durationInFrames={CLIP2_VOLTA_DURATION} name="clipe2-volta">
                    <Loop durationInFrames={238}>
                        <OffthreadVideo
                            src={mainVideoReversed}
                            volume={0}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Loop>
                    <WatermarkCover />

                    <Sequence from={45} durationInFrames={112}>
                        <Html5Audio src={say_asking2} />

                        <FloatingText
                            content={"What's Lingobot doing?"}
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
                        <Html5Audio src={say_response2} />
                        <FloatingText
                            content={"He's cooking!"}
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
                        src={lastVideo}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <WatermarkCover />
                </TransitionSeries.Sequence>

            </TransitionSeries>

        </AbsoluteFill>
    );
};
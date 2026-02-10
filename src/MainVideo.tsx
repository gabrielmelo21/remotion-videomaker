import { AbsoluteFill, OffthreadVideo, Series, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Fredoka";
import video1 from "./assets/videos/dirgindo-caminhao-na-cabine.mp4";
import video2 from "./assets/videos/interagindo-com-passaro-no-parque.mp4";

const { fontFamily } = loadFont("normal", {
    weights: ["700"],
});

export const MainVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animação de entrada
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

    // Efeito de oscilação suave
    const wobble = Math.sin(frame / 8) * 0.02 + 1;

    const textContent = "Let's Learn\nEnglish!";

    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
            {/* Camada de Vídeo */}
            <Series>
                <Series.Sequence durationInFrames={240}>
                    <OffthreadVideo src={video1} trimBefore={21} />
                </Series.Sequence>
                <Series.Sequence durationInFrames={300}>
                    <OffthreadVideo src={video2} trimBefore={25} />
                </Series.Sequence>
            </Series>

            {/* Camada de Texto com Efeito 3D */}
            <AbsoluteFill>
                <AbsoluteFill className="justify-start items-center pt-40">
                    <div style={{
                        position: 'relative',
                        transform: `scale(${scale * wobble})`,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {/* Sombra 3D profunda */}
                        <div
                            style={{
                                position: 'absolute',
                                fontFamily,
                                fontSize: 140,
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                textAlign: "center",
                                color: '#CC8800',
                                lineHeight: 1.1,
                                whiteSpace: 'pre-line',
                                textShadow: `
                    2px 2px 0 #B87700,
                    4px 4px 0 #A56600,
                    6px 6px 0 #925500,
                    8px 8px 0 #7F4400,
                    10px 10px 20px rgba(0,0,0,0.5)
                `,
                            }}
                        >
                            {textContent}
                        </div>

                        {/* Texto principal dourado */}
                        <div
                            style={{
                                position: 'absolute',
                                fontFamily,
                                fontSize: 140,
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                textAlign: "center",
                                color: '#FFD700',
                                lineHeight: 1.1,
                                whiteSpace: 'pre-line',
                                WebkitTextStroke: '5px #B8860B',
                                paintOrder: 'stroke fill',
                            }}
                        >
                            {textContent}
                        </div>

                        {/* Brilho interno (highlight) */}
                        <div
                            style={{
                                position: 'absolute',
                                fontFamily,
                                fontSize: 140,
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                textAlign: "center",
                                background: 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                lineHeight: 1.1,
                                whiteSpace: 'pre-line',
                            }}
                        >
                            {textContent}
                        </div>
                    </div>
                </AbsoluteFill>
            </AbsoluteFill>
        </AbsoluteFill>
    );
}
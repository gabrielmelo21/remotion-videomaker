import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, Html5Audio, staticFile } from 'remotion';

interface FloatingTextProps {
    content: string;
    fontFamily: string;
    yPosition?: 'top' | 'center' | 'bottom';
    paddingTop?: string | number;
    paddingBottom?: string | number;
    textSize?: string | number;
}

export const FloatingText: React.FC<FloatingTextProps> = ({
    content,
    fontFamily,
    yPosition = 'center',
    paddingTop = 0,
    paddingBottom = 0,
    textSize,
}) => {
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

    const justifyContent = yPosition === 'top' ? 'flex-start' : yPosition === 'bottom' ? 'flex-end' : 'center';

    const textStyle: React.CSSProperties = {
        "--font-family": fontFamily,
        fontSize: textSize || 'var(--text-size)',
    } as any;

    return (
        <AbsoluteFill
            className="flex items-center"
            style={{
                justifyContent,
                paddingTop,
                paddingBottom,
                paddingLeft: '60px',
                paddingRight: '60px',
                pointerEvents: 'none',
            }}
        >
            <Html5Audio src={staticFile("assets/audios/swosh.mp3")} />
            <div
                className="text-3d-wrapper"
                style={{
                    transform: `scale(${entrance * wobble})`,
                    opacity: entrance,
                    width: '100%',
                }}
            >
                {/* Camada de Sombra (Profundidade) */}
                <span className="text-3d-layer text-shadow-layer" style={textStyle}>
                    {content}
                </span>

                {/* Camada Principal (Topo + Contorno) */}
                <span className="text-3d-layer text-main-layer" style={textStyle}>
                    {content}
                </span>
            </div>
        </AbsoluteFill>
    );
};

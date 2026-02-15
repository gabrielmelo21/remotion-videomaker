import React from "react";
import { AbsoluteFill, useCurrentFrame, staticFile } from "remotion";

interface ArrowProps {
    x?: number;
    y?: number;
    rotation?: number;
    size?: number;
}

export const Arrow: React.FC<ArrowProps> = ({
    x = 0,
    y = 0,
    rotation = 0,
    size = 200,
}) => {
    const frame = useCurrentFrame();

    // Efeito de pulso constante
    const pulse = Math.sin(frame / 5) * 0.1 + 1;

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none'
            }}
        >
            <img
                src={staticFile("assets/images/arrow.png")}
                style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    width: size,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${pulse})`,
                }}
                alt="arrow"
            />
        </AbsoluteFill>
    );
};

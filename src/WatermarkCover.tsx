import React from 'react';
import { staticFile } from 'remotion';

export const WatermarkCover: React.FC = () => {
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
                src={staticFile("assets/images/title.webp")}
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

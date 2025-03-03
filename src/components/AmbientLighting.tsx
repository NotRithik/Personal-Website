// components/AmbientLighting.jsx
import React from 'react';

interface AmbientLightingProps {
    className?: string;
}

const AmbientLighting: React.FC<AmbientLightingProps> = ({ className }) => {
    return (
        <div className={`ambient-lighting-container grid-overlap-container ${className ? className : ''}`}>
            <div className="ambient-light-rectangle h-full max-h-full primary grid-overlap-element mx-auto"></div>
            <div className="ambient-light-rectangle h-full max-h-full secondary grid-overlap-element mx-auto"></div>
        </div>
    );
};

export default AmbientLighting;

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import './Marquee.css';

const Marquee = () => {
    const content = "Single-Origin • Tested • Never Blended • Sealed at Source • Traceable • Plastic-Free • ";
    const repeatCount = 10;

    return (
        <div className="marquee-container">
            <div className="marquee-track">
                {Array(repeatCount).fill(content).map((text, i) => (
                    <span key={i} className="marquee-item">{text}</span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;

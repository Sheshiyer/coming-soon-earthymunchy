import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import PhysicsButton from './PhysicsButton';
import './Hero.css';
import logoWhite from '../assets/logo-white.png';
import heroVideo from '../assets/hero-bg.mp4';

const Hero = () => {
    const comp = useRef(null);
    const heroBgRef = useRef(null);

    // Helper to split text into characters
    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : 'auto' }}>
                {char}
            </span>
        ));
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // LOADER SEQUENCE
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Initial Set for visibility
            gsap.set(['.hero-logo', '.kicker', '.hero-title', '.subline', '.cta-wrapper'], { autoAlpha: 0, y: 30 });
            gsap.set('.hero-char span', { autoAlpha: 0, y: 40 });

            // Animate Logo first
            tl.to('.hero-logo', { autoAlpha: 1, y: 0, duration: 1, delay: 0.2 });

            // Animate Kicker
            tl.to('.kicker', { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5");

            // Animate Title Chars (Staggered and elegant)
            tl.to('.hero-title', { autoAlpha: 1, duration: 0.1 }, "-=0.8"); // Ensure container is visible
            tl.to('.hero-char span',
                { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.04, ease: "power4.out" },
                "-=0.9"
            );

            // Animate Subline & CTA
            tl.to(['.subline', '.cta-wrapper'],
                { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2 },
                "-=0.8"
            );

            // PARALLAX SCROLL (Existing code)
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (!prefersReducedMotion) {
                gsap.to(heroBgRef.current, {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: comp.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });

                gsap.to('.hero-text-block', {
                    y: 50, // Slightly more movement for parallax depth
                    ease: "none",
                    scrollTrigger: {
                        trigger: comp.current,
                        start: "top top",
                        end: "bottom center",
                        scrub: true
                    }
                });
            }

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={comp}>
            <div className="hero-bg" ref={heroBgRef}>
                <video
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/assets/hero_mist.png"
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
            </div>
            <div className="hero-overlay"></div>

            <div className="container hero-content">
                <div className="hero-text-block">
                    <img src={logoWhite} alt="Earthy Munchy Logo" className="hero-logo" />
                    <p className="kicker">Sri Lanka • A Land of Purity</p>
                    <h1 className="hero-title hero-char">
                        {splitText("Wild by Origin.")}<br />
                        {splitText("Honest by Nature.")}
                    </h1>
                    <p className="subline">
                        Earthy Munchy connects global native goodness to everyday living. <br />
                        Sourced from authentic origins, sealed at the source.
                    </p>
                    <div className="cta-wrapper">
                        <a href="https://www.instagram.com/earthy.munchy?igsh=azAzMXR1OW1wZXRr" target="_blank" rel="noopener noreferrer">
                            <PhysicsButton className="primary-cta">Join the Journey</PhysicsButton>
                        </a>
                        <p className="microline">Est. 2025 • Sri Lanka & India</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import MistCanvas from './MistCanvas';
import PhysicsButton from './PhysicsButton';
import './Hero.css';
import heroVideo from '../assets/hero-bg.mp4';

const Hero = () => {
    const comp = useRef(null);
    const heroBgRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // LOADER SEQUENCE
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(['.kicker', '.hero-title', '.subline', '.cta-wrapper'],
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, delay: 0.5 }
            );

            // PARALLAX SCROLL
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
                    y: 30,
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

            {/* GLSL Mist Overlay */}
            <MistCanvas />

            <div className="container hero-content">
                <div className="hero-text-block">
                    <p className="kicker">Sri Lanka • A Land of Purity</p>
                    <h1 className="hero-title">
                        Wild by Origin.<br />Honest by Nature.
                    </h1>
                    <p className="subline">
                        Earthy Munchy connects global native goodness to everyday living. <br />
                        Sourced from authentic origins, sealed at the source.
                    </p>
                    <div className="cta-wrapper">
                        <PhysicsButton className="primary-cta">Join the Journey</PhysicsButton>
                        <p className="microline">Est. 2025 • Sri Lanka & India</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

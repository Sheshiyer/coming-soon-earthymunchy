import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const HeroOption2 = () => {
    const canvasRef = useRef(null);
    const cursorRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isViewCursor, setIsViewCursor] = useState(false);

    // --- Unicorn Studio Script Injection ---
    useEffect(() => {
        const initUnicorn = () => {
            if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
                window.UnicornStudio.init();
                window.UnicornStudio.isInitialized = true;
            } else {
                console.warn("UnicornStudio not checked or loaded fully yet.");
            }
        };

        if (!document.getElementById('unicorn-script')) {
            const script = document.createElement("script");
            script.id = 'unicorn-script';
            script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
            script.onload = initUnicorn;
            script.onerror = () => console.error("Failed to load UnicornStudio script");
            document.body.appendChild(script);
        } else if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
            initUnicorn();
        }
    }, []);

    // --- Lenis Smooth Scroll ---
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 0.8,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect GSAP to Lenis if needed (generally good practice if using ScrollTrigger)
        // lenis.on('scroll', ScrollTrigger.update) // Optional sync
        // gsap.ticker.add((time)=>{lenis.raf(time * 1000)}) // Sync ticker

        return () => {
            lenis.destroy();
        };
    }, []);

    // --- Custom Cursor Logic ---
    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // --- Canvas Animation ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        let streams = [];
        const gap = 40;
        let animationFrameId;

        class Stream {
            constructor(x) {
                this.x = x;
                this.y = Math.random() * height;
                this.speed = Math.random() * 2 + 0.5;
                this.length = Math.random() * 100 + 50;
                this.opacity = Math.random() * 0.3 + 0.05;
            }
            update() {
                this.y -= this.speed;
                if (this.y + this.length < 0) {
                    this.y = height + Math.random() * 100;
                    this.speed = Math.random() * 2 + 0.5;
                }
            }
            draw(ctx) {
                ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(this.x, 0);
                ctx.lineTo(this.x, height);
                ctx.stroke();

                const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
                gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(this.x - 1, this.y, 3, this.length);
            }
        }

        const initCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            streams = [];
            for (let x = gap / 2; x < width; x += gap) {
                streams.push(new Stream(x));
            }
        };

        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            streams.forEach(s => {
                s.update();
                s.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animateCanvas);
        };

        initCanvas();
        animateCanvas();

        window.addEventListener('resize', initCanvas);

        return () => {
            window.removeEventListener('resize', initCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // --- Initial Animations ---
    useEffect(() => {
        // Fade in label
        gsap.to('.hero-label', { opacity: 1, duration: 1, delay: 0.5 });

        // Text reveal for H1
        const maskTexts = document.querySelectorAll('.mask-text span');
        gsap.to(maskTexts, {
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.8
        });

        // Fade up stats
        gsap.to('.hero-stats', { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power2.out' });

    }, []);

    return (
        <div className="bg-[#030303] text-white min-h-screen font-sans relative overflow-x-hidden cursor-none selection:bg-white/20">

            {/* --- Custom Cursor --- */}
            <div
                ref={cursorRef}
                id="cursor"
                className={`fixed top-0 left-0 w-5 h-5 border border-white/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 mix-blend-difference ${isHovered ? 'w-[50px] h-[50px] bg-white border-transparent mix-blend-exclusion' : ''} ${isViewCursor ? 'w-20 h-20 bg-white/10 backdrop-blur-[2px] border-white/20 flex items-center justify-center font-bold text-[10px] tracking-widest' : ''}`}
            >
                {isViewCursor && 'VIEW'}
            </div>

            {/* --- Unicorn / Aura Background --- */}
            <div className="aura-background-component inset-0 pointer-events-none z-0 fixed" data-alpha-mask="80" style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)'
            }}>
                <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
                    <div data-us-project="FixNvEwvWwbu3QX9qC3F" className="absolute w-full h-full left-0 top-0 -z-10"></div>
                </div>
            </div>

            {/* --- Navigation --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-transform duration-300">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between glass rounded-full px-8 py-4 bg-white/5 backdrop-blur-md border border-white/5">
                    <a href="#" className="flex items-center gap-3 group hover-trigger" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <span className="font-display font-black tracking-tight text-2xl text-white uppercase">EARTHY MUNCHY</span>
                    </a>

                    <button
                        className="group relative overflow-hidden bg-transparent text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:text-black flex items-center gap-3 ring-1 ring-white/50 hover:ring-white hover:bg-white"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 A4.902 4.902 0 015.468 4.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                        <span className="relative z-10 font-bold uppercase tracking-wider">Instagram DM</span>
                    </button>
                </div>
            </nav>

            {/* --- Section 1: Hero --- */}
            <section className="min-h-screen flex flex-col overflow-hidden z-10 px-6 relative items-center justify-center pt-24 md:pt-0">
                {/* Creative Canvas Background */}
                <canvas ref={canvasRef} id="hero-canvas" className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"></canvas>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 z-0 pointer-events-none"></div>

                <div className="max-w-[1400px] mx-auto text-center relative z-10 w-full">
                    <div className="hero-label inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 md:mb-12 hover-trigger opacity-0 cursor-default" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-300">Wild by Origin</span>
                    </div>

                    <h1 className="font-display font-medium tracking-tighter text-white leading-[0.9] mb-8 md:mb-12 mix-blend-difference select-none">
                        {/* Fluid Typography using clamp */}
                        <span className="mask-text block overflow-hidden group">
                            <span className="block translate-y-[110%] text-[clamp(4rem,12vw,9rem)] transition-transform duration-700 ease-out group-hover:skew-x-2 origin-bottom">PURE</span>
                        </span>
                        <span className="mask-text block overflow-hidden group">
                            <span className="text-neutral-500 block translate-y-[110%] text-[clamp(4rem,12vw,9rem)] transition-transform duration-700 ease-out group-hover:skew-x-[-2deg] origin-bottom">AUTHENTIC</span>
                        </span>
                        <span className="mask-text block overflow-hidden group">
                            <span className="block translate-y-[110%] text-[clamp(4rem,12vw,9rem)] transition-transform duration-700 ease-out group-hover:skew-x-2 origin-bottom">ORIGINS</span>
                        </span>
                    </h1>

                    <div className="hero-stats flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mx-auto mt-8 md:mt-12 border-t border-white/10 pt-8 opacity-0 translate-y-4 px-4 md:px-0 gap-8 md:gap-0">
                        <p className="text-neutral-400 text-sm max-w-xs text-center md:text-left leading-relaxed">
                            We bring the finest wild-harvested ingredients directly from the source to your table.
                        </p>
                        <div className="flex gap-12 mt-2 md:mt-0">
                            <div className="text-center md:text-left">
                                <div className="text-2xl font-display font-bold">100%</div>
                                <div className="text-[10px] uppercase tracking-widest text-neutral-500">Natural</div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-2xl font-display font-bold">0%</div>
                                <div className="text-[10px] uppercase tracking-widest text-neutral-500">Additives</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Footer (Simplified) --- */}
            <footer className="relative overflow-hidden bg-[#050509] border-t border-white/5 pt-12 pb-12 z-10 mt-auto">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
                <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
                    <div className="text-[10px] sm:text-[12px] text-neutral-500 uppercase tracking-widest">
                        © 2024 Earthy Munchy. All Rights Reserved.
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default HeroOption2;

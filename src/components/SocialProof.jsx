import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './SocialProof.css';

const SocialProof = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.proof-card',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%"
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const reviews = [
        {
            quote: "The aroma is instantly transportive.",
            author: "Sarah J., London",
            detail: "C5 Cinnamon"
        },
        {
            quote: "Finally, honey that tastes wild.",
            author: "David K., Berlin",
            detail: "Sundarban Honey"
        },
        {
            quote: "Potency you can actually smell.",
            author: "Priya R., Mumbai",
            detail: "Grade 1 Cloves"
        }
    ];

    return (
        <section className="social-proof-section" ref={containerRef}>
            <div className="container">
                <div className="proof-grid">
                    {reviews.map((review, i) => (
                        <div key={i} className="proof-card">
                            <p className="proof-quote">“{review.quote}”</p>
                            <div className="proof-meta">
                                <span className="proof-author">{review.author}</span>
                                <span className="proof-detail">{review.detail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;

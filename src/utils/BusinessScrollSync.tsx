'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const contentData = [
    {
        title: "Integrated Project Delivery",
        description: "Jindal Projects operates through an integrated engineering and execution framework that aligns design, planning, procurement, and site delivery under a unified project structure. This model reduces interface risks, improves coordination, and strengthens execution control across complex industrial programs."
    },
    {
        title: "Data-Driven Planning",
        description: "Leveraging advanced analytics and 3D modeling to anticipate challenges, optimize schedules, and ensure flawless execution across all construction phases. We optimize resources to deliver on-time, every time."
    },
    {
        title: "Sustainable Construction",
        description: "We pioneer sustainable practices across our projects, intentionally minimizing environmental impact while maximizing resource efficiency. Through advanced technologies, we build lasting infrastructure that responsibly supports the ecosystems of tomorrow."
    },
    {
        title: "Infrastructure Engineering",
        description: "We conceptualize and build transformative civil infrastructure, ranging from high-capacity bridges to sprawling urban networks. Our robust engineering ensures longevity, safety, and seamless connectivity that empowers modern communities to thrive."
    },
    {
        title: "Rail Network Expansion",
        description: "Connecting nations with precision-engineered transit corridors, our railway initiatives redefine modern transport logistics. We deploy state-of-the-art surveying and track-laying methodologies to guarantee efficient, high-speed rail mobility with uncompromising structural integrity."
    }
];

const images = [
    'https://d2lptvt2jijg6f.cloudfront.net/document/137/1773490685_card-img.png',
    'https://d2lptvt2jijg6f.cloudfront.net/document/137/1773636377_builders-checking-blueprints-site1.png',
    'https://d2lptvt2jijg6f.cloudfront.net/document/137/1773480063_Rectangle661.webp',
    'https://d2lptvt2jijg6f.cloudfront.net/document/137/1773480043_Rectangle663.webp/images/bridge.png',
    'https://d2lptvt2jijg6f.cloudfront.net/document/137/1773475496_Screenshot641.webp'
];

export default function BusinessScrollSync() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !sliderRef.current) return;

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.business-scroll-card');

            const getTranslateX = () => {
                if (!sliderRef.current || !sectionRef.current) return 0;

                const trackWidth = sliderRef.current.scrollWidth;
                const containerWidth = window.innerWidth;

                // Keep the offset multiplier in sync with CSS media queries (8vw desktop, 6vw tablet, 5vw mobile)
                let offsetPercentage = 0.08;
                if (window.innerWidth <= 767) offsetPercentage = 0.05;
                else if (window.innerWidth <= 991) offsetPercentage = 0.06;

                const leftOffset = window.innerWidth * offsetPercentage;

                // We want to translate exactly enough so the last image sits on the right side
                // leaving a matching margin on the right, with NO extra white space.
                const maxTranslate = trackWidth - containerWidth + (leftOffset * 2);
                return maxTranslate;
            };

            gsap.to(sliderRef.current, {
                x: () => -getTranslateX(),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${sections.length * window.innerHeight * 1.5}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const index = Math.round(self.progress * (sections.length - 1));
                        const safeIndex = Math.max(0, Math.min(index, sections.length - 1));
                        setActiveIndex(safeIndex);
                    }
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="commonSection bg-white relative overflow-hidden timeline-section pt-0">
            <div className="container cus-container pt-5 mt-4">
                {/* TOP HALF: SPLIT TEXT (Left Title, Right Description) */}
                <div className="row mb-3 pb-2">
                    <div className="col-12">
                        <div className="c-content-20 clr-text mb-4 ls-1-2 text-uppercase ft_medium">
                            HOW WE OPERATE
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="text-flip-container title-flip-wrapper">
                            {contentData.map((data, idx) => {
                                let className = 'text-flip-item';
                                const isActive = (idx === activeIndex);
                                if (isActive) className += ' active';
                                else if (idx < activeIndex) className += ' previous';

                                return (
                                    <div key={`title-${idx}`} className={className}>
                                        <div className="text-flip-content-y">
                                            <h2 className="c-heading-60 slide-title lh_1-2 ft_medium m-0">
                                                {data.title.split(' ').map((word, wIdx) => {
                                                    const delay = 0.1 + (wIdx * 0.15);
                                                    return (
                                                        <span
                                                            key={wIdx}
                                                            className="stagger-word"
                                                            style={{ transitionDelay: isActive ? `${delay}s` : '0s' }}
                                                        >
                                                            {word}{' '}
                                                        </span>
                                                    );
                                                })}
                                            </h2>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 d-flex align-items-start">
                        <div className="text-flip-container desc-flip-wrapper">
                            {contentData.map((data, idx) => {
                                let className = 'text-flip-item';
                                const isActive = (idx === activeIndex);
                                if (isActive) className += ' active';
                                else if (idx < activeIndex) className += ' previous';

                                // Safely split paragraph into sequences separated by punctuation
                                const sentences = data.description.match(/[^.!?]+[.!?]+/g) || [data.description];

                                return (
                                    <div key={`desc-${idx}`} className={className}>
                                        <div className="text-flip-content-y">
                                            <p className="c-content-24 clr-text lh_1-6 ft_light m-0 slide-desc">
                                                {sentences.map((sentence, sIdx) => {
                                                    const delay = 0.1 + (sIdx * 0.25);
                                                    return (
                                                        <span
                                                            key={sIdx}
                                                            className="stagger-sentence"
                                                            style={{ transitionDelay: isActive ? `${delay}s` : '0s' }}
                                                        >
                                                            {sentence}{' '}
                                                        </span>
                                                    );
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM HALF: CARD TRACK (Not Full Viewport) */}
            <div className="slider-outer-wrapper">
                <div ref={sliderRef} className="slider-inner-track">
                    {images.map((src, i) => (
                        <div key={i} className="business-scroll-card">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={src}
                                alt={`Business Operation ${i + 1}`}
                                className="business-scroll-image"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

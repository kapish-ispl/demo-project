'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SlideProps {
    title?: string;
    children?: React.ReactNode;
    count?: string;
    imgsrc?: string;
}
export default function BusinessScrollSync({ data, props }: any) {

    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);


    const slides = useMemo(() => {
        if (!data) return [];

        return React.Children.toArray(data)
            .filter(
                (child): child is React.ReactElement<SlideProps> =>
                    React.isValidElement(child) &&
                    typeof (child.props) !== "undefined"
            )
            .map((child) => ({
                imgsrc: child.props.imgsrc || "",
                title: child.props.title || "",
                description: child.props.children || "",
                count: child.props.count || "",
            }));
    }, [data]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !sliderRef.current) return;

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.business-scroll-card');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${slides.length * window.innerHeight * 1.5}`, // Adjusted scroll distance multiplier
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const index = Math.round(self.progress * (slides.length - 1));
                        const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
                        setActiveIndex(safeIndex);
                    }
                }
            });

            if (sections.length > 0) {
                // We create a transition for each image to reach the left margin
                for (let i = 1; i <= sections.length; i++) {
                    tl.to(sliderRef.current, {
                        x: () => {
                            if (!sliderRef.current || !sectionRef.current) return 0;
                            const firstCard = sections[0] as HTMLElement;
                            const cardWidth = firstCard.offsetWidth;

                            let gap = 30;
                            if (window.innerWidth <= 767) gap = 15;
                            else if (window.innerWidth <= 991) gap = 20;

                            let offsetPercentage = 0.08;
                            if (window.innerWidth <= 767) offsetPercentage = 0.05;
                            else if (window.innerWidth <= 991) offsetPercentage = 0.06;

                            const leftOffset = window.innerWidth * offsetPercentage;
                            // First item starts at 50vw (half width). The extra distance to scroll is 50vw - leftOffset.
                            const startOffset = (window.innerWidth * 0.5) - leftOffset;

                            return -(startOffset + (i - 1) * (cardWidth + gap));
                        },
                        ease: "none"
                    });
                }
            }

        }, sectionRef);

        return () => ctx.revert();
    }, [slides]);

    return (
        <section ref={sectionRef} className="commonSection bg-white relative overflow-hidden timeline-section p-0">
            <div className="container cus-container pt-5 mt-4">
                {/* TOP HALF: SPLIT TEXT (Left Title, Right Description) */}
                <div className="row mb-3 pb-2">
                    <div className="col-12">
                        <div className="c-content-20 clr-text mb-4 ls-1-2 text-uppercase ft_medium">
                            {props?.subtitle}
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="text-flip-container title-flip-wrapper">
                            {slides.map((data, idx) => {
                                let className = 'text-flip-item';
                                const isActive = (idx === activeIndex);
                                if (isActive) className += ' active';
                                else if (idx < activeIndex) className += ' previous';

                                return (
                                    <div key={`title-${idx}`} className={className}>
                                        <div className="text-flip-content-y">
                                            <h2 className="c-heading-60 slide-title lh_1-2 ft_medium m-0 slide-title-wrapper">
                                                {data.count && (
                                                    <span className="slide-count-label clr-peach stagger-word c-content-32"
                                                        style={{ transitionDelay: isActive ? '0.05s' : '0s' }}
                                                    >
                                                        {String(data.count).padStart(2, '0')}
                                                    </span>
                                                )}
                                                {data.title.split(' ').map((word, wIdx) => {
                                                    const delay = 0.15 + (wIdx * 0.15);
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
                            {slides.map((data, idx) => {
                                let className = 'text-flip-item';
                                const isActive = (idx === activeIndex);
                                if (isActive) className += ' active';
                                else if (idx < activeIndex) className += ' previous';

                                // Safely split paragraph into sequences separated by punctuation
                                const sentences = [data.description];

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
                    {slides.map((item, i) => (
                        item.imgsrc ? (
                            <div key={i} className="business-scroll-card">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.imgsrc}
                                    alt={`Business Operation ${i + 1}`}
                                    className="business-scroll-image"
                                />
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </section>
    );
}

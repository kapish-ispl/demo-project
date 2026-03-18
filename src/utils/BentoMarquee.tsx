"use client";

import React, { Fragment, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const BentoMarquee = ({ data, duration = 20 }: { data: React.ReactNode[], duration?: number }) => {
    const container = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<gsap.core.Tween | null>(null);

    const bentoItems = useMemo(() => {
        return React.Children.toArray(data).map((child, index) => ({
            id: index,
            element: child
        }));
    }, [data]);

    useGSAP(() => {
        if (!scrollRef.current) return;

        // Force a refresh of the layout before calculating
        const totalWidth = scrollRef.current.offsetWidth;

        timeline.current = gsap.to(scrollRef.current, {
            // We use x: -totalWidth / 2 for absolute precision
            x: -(scrollRef.current.scrollWidth / 2),
            repeat: -1,
            duration: duration,
            ease: "none",
            onRepeat: () => {
                // Optional: ensure it snaps perfectly on repeat
                gsap.set(scrollRef.current, { x: 0 });
            }
        });
    }, { scope: container, dependencies: [bentoItems] });

    return (
        <div
            className="marquee-wrapper"
            ref={container}
            onMouseEnter={() => timeline.current?.pause()}
            onMouseLeave={() => timeline.current?.play()}
        >
            <div className="marquee-content" ref={scrollRef}>
                {/* SET 1 */}
                {bentoItems.map((item, i) => (
                    <Fragment key={`a-${i}`}>
                        {item.element}
                    </Fragment>
                ))}
                {/* SET 2 (The exact clone) */}
                {bentoItems.map((item, i) => (
                    <Fragment key={`b-${i}`}>
                        {item.element}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
export default BentoMarquee;
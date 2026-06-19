'use client'

import React, { useMemo, useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface DotPosition {
    /** initial left offset from section left, in px */
    left: number
    threshold: number
}

const TimeLineSection = ({
    data,
    showScrollbar = true,
    customcls = '',
    removeGrayscaleOnActive = 'false',
    props
}: {
    data: any
    showScrollbar?: boolean | string
    customcls?: string
    removeGrayscaleOnActive?: boolean | string
    props: any
}) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const [dotPositions, setDotPositions] = useState<DotPosition[]>([])

    // Refs for the rendered dot DOM elements and their initial left values
    const dotElementsRef = useRef<(HTMLDivElement | null)[]>([])
    const dotInitialLefts = useRef<number[]>([])

    const isScrollbarVisible = showScrollbar === true || showScrollbar === 'true'

    const slides = useMemo(() => {
        if (!data) return []
        return React.Children.toArray(data)
            .filter(
                (child): child is React.ReactElement<any> =>
                    React.isValidElement(child) && typeof child.props !== 'undefined'
            )
            .map((child, index) => ({
                id: index + 1,
                className: child.props.className,
                children: child.props.children,
            }))
    }, [data])

    const computeDotPositions = useCallback(() => {
        const section = sectionRef.current
        const timeline = timelineRef.current
        if (!section || !timeline) return

        const items = gsap.utils.toArray<HTMLElement>('.c-timeline__item', timeline)
        const total = items.length
        const sectionLeft = section.getBoundingClientRect().left

        const positions: DotPosition[] = items.map((item, i) => {
            const rect = item.getBoundingClientRect()
            const left = rect.left + rect.width / 2 - sectionLeft
            const threshold = total > 1 ? Math.min(0.99, i / (total - 1)) : 0
            return { left, threshold }
        })

        dotInitialLefts.current = positions.map(p => p.left)
        setDotPositions(positions)
    }, [])

    const shouldRemoveGrayscale = removeGrayscaleOnActive === true || removeGrayscaleOnActive === 'true';

    useGSAP(() => {
        const section = sectionRef.current
        const timeline = timelineRef.current
        const progressBar = progressBarRef.current
        if (!section || !timeline) return

        const items = gsap.utils.toArray<HTMLElement>('.c-timeline__item', timeline)
        const oddItems = items.filter((_, i) => i % 2 === 0)
        const evenItems = items.filter((_, i) => i % 2 !== 0)

        // Measure initial positions before any GSAP transform is applied
        computeDotPositions()

        const getScrollAmount = () => -(timeline.scrollWidth - window.innerWidth + 200)

        const updateActiveSlide = (progress: number) => {
            if (!shouldRemoveGrayscale) return
            const total = items.length
            if (total === 0) return

            items.forEach((item, idx) => {
                const threshold = total > 1 ? Math.min(0.99, idx / (total - 1)) : 0
                if (progress >= threshold) {
                    item.classList.add('is-active')
                } else {
                    item.classList.remove('is-active')
                }
            })
        }

        // Initialize active slide class
        updateActiveSlide(0)

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'center center',
                end: () => `+=${timeline.scrollWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                pinSpacing: true,
                invalidateOnRefresh: true,
                onRefresh: (self) => {
                    // Re-measure card positions after layout recalculates
                    computeDotPositions()
                    updateActiveSlide(self.progress)
                },
                onUpdate: (self) => {
                    section.style.setProperty('--scroll-progress', self.progress.toString())

                    // Slide each dot left in sync with the timeline pan
                    const shift = self.progress * Math.abs(getScrollAmount())
                    dotElementsRef.current.forEach((el, i) => {
                        if (!el) return
                        el.style.left = `${dotInitialLefts.current[i] - shift}px`
                    })

                    updateActiveSlide(self.progress)
                },
            },
        })

        // 1. Horizontal pan
        tl.to(timeline, { x: getScrollAmount, ease: 'none' }, 0)

        // 2. Odd cards float up, even cards float down — dots are NOT in this list
        tl.to(oddItems, { y: -100, ease: 'none' }, 0)
        tl.to(evenItems, { y: 100, ease: 'none' }, 0)

        // 3. Progress bar fill
        if (progressBar) {
            tl.to(progressBar, { width: '100%', ease: 'none' }, 0)
        }
    }, { scope: sectionRef, dependencies: [shouldRemoveGrayscale] })

    return (
        <>
            {props?.title && props?.subtitle && (
                <div className={`commonSection-lg pb-0 ${customcls}`}>
                    <div className="container cus-container">
                        <div className="row">
                            <div className="col-12 col-lg-9">
                                {props.title && (
                                    <div className="hw mb-40">
                                        <h1 className="c-heading-60 ft_medium lh_1-2 clr-blue">{props?.title}</h1>
                                    </div>
                                )}
                                {props.subtitle && (
                                    <div className="genric__content">
                                        <p className="c-content-20 ft_light lh_1-6 clr-gray mb-0">{props?.subtitle}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div
                className={`${props?.title && props?.subtitle ? 'pt-80' : 'commonSection-lg'} timeLine__wrapper overflow-hidden pb-0 ${customcls}`}
                ref={sectionRef}
            >
                <div className="container cus-container">
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="c-timeline"
                                ref={timelineRef}
                                style={{ flexWrap: 'nowrap', width: 'max-content', paddingRight: '20vw' }}
                            >
                                {slides.map((slide) => (
                                    <div key={slide.id} className={slide.className}>
                                        {slide.children}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress bar — dots are pinned to the line, slide on X only */}
                {isScrollbarVisible && (
                    <div className="timeline-scrollbar-wrapper">
                        <div className="timeline-track-bg">
                            <div ref={progressBarRef} className="timeline-progress-fill" />

                            {dotPositions.map((dot, i) => (
                                <div
                                    key={i}
                                    ref={el => { dotElementsRef.current[i] = el }}
                                    className="timeline-dot-anchor"
                                    style={{
                                        left: dot.left,
                                        '--threshold': dot.threshold,
                                    } as React.CSSProperties}
                                >
                                    <div className="timeline-dot-inner" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default TimeLineSection

'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TimeLineSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const section = sectionRef.current
        const timeline = timelineRef.current
        if (!section || !timeline) return

        const items = gsap.utils.toArray<HTMLElement>('.c-timeline__item', timeline)
        const images = gsap.utils.toArray<HTMLElement>('.c-timeline__item-img img', timeline)

        // Separate odd (1st, 3rd, …) and even (2nd, 4th, …) items
        const oddItems = items.filter((_, i) => i % 2 === 0)   // index 0, 2, 4 → odd cards
        const evenItems = items.filter((_, i) => i % 2 !== 0)  // index 1, 3, 5 → even cards

        // Calculate how far to scroll horizontally
        const getScrollAmount = () => {
            const timelineWidth = timeline.scrollWidth
            const windowWidth = window.innerWidth
            // Adding a little extra padding at the end for visual breathing room
            return -(timelineWidth - windowWidth + 200)
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                // scroll duration tied to how long the horizontal content is
                end: () => `+=${timeline.scrollWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true, // recalculate on resize
            }
        })

        // 1. Horizontal scroll
        tl.to(timeline, {
            x: getScrollAmount,
            ease: "none"
        }, 0)

        // 2. Odd cards move UPWARD
        tl.to(oddItems, {
            y: -100,
            ease: "none"
        }, 0)

        // 3. Even cards move DOWNWARD
        tl.to(evenItems, {
            y: 100,
            ease: "none"
        }, 0)

        // 4. Parallax images
        tl.fromTo(images,
            { y: -30 },
            { y: 30, ease: "none" },
            0)

    }, { scope: sectionRef })


    return (
        <>
            <div className="commonSection-lg" ref={sectionRef}>
                <div className="container cus-container me-0">
                    <div className="row">
                        <div className="col-12">
                            <div className="c-timeline" ref={timelineRef} style={{ flexWrap: 'nowrap', width: 'max-content', paddingRight: '20vw' }}>
                                <div className="c-timeline__item" style={{ flex: '0 0 auto' }}>
                                    <div className="c-timeline__item-text">
                                        <div className="c-heading-48 lh_1-1 clr-peach ft_regular mb-1">2023</div>
                                        <div className="c-content-24 lh_1-2 clr-gray ft_medium mb-1">Entry into Construction Projects</div>
                                        <div className="c-content-20 clr-gray ft_light lh_1-6">Strategic entry into construction projects with successful completion of multiple infrastructure assignments across locations.</div>
                                    </div>
                                    <div className="c-timeline__item-img" style={{ overflow: 'hidden' }}>
                                        <img src="https://d2lptvt2jijg6f.cloudfront.net/document/137/1773481247_construction-tall-concrete-pylon-bridge-using-tower-crane2.png" className="img-fluid u-img" alt="timelime images" style={{ height: '120%', objectFit: 'cover' }} />
                                    </div>
                                </div>
                                <div className="c-timeline__item" style={{ flex: '0 0 auto' }}>
                                    <div className="c-timeline__item-img" style={{ overflow: 'hidden' }}>
                                        <img src="https://d2lptvt2jijg6f.cloudfront.net/document/137/1773481247_construction-tall-concrete-pylon-bridge-using-tower-crane2.png" className="img-fluid u-img" alt="timelime images" style={{ height: '120%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="c-timeline__item-text">
                                        <div className="c-heading-48 lh_1-1 clr-peach ft_regular mb-1">2023</div>
                                        <div className="c-content-24 lh_1-2 clr-gray ft_medium mb-1">Entry into Construction Projects</div>
                                        <div className="c-content-20 clr-gray ft_light lh_1-6">Strategic entry into construction projects with successful completion of multiple infrastructure assignments across locations.</div>
                                    </div>
                                </div>
                                <div className="c-timeline__item" style={{ flex: '0 0 auto' }}>
                                    <div className="c-timeline__item-text">
                                        <div className="c-heading-48 lh_1-1 clr-peach ft_regular mb-1">2023</div>
                                        <div className="c-content-24 lh_1-2 clr-gray ft_medium mb-1">Entry into Construction Projects</div>
                                        <div className="c-content-20 clr-gray ft_light lh_1-6">Strategic entry into construction projects with successful completion of multiple infrastructure assignments across locations.</div>
                                    </div>
                                    <div className="c-timeline__item-img" style={{ overflow: 'hidden' }}>
                                        <img src="https://d2lptvt2jijg6f.cloudfront.net/document/137/1773481247_construction-tall-concrete-pylon-bridge-using-tower-crane2.png" className="img-fluid u-img" alt="timelime images" style={{ height: '120%', objectFit: 'cover' }} />
                                    </div>
                                </div>
                                <div className="c-timeline__item" style={{ flex: '0 0 auto' }}>
                                    <div className="c-timeline__item-text">
                                        <div className="c-heading-48 lh_1-1 clr-peach ft_regular mb-1">2023</div>
                                        <div className="c-content-24 lh_1-2 clr-gray ft_medium mb-1">Entry into Construction Projects</div>
                                        <div className="c-content-20 clr-gray ft_light lh_1-6">Strategic entry into construction projects with successful completion of multiple infrastructure assignments across locations.</div>
                                    </div>
                                    <div className="c-timeline__item-img" style={{ overflow: 'hidden' }}>
                                        <img src="https://d2lptvt2jijg6f.cloudfront.net/document/137/1773481247_construction-tall-concrete-pylon-bridge-using-tower-crane2.png" className="img-fluid u-img" alt="timelime images" style={{ height: '120%', objectFit: 'cover' }} />
                                    </div>
                                </div>
                                <div className="c-timeline__item" style={{ flex: '0 0 auto' }}>
                                    <div className="c-timeline__item-text">
                                        <div className="c-heading-48 lh_1-1 clr-peach ft_regular mb-1">2023</div>
                                        <div className="c-content-24 lh_1-2 clr-gray ft_medium mb-1">Entry into Construction Projects</div>
                                        <div className="c-content-20 clr-gray ft_light lh_1-6">Strategic entry into construction projects with successful completion of multiple infrastructure assignments across locations.</div>
                                    </div>
                                    <div className="c-timeline__item-img" style={{ overflow: 'hidden' }}>
                                        <img src="https://d2lptvt2jijg6f.cloudfront.net/document/137/1773481247_construction-tall-concrete-pylon-bridge-using-tower-crane2.png" className="img-fluid u-img" alt="timelime images" style={{ height: '120%', objectFit: 'cover' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimeLineSection

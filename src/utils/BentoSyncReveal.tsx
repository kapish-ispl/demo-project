import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useDeviceType } from '@/hooks/useDeviceType';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SlideItem {
    id: number;
    mainImg: string;
    title: string;
    desc: string | React.ReactNode;
    gallery: string[];
}

interface BentoSyncRevealProps {
    data: React.ReactNode;
    props: {
        sectitle?: string;
        secdesc?: string;
        [key: string]: any;
    };
}

const BentoSyncReveal = ({ data, props }: BentoSyncRevealProps) => {
    const SLIDE_DATA = useMemo<SlideItem[]>(() => {
        if (!data || React.Children.count(data) === 0) return [];

        const parsed = React.Children.toArray(data)
            .filter(
                (child): child is React.ReactElement<any> =>
                    React.isValidElement(child) && typeof child.props !== 'undefined'
            )
            .map((child, index) => {
                const { mainimg, mainImg, title, desc, description, gallery, galleryitems } = child.props;

                const slideDesc = desc || description || child.props.children || '';

                let galleryArray: string[] = [];
                if (Array.isArray(gallery)) {
                    galleryArray = gallery;
                } else if (typeof gallery === 'string') {
                    galleryArray = gallery.split(',').map((url: string) => url.trim());
                } else if (typeof galleryitems === 'string') {
                    galleryArray = galleryitems.split(',').map((url: string) => url.trim());
                }

                return {
                    id: index + 1,
                    mainImg: mainimg || mainImg || '',
                    title: title || '',
                    desc: slideDesc,
                    gallery: galleryArray,
                };
            });

        return parsed.length > 0 ? parsed : [];
    }, [data]);

    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: `+=${SLIDE_DATA.length * 100}%`, // Scroll length
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
                refreshPriority: 0,

            }
        });

        const slides = gsap.utils.toArray<HTMLElement>(".slide-wrapper");

        slides.forEach((slide, index) => {
            // We only peel the slides that are on top of others
            if (index < slides.length - 1) {
                const items = slide.querySelectorAll(".grid-item:not(.stat-box)");
                const currentTexts = slide.querySelectorAll(".reveal-text");

                // Sync 1: All grid items peel together
                tl.to(items, {
                    clipPath: 'inset(0% 100% 0% 0%)',
                    duration: 1,
                    stagger: 0, // Set to 0 to ensure they move in perfect sync
                    ease: 'none'
                }, index); // Using the index as a position parameter to sequence slides

                // Sync 2: Text fades/slides out at the same time
                tl.to(currentTexts, {
                    x: -50,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'none'
                }, index);
            }
        });

    }, { scope: container });

    const device = useDeviceType();

    return (
        <>
            <div className="commonSection-md v2 d-none d-lg-block" ref={container}>
                <div className="container cus-container">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <div className="hw mb-40">
                                <div className="c-heading-60 ft_regular clr-gray lh_1-1 mb-40">{props.sectitle}</div>
                                <p className="c-content-24 ft_light lh_1-6 clr-gray">{props.secdesc}</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bento-comparator" >
                                {SLIDE_DATA.map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        className={`slide-wrapper slide-${index}`}
                                        style={{ zIndex: SLIDE_DATA.length - index }}
                                    >
                                        <div className="bento-grid">
                                            {/* LARGE FEATURE */}
                                            <div className="grid-item feature" style={{ backgroundImage: `url(${slide.mainImg})` }}>
                                                <div className="overlay">
                                                    <h3 className="reveal-text">{slide.title}</h3>
                                                    <p className="reveal-text">{slide.desc}</p>
                                                </div>
                                            </div>

                                            {/* STAT BOX */}
                                            <div className="grid-item stat-box">
                                                <div className="stat-content">
                                                    <div className="stat-icon-wrap">
                                                        <img src="/images/icons/labour-icon.svg" alt="stat icon" className="img-fluid" />
                                                    </div>
                                                    <h4>11 Million</h4>
                                                    <p>Safe Man-hours Achieved</p>
                                                </div>
                                            </div>

                                            {
                                                device === "desktop" && (
                                                    <>
                                                        {/* GALLERY ITEMS */}
                                                        {slide.gallery.map((img, i) => (
                                                            <div
                                                                key={i}
                                                                className={`grid-item thumb thumb-${i}`}
                                                                style={{ backgroundImage: `url(${img})` }}
                                                            />
                                                        ))}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BentoSyncReveal;
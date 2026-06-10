"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import parse from 'html-react-parser';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import { AppContext } from '@/context/AppContext';
import Link from 'next/link';

interface BannerMedia {
    type: string;
    cdnPath: string;
    caption?: string;
}

interface PageData {
    title: string;
    slug: string;
    featuredMedia: {
        cdnPath: string;
        type: string;
    };
}

const HeroSlider: React.FC<{ slides: BannerMedia[] }> = ({ slides }) => {
    const staticBackground = slides[0];
    const { allPageData, headerMenu } = useContext(AppContext);
    const [filterData, setFilterData] = useState<PageData[]>([]);

    // useEffect (not useMemo) for side effects that call setState
    useEffect(() => {
        const headerNames = headerMenu.map(header => header.name);
        const filtered = allPageData.filter(page => headerNames.includes(page.title)) as PageData[];
        setFilterData(filtered);
    }, [allPageData, headerMenu]);

    // useRef to give Swiper actual DOM elements instead of CSS class strings
    const prevRef = useRef<HTMLSpanElement>(null);
    const nextRef = useRef<HTMLSpanElement>(null);

    // Track swiper state to disable arrows at boundaries (non-loop mode)
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const isLooping = filterData.length >= 5;
    const isPrevDisabled = !isLooping && (swiperInstance?.isBeginning ?? true);
    const isNextDisabled = !isLooping && (swiperInstance?.isEnd ?? false);

    const arrowStyle = (disabled: boolean): React.CSSProperties => ({
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        transition: 'opacity 0.3s ease',
    });

    return (
        <div className="hero-slider">

            {/* --- STATIC BACKGROUND --- */}
            <div className="hero-slider__static-bg">
                {staticBackground.type === 'video' ? (
                    <video src={staticBackground.cdnPath} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <img src={staticBackground.cdnPath} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
            </div>
            <div className="container cus-container">
                <div className="row">
                    <div className="col-12">
                        <div className="hero-slider__content c-heading-80 ft_semiBold text-uppar lh_1-1 clr-white">{parse(staticBackground.caption || "")}</div>

                    </div>
                </div>
            </div>

            {/* --- THUMBNAIL UI (Aligned to Right) --- */}
            <div className="hero-slider__ui-right" style={{
                position: 'absolute',
                right: '2%',
                bottom: '10%',
                width: '25%',
                zIndex: 10
            }}>
                {/* --- NAVIGATION & COUNTER --- */}
                <div className="slider-controls" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginBottom: '20px',
                    gap: '20px'
                }}>
                    {/* Navigation Arrows */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <span
                            ref={prevRef}
                            className="custom-prev"
                            style={arrowStyle(isPrevDisabled)}
                        >
                            <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.167857 9.54646C-0.0535717 9.32504 -0.0535717 8.96075 0.167857 8.73932L6.45357 2.45361C6.675 2.23218 7.03929 2.23218 7.26071 2.45361C7.48214 2.67504 7.48214 3.03932 7.26071 3.26075L1.95 8.57146H15.4286C15.7429 8.57146 16 8.82861 16 9.14289C16 9.45718 15.7429 9.71432 15.4286 9.71432H1.95L7.26071 15.025C7.48214 15.2465 7.48214 15.6108 7.26071 15.8322C7.03929 16.0536 6.675 16.0536 6.45357 15.8322L0.167857 9.54646Z" fill="white" />
                            </svg>
                        </span>
                        <span
                            ref={nextRef}
                            className="custom-next"
                            style={arrowStyle(isNextDisabled)}
                        >
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8321 7.25893C16.0536 7.0375 16.0536 6.67321 15.8321 6.45179L9.54643 0.166071C9.325 -0.0553571 8.96071 -0.0553571 8.73929 0.166071C8.51786 0.3875 8.51786 0.751786 8.73929 0.973214L14.05 6.28393H0.571429C0.257143 6.28393 0 6.54107 0 6.85536C0 7.16964 0.257143 7.42678 0.571429 7.42678H14.05L8.73929 12.7375C8.51786 12.9589 8.51786 13.3232 8.73929 13.5446C8.96071 13.7661 9.325 13.7661 9.54643 13.5446L15.8321 7.25893Z" fill="white" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* THUMBNAIL SLIDER */}
                <Swiper
                    modules={[Navigation]}
                    speed={1000}
                    spaceBetween={20}
                    slidesPerView={2}
                    // loop requires at least (slidesPerView * 2 + 1) = 5 slides
                    loop={filterData.length >= 5}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        if (typeof swiper.params.navigation === 'object') {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }
                    }}
                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                    onSlideChange={(swiper) => setSwiperInstance({ ...swiper })}
                    className="thumb-swiper"
                >
                    {filterData.length > 0 && filterData.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <Link href={`/${slide.slug}`}>
                                <div className="thumb-card">
                                    {slide.featuredMedia.type === 'video' ? (
                                        <video src={slide.featuredMedia.cdnPath} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <img src={slide.featuredMedia.cdnPath} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    )}
                                    <div className='thumb-card-title'>
                                        {slide.title}
                                    </div>
                                    <div className='thumb-card-link-icon'>
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.8321 7.25893C16.0536 7.0375 16.0536 6.67321 15.8321 6.45179L9.54643 0.166071C9.325 -0.0553571 8.96071 -0.0553571 8.73929 0.166071C8.51786 0.3875 8.51786 0.751786 8.73929 0.973214L14.05 6.28393H0.571429C0.257143 6.28393 0 6.54107 0 6.85536C0 7.16964 0.257143 7.42678 0.571429 7.42678H14.05L8.73929 12.7375C8.51786 12.9589 8.51786 13.3232 8.73929 13.5446C8.96071 13.7661 9.325 13.7661 9.54643 13.5446L15.8321 7.25893Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className='thumb-card-overly'></div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HeroSlider;

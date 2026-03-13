"use client";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';

interface BannerMedia {
    type: string;
    cdnPath: string;
    caption?: string;
}

const HeroSlider: React.FC<{ slides: BannerMedia[] }> = ({ slides }) => {
    const staticBackground = slides[0];

    return (
        <div className="hero-slider">

            {/* --- STATIC BACKGROUND --- */}
            <div className="hero-slider__static-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {staticBackground.type === 'video' ? (
                    <video src={staticBackground.cdnPath} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                ) : (
                    <img src={staticBackground.cdnPath} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                )}
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
                            className="custom-prev cursor-pointer"
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.167857 9.54646C-0.0535717 9.32504 -0.0535717 8.96075 0.167857 8.73932L6.45357 2.45361C6.675 2.23218 7.03929 2.23218 7.26071 2.45361C7.48214 2.67504 7.48214 3.03932 7.26071 3.26075L1.95 8.57146H15.4286C15.7429 8.57146 16 8.82861 16 9.14289C16 9.45718 15.7429 9.71432 15.4286 9.71432H1.95L7.26071 15.025C7.48214 15.2465 7.48214 15.6108 7.26071 15.8322C7.03929 16.0536 6.675 16.0536 6.45357 15.8322L0.167857 9.54646Z" fill="white" />
                            </svg>
                        </span>
                        <span
                            className="custom-next cursor-pointer"
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                    effect="creative"
                    speed={1000}
                    spaceBetween={20}
                    loop={true}
                    slidesPerView={2}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    className="thumb-swiper"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="thumb-card" style={{
                                borderRadius: '5px',
                                overflow: 'hidden',
                                aspectRatio: '218/148',
                            }}>
                                {slide.type === 'video' ? (
                                    <video src={slide.cdnPath} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <img src={slide.cdnPath} alt={slide.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '20px',
                                    color: '#fff',
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    zIndex: 2
                                }}>
                                    {slide.caption}
                                </div>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)' }}></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HeroSlider;

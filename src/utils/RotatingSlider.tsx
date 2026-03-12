import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, EffectCreative, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/effect-creative';

const RotatingSlider = () => {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.realIndex + 1);
    };
    const slidesData = [
        {
            id: 1,
            img: "https://picsum.photos/325/185?random=1",
            title: "Engineering Design",
            description:
                "Our integrated engineering teams align design with site realities to reduce risk and improve constructability.",
        },
        {
            id: 2,
            img: "https://picsum.photos/325/185?random=2",
            title: "Engineering Design",
            description:
                "Our integrated engineering teams align design with site realities to reduce risk and improve constructability.",
        },
        {
            id: 3,
            img: "https://picsum.photos/325/185?random=3",
            title: "Engineering Design",
            description:
                "Our integrated engineering teams align design with site realities to reduce risk and improve constructability.",
        },
        {
            id: 4,
            img: "https://picsum.photos/325/185?random=4",
            title: "Engineering Design",
            description:
                "Our integrated engineering teams align design with site realities to reduce risk and improve constructability.",
        },
        {
            id: 5,
            img: "https://picsum.photos/325/185?random=5",
            title: "Engineering Design",
            description:
                "Our integrated engineering teams align design with site realities to reduce risk and improve constructability.",
        },
    ];
    return (
        <>
            <div className='commonSection-lg c-twoColumnContainer bg-tertiary c-tabWrapper'>
                <div className='container cus-container'>
                    <div className="row">
                        <div className="col-12">
                            <div className="c-content-20 ft_bold clr-gray text-uppar lh_1-4">What We Do</div>
                            <div className="c-heading-60 ft_medium clr-blue lh_1-1">From Engineering to Execution</div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="c-content-20 clr-gray lh_1-6 ft_regular">At Jindal Panther Cement, people are at the heart of our workplace. We foster a respectful &amp; inclusive environment where everyone feels valued, heard &amp; encouraged to grow with the organisation.</div>

                            <div className="nav-buttons">
                                <button className="left-btn"><span><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.29395 11.6474L3.29372 6.64717L8.29395 1.64694L6.647 0L-0.000163078 6.64717L6.647 13.2943L8.29395 11.6474Z" fill="#636466" />
                                </svg>
                                </span></button>
                                <button className="right-btn"><span>
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 1.64704L5.00023 6.64727L0 11.6475L1.64694 13.2944L8.29411 6.64727L1.64694 9.63211e-05L0 1.64704Z" fill="#636466" />
                                    </svg>

                                </span></button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8">
                            <Swiper
                                modules={[EffectCreative, Navigation]}
                                effect={'creative'}
                                slidesPerView={1.2}
                                speed={600}
                                watchSlidesProgress={true}
                                grabCursor={true}
                                centeredSlides={false}
                                navigation={{
                                    nextEl: '.right-btn',
                                    prevEl: '.left-btn',
                                }}
                                loop={true}
                                creativeEffect={{
                                    limitProgress: 3,
                                    perspective: true,
                                    prev: {
                                        translate: ['-5%', 0, -500],
                                        opacity: 0,
                                        scale: 0.9,
                                    },
                                    next: {
                                        translate: ['100%', 0, 0],
                                    },
                                }}
                                breakpoints={{
                                    768: { slidesPerView: 2.2 },
                                    1024: { slidesPerView: 2.5 },
                                    1600: { slidesPerView: 2.1 },
                                }}
                                style={{ overflow: 'visible' }}
                            >
                                {slidesData.map((slide) => (
                                    <SwiperSlide key={slide.id} style={{ transitionTimingFunction: "ease-out" }}>
                                        <div className="card border-0 bg-white p-3 rounded-4 shadow-sm" style={{ marginInlineEnd: "20px" }}>
                                            <img src={slide.img} className="card-img-top rounded-4 mb-3" alt={slide.title} />
                                            <div className="card-body p-0">
                                                <h5 className="card-title fw-semibold text-secondary mb-3">{slide.title}</h5>
                                                <p className="card-text text-muted">{slide.description}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default RotatingSlider
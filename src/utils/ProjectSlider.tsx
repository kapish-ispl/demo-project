import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const slideData = [
    {
        id: "dublin",
        name: "Angul, India",
        location: "Execution of stacker-reclaimer systems within an operating integrated steel plant environment.",
        quote: "RMHS – Stacker Reclaimer System",
        bg: "https://d2lptvt2jijg6f.cloudfront.net/document/137/1773480063_Rectangle661.webp",
    },
    {
        id: "tel-aviv",
        name: "Tsuri May",
        location: "Senior Product Designer - Tel Aviv",
        quote: "“At Okta, we move fast and deliver quality. Unlike big companies or typical startups, we don’t trade speed for results—or results for quality.\"",
        bg: "https://d2lptvt2jijg6f.cloudfront.net/document/137/1773480043_Rectangle663.webp",
    },
    {
        id: "tokyo",
        name: "Takashi Watanabe",
        location: "Vice President, Japan - Tokyo",
        quote: "“Okta Japan is the best place to step up your career—cutting-edge tech, a collaborative and fun culture, and a deep commitment to long-term success in Japan.”",
        bg: "https://d2lptvt2jijg6f.cloudfront.net/document/126/1773295677_cement-people-accrodian-img6693.webp",
    },
    {
        id: "dublin-2",
        name: "Johanna Sternberg",
        location: "SMB Customer Account Executive - Dublin",
        quote: "“There’s something special about the Dublin office—everyone is approachable, engaged, and excited to connect.”",
        bg: "https://d2lptvt2jijg6f.cloudfront.net/document/126/1773294998_cement-people-banner.webp",
    }
];

export default function ProjectSlider() {
    return (
        <div className="customerCarousel">
            <Swiper
                modules={[Navigation, Pagination, EffectCreative]}
                effect={'creative'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                speed={800}
                navigation={{
                    nextEl: '.next-slide',
                    prevEl: '.prev-slide',
                }}
                pagination={{
                    clickable: true,
                    el: '.cmp-customer-carousel__wayfinding',
                    bulletClass: 'cmp-customer-carousel__wayfinding-button',
                    bulletActiveClass: 'active',
                }}
                creativeEffect={{
                    prev: {
                        shadow: false,
                        translate: ['-15%', 0, -100],
                        scale: 0.9,
                        opacity: 0.8,
                    },
                    next: {
                        translate: ['15%', 0, -100],
                        scale: 0.9,
                        opacity: 0.8,
                    },
                }}
                className="cmp-customer-carousel"
            >
                {slideData.map((slide) => (
                    <SwiperSlide key={slide.id} className="cmp-customer-carousel__item">
                        <img className="cmp-customer-carousel__item-bg" src={slide.bg} alt="Project" />

                        <div className="cmp-customer-carousel__item-content">
                            <div className="cmp-customer-carousel__item-quote">
                                <p className='c-content-18 lh_1-6 clr-gray ft_medium mb-2'>{slide.quote}</p>
                            </div>
                            <p className="cmp-customer-carousel__item-job ft_light lh_1_2 clr-gray mb-2">{slide.location}</p>
                            <p className="cmp-customer-carousel__item-name c-content-16 clr-gray ft_medium lh_1_2 mb-0 d-flex">
                                <span className='icon-map-pin px-1'></span>{slide.name}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation */}
                <div className="cmp-customer-carousel__arrows">
                    <button className="prev-slide">
                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none"><path d="M8.29407 11.6474L3.29384 6.64718L8.29407 1.64694L6.64712 0L-5.02381e-05 6.64718L6.64712 13.2944L8.29407 11.6474Z" fill="#636466" /></svg>
                    </button>
                    <button className="next-slide">
                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none"><path d="M8.29407 11.6474L3.29384 6.64718L8.29407 1.64694L6.64712 0L-5.02381e-05 6.64718L6.64712 13.2944L8.29407 11.6474Z" fill="#636466" /></svg>
                    </button>
                </div>

                {/* Pagination Container */}
                <div className="cmp-customer-carousel__wayfinding"></div>
            </Swiper>
        </div>
    );
}
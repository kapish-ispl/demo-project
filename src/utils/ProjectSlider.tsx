import React, { useState } from 'react';

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
    const [active, setActive] = useState(0);

    const getPositionClass = (index: number) => {
        if (index === active) return ""; // Selected slide

        const total = slideData.length;
        const diff = (index - active + total) % total;

        // Mapping based on the reference code's class naming convention
        if (diff === 1) return "off-slide slide-transform-first-right";
        if (diff === 2) return "off-slide slide-transform-second-right";
        if (diff === total - 1) return "off-slide slide-transform-first-left";

        return "off-slide slide-hidden";
    };

    return (
        <div className="customerCarousel">
            <div className="cmp-customer-carousel" data-selected={active}>
                {slideData.map((slide, i) => (
                    <div
                        key={slide.id}
                        className={`cmp-customer-carousel__item ${getPositionClass(i)}`}
                        aria-selected={i === active}
                    >
                        <img className="cmp-customer-carousel__item-bg" src={slide.bg} alt="Background" />

                        <div className="cmp-customer-carousel__item-content">
                            <div className="cmp-customer-carousel__item-quote">
                                <p className='c-content-18 lh_1-6 clr-gray ft_medium mb-2'>{slide.quote}</p>
                            </div>
                            <p className="cmp-customer-carousel__item-job ft_light lh_1_2 clr-gray mb-2">{slide.location}</p>
                            <p className="cmp-customer-carousel__item-name c-content-16 clr-gray ft_medium lh_1_2 mb-0 d-flex"><span className='icon-map-pin px-1'></span>{slide.name}</p>
                        </div>
                    </div>
                ))}

                <div className="cmp-customer-carousel__arrows">
                    <button className="prev-slide" onClick={() => setActive((prev) => (prev - 1 + slideData.length) % slideData.length)}><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.29407 11.6474L3.29384 6.64718L8.29407 1.64694L6.64712 0L-5.02381e-05 6.64718L6.64712 13.2944L8.29407 11.6474Z" fill="#636466" />
                    </svg>
                    </button>
                    <button className="next-slide" onClick={() => setActive((prev) => (prev + 1) % slideData.length)}><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.29407 11.6474L3.29384 6.64718L8.29407 1.64694L6.64712 0L-5.02381e-05 6.64718L6.64712 13.2944L8.29407 11.6474Z" fill="#636466" />
                    </svg>

                    </button>
                </div>

                {/* <nav className="cmp-customer-carousel__wayfinding">
                    {slideData.map((_, i) => (
                        <button
                            key={i}
                            className="cmp-customer-carousel__wayfinding-button"
                            aria-selected={i === active}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </nav> */}
            </div>
        </div>
    );
}
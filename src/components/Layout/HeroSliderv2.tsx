"use client";
import React, { useContext, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import { AppContext } from '@/context/AppContext';
import SliderThumbnailUI from './SliderThumbnailUI';

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

    useEffect(() => {
        const headerNames = headerMenu.map(header => header.name);
        const filtered = allPageData.filter(page => headerNames.includes(page.title)) as PageData[];
        setFilterData(filtered);
    }, [allPageData, headerMenu]);

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
                        <div className="hero-slider__content c-heading-80 ft_semiBold text-uppar lh_1-1 clr-white">
                            {parse(staticBackground.caption || "")}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- THUMBNAIL UI --- */}
            {/* <SliderThumbnailUI slides={filterData} /> */}

        </div>
    );
};

export default HeroSlider;

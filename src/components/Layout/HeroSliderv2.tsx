"use client";
import React, { FC, useContext, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { AppContext } from '@/context/AppContext';
import Image from 'next/image';
import SliderThumbnailUI from './SliderThumbnailUI';

interface BannerMedia {
    type: string;
    cdnPath: string;
    caption?: string | null;
    deviceType?: string | null;
}

interface PageData {
    title: string;
    slug: string;
    featuredMedia: {
        cdnPath: string;
        type: string;
    };
}
const MediaItem: FC<{ data: BannerMedia }> = ({ data }) => {
    if (!data?.cdnPath) return null;

    if (data?.type === "video") {
        return (
            <video loop muted autoPlay playsInline className="c-banner__video">
                <source src={data?.cdnPath} type="video/mp4" />
            </video>
        );
    }

    return (
        <Image
            src={data.cdnPath}
            alt="banner"
            width={1920}
            height={1080}
            className="c-banner__image img-fluid"
            style={{ objectFit: "cover", objectPosition: "center" }}
        />
    );
};

const BannerSliderSection: FC<{
    media: BannerMedia[];
    visibilityClass: string;
}> = ({ media, visibilityClass }) => {
    // Filter by presence of cdnPath to avoid "undefined" URL issues
    const validMedia = media.filter((m) => m.cdnPath);
    if (validMedia.length === 0) return null;

    return (
        <div className={visibilityClass}>
            <Swiper
                modules={[Autoplay, Navigation, EffectFade]}
                loop={true}
                effect={'fade'}
                speed={500}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                slidesPerView={1}
                className="mySwiper"
            >
                {validMedia.map((item, idx) => (
                    <SwiperSlide key={`${item.cdnPath}-${idx}`}>
                        <MediaItem data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const HeroSlider: React.FC<{ slides: BannerMedia[] }> = ({ slides }) => {
    console.log(slides)
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
                {/* {staticBackground.type === 'video' ? (
                    <video src={staticBackground.cdnPath} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <img src={staticBackground.cdnPath} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )} */}
                <BannerSliderSection
                    media={slides.filter((m) => m.deviceType === "desktop")}
                    visibilityClass="d-none d-lg-block"
                />
                <BannerSliderSection
                    media={slides.filter((m) => m.deviceType === "tablet")}
                    visibilityClass="d-none d-lg-none d-md-block"
                />

                {/* Mobile/Tablet Version: Only shows media with 'mobile' caption */}
                <BannerSliderSection
                    media={slides.filter((m) => m.deviceType === "mobile")}
                    visibilityClass="d-lg-none"
                />
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

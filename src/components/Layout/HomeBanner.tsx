"use client";

import Image from "next/image";
import { FC, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { useActiveBreakpoint } from "@/hooks/useActiveBreakpoint";
import { MediaItem } from "@/types/pageResponse";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface Props {
    bannerMedia?: MediaItem[];
    tagline?: string;
    pageTitle: string;
}

/**
 * MediaItemComponent handles the conditional rendering of a video or image.
 * It also encapsulates common styling and ensures valid paths.
 */
const MediaItemComponent: FC<{ data: MediaItem; isActive: boolean; isMounted: boolean }> = ({ data, isActive, isMounted }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (data.type === "video" && videoRef.current) {
            if (isActive && isMounted) {
                videoRef.current.play().catch((err) => {
                    console.log("Autoplay prevented or failed:", err);
                });
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isActive, isMounted, data.type]);

    if (!data.cdnPath) return null;

    if (data.type === "video") {
        return (
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                className="c-banner__video"
                preload={isMounted && isActive ? "auto" : "none"}
            >
                <source src={data.cdnPath} type="video/mp4" />
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
            priority={isMounted && isActive}
        />
    );
};

const BannerSliderSection: FC<{
    media: MediaItem[];
    isMounted: boolean;
}> = ({ media, isMounted }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Filter by presence of cdnPath to avoid "undefined" URL issues
    const validMedia = media.filter((m) => m.cdnPath);
    if (validMedia.length === 0) return null;

    return (
        <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            loop={validMedia.length > 1}
            speed={500}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            navigation={validMedia.length > 1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="mySwiper"
        >
            {validMedia.map((item, idx) => (
                <SwiperSlide key={`${item.cdnPath}-${idx}`}>
                    <MediaItemComponent data={item} isActive={idx === activeIndex} isMounted={isMounted} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const HomeBanner: FC<Props> = ({ bannerMedia, tagline, pageTitle }) => {
    const activeBreakpoint = useActiveBreakpoint();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!bannerMedia?.length) return null;

    const currentDevice = isMounted ? activeBreakpoint : "desktop";

    // Resolve media list with fallback chain:
    // Desktop -> desktop media
    // Tablet -> tablet media -> mobile media -> desktop media
    // Mobile -> mobile media -> desktop media
    const desktopMedia = bannerMedia.filter((m) => m.deviceType === "desktop");
    const mobileMedia = bannerMedia.filter((m) => m.deviceType === "mobile");
    const tabletMedia = bannerMedia.filter((m) => m.deviceType === "tablet");

    const activeMedia =
        currentDevice === "desktop"
            ? desktopMedia
            : currentDevice === "tablet"
                ? (tabletMedia.length > 0 ? tabletMedia : mobileMedia.length > 0 ? mobileMedia : desktopMedia)
                : (mobileMedia.length > 0 ? mobileMedia : desktopMedia);

    return (
        <div className="c-banner">
            <div className="c-banner__media">
                <BannerSliderSection
                    media={activeMedia}
                    isMounted={isMounted}
                />
            </div>
        </div>);
};

export default HomeBanner;
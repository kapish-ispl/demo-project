"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { AppContext } from "@/context/AppContext";
import SliderThumbnailUI from "./SliderThumbnailUI";
import { useActiveBreakpoint } from "@/hooks/useActiveBreakpoint";

interface InnerBannerItem {
    type: "video" | "image";
    cdnPath: string;
    caption?: string | null;
    deviceType?: string | null;
}

interface PageData {
    id: number;
    title: string;
    slug: string;
    featuredMedia: {
        cdnPath: string;
        type: string;
    };
}

interface Props {
    label: string;
    slug: string;
    tagline: ReactNode | string;
    currentPage: {
        id: number,
        title: string,
        slug: string
    };
    innerBanner: InnerBannerItem[];
}

const renderMedia = (item: InnerBannerItem | undefined, isMounted: boolean) => {
    if (!item) return null;

    if (item.type === "video") {
        return (
            <video
                loop
                muted
                autoPlay
                playsInline
                className="c-inner-banner__video"
                preload={isMounted ? "auto" : "none"}
            >
                <source src={item.cdnPath} type="video/mp4" />
            </video>
        );
    }

    return (
        <img
            src={item.cdnPath}
            alt={item.caption || "JSP Banner"}
            className="c-inner-banner__image"
        />
    );
};

const InnerBanner = ({ label, tagline, slug, currentPage, innerBanner }: Props) => {
    const { allPageData, headerMenu } = useContext(AppContext);
    const [filterData, setFilterData] = useState<PageData[]>([]);

    const activeBreakpoint = useActiveBreakpoint();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const headerNames = headerMenu.map(header => header.name);
        const filtered = allPageData.filter(page => headerNames.includes(page.title)) as PageData[];
        setFilterData(filtered);
    }, [allPageData, headerMenu]);

    const desktopMedia =
        innerBanner.find((m) => m.deviceType === "desktop") || innerBanner[0];

    const mobileMedia =
        innerBanner.find((m) => m.deviceType === "mobile") ||
        desktopMedia;

    const tabletMedia =
        innerBanner.find((m) => m.deviceType === "tablet") ||
        mobileMedia;

    const currentDevice = isMounted ? activeBreakpoint : "desktop";

    const activeMedia =
        currentDevice === "desktop"
            ? desktopMedia
            : currentDevice === "tablet"
            ? tabletMedia
            : mobileMedia;

    return (
        <div className={`c-inner-banner ${innerBanner.length > 0 ? "" : "without-banner"}`}>
            {innerBanner.length > 0 && (
                <div className="c-inner-banner__media">
                    <div className="hero-slider">
                        <div className="hero-slider__static-bg">
                            {renderMedia(activeMedia, isMounted)}
                        </div>
                    </div>
                </div>
            )}

            <div className="c-inner-banner__content_box">
                <div className="container cus-container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="banner__title c-heading-80 ft_semiBold text-uppar lh_1-1 clr-white">
                                {innerBanner[0]?.caption != undefined ?
                                    <div dangerouslySetInnerHTML={{ __html: innerBanner[0].caption! }} />
                                    :
                                    label
                                }
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="c-inner-banner__content">
                <div className="container cus-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcumbs">
                                <nav aria-label="breadcrumb">
                                    <Breadcrumbs currentPage={currentPage} slug={slug} />
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- THUMBNAIL UI --- */}
            {/* <SliderThumbnailUI slides={filterData} /> */}
        </div>
    );
};

export default InnerBanner;
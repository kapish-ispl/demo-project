"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import Breadcrumbs, { CurrentPage } from "./Breadcrumbs";
import { useActiveBreakpoint } from "@/hooks/useActiveBreakpoint";

interface InnerBannerItem {
    type: "video" | "image";
    cdnPath: string;
    caption?: string | null;
    deviceType?: string | null;
}

interface Props {
    label: string;
    slug: string;
    tagline?: ReactNode | string;
    currentPage: CurrentPage;
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
        <Image
            src={item.cdnPath}
            alt={item.caption || "JSP Banner"}
            width={1920}
            height={400}
            className="c-inner-banner__image"
            style={{ objectFit: "cover" }}
            priority={isMounted}
        />
    );
};

const InnerBanner = ({ label, tagline, slug, currentPage, innerBanner }: Props) => {
    const activeBreakpoint = useActiveBreakpoint();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                    {renderMedia(activeMedia, isMounted)}
                </div>
            )}

            <div className="c-inner-banner__content">
                <div className="container cus-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="c-inner-banner__content_box">

                                <h1 className="banner__title">
                                    {tagline !== undefined ? (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: tagline as string }}
                                        />
                                    ) : (
                                        label
                                    )}
                                </h1>

                                <div className="breadcumbs">
                                    <nav aria-label="breadcrumb">
                                        <Breadcrumbs currentPage={currentPage} slug={slug} />
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerBanner;
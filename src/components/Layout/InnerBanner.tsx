"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { AppContext } from "@/context/AppContext";
import SliderThumbnailUI from "./SliderThumbnailUI";

interface InnerBannerItem {
    type: "video" | "image";
    cdnPath: string;
    caption?: string | null;
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

const InnerBanner = ({ label, tagline, slug, currentPage, innerBanner }: Props) => {
    const { allPageData, headerMenu } = useContext(AppContext);
    const [filterData, setFilterData] = useState<PageData[]>([]);

    // Find siblings: pages that share the same top-level menu group as the current page
    // useEffect(() => {
    //     if (!headerMenu.length || !allPageData.length) return;

    //     // Step 1: find the top-level menu item whose children include the current page
    //     const parentGroup = headerMenu.find((topItem: any) =>
    //         topItem.children?.some((child: any) => child.page_id === currentPage.id)
    //     );

    //     if (!parentGroup) {
    //         setFilterData([]);
    //         return;
    //     }

    //     // Step 2: collect all page_ids of siblings (all children of that group)
    //     const siblingPageIds: number[] = parentGroup.children
    //         .map((child: any) => child.page_id)
    //         .filter(Boolean);

    //     // Step 3: resolve page_ids against allPageData
    //     const siblings = allPageData.filter(
    //         (page: any) => siblingPageIds.includes(page.id)
    //     ) as PageData[];

    //     setFilterData(siblings);
    // }, [allPageData, headerMenu, currentPage.id]);

    useEffect(() => {
        const headerNames = headerMenu.map(header => header.name);
        const filtered = allPageData.filter(page => headerNames.includes(page.title)) as PageData[];
        setFilterData(filtered);
    }, [allPageData, headerMenu]);

    return (
        <div className={`c-inner-banner ${innerBanner.length > 0 ? "" : "without-banner"}`}>
            {innerBanner.length > 0 && (
                <div className="c-inner-banner__media">
                    <div className="hero-slider">
                        <div className="hero-slider__static-bg">
                            {innerBanner[0].type === "video" ? (
                                <video loop muted autoPlay playsInline className="c-inner-banner__video">
                                    <source src={innerBanner[0].cdnPath} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={innerBanner[0].cdnPath}
                                    alt={innerBanner[0].caption === null ? "JSP Banner" : innerBanner[0].caption || "JSP Banner"}
                                    className="c-inner-banner__image"
                                />
                            )}
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
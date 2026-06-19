'use client'
import React from 'react';
import parse, { HTMLReactParserOptions, Element, attributesToProps, domToReact, DOMNode } from 'html-react-parser';
import dynamic from 'next/dynamic';
import CustomSliderCategory, { CategoryItemElementProps, CategorySlide } from '@/utils/CustomSliderCategory';
import { PageResponse } from '@/types/pageResponse';
import { CustomReactElement, TabItem } from '@/utils/Tabs';



const Counter = dynamic(() => import('../AnimatedCountUp'), { ssr: false });
const PostList = dynamic(() => import('@/utils/PostList'), { ssr: false });
const CustomSilder = dynamic(() => import('@/utils/CustomSilder'), { ssr: false });
const ReadMoreModal = dynamic(() => import("@/utils/ReadMoreModal"), { ssr: false });
const Tabs = dynamic(() => import("@/utils/Tabs"), { ssr: false });
const CardStack = dynamic(() => import("@/utils/CardStack"), { ssr: false });
const RotatingSlider = dynamic(() => import("@/utils/RotatingSlider"), { ssr: false });
const ProjectSlider = dynamic(() => import("@/utils/ProjectSlider"), { ssr: false });
const BentoSyncReveal = dynamic(() => import("@/utils/BentoSyncReveal"), { ssr: false });
const TimeLineSection = dynamic(() => import("@/utils/TimeLineSection"), { ssr: false });
const BentoMarquee = dynamic(() => import("@/utils/BentoMarquee"), { ssr: false });
const BusinessScrollSync = dynamic(() => import("@/utils/BusinessScrollSync"), { ssr: false });
const ExecutionCapabilities = dynamic(() => import("@/utils/ExecutionCapabilities"), { ssr: false });
const LogoLoopContainer = dynamic(() => import("@/utils/LogoLoopContainer"), { ssr: false });


const PageTemplate = ({ data }: { data: PageResponse }) => {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.attribs) {
                if (domNode.name === "custompost") {
                    const props = attributesToProps(domNode.attribs);
                    return <PostList {...props} />;
                }
                if (domNode.name == "animatedcountup") {
                    const props = attributesToProps(domNode.attribs);
                    const toValue = props.to ? Number(props.to) : 0;
                    return <Counter to={toValue} />;
                }

                if (domNode.name === "projectslider") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <ProjectSlider props={props} data={Array.isArray(children) ? children : [children]} />
                }
                if (domNode.name === "executioncapabilities") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <ExecutionCapabilities props={props} data={Array.isArray(children) ? children : [children]} />
                }
                if (domNode.name === "businessscrollsync") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <BusinessScrollSync props={props} data={Array.isArray(children) ? children : [children]} />
                }
                if (domNode.name === "timelinesection") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]);
                    const showScrollbar = domNode.attribs.showscrollbar !== undefined
                        ? domNode.attribs.showscrollbar !== 'false'
                        : true;
                    const removeGrayscaleOnActive = domNode.attribs.removeGrayscaleOnActive !== undefined
                        ? domNode.attribs.removeGrayscaleOnActive !== 'false'
                        : true;
                    // Explicitly pass customcls from raw attribs so it is never dropped or transformed.
                    const customcls = domNode.attribs.customcls ?? '';
                    return <TimeLineSection props={props} showScrollbar={showScrollbar} removeGrayscaleOnActive={removeGrayscaleOnActive} customcls={customcls} data={Array.isArray(children) ? children : [children]} />
                }
                // if (domNode.name === "timelinesection") {
                //     return <>hello</>
                // }
                if (domNode.name === "bentomarquee") {
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <BentoMarquee data={Array.isArray(children) ? children : [children]} />;
                }
                if (domNode.name === "logoloopcontainer") {
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <LogoLoopContainer data={Array.isArray(children) ? children : [children]} />;
                }
                if (domNode.name === "rotatingslider") {
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <RotatingSlider data={Array.isArray(children) ? children : [children]} />
                }
                if (domNode.name === "bentosyncreveal") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <BentoSyncReveal props={props} data={Array.isArray(children) ? children : [children]} />;
                }
                if (domNode.name === "customslider") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <CustomSilder {...props} data={Array.isArray(children) ? children : [children]} />;
                }
                if (domNode.name === "customslidercategory") {
                    const props = attributesToProps(domNode.attribs);

                    const children = domToReact(domNode.children as DOMNode[], {
                        replace(childNode) {
                            if (childNode instanceof Element) {
                                if (childNode.name === "animatedcountup") {
                                    const childProps = attributesToProps(childNode.attribs);
                                    const toValue = childProps.to ? Number(childProps.to) : 0;
                                    return <Counter to={toValue} />;
                                }
                            }
                        }
                    });

                    const childArray = Array.isArray(children) ? children : [children];

                    const categoryItems = childArray.filter(
                        (child): child is CategorySlide =>
                            React.isValidElement(child) &&
                            (child.props as CategoryItemElementProps).category !== undefined
                    );

                    return <CustomSliderCategory {...props} data={categoryItems} />;
                }

                if (domNode.name === "customtabs") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]) as CustomReactElement[];
                    const tabItems: TabItem[] = children
                        .filter((c): c is CustomReactElement => !!c && !!c.props)
                        .map((child) => ({
                            props: {
                                attribs: child.props.attribs ?? {},
                                label: child.props.label ?? '',
                                children: child.props.children ?? []
                            }
                        }));

                    return <Tabs {...props} data={tabItems} />;
                }
                // if (domNode.name === "customtabs") {
                //     return <>Tabs</>
                // }
                if (domNode.name === "cardstack") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]);
                    return <CardStack {...props} data={Array.isArray(children) ? children : [children]} />;
                }
                if (domNode.name === "customreadmoremodal") {
                    const props = attributesToProps(domNode.attribs);
                    const children = domToReact(domNode.children as DOMNode[]);

                    return (
                        <ReadMoreModal {...props} data={Array.isArray(children) ? children : [children]} />
                    );
                }


                // ✅ Universal fix for self-closing tags
                if (domNode instanceof Element && domNode.name?.startsWith("source")) {
                    const props = attributesToProps(domNode.attribs);
                    return <source {...props} />;
                }
                if (domNode instanceof Element && domNode.name?.startsWith("iframe")) {
                    const props = attributesToProps(domNode.attribs);
                    return <iframe {...props}></iframe>;
                }

            }
        },
    };

    return <div style={{ display: 'contents' }}>{parse(data?.content, options)}</div>;
};

export default PageTemplate;

'use client';

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type LogoItem =
    | {
        node: React.ReactNode;
        href?: string;
        title?: string;
        ariaLabel?: string;
    }
    | {
        src: string;
        alt?: string;
        href?: string;
        title?: string;
        srcSet?: string;
        sizes?: string;
        width?: number;
        height?: number;
    };

interface LogoLoopProps {
    logos: LogoItem[];
    speed?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    width?: number | string;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
    /** Scale multiplier applied on hover when scaleOnHover is true. Default: 1.2 */
    hoverScale?: number;
    renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2,
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toCssLength = (value?: number | string): string | undefined =>
    typeof value === 'number' ? `${value}px` : (value ?? undefined);

// ─── Internal Hooks ───────────────────────────────────────────────────────────

const useResizeObserver = (
    callback: () => void,
    elements: Array<React.RefObject<Element | null>>,
    dependencies: React.DependencyList
) => {
    useEffect(() => {
        if (!window.ResizeObserver) {
            const handleResize = () => callback();
            window.addEventListener('resize', handleResize);
            callback();
            return () => window.removeEventListener('resize', handleResize);
        }

        const observers = elements.map((ref) => {
            if (!ref.current) return null;
            const observer = new ResizeObserver(callback);
            observer.observe(ref.current);
            return observer;
        });

        callback();

        return () => {
            observers.forEach((observer) => observer?.disconnect());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

const useImageLoader = (
    seqRef: React.RefObject<HTMLUListElement | null>,
    onLoad: () => void,
    dependencies: React.DependencyList
) => {
    useEffect(() => {
        const images = seqRef.current?.querySelectorAll('img') ?? [];

        if (images.length === 0) {
            onLoad();
            return;
        }

        let remainingImages = images.length;
        const handleImageLoad = () => {
            remainingImages -= 1;
            if (remainingImages === 0) onLoad();
        };

        images.forEach((img) => {
            const htmlImg = img as HTMLImageElement;
            if (htmlImg.complete) {
                handleImageLoad();
            } else {
                htmlImg.addEventListener('load', handleImageLoad, { once: true });
                htmlImg.addEventListener('error', handleImageLoad, { once: true });
            }
        });

        return () => {
            images.forEach((img) => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

const useAnimationLoop = (
    trackRef: React.RefObject<HTMLDivElement | null>,
    targetVelocity: number,
    seqWidth: number,
    seqHeight: number,
    isHovered: boolean,
    hoverSpeed: number | undefined,
    isVertical: boolean
) => {
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const seqSize = isVertical ? seqHeight : seqWidth;

        if (seqSize > 0) {
            offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
            track.style.transform = isVertical
                ? `translate3d(0, ${-offsetRef.current}px, 0)`
                : `translate3d(${-offsetRef.current}px, 0, 0)`;
        }

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

            const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;

            const target =
                isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (target - velocityRef.current) * easingFactor;

            if (seqSize > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                offsetRef.current = nextOffset;
                track.style.transform = isVertical
                    ? `translate3d(0, ${-offsetRef.current}px, 0)`
                    : `translate3d(${-offsetRef.current}px, 0, 0)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            lastTimestampRef.current = null;
        };
    }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]);
};

// ─── LogoLoop (internal engine) ───────────────────────────────────────────────

const LogoLoop = React.memo<LogoLoopProps>(
    ({
        logos,
        speed = 120,
        direction = 'left',
        width = '100%',
        logoHeight = 28,
        gap = 32,
        pauseOnHover,
        hoverSpeed,
        fadeOut = false,
        fadeOutColor,
        scaleOnHover = false,
        hoverScale = 1.2,
        renderItem,
        ariaLabel = 'Partner logos',
        className,
        style,
    }) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const trackRef = useRef<HTMLDivElement>(null);
        const seqRef = useRef<HTMLUListElement>(null);

        const [seqWidth, setSeqWidth] = useState(0);
        const [seqHeight, setSeqHeight] = useState(0);
        const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
        const [isHovered, setIsHovered] = useState(false);

        const effectiveHoverSpeed = useMemo(() => {
            if (hoverSpeed !== undefined) return hoverSpeed;
            if (pauseOnHover === true) return 0;
            if (pauseOnHover === false) return undefined;
            return 0;
        }, [hoverSpeed, pauseOnHover]);

        const isVertical = direction === 'up' || direction === 'down';

        const targetVelocity = useMemo(() => {
            const magnitude = Math.abs(speed);
            const dir = isVertical
                ? direction === 'up' ? 1 : -1
                : direction === 'left' ? 1 : -1;
            return magnitude * dir * (speed < 0 ? -1 : 1);
        }, [speed, direction, isVertical]);

        const updateDimensions = useCallback(() => {
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            const rect = seqRef.current?.getBoundingClientRect?.();
            const sw = rect?.width ?? 0;
            const sh = rect?.height ?? 0;

            if (isVertical) {
                const parentH = containerRef.current?.parentElement?.clientHeight ?? 0;
                if (containerRef.current && parentH > 0) {
                    const t = Math.ceil(parentH);
                    if (containerRef.current.style.height !== `${t}px`)
                        containerRef.current.style.height = `${t}px`;
                }
                if (sh > 0) {
                    setSeqHeight(Math.ceil(sh));
                    const viewport = containerRef.current?.clientHeight ?? parentH ?? sh;
                    setCopyCount(
                        Math.max(
                            ANIMATION_CONFIG.MIN_COPIES,
                            Math.ceil(viewport / sh) + ANIMATION_CONFIG.COPY_HEADROOM
                        )
                    );
                }
            } else if (sw > 0) {
                setSeqWidth(Math.ceil(sw));
                setCopyCount(
                    Math.max(
                        ANIMATION_CONFIG.MIN_COPIES,
                        Math.ceil(containerWidth / sw) + ANIMATION_CONFIG.COPY_HEADROOM
                    )
                );
            }
        }, [isVertical]);

        useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
        useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
        useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

        const cssVariables = useMemo(
            () =>
                ({
                    '--logoloop-gap': `${gap}px`,
                    '--logoloop-logoHeight': `${logoHeight}px`,
                    '--logoloop-hoverScale': String(hoverScale),
                    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
                }) as React.CSSProperties,
            [gap, logoHeight, fadeOutColor, hoverScale]
        );

        const rootClassName = useMemo(
            () =>
                [
                    'logoloop',
                    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
                    fadeOut && 'logoloop--fade',
                    scaleOnHover && 'logoloop--scale-hover',
                    className,
                ]
                    .filter(Boolean)
                    .join(' '),
            [isVertical, fadeOut, scaleOnHover, className]
        );

        const handleMouseEnter = useCallback(() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(true);
        }, [effectiveHoverSpeed]);

        const handleMouseLeave = useCallback(() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(false);
        }, [effectiveHoverSpeed]);

        const renderLogoItem = useCallback(
            (item: LogoItem, key: React.Key) => {
                if (renderItem) {
                    return (
                        <li className="logoloop__item" key={key} role="listitem">
                            {renderItem(item, key)}
                        </li>
                    );
                }
                const isNodeItem = 'node' in item;
                const content = isNodeItem ? (
                    <span className="logoloop__node" aria-hidden={!!(item as any).href && !(item as any).ariaLabel}>
                        {(item as any).node}
                    </span>
                ) : (
                    <img
                        src={(item as any).src}
                        srcSet={(item as any).srcSet}
                        sizes={(item as any).sizes}
                        width={(item as any).width}
                        height={(item as any).height}
                        alt={(item as any).alt ?? ''}
                        title={(item as any).title}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                    />
                );
                const itemAriaLabel = isNodeItem
                    ? ((item as any).ariaLabel ?? (item as any).title)
                    : ((item as any).alt ?? (item as any).title);
                const itemContent = (item as any).href ? (
                    <a
                        className="logoloop__link"
                        href={(item as any).href}
                        aria-label={itemAriaLabel || 'logo link'}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {content}
                    </a>
                ) : (
                    content
                );
                return (
                    <li className="logoloop__item" key={key} role="listitem">
                        {itemContent}
                    </li>
                );
            },
            [renderItem]
        );

        const logoLists = useMemo(
            () =>
                Array.from({ length: copyCount }, (_, copyIndex) => (
                    <ul
                        className="logoloop__list"
                        key={`copy-${copyIndex}`}
                        role="list"
                        aria-hidden={copyIndex > 0}
                        ref={copyIndex === 0 ? seqRef : undefined}
                    >
                        {logos.map((item, itemIndex) =>
                            renderLogoItem(item, `${copyIndex}-${itemIndex}`)
                        )}
                    </ul>
                )),
            [copyCount, logos, renderLogoItem]
        );

        const containerStyle = useMemo(
            (): React.CSSProperties => ({
                width: isVertical
                    ? toCssLength(width) === '100%'
                        ? undefined
                        : toCssLength(width)
                    : (toCssLength(width) ?? '100%'),
                ...cssVariables,
                ...style,
            }),
            [width, cssVariables, style, isVertical]
        );

        return (
            <div
                ref={containerRef}
                className={rootClassName}
                style={containerStyle}
                role="region"
                aria-label={ariaLabel}
            >
                <div
                    className="logoloop__track"
                    ref={trackRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {logoLists}
                </div>
            </div>
        );
    }
);

LogoLoop.displayName = 'LogoLoop';

// ─── LogoLoopContainer (public entry point) ───────────────────────────────────

interface LogoLoopContainerProps {
    data: React.ReactNode[];
    props?: BentoLoopConfig
}
interface BentoLoopConfig {
    scaleonhover?: boolean;
    /** Scale multiplier on hover, e.g. hoverscale="1.5" */
    hoverscale?: string;
    width?: string;
    speed?: string;
    direction?: 'left' | 'right';
    logoheight?: string;
    gap?: string;
    fadeout?: boolean;
    fadeoutcolor?: string;
    className?: string;
    style?: React.CSSProperties;
    arialabel?: string;
    hoverspeed?: string;
    renderitem?: (item: LogoItem, key: React.Key) => React.ReactNode;
}
const LogoLoopContainer = ({ data, props }: LogoLoopContainerProps) => {
    // const logos = useMemo<LogoItem[]>(() => {
    //     if (!data) return [];

    //     return React.Children.toArray(data)
    //         .filter(
    //             (child): child is React.ReactElement<any> =>
    //                 React.isValidElement(child) && typeof child.props !== 'undefined'
    //         )
    //         .map((child) => {
    //             const innerChild = React.Children.toArray(child.props.children).find(
    //                 React.isValidElement
    //             ) as React.ReactElement<any> | undefined;

    //             return {
    //                 src: innerChild?.props?.src ?? '',
    //                 alt: innerChild?.props?.alt ?? '',
    //                 node: innerChild?.props?.children ?? '',
    //             } satisfies LogoItem;
    //         });
    // }, [data]);

    const logos = useMemo(() => {
        if (!data) return [];

        return React.Children.toArray(data)
            .filter(
                (child): child is React.ReactElement<any> =>
                    React.isValidElement(child) &&
                    typeof (child.props) !== "undefined"
            )
            .map((child, index) => ({
                id: index + 1,
                src: child?.props?.src ?? '',
                alt: child?.props?.alt ?? '',
                node: child?.props?.children ?? '',
            }));
    }, [data]);

    return (
        <div className="overflow-hidden">
            <LogoLoop
                logos={logos}
                speed={props?.speed !== undefined ? Number(props.speed) : 90}
                direction={(props?.direction as 'left' | 'right') ?? "left"}
                logoHeight={props?.logoheight !== undefined ? Number(props.logoheight) : 120}
                gap={props?.gap !== undefined ? Number(props.gap) : 120}
                hoverSpeed={props?.hoverspeed !== undefined ? Number(props.hoverspeed) : 0}
                scaleOnHover={String(props?.scaleonhover) === 'true'}
                hoverScale={props?.hoverscale !== undefined ? Number(props.hoverscale) : 1.1}
                ariaLabel={props?.arialabel ?? "Technology partners"}
                fadeOut={String(props?.fadeout) === 'true'}
                fadeOutColor={props?.fadeoutcolor}
                className={props?.className}
                style={props?.style}
                renderItem={props?.renderitem}
            />
        </div>
    );
};

export default LogoLoopContainer;
import { useState, useEffect } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export const useActiveBreakpoint = (): Breakpoint | null => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

    useEffect(() => {
        const checkBreakpoint = () => {
            if (window.matchMedia("(min-width: 992px)").matches) {
                setBreakpoint("desktop");
            } else if (window.matchMedia("(min-width: 768px)").matches) {
                setBreakpoint("tablet");
            } else {
                setBreakpoint("mobile");
            }
        };

        checkBreakpoint();

        const mediaQueryLg = window.matchMedia("(min-width: 992px)");
        const mediaQueryMd = window.matchMedia("(min-width: 768px)");

        const handler = () => checkBreakpoint();

        // Compatibility check for older browsers
        if (mediaQueryLg.addEventListener) {
            mediaQueryLg.addEventListener("change", handler);
            mediaQueryMd.addEventListener("change", handler);
        } else {
            mediaQueryLg.addListener(handler);
            mediaQueryMd.addListener(handler);
        }

        return () => {
            if (mediaQueryLg.removeEventListener) {
                mediaQueryLg.removeEventListener("change", handler);
                mediaQueryMd.removeEventListener("change", handler);
            } else {
                mediaQueryLg.removeListener(handler);
                mediaQueryMd.removeListener(handler);
            }
        };
    }, []);

    return breakpoint;
};

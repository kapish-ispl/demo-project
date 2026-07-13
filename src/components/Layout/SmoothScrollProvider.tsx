"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,  // mouse wheel smooth
      smoothTouch: true,  // touch / mobile smooth
      prevent: (target: EventTarget | null) => {
        try {
          const el = target as Element | null;
          return !!el?.closest?.("[data-lenis-ignore]");
        } catch {
          return false;
        }
      },
    });

    let isMounted = true;

    // RAF loop to update Lenis and GSAP ScrollTrigger
    function raf(time: number) {
      if (!isMounted) return;
      lenis.raf(time);
      ScrollTrigger.update(); // keep ScrollTrigger in sync
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

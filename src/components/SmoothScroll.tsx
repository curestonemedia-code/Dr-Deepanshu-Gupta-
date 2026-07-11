'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1, // 'smoothWheel' is default behavior in v1.x
    });
    lenisRef.current = lenis;

    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Lenis owns scrolling, so a same-page hash link (e.g. clicked twice, or
    // clicked after the user has scrolled away) never gets a native browser
    // scroll-into-view — the URL's hash doesn't change on a repeat click, so
    // nothing tells Lenis to move. Intercept these clicks and force the
    // scroll every time instead of relying on native hash navigation.
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(url.hash.slice(1));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0 });
      history.pushState(null, '', url.hash);
    };
    document.addEventListener('click', handleClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      document.removeEventListener('click', handleClick);
      lenisRef.current = null;
    };
  }, []);

  // Landing on a page (via cross-page navigation, or a full reload) with a
  // hash already in the URL — Lenis intercepts scroll before Next.js's own
  // hash handling can act, so re-assert the scroll target once content settles.
  useEffect(() => {
    if (!window.location.hash) return;
    const hash = window.location.hash.slice(1);
    const timer = setTimeout(() => {
      const target = document.getElementById(hash);
      if (!target) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: 0 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}

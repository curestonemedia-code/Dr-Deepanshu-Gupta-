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

  // Lenis caches the page's scrollable height when it measures. A same-app
  // client-side navigation (e.g. /blog -> a much taller blog post) swaps in
  // new content without a reload, and Lenis's own auto-resize doesn't
  // reliably keep up — you can only scroll as far as the *previous* page's
  // height, as if the new content below that point doesn't exist, until a
  // full refresh re-measures from scratch. Force a recalculation on every
  // route change, and again shortly after in case images are still loading
  // in and changing the page's final height.
  useEffect(() => {
    const resize = () => lenisRef.current?.resize();
    resize();
    const timer = setTimeout(resize, 350);
    window.addEventListener('load', resize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', resize);
    };
  }, [pathname]);

  // Landing on a page (via cross-page navigation, or a full reload) with a
  // hash already in the URL — Lenis intercepts scroll before Next.js's own
  // hash handling can act, so re-assert the scroll target once content settles.
  // GSAP ScrollTrigger pins on the destination page insert extra pin-spacer
  // height as images/fonts finish loading, which shifts the target's real
  // position — so refresh ScrollTrigger and re-scroll once the page's `load`
  // event fires too, not just on a single fixed-delay guess.
  useEffect(() => {
    if (!window.location.hash) return;
    const hash = window.location.hash.slice(1);

    const scrollToHash = () => {
      const target = document.getElementById(hash);
      if (!target) return;
      ScrollTrigger.refresh();
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: 0 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const timer = setTimeout(scrollToHash, 350);
    window.addEventListener('load', scrollToHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', scrollToHash);
    };
  }, [pathname]);

  return <>{children}</>;
}

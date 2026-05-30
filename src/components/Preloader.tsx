'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [v, setV] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
        const preloader = document.getElementById('preloader');
        const preloaderBar = document.getElementById('preloader-bar');
        const preloaderLogo = document.getElementById('preloader-logo');

        if (!preloader || !preloaderBar || !preloaderLogo) return;

        const tl = gsap.timeline();
        const obj = { v: 0 };

        tl.to(preloaderLogo, { y: '0%', duration: 0.8, ease: 'power3.out' })
          .to(preloaderBar, { width: '100%', duration: 1.0, ease: 'expo.inOut' }, '<0.1')
          .to(obj, {
              v: 100, 
              duration: 1.0, 
              ease: 'expo.inOut',
              onUpdate: () => setV(Math.round(obj.v))
          }, '<')
          .to(preloader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.1')
          .add(() => {
            preloader.style.display = 'none';
          })
          .from('#top', { scale: 1.04, duration: 1.4, ease: 'power3.out', transformOrigin: 'center top' }, '-=0.6')
          .to('.hero-line', { y: '0%', duration: 1.1, stagger: 0.1, ease: 'power3.out' }, '-=1.2')
          .to('.fade-up', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power2.out' }, '-=0.9');
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <div id="preloader">
        <div className="overflow-hidden mb-8" style={{ height: '64px' }}>
            <img src="/logo.png" alt="Dr. Deepanshu Gupta" id="preloader-logo" className="h-16 w-auto object-contain" style={{ transform: 'translateY(110%)' }} />
        </div>
        <div className="bar"><div className="bar-fill" id="preloader-bar"></div></div>
        <div className="count" id="preloader-count">{String(v).padStart(3, '0')}</div>
    </div>
  );
}

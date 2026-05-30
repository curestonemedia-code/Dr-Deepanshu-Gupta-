'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollProgress() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            ScrollTrigger.create({
                start: 0, 
                end: 'max',
                onUpdate: (self) => { 
                    progressBar.style.width = (self.progress * 100) + '%'; 
                },
            });
        }
    });

    return () => {
        ctx.revert();
    };
  }, []);

  return <div id="scroll-progress"></div>;
}

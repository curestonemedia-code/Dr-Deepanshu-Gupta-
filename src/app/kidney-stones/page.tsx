'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { wrapWords } from '../../utils/text';
import KidneyStonesHero from '../../components/kidney-stones/KidneyStonesHero';
import KidneyStonesSymptoms from '../../components/kidney-stones/KidneyStonesSymptoms';
import KidneyStonesDiagnosis from '../../components/kidney-stones/KidneyStonesDiagnosis';
import KidneyStonesTreatments from '../../components/kidney-stones/KidneyStonesTreatments';
import KidneyStonesRecovery from '../../components/kidney-stones/KidneyStonesRecovery';
import KidneyStonesFAQ from '../../components/kidney-stones/KidneyStonesFAQ';
import KidneyStonesCTA from '../../components/kidney-stones/KidneyStonesCTA';

export default function KidneyStones() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Wrap words before GSAP animations run
    document.querySelectorAll('.split-words').forEach(el => wrapWords(el as HTMLElement));
    
    let ctx = gsap.context(() => {
        const firstSection = document.querySelector('.cond-hero') || document.querySelector('section');
        if (firstSection) {
            gsap.from(firstSection, {
                opacity: 0, scale: 0.94,
                duration: 1.1, ease: 'power3.out',
                transformOrigin: 'center top',
                clearProps: 'transform,opacity',
            });
        }

        const themedSections = document.querySelectorAll('[data-bg]');
        if (themedSections.length) {
            themedSections.forEach(section => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 55%',
                    end: 'bottom 45%',
                    onEnter: () => applySectionTheme(section as HTMLElement),
                    onEnterBack: () => applySectionTheme(section as HTMLElement),
                });
            });
        }
        function applySectionTheme(section: HTMLElement) {
            const bg = section.dataset.bg;
            const theme = section.dataset.theme;
            if (bg) gsap.to(document.body, { backgroundColor: bg, duration: 0.8, ease: 'power2.inOut' });
            if (theme === 'dark') document.body.classList.add('on-dark');
            else document.body.classList.remove('on-dark');
        }

        document.querySelectorAll('.split-words').forEach(heading => {
            gsap.to(heading.querySelectorAll('.word-inner'), {
                y: '0%', duration: 1.1, stagger: 0.05, ease: 'power3.out',
                scrollTrigger: { trigger: heading, start: 'top 85%' },
            });
        });

        gsap.utils.toArray('.fade-in-scroll').forEach(el => {
            gsap.from(el as HTMLElement, {
                opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el as HTMLElement, start: 'top 85%' },
            });
        });

        gsap.utils.toArray('[data-count]').forEach(el => {
            const target = parseFloat((el as HTMLElement).dataset.count || '0');
            const obj = { v: 0 };
            gsap.to(obj, {
                v: target, duration: 2.2, ease: 'expo.out',
                scrollTrigger: { trigger: el as HTMLElement, start: 'top 80%' },
                onUpdate: () => { (el as HTMLElement).textContent = Math.round(obj.v).toLocaleString('en-IN'); },
            });
        });
    });

    return () => {
        ctx.revert();
    };
  }, []);

  return (
    <>
      <KidneyStonesHero />
      <KidneyStonesSymptoms />
      <KidneyStonesDiagnosis />
      <KidneyStonesTreatments />
      <KidneyStonesRecovery />
      <KidneyStonesFAQ />
      <KidneyStonesCTA />
    </>
  );
}
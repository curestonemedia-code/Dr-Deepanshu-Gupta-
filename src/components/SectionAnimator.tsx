import { useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type SectionAnimatorProps = {
  children: ReactNode;
  /** Optional custom GSAP animation callback */
  animate?: (target: HTMLElement) => void;
};

export default function SectionAnimator({ children, animate }: SectionAnimatorProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const section = document.getElementById('anim-section');
      if (!section) return;

      // default animation: fade‑in‑up with stagger for inner elements
      const targets = section.querySelectorAll<HTMLElement>('.anim-item');
      gsap.from(targets, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        },
      });

      if (animate) {
        animate(section);
      }
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <section id="anim-section" className="relative">
      {children}
    </section>
  );
}

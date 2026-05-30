const fs = require('fs');

function htmlToJsx(html) {
    let jsx = html;
    jsx = jsx.replace(/class=/g, 'className=');
    jsx = jsx.replace(/for=/g, 'htmlFor=');
    jsx = jsx.replace(/crossorigin/g, 'crossOrigin');
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        const styleObj = p1.split(';').reduce((acc, rule) => {
            if (!rule.trim()) return acc;
            const [key, value] = rule.split(':');
            const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            acc[camelKey] = value.trim();
            return acc;
        }, {});
        return `style={${JSON.stringify(styleObj)}}`;
    });
    // Self-close tags like img, input
    jsx = jsx.replace(/<img([^>]*)>/g, (match, p1) => {
        if (p1.endsWith('/')) return match;
        return `<img${p1}/>`;
    });
    jsx = jsx.replace(/<input([^>]*)>/g, (match, p1) => {
        if (p1.endsWith('/')) return match;
        return `<input${p1}/>`;
    });
    jsx = jsx.replace(/<br>/g, '<br/>');
    jsx = jsx.replace(/<hr>/g, '<hr/>');
    jsx = jsx.replace(/allowfullscreen/g, 'allowFullScreen');
    // Replace lucide icons
    jsx = jsx.replace(/<i data-lucide="([^"]+)"([^>]*)><\/i>/g, (match, icon, props) => {
        let compName = icon.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        return `<${compName} ${props} />`;
    });
    return jsx;
}

const html = fs.readFileSync('legacy/index.html', 'utf-8');
const bodyContentMatch = html.match(/<!-- HERO -->([\s\S]*?)<!-- FOOTER -->/i);
if (bodyContentMatch) {
    let body = bodyContentMatch[1];
    body = htmlToJsx(body);
    const tsxCode = `'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight, ArrowUpRight, Zap, Shield, HeartPulse, Stethoscope, Award, ShieldCheck, Activity, Medal, GraduationCap, FileBadge, Play, Plus, Check, MessageCircle, X, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax
    gsap.to('#hero-img', {
        yPercent: 15, scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true },
    });

    // Sticky crossfade
    const phBlocks = document.querySelectorAll('.ph-block');
    const phImages = document.querySelectorAll('.ph-img');
    const labels = ['Consultation', 'Surgery', 'Recovery'];
    const subs = [
        'Understanding your condition in depth',
        'Fluoroscopy-free laser precision',
        'Day-after, not week-after'
    ];
    const numEl = document.getElementById('step-num');
    const labelEl = document.getElementById('step-label');
    const subEl = document.getElementById('step-sub');

    phBlocks.forEach((block) => {
        ScrollTrigger.create({
            trigger: block,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => activateStep((block as HTMLElement).dataset.step),
            onEnterBack: () => activateStep((block as HTMLElement).dataset.step),
        });
    });
    function activateStep(step: string | undefined) {
        phImages.forEach(img => img.classList.toggle('active', (img as HTMLElement).dataset.step === step));
        if (!step) return;
        const idx = parseInt(step, 10);
        if (labelEl) labelEl.textContent = labels[idx];
        if (subEl) subEl.textContent = subs[idx];
        if (numEl) numEl.textContent = '0' + (idx + 1);
    }

    // Zoom scene
    if (document.getElementById('zoom-scene')) {
        gsap.to('#zoom-img-wrap', {
            width: '100vw', height: '100vh', borderRadius: 0, ease: 'none',
            scrollTrigger: {
                trigger: '#zoom-scene',
                start: 'top top', end: 'center top',
                scrub: 1,
            },
        });
        gsap.fromTo('#zoom-text',
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1, scale: 1, ease: 'none',
                scrollTrigger: {
                    trigger: '#zoom-scene',
                    start: 'top 50%', end: 'center top', scrub: 1,
                },
            }
        );
        gsap.to(['#zoom-img-wrap', '#zoom-text'], {
            opacity: 0, ease: 'none',
            scrollTrigger: {
                trigger: '#zoom-scene',
                start: 'center center', end: 'bottom bottom', scrub: 1,
            },
        });
    }

    // Horizontal scroll
    const hTrack = document.getElementById('h-track');
    if (hTrack && window.innerWidth >= 768) {
        const getScrollAmount = () => -(hTrack.scrollWidth - window.innerWidth);
        gsap.to(hTrack, {
            x: getScrollAmount, ease: 'none',
            scrollTrigger: {
                trigger: '#cases', start: 'top top',
                end: () => \`+=\${Math.abs(getScrollAmount())}\`,
                pin: true, scrub: 1, invalidateOnRefresh: true,
            },
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

    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      ${body}
    </>
  );
}`;
    fs.writeFileSync('src/app/page.tsx', tsxCode);
}

'use client';
import { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiveOTSection, { LIVE_OT_CASES } from '../components/LiveOTSection';
import TestimonialsSection, { TESTIMONIAL_VIDEOS } from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import HeroSection from '../components/HeroSection';
import ConditionsSection from '../components/ConditionsSection';
import CarePathwaySection from '../components/CarePathwaySection';
import ZoomSceneSection from '../components/ZoomSceneSection';
import DoctorProfileSection from '../components/DoctorProfileSection';
import ExperienceAndMemberships from '../components/ExperienceAndMemberships';
import BookingForm from '../components/BookingForm';
import { wrapWords } from '../utils/text';

const SITE_URL = 'https://drdeepanshugupta.com';

export default function Home() {
    // Guard against React Strict Mode's double-invoke of effects.
    // GSAP pin: mutates the DOM (inserts pinSpacer divs). If the effect
    // runs a second time before React properly unmounts, those spacers
    // conflict with React's fiber tree → removeChild / insertBefore crashes.
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return; // Skip Strict Mode second run
        initialized.current = true;
        gsap.registerPlugin(ScrollTrigger);

        /* ── Split-words: wrap words before animating ── */
        document.querySelectorAll('.split-words').forEach(el => wrapWords(el as HTMLElement));

        let ctx = gsap.context(() => {

            /* ── Hero parallax ── */
            gsap.to('#hero-img', {
                yPercent: 25, scale: 2.08, ease: 'none',
                scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true },
            });

            /* ── Hero entrance animations ── */
            const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            heroTl
                .to('.fade-up', { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.3)
                .fromTo('.hero-line', { y: '140%' }, { y: '0%', duration: 1.1, stagger: 0.12 }, 0.1);

            /* ── Zoom scene: CSS sticky handles pinning, GSAP drives animation ── */
            if (document.getElementById('zoom-scene')) {
                const zoomTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#zoom-scene',
                        start: 'top top',
                        end: '+=180%',
                        scrub: 1,
                        // No GSAP pin — .zoom-pin uses CSS sticky (no DOM mutation)
                        invalidateOnRefresh: true,
                    },
                });
                zoomTl
                    .to('#zoom-img-wrap', { width: '100vw', height: '100vh', borderRadius: 0, ease: 'none' }, 0)
                    .fromTo('#zoom-text', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, ease: 'power2.out' }, 0)
                    .to('#zoom-text', { opacity: 0, scale: 1.08, ease: 'power2.in' }, 0.85);
            }



            /* ── Section background theming ── */
            document.querySelectorAll('[data-bg]').forEach(section => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 55%',
                    end: 'bottom 45%',
                    onEnter: () => applySectionTheme(section as HTMLElement),
                    onEnterBack: () => applySectionTheme(section as HTMLElement),
                });
            });
            function applySectionTheme(section: HTMLElement) {
                const bg = section.dataset.bg;
                const theme = section.dataset.theme;
                if (bg) gsap.to(document.body, { backgroundColor: bg, duration: 0.8, ease: 'power2.inOut' });
                if (theme === 'dark') document.body.classList.add('on-dark');
                else document.body.classList.remove('on-dark');
            }

            /* ── Split-word reveal (now words are wrapped) ── */
            document.querySelectorAll('.split-words').forEach(heading => {
                gsap.to(heading.querySelectorAll('.word-inner'), {
                    y: '0%', duration: 1.1, stagger: 0.05, ease: 'power3.out',
                    scrollTrigger: { trigger: heading, start: 'top 85%' },
                });
            });

            /* ── Fade-in on scroll ── */
            gsap.utils.toArray('.fade-in-scroll').forEach(el => {
                gsap.from(el as HTMLElement, {
                    opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: el as HTMLElement, start: 'top 85%' },
                });
            });

            /* ── Animated counters ── */
            gsap.utils.toArray('[data-count]').forEach(el => {
                const target = parseFloat((el as HTMLElement).dataset.count || '0');
                const obj = { v: 0 };
                gsap.to(obj, {
                    v: target, duration: 2.2, ease: 'expo.out',
                    scrollTrigger: { trigger: el as HTMLElement, start: 'top 80%' },
                    onUpdate: () => { (el as HTMLElement).textContent = Math.round(obj.v).toLocaleString('en-IN'); },
                });
            });

            /* ── Condition cards stagger ── */
            gsap.fromTo('.condition-card', { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                scrollTrigger: { trigger: '#conditions', start: 'top 75%' },
            });

            /* ── Care pathway cards ── */
            gsap.fromTo('.pathway-card', { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: '#pathway', start: 'top 75%' },
            });

        });

        return () => {
            // kill(true) physically removes GSAP pin-spacer divs from the DOM
            // BEFORE React runs its removeChild during reconciliation.
            // kill(false) would leave spacers → React can't find #cases / .zoom-pin
            // in its expected parent → NotFoundError: removeChild.
            try {
                ScrollTrigger.getAll().forEach(st => st.kill(true));
                ScrollTrigger.clearScrollMemory();
                ctx.revert();
            } catch (_) { /* swallow any residual race */ }
            initialized.current = false; // allow re-init if component truly remounts
        };
    }, []);

    // LIVE_OT_CASES and TESTIMONIAL_VIDEOS share two ytIds (the same OT
    // footage appears in both the case-study carousel and the testimonial
    // carousel) — dedupe so the graph never emits two VideoObject nodes with
    // the same @id.
    const homeVideos = Array.from(
        new Map(
            [
                ...LIVE_OT_CASES.map((v) => ({ vid: v.vid, title: v.title, description: v.desc, duration: v.duration, uploadDate: v.uploadDate })),
                ...TESTIMONIAL_VIDEOS.map((v) => ({ vid: v.vid, title: `${v.name} — ${v.cond}`, description: v.quote, duration: v.duration, uploadDate: v.uploadDate })),
            ].map((v) => [v.vid, v])
        ).values()
    );

    return (
        <>
            {/* LiveOTSection's carousel and TestimonialsSection's click-gated
                players never got structured data — this is what actually gets
                them indexed as video content. */}
            {homeVideos.map((v) => (
                <script
                    key={v.vid}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'VideoObject',
                            name: v.title,
                            description: v.description,
                            thumbnailUrl: [`https://img.youtube.com/vi/${v.vid}/maxresdefault.jpg`],
                            uploadDate: v.uploadDate,
                            duration: v.duration,
                            embedUrl: `https://www.youtube.com/embed/${v.vid}`,
                            contentUrl: `https://www.youtube.com/watch?v=${v.vid}`,
                            publisher: {
                                '@type': 'Physician',
                                name: 'Dr. Deepanshu Gupta',
                                '@id': `${SITE_URL}/#physician`,
                            },
                        }).replace(/</g, '\\u003c'),
                    }}
                />
            ))}
            {/* ── Global style fixes injected inline ── */}
            <style>{`
                /* FAQ toggle rotation */
                .faq-toggle { transition: transform 0.3s ease; }
                .faq-toggle.rotated { transform: rotate(45deg); }

                /* Video card */
                .video-card { cursor: pointer; }

                /* Trust strip marquee */
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .trust-track { animation: marquee 28s linear infinite; }
                .trust-strip:hover .trust-track { animation-play-state: paused; }

                /* Hero fade-up initial */
                .fade-up { transform: translateY(28px); }

                /* Reveal mask for hero lines */
                .reveal-mask { overflow: hidden; }

                /* Smooth scroll (handled by Lenis) */

                /* Pathway card initial for gsap */
                .pathway-card { opacity: 0; }

                /* Condition card initial for gsap */
                .condition-card { opacity: 0; }

                /* Modal fade */
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                /* Mobile horizontal scroll fallback */
                @media (max-width: 767px) {
                    #h-container { overflow-x: auto; -webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory; }
                    #h-track { display: flex !important; width: max-content !important; }
                    #h-track > div { scroll-snap-align: start; }
                }

                /* Zoom scene */
                .zoom-pin { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 100vh; overflow: hidden; }
                #zoom-img-wrap {
                    position: relative;
                    width: 72vw;
                    height: 72vh;
                    border-radius: 2rem;
                    overflow: hidden;
                }
                #zoom-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
                .zoom-text {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
                .zoom-text-inner {
                    color: #fff;
                    font-size: clamp(2.5rem, 6vw, 5rem);
                    font-weight: 300;
                    text-align: center;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    text-shadow: 0 2px 40px rgba(0,0,0,0.5);
                }
                .zoom-text-inner em { font-style: italic; color: rgba(255,255,255,0.75); }
            `}</style>

            {/* ── HERO ── */}
            <HeroSection />



            {/* ── CONDITIONS GRID ── */}
            <ConditionsSection />

            {/* ── CARE PATHWAY ── */}
            <CarePathwaySection />

            {/* ── DOCTOR PROFILE ── */}
            <DoctorProfileSection />

            {/* ── WORK EXPERIENCE & MEMBERSHIPS ── */}
            <ExperienceAndMemberships />

            {/* ── ZOOM SCENE ── */}
            <ZoomSceneSection />
            {/* ── LIVE OT ── */}
            <LiveOTSection />





            {/* ── PATIENT TESTIMONIALS ── */}
            <TestimonialsSection />

            {/* ── FAQ ── */}
            <FAQSection />

            {/* ── BOOKING WIDGET ── */}
            <section id="book" className="section edge relative overflow-hidden" data-bg="#ffffff" data-theme="light">
                <div className="container-x">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <div className="chip mb-6 mx-auto"><span className="chip-dot"></span>07 &nbsp;/&nbsp; Book Free Consultation</div>
                        <h2 className="display-sm split-words">Let&apos;s get started.</h2>
                        <p className="body-lg mt-6">Same-day WhatsApp responses · Cashless insurance supported · Telemedicine available for remote patients.</p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <Suspense fallback={<div className="h-96 rounded-[2.5rem] bg-slate-50 animate-pulse" />}>
                            <BookingForm />
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    );
}
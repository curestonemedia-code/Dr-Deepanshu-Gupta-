'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';
import LiveOTSection from '../components/LiveOTSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import HeroSection from '../components/HeroSection';
import ConditionsSection from '../components/ConditionsSection';
import CarePathwaySection from '../components/CarePathwaySection';
import ZoomSceneSection from '../components/ZoomSceneSection';
import DoctorProfileSection from '../components/DoctorProfileSection';
import ExperienceAndMemberships from '../components/ExperienceAndMemberships';
import { wrapWords } from '../utils/text';

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



        /* ── Booking form multi-step ── */
        const steps = document.querySelectorAll<HTMLElement>('.booking-step');
        const dots = document.querySelectorAll<HTMLElement>('.booking-step-dot');
        let currentStep = 0;
        let selectedCondition = '';
        let selectedSlot = '';

        function goToStep(n: number) {
            steps.forEach((s, i) => s.classList.toggle('active', i === n));
            dots.forEach((d, i) => {
                d.classList.toggle('active', i <= n);
            });
            currentStep = n;
        }

        // Condition picks
        document.querySelectorAll('.cond-pick').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cond-pick').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedCondition = (btn as HTMLElement).dataset.value || '';
            });
        });

        // Slot picks
        document.querySelectorAll('.slot').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.slot').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSlot = (btn as HTMLElement).dataset.value || '';
            });
        });

        // Next buttons
        document.querySelectorAll('[data-next]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep === 0 && !selectedCondition) {
                    const errEl = steps[0].querySelector('.field-error');
                    if (errEl) errEl.textContent = 'Please select a condition to continue.';
                    return;
                }
                if (currentStep === 1) {
                    const dateInput = document.getElementById('bk-date') as HTMLInputElement;
                    if (!dateInput?.value) {
                        const errEl = steps[1].querySelector('.field-error');
                        if (errEl) errEl.textContent = 'Please pick a date.';
                        return;
                    }
                    if (!selectedSlot) {
                        const errEl = steps[1].querySelector('.field-error');
                        if (errEl) errEl.textContent = 'Please select a time slot.';
                        return;
                    }
                }
                // Clear errors
                steps[currentStep].querySelector('.field-error')!.textContent = '';
                goToStep(currentStep + 1);
            });
        });

        // Back buttons
        document.querySelectorAll('[data-prev]').forEach(btn => {
            btn.addEventListener('click', () => goToStep(currentStep - 1));
        });

        // Submit
        const submitBtn = document.getElementById('bk-submit');
        submitBtn?.addEventListener('click', () => {
            const name = (document.getElementById('bk-name') as HTMLInputElement)?.value.trim();
            const phone = (document.getElementById('bk-phone') as HTMLInputElement)?.value.trim();
            const errEl = steps[2].querySelector('.field-error');
            if (!name || !phone) {
                if (errEl) errEl.textContent = 'Name and phone number are required.';
                return;
            }
            if (errEl) errEl.textContent = '';
            // Show success
            document.querySelector('.booking-form')?.classList.add('hidden');
            document.querySelector('.booking-success')?.classList.add('visible');
            const refEl = document.getElementById('bk-ref');
            if (refEl) refEl.textContent = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
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

    return (
        <>
            {/* ── Global style fixes injected inline ── */}
            <style>{`
                /* FAQ toggle rotation */
                .faq-toggle { transition: transform 0.3s ease; }
                .faq-toggle.rotated { transform: rotate(45deg); }

                /* Booking steps */
                .booking-step { display: none; }
                .booking-step.active { display: block; }
                .booking-form.hidden { display: none; }
                .booking-success { display: none; }
                .booking-success.visible { display: block; }
                .booking-step-dot { transition: background 0.3s, transform 0.3s; }
                .booking-step-dot.active { background: var(--brand, #2563eb); transform: scale(1.2); }

                /* Slot active */
                .slot.active { background: var(--brand, #2563eb) !important; color: #fff !important; border-color: var(--brand, #2563eb) !important; }

                /* Condition pick selected */
                .cond-pick.selected { border-color: var(--brand, #2563eb) !important; background: rgba(37,99,235,0.06) !important; }
                .cond-pick.selected .cp-title { color: var(--brand, #2563eb); }

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

                /* Field error */
                .field-error { color: #ef4444; font-size: 0.8rem; min-height: 1.2em; margin-top: 0.25rem; }

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
                        <div className="chip mb-6 mx-auto"><span className="chip-dot"></span>07 &nbsp;/&nbsp; Book a Consultation</div>
                        <h2 className="display-sm split-words">Let&apos;s get started.</h2>
                        <p className="body-lg mt-6">Same-day WhatsApp responses · Cashless insurance supported · Telemedicine available for remote patients.</p>
                    </div>

                    <div id="booking" className="booking-wrap">
                        <div className="booking-steps">
                            <div className="booking-step-dot active"></div>
                            <div className="booking-step-dot"></div>
                            <div className="booking-step-dot"></div>
                        </div>

                        <div className="booking-form">
                            {/* STEP 1 */}
                            <div className="booking-step active" data-step="1">
                                <div className="eyebrow" style={{ color: 'var(--brand)', marginBottom: '0.75rem' }}>STEP 1 OF 3</div>
                                <h3 className="heading mb-2">What brings you here?</h3>
                                <p className="body-sm mb-6">Choose the area most relevant to your concern.</p>
                                <div className="cond-chip-grid">
                                    {[
                                        { val: 'kidney-stones', title: 'Kidney Stones', sub: 'RIRS, PCNL, laser removal' },
                                        { val: 'prostate', title: 'Prostate / BPH', sub: 'HoLEP, laser enucleation' },
                                        { val: 'infertility', title: 'Male Fertility', sub: 'Varicocele, hormonal, micro-TESE' },
                                        { val: 'other', title: 'General Urology', sub: 'Other concerns, second opinion' },
                                    ].map(({ val, title, sub }) => (
                                        <button key={val} className="cond-pick" data-value={val}>
                                            <div className="cp-title">{title}</div>
                                            <div className="cp-sub">{sub}</div>
                                        </button>
                                    ))}
                                </div>
                                <div className="field-error"></div>
                                <div className="booking-actions">
                                    <div></div>
                                    <button className="btn btn-primary" data-next>Continue <Icons.ArrowRight style={{ width: '16px', height: '16px' }} /></button>
                                </div>
                            </div>

                            {/* STEP 2 */}
                            <div className="booking-step" data-step="2">
                                <div className="eyebrow" style={{ color: 'var(--brand)', marginBottom: '0.75rem' }}>STEP 2 OF 3</div>
                                <h3 className="heading mb-2">Pick a date and time.</h3>
                                <p className="body-sm mb-6">Consultations available Monday to Saturday at CureStone Hospital, Sector 46 Gurugram.</p>
                                <div className="mb-5">
                                    <label className="field-label" htmlFor="bk-date">Preferred date</label>
                                    <input type="date" id="bk-date" className="field-input" />
                                </div>
                                <div className="mb-2">
                                    <label className="field-label">Time slot</label>
                                    <div className="slot-grid">
                                        {[['10:00', '10:00 AM'], ['11:00', '11:00 AM'], ['12:00', '12:00 PM'], ['16:00', '4:00 PM'], ['17:00', '5:00 PM'], ['18:00', '6:00 PM']].map(([v, l]) => (
                                            <button key={v} className="slot" data-value={v}>{l}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="field-error"></div>
                                <div className="booking-actions">
                                    <button className="btn btn-ghost" data-prev><Icons.ArrowLeft style={{ width: '16px', height: '16px' }} /> Back</button>
                                    <button className="btn btn-primary" data-next>Continue <Icons.ArrowRight style={{ width: '16px', height: '16px' }} /></button>
                                </div>
                            </div>

                            {/* STEP 3 */}
                            <div className="booking-step" data-step="3">
                                <div className="eyebrow" style={{ color: 'var(--brand)', marginBottom: '0.75rem' }}>STEP 3 OF 3</div>
                                <h3 className="heading mb-2">Your details.</h3>
                                <p className="body-sm mb-6">We&apos;ll confirm on WhatsApp within the hour. No charges for first-time consultation enquiries.</p>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="field-label" htmlFor="bk-name">Full name*</label>
                                        <input type="text" id="bk-name" className="field-input" placeholder="e.g. Rajesh Kumar" />
                                    </div>
                                    <div>
                                        <label className="field-label" htmlFor="bk-phone">Phone (WhatsApp)*</label>
                                        <input type="tel" id="bk-phone" className="field-input" placeholder="+91 98xxx xxxxx" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="field-label" htmlFor="bk-email">Email (optional)</label>
                                    <input type="email" id="bk-email" className="field-input" placeholder="you@example.com" />
                                </div>
                                <div className="mb-2">
                                    <label className="field-label" htmlFor="bk-note">A brief note about your concern (optional)</label>
                                    <textarea id="bk-note" className="field-textarea" placeholder="e.g. Detected 14mm kidney stone in CT last week, looking for a second opinion..."></textarea>
                                </div>
                                <div className="field-error"></div>
                                <div className="booking-actions">
                                    <button className="btn btn-ghost" data-prev><Icons.ArrowLeft style={{ width: '16px', height: '16px' }} /> Back</button>
                                    <button className="btn btn-primary" id="bk-submit">Confirm Booking <Icons.Check style={{ width: '16px', height: '16px' }} /></button>
                                </div>
                            </div>
                        </div>

                        {/* SUCCESS */}
                        <div className="booking-success">
                            <div className="check-anim"><Icons.Check style={{ width: '32px', height: '32px', strokeWidth: 3 }} /></div>
                            <h3 className="heading mb-3">Booking received.</h3>
                            <p className="body-lg mb-6 max-w-md mx-auto">Your reference is <strong id="bk-ref" style={{ color: 'var(--brand)' }}>—</strong>. We&apos;ll WhatsApp you a confirmation within the hour.</p>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <a href="https://wa.me/918800263884" className="btn btn-primary">
                                    <Icons.MessageCircle style={{ width: '16px', height: '16px' }} />Open WhatsApp
                                </a>
                                <a href="/" className="btn btn-ghost">Back to home</a>
                            </div>
                        </div>
                    </div>

                    <p className="body-sm text-center mt-6 max-w-xl mx-auto">
                        Your details are used only for scheduling this consultation. See our Privacy Policy for full terms.
                    </p>
                </div>
            </section>
        </>
    );
}
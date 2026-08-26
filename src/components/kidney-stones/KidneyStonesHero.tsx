'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function KidneyStonesHero() {
  return (
    // No VideoObject schema here: this video is one element beside the hero
    // copy, not this page's primary content — Search Console flags that as
    // "Video isn't on a watch page." The embed still plays; it just isn't
    // declared as the page's structured-data subject.
    <section className="cond-hero edge" data-bg="#ffffff" data-theme="light">
        <div className="cond-hero-bg"></div>
        <div className="container-x relative">
            <div className="cond-breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight style={{ width: '14px', height: '14px' }} />
                <Link href="/#conditions">Conditions</Link>
                <ChevronRight style={{ width: '14px', height: '14px' }} />
                <span>Kidney Stones</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                    <div className="chip mb-6"><span className="chip-dot"></span>Kidney Stones · Urolithiasis</div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black mb-6 split-words">Stones, dissolved. No cuts, no scars, no radiation.</h1>
                    <p className="body-lg max-w-2xl mb-8">The gold standard for kidney stone removal in 2026 — fluoroscopy-free RIRS and laser protocols achieving 98%+ single-session clearance across stones of every size, with same-day or next-day discharge.</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="card" style={{ padding: '1.25rem' }}>
                            <div className="body-sm">Clearance rate</div>
                            <div className="text-xl lg:text-2xl font-semibold mt-1" style={{ letterSpacing: '-0.02em' }}>98<span className="mark">%</span></div>
                        </div>
                        <div className="card" style={{ padding: '1.25rem' }}>
                            <div className="body-sm">Discharge</div>
                            <div className="text-xl lg:text-2xl font-semibold mt-1" style={{ letterSpacing: '-0.02em' }}>24<span className="mark">h</span></div>
                        </div>
                        <div className="card" style={{ padding: '1.25rem' }}>
                            <div className="body-sm">Radiation</div>
                            <div className="text-xl lg:text-2xl font-semibold mt-1" style={{ letterSpacing: '-0.02em' }}>Zero</div>
                        </div>
                        <div className="card" style={{ padding: '1.25rem' }}>
                            <div className="body-sm">Incisions</div>
                            <div className="text-xl lg:text-2xl font-semibold mt-1" style={{ letterSpacing: '-0.02em' }}>0</div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5">
                    <div className="video-frame shadow-2xl border border-slate-100">
                        <iframe
                            src="https://www.youtube.com/embed/J4Twv-dMfR4?si=AGYIPNA7Y9ASU-Xu"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

'use client';
import React, { useRef } from 'react';

// Exported so the home page (page.tsx) can build VideoObject JSON-LD for
// these — this carousel is a horizontally-scrolling row Googlebot won't
// drag through, so structured data is what actually gets these indexed
// as video content for this page.
export const LIVE_OT_CASES = [
        {
            vid: 'TTaSMfmViUk', label: 'Case 01 · Shimla',
            title: '22mm Stone Clearance',
            desc: 'Patient travelled from Shimla after 4 failed surgeries. Successfully treated using FANS-RIRS laser technology with a 24-hour discharge.',
            stats: [{ v: '24h', l: 'Discharge' }, { v: '0', l: 'Incisions' }, { v: 'Stone-Free', l: 'Outcome', accent: true }],
            uploadDate: '2026-01-06T06:30:27-08:00', duration: 'PT2M49S',
        },
        {
            vid: '4xDV33Zgba4', label: 'Case 02 · Assam',
            title: 'Thulium Laser Dusting',
            desc: 'Live OT footage demonstrating the pulverisation of a 21mm kidney stone causing PUJ blockage, performed on a patient from Assam.',
            stats: [{ v: '21mm', l: 'Stone Size' }, { v: 'PUJ', l: 'Blockage' }, { v: 'Laser', l: 'Thulium', accent: true }],
            uploadDate: '2026-02-10T06:30:09-08:00', duration: 'PT10M1S',
        },
        {
            vid: 'K5va1bE282M', label: 'Case 03 · Protocol',
            title: 'The FANS-RIRS Guide',
            desc: 'Dr. Gupta breaks down the exact mechanics of the surgery, explaining how modern laser protocols avoid the incisions and radiation exposure of traditional open surgery.',
            stats: [{ v: 'FANS', l: 'Technique' }, { v: 'Modern', l: 'Protocol' }, { v: 'Zero', l: 'Cuts', accent: true }],
            uploadDate: '2024-06-08T09:01:46-07:00', duration: 'PT20M21S',
        },
];

export default function LiveOTSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const scrollAmount = 760;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <section id="cases" className="py-12 md:py-20 relative bg-slate-50" data-bg="#f8fafc" data-theme="light">
            {/* No VideoObject schema here: this section renders on both / and
                /patients, and each clip is one card in a carousel, not a
                page's primary content — Search Console flags that combination
                as "Video isn't on a watch page." The videos still play; they
                just aren't declared as this page's structured-data subject. */}

            {/* Header */}
            <div className="container-x edge mb-8 md:mb-12">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
                                04 / Live OT
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 font-sans">
                            Operating theatre, unedited.
                        </h2>
                        <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed">
                            Real surgical footage and explainer videos. Navigate to explore each case.
                        </p>
                    </div>

                    {/* Arrow Buttons - Desktop */}
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors"
                            aria-label="Previous case"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors"
                            aria-label="Next case"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none px-6 md:px-12 lg:px-20 pb-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {LIVE_OT_CASES.map(({ vid, label, title, desc, stats }) => (
                    <div
                        key={vid}
                        className="w-[85vw] md:w-[640px] lg:w-[720px] xl:w-[780px] flex-shrink-0 snap-center bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center h-full">

                            {/* Video */}
                            <div className="md:col-span-5 relative aspect-video md:aspect-square lg:aspect-[1.3/1] rounded-2xl overflow-hidden bg-slate-900 shadow-sm">
                                <iframe
                                    className="absolute inset-0 w-full h-full border-0"
                                    src={`https://www.youtube.com/embed/${vid}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={title}
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="md:col-span-7 flex flex-col justify-between h-full min-h-[200px] py-1">
                                <div>
                                    <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-[#2563eb] text-[9px] font-bold tracking-wider uppercase mb-3 w-fit">
                                        {label}
                                    </div>
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-medium">
                                        {desc}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 mt-auto">
                                    {stats.map(({ v, l, accent }) => (
                                        <div key={l} className="flex flex-col">
                                            <span className={`text-lg md:text-xl font-bold tracking-tight ${accent ? 'text-blue-600' : 'text-slate-900'}`}>
                                                {v}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                                {l}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
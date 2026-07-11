'use client';
import React, { useState, useRef } from 'react';

// ── ICONS ──
const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);
const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const QuoteIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
);


// ── TESTIMONIAL CARD ──
function TestimonialCard({
    vid, name, cond, quote
}: {
    vid: string; name: string; cond: string; quote: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Fetch the real, authentic YouTube high-res thumbnail directly
    const imgUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;

    return (
        <div
            className="group relative rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 cursor-pointer aspect-[4/5] w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsPlaying(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setIsPlaying(true); }}
        >
            {isPlaying ? (
                <div className="absolute inset-0 w-full h-full bg-black">
                    <iframe
                        className="w-full h-full border-0"
                        src={`https://www.youtube.com/embed/${vid}?autoplay=1&rel=0&modestbranding=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={name}
                    />
                    {/* Return button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsPlaying(false);
                        }}
                        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/85 transition-colors border border-white/20"
                        aria-label="Close video"
                    >
                        <CloseIcon />
                    </button>
                </div>
            ) : (
                <div className="relative w-full h-full overflow-hidden">
                    <img
                        src={imgUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Play Button */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                            <PlayIcon />
                        </div>
                    </div>

                    {/* Quote Badge */}
                    <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
                            <QuoteIcon />
                        </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide">
                        Play Video
                    </div>

                    {/* Bottom Meta */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase mb-2">
                                {cond}
                            </div>
                            <h3 className="text-white text-lg font-black tracking-tight">{name}</h3>
                            <p className={`text-white/70 text-sm mt-1.5 leading-relaxed transition-all duration-500 ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'} overflow-hidden`}>
                                "{quote}"
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── MAIN SECTION ──
export default function TestimonialsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const testimonials = [
        {
            vid: 'TTaSMfmViUk',
            img: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=600&auto=format&fit=crop',
            name: 'Rajesh K., 48',
            cond: '22mm Stone · Shimla',
            quote: 'After 4 failed surgeries elsewhere, I finally found relief. The laser procedure was painless and I was home in 24 hours.'
        },
        {
            vid: '4xDV33Zgba4',
            img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop',
            name: 'Priyanka S., 36',
            cond: 'Staghorn Stone · Assam',
            quote: 'I travelled 2000 km for this treatment. The thulium laser dusting technology saved me from open surgery.'
        },
        {
            vid: 'K5va1bE282M',
            img: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=600&auto=format&fit=crop',
            name: 'Harish M., 62',
            cond: 'Prostate / HoLEP · Delhi',
            quote: 'At my age, I was terrified of surgery. The HoLEP procedure was remarkably smooth — no catheter, no pain.'
        },
        {
            vid: 'TTaSMfmViUk',
            img: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=600&auto=format&fit=crop',
            name: 'Vikram A., 41',
            cond: 'Male Infertility · Gurugram',
            quote: 'The microsurgical approach made all the difference. Professional, compassionate, and life-changing results.'
        },
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -340 : 340,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <section id="testimonials" className="py-11 md:py-15 bg-white relative overflow-hidden" data-bg="#ffffff" data-theme="light">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="container-x edge relative">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-5">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-slate-400">
                                    05 / Patient Voices
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                                In their own<br className="hidden md:block" /> words.
                            </h2>
                            <p className="text-base md:text-lg text-slate-500 mt-5 max-w-xl leading-relaxed">
                                Real patients sharing their experience — recorded after treatment, unscripted and unfiltered.
                            </p>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all hover:scale-105 active:scale-95 shadow-sm"
                                aria-label="Previous testimonial"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all hover:scale-105 active:scale-95 shadow-sm"
                                aria-label="Next testimonial"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cards Grid / Carousel - Changed container to horizontal scrollable wrapper on smaller viewports */}
                    <div
                        ref={scrollRef}
                        className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-none snap-x snap-mandatory pb-4 md:pb-0"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {testimonials.map((t) => (
                            <div key={t.name} className="w-[85vw] sm:w-[45vw] md:w-auto flex-shrink-0 snap-center">
                                <TestimonialCard
                                    vid={t.vid}
                                    name={t.name}
                                    cond={t.cond}
                                    quote={t.quote}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}

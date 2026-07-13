'use client';
import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowRight, Award, ShieldCheck, Activity, Zap, Medal, HeartPulse } from 'lucide-react';
import gsap from 'gsap';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Entrance animations
        const ctx = gsap.context(() => {
            gsap.to('.hero-line', {
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2
            });
            gsap.to('.fade-up', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.6
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* ── HERO ── */}
            <section
                id="top"
                ref={sectionRef}
                className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-white pt-24 lg:pt-28"
                data-bg="#ffffff"
                data-theme="light"
            >
                {/* Background Video */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-100 "
                        src="/Edit.mp4"
                    />
                    <div className="absolute inset-0 bg-white/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/60 lg:via-white/10 lg:via-white/0 lg:to-white/0" />
                </div>

                {/* Background Grid Pattern */}

                {/* Ambient Glow Orbs */}
                {/* <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-300/15 blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" /> */}
                {/* <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" /> */}
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-50/30 blur-3xl pointer-events-none" /> */}

                <div className="container-x edge relative z-10 py-20 md:py-0">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[calc(100dvh-10rem)] md:min-h-0">

                        {/* Left Content Column */}
                        <div className="lg:col-span-7 flex flex-col justify-center">

                            {/* Blue badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100/50 mb-6 fade-up opacity-0 translate-y-4 w-fit">
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">MCh Urology — Rank 1 (RML Hospital)</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black text-slate-900 tracking-tight leading-[1.05] mb-6 font-sans">
                                <div className="overflow-hidden">
                                    <span className="hero-line block" style={{ transform: 'translateY(110%)' }}>
                                        Specialized
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <span className="hero-line block" style={{ transform: 'translateY(110%)' }}>
                                        <span className="text-[#2563eb]">FANS-RIRS</span> Laser Surgery.
                                    </span>
                                </div>
                            </h1>

                            {/* Separation Line & Doctor Signature */}
                            <div className="flex items-center gap-3 mb-6 fade-up opacity-0 translate-y-4">
                                <span className="w-12 h-0.5 bg-[#2563eb] rounded-full"></span>
                                <span className="text-sm font-bold uppercase tracking-wider text-slate-600">By Dr. Deepanshu Gupta</span>
                            </div>

                            {/* Body Text */}
                            <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mb-8 fade-up opacity-0 translate-y-4 text-justify">
                                Specializing in fluoroscopy-free laser urology for kidney stone treatment. Over 9,000 procedures performed without the trauma, scars, or radiation of conventional surgery.
                            </p>

                            {/* CTA Button Actions */}
                            <div className="flex flex-wrap items-center gap-4 fade-up opacity-0 translate-y-4 mb-10">
                                <a
                                    href="#book"
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2563eb] text-white! text-sm hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-600/20 active:scale-95"
                                >
                                    <Calendar style={{ width: '18px', height: '18px' }} />
                                    <span>Book Free Consultation</span>
                                </a>
                                <a
                                    href="#cases"
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
                                >
                                    <span>Watch Live OT</span>
                                    <ArrowRight style={{ width: '16px', height: '16px' }} />
                                </a>
                            </div>

                            {/* Key Stats Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 fade-up opacity-0 translate-y-4">
                                {[
                                    { val: '9,000+', label: 'Surgical Cases' },
                                    { val: '98%', label: 'Success Rate', accent: true },
                                    { val: '15+', label: 'Years Practice' },
                                    { val: 'Rank 1', label: 'MCh (RML)' },
                                ].map(({ val, label, accent }) => (
                                    <div key={label} className="relative">
                                        <div className={`text-2xl md:text-3xl font-extrabold tracking-tight ${accent ? 'text-blue-600' : 'text-slate-900'}`}>{val}</div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">{label}</div>
                                        {accent && <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />}
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-75 animate-bounce">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Scroll</span>
                    <div className="w-5 h-8 rounded-full border-2 border-slate-400 flex justify-center pt-1.5">
                        <div className="w-1 h-2 bg-slate-600 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* ── TRUST STRIP ── */}
            <div className="border-t border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-sm py-5" data-bg="#f5f7ff" data-theme="light">
                <div className="container-x edge">
                    <div className="flex flex-wrap items-center justify-center md:justify-between gap-y-4 gap-x-8 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {[
                            { Icon: Award, text: 'MCh Urology Rank 1' },
                            { Icon: ShieldCheck, text: 'Fluoroscopy-Free Specialist' },
                            { Icon: Activity, text: '9,000+ Surgeries' },
                            { Icon: Zap, text: 'Thulium Laser Certified' },
                            { Icon: Medal, text: 'MS Gold Medalist' },
                            { Icon: HeartPulse, text: '98% Success Rate' },
                        ].map((item, i) => (
                            <span key={i} className="flex items-center gap-2 hover:text-slate-700 transition-colors">
                                <item.Icon className="text-blue-600" style={{ width: '16px', height: '16px' }} />
                                <span>{item.text}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
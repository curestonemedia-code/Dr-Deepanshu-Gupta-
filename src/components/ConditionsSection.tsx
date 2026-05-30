'use client';
import React from 'react';
import Link from 'next/link';
import { Zap, Shield, HeartPulse, ArrowUpRight } from 'lucide-react';

export default function ConditionsSection() {
    const conditions = [
        {
            href: '/kidney-stones',
            Icon: Zap,
            title: 'Kidney Stones',
            desc: 'Fluoroscopy-free laser removal for stones of every size, including complex and staghorn cases.',
            chips: ['FANS-RIRS', 'Mini-PCNL', 'Thulium Laser'],
        },
        {
            href: '/prostate',
            Icon: Shield,
            title: 'Prostate Enlargement',
            desc: 'HoLEP and laser enucleation for BPH — discreet, effective, with rapid return to normal life.',
            chips: ['HoLEP', 'ThuLEP', 'TURP'],
        },
        {
            href: '/andrology',
            Icon: HeartPulse,
            title: 'Male Infertility & Andrology',
            desc: "Evidence-based management of fertility concerns and comprehensive men's urological health.",
            chips: ['Varicocele', 'Micro-TESE', 'Hormonal'],
        },
    ];

    return (
        <section id="conditions" className="py-20 md:py-28 bg-white relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            
            {/* Ambient Glow Orb */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
            
            <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-14 md:mb-16">
                    <div className="flex items-center gap-2 mb-5">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-blue-600">
                            01 / Conditions Treated
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-[-0.035em] text-slate-900 leading-[1.1] font-sans">
                        Specialised care for<br className="hidden md:block" /> specialised problems.
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 mt-5 max-w-2xl leading-relaxed font-normal">
                        Deep expertise across three urological domains. Tap any condition to understand symptoms, diagnosis, and treatment options.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {conditions.map(({ href, Icon, title, desc, chips }) => {
                        return (
                            <Link
                                key={title}
                                href={href}
                                className="group relative block p-8 rounded-[2rem] border border-slate-100 bg-white hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.04)] transition-all duration-500 hover:-translate-y-1"
                            >
                                {/* Arrow - Top Right (Permanently visible matching the screenshot) */}
                                <div className="absolute top-8 right-8 w-9 h-9 rounded-full bg-blue-50/60 flex items-center justify-center border border-blue-100/30 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105">
                                    <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                                </div>

                                {/* Icon - Light blue rounded container matching screenshot */}
                                <div className="w-12 h-12 rounded-2xl bg-blue-50/80 flex items-center justify-center mb-6 text-blue-600 transition-transform duration-500 group-hover:scale-110">
                                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-[1.35rem] font-semibold text-slate-900 tracking-tight mb-3">
                                    {title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed mb-6 font-normal">
                                    {desc}
                                </p>

                                {/* Chips - Clean slate tags sentence/camel case matching screenshot */}
                                <div className="flex flex-wrap gap-2">
                                    {chips.map((chip) => (
                                        <span
                                            key={chip}
                                            className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100/40"
                                        >
                                            {chip}
                                        </span>
                                    ))}
                                </div>

                                {/* Bottom Accent Hover Line */}
                                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

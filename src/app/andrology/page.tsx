'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { wrapWords } from '../../utils/text';

export default function Andrology() {
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

            <section className="cond-hero edge relative overflow-hidden" data-bg="#ffffff" data-theme="light">
                {/* Animated background with subtle medical grid pattern */}
                <div className="cond-hero-bg absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white"></div>
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                {/* Subtle floating accent shapes */}
                <div className="absolute top-20 right-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>

                <div className="container-x relative z-10 pt-8 pb-16 lg:pb-24">
                    {/* Enhanced breadcrumb with better spacing and hover states */}
                    <nav aria-label="Breadcrumb" className="cond-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10 lg:mb-14">
                        <Link
                            href="/"
                            className="hover:text-slate-900 transition-colors duration-200 flex items-center gap-1 group"
                        >
                            <Icons.Home className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="hidden sm:inline">Home</span>
                        </Link>
                        <Icons.ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                        <Link
                            href="/#conditions"
                            className="hover:text-slate-900 transition-colors duration-200 hover:underline underline-offset-4 decoration-slate-300"
                        >
                            Conditions
                        </Link>
                        <Icons.ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                        <span className="text-slate-900 font-medium" aria-current="page">Male Health</span>
                    </nav>

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
                        {/* Main content area */}
                        <div className="lg:col-span-7 xl:col-span-8">
                            {/* Chip with pulse animation */}
                            <div className="chip mb-8">
                                <span className="chip-dot relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand)] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--brand)]"></span>
                                </span>
                                Male Infertility & Andrology
                            </div>

                            {/* Headline matched to the site's display type scale */}
                            <h1 className="display mb-8 split-words">
                                Answers, not assumptions. Discretion, always.
                            </h1>

                            {/* Body with better readability */}
                            <p className="body-lg max-w-2xl text-lg lg:text-xl text-slate-600 leading-relaxed">
                                A structured, evidence-based path through male fertility and andrological concerns — from first evaluation to microsurgical intervention.
                                <span className="block mt-3 text-slate-500 text-base lg:text-lg">
                                    No wasted time, no guesswork, and complete confidentiality at every step.
                                </span>
                            </p>

                            {/* CTA Buttons - Added for conversion */}
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link href="/?interest=infertility#book" className="px-8 py-4 bg-slate-900 text-white! rounded-xl font-semibold hover:bg-slate-800 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] flex items-center gap-2">
                                    Book Free Consultation
                                    <Icons.ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="#symptoms" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-[0.98] flex items-center gap-2">
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Stats cards with enhanced design */}
                        <div className="lg:col-span-5 xl:col-span-4">
                            <div className="grid grid-cols-2 gap-4 lg:gap-5">
                                {[
                                    { label: "Confidentiality", value: "Total", icon: Icons.Shield, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", hoverBg: "bg-emerald-500" },
                                    { label: "First review", value: "48", unit: "h", icon: Icons.Clock, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", hoverBg: "bg-blue-500" },
                                    { label: "Microsurgery", value: "Yes", icon: Icons.Scissors, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", hoverBg: "bg-violet-500" },
                                    { label: "IVF coordination", value: "Yes", icon: Icons.Heart, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", hoverBg: "bg-rose-500" }
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`card group relative overflow-hidden rounded-2xl border ${stat.border} bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 cursor-default`}
                                        style={{ padding: '1.25rem' }}
                                    >
                                        {/* Hover accent line */}
                                        <div className={`absolute top-0 left-0 right-0 h-1 ${stat.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                            </div>
                                            {stat.label === "First review" && (
                                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Fast</span>
                                            )}
                                        </div>

                                        <div className="body-sm text-slate-500 text-sm font-medium mb-1">{stat.label}</div>
                                        <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                                            {stat.value}
                                            {stat.unit && <span className={`text-2xl lg:text-3xl ${stat.color} ml-0.5`}>{stat.unit}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Trust badge */}
                            <div className="mt-6 flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold text-slate-900">2,400+</span>
                                    <span className="text-slate-500"> patients treated this year</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SYMPTOMS - Polished list with progressive reveal and clinical credibility */}
            <section id="symptoms" className="section-tight edge relative overflow-hidden" data-bg="#f5f7ff" data-theme="light">
                {/* Subtle dot pattern background */}
                <div className="absolute inset-0 opacity-[0.35]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241 / 0.12) 1px, transparent 0)`,
                    backgroundSize: '28px 28px'
                }}></div>

                <div className="container-x relative z-10 py-16 lg:py-24">
                    {/* Header with visual weight */}
                    <div className="max-w-3xl mb-12 lg:mb-16">
                        <div className="chip mb-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-100/50 border border-indigo-200/50 text-indigo-800 text-sm font-semibold">
                            <span className="chip-dot relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            When to seek evaluation
                        </div>
                        <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                            If any of these apply,{' '}
                            <span className="text-indigo-600">get it looked at.</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
                            Early evaluation leads to better outcomes. These are the most common indicators that a specialist review is warranted.
                        </p>
                    </div>

                    {/* Symptom list with enhanced cards */}
                    <ul className="space-y-3 lg:space-y-4 max-w-4xl">
                        {[
                            {
                                title: "Trying to conceive for 12+ months without success",
                                description: "The standard definition of infertility — and male factors contribute in ~40% of cases.",
                                tag: "Most common",
                                tagColor: "bg-amber-50 text-amber-700 border-amber-200"
                            },
                            {
                                title: "Low semen volume, count, or motility",
                                description: "Already noticed on a previous semen analysis — a structured workup finds the underlying cause.",
                                tag: "Actionable",
                                tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
                            },
                            {
                                title: "A palpable lump or 'bag of worms' in the scrotum",
                                description: "Classic sign of a varicocele — one of the most treatable causes of male infertility.",
                                tag: "High priority",
                                tagColor: "bg-rose-50 text-rose-700 border-rose-200"
                            },
                            {
                                title: "Low libido or persistent fatigue",
                                description: "May point to low testosterone or hormonal imbalance — treatable once identified.",
                                tag: "Hormonal",
                                tagColor: "bg-blue-50 text-blue-700 border-blue-200"
                            },
                            {
                                title: "Erectile difficulty or changes in sexual function",
                                description: "Common, confidential, and almost always treatable. Often the first sign of a wider issue.",
                                tag: "Treatable",
                                tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
                            },
                            {
                                title: "Testicular pain, shrinkage, or discomfort",
                                description: "Any persistent scrotal symptom warrants a specialist review — delay rarely helps.",
                                tag: "Urgent",
                                tagColor: "bg-rose-50 text-rose-700 border-rose-200"
                            }
                        ].map((symptom, index) => (
                            <li
                                key={index}
                                className="group flex items-start gap-4 lg:gap-5 bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-6 hover:shadow-lg hover:shadow-indigo-100/40 hover:border-indigo-200/60 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                            >
                                {/* Animated check circle */}
                                <div className="check flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                                    <Icons.Check
                                        className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors duration-300"
                                        strokeWidth={2.5}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 mb-1.5">
                                        <h3 className="text-base lg:text-lg font-black text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors">
                                            {symptom.title}
                                        </h3>
                                        <span className={`hidden sm:inline-flex flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border ${symptom.tagColor}`}>
                                            {symptom.tag}
                                        </span>
                                    </div>
                                    <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                                        {symptom.description}
                                    </p>
                                    {/* Mobile tag (below text) */}
                                    <span className={`sm:hidden inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-semibold border ${symptom.tagColor}`}>
                                        {symptom.tag}
                                    </span>
                                </div>

                                {/* Hover arrow */}
                                <div className="hidden lg:flex flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                                    <Icons.ChevronRight className="w-5 h-5 text-indigo-400" />
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Bottom action bar */}
                    <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 rounded-xl">
                                <Icons.ShieldCheck className="w-6 h-6 text-indigo-600" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900">Not sure if this applies to you?</div>
                                <div className="text-sm text-slate-600">Book a confidential 15-minute screening call — no obligation.</div>
                            </div>
                        </div>
                        <Link href="/?interest=infertility#book" className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-200 hover:shadow-lg active:scale-[0.98] whitespace-nowrap flex items-center justify-center gap-2">
                            Book Screening
                            <Icons.ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/*  DIAGNOSIS  */}
            <section className="section-tight edge" data-bg="#ffffff" data-theme="light">
                <div className="container-x">
                    <div className="grid lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-5">
                            <div className="chip mb-4"><span className="chip-dot"></span>Evaluation Process</div>
                            <h2 className="heading split-words">Methodical. Private. Fast.</h2>
                            <p className="body-lg mt-6">We start with the basics and escalate only when needed. Most patients have a complete diagnosis and plan within 7 days of the first visit.</p>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-day">Step 1</div>
                                    <div className="heading-sm mb-2">Detailed history & clinical exam</div>
                                    <p className="body">Medical, surgical, lifestyle, medications, and fertility history. A careful scrotal and general exam — far more informative than most patients expect.</p>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-day">Step 2</div>
                                    <div className="heading-sm mb-2">Semen analysis (WHO 2021)</div>
                                    <p className="body">The cornerstone test — usually two samples 2–4 weeks apart for reliability. We interpret against the latest WHO 2021 reference values, not outdated thresholds.</p>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-day">Step 3</div>
                                    <div className="heading-sm mb-2">Hormonal panel</div>
                                    <p className="body">Testosterone, FSH, LH, prolactin, TSH. Identifies hormonal causes that are often fully reversible with medical management.</p>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-day">Step 4</div>
                                    <div className="heading-sm mb-2">Scrotal ultrasound</div>
                                    <p className="body">Pinpoints varicoceles, cysts, or structural issues. Painless, 15 minutes.</p>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-day">Step 5</div>
                                    <div className="heading-sm mb-2">Advanced testing (if indicated)</div>
                                    <p className="body">Karyotype, Y-chromosome microdeletion, DNA fragmentation — only when the workup points there. No over-testing.</p>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-day">Step 6</div>
                                    <div className="heading-sm mb-2">Treatment plan</div>
                                    <p className="body">Clear, evidence-based options explained in plain language. If IVF/ICSI is the right path, we coordinate directly with your chosen fertility centre.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  TREATMENT OPTIONS  */}
            <section className="section edge" data-bg="#f5f7ff" data-theme="light">
                <div className="container-x">
                    <div className="max-w-3xl mb-10">
                        <div className="chip mb-4"><span className="chip-dot"></span>Treatment Options</div>
                        <h2 className="display-sm split-words">Matched to the cause, not a one-size approach.</h2>
                        <p className="body-lg mt-6">Male fertility has many causes — and each has a different, specific answer. The good news: most are highly treatable.</p>
                    </div>

                    <div className="grid gap-4">

                        <div className="treatment featured">
                            <div className="t-icon"><Icons.GitBranch style={{ "width": "24px", "height": "24px" }} /></div>
                            <div>
                                <div className="t-title">Microsurgical Varicocele Repair</div>
                                <div className="t-sub">Gold standard for varicocele — magnification preserves arteries and lymphatics</div>
                                <div className="t-tags">
                                    <span className="chip">Microscope-assisted</span>
                                    <span className="chip">Same-day discharge</span>
                                    <span className="chip">Improves counts in 60–70%</span>
                                </div>
                            </div>
                            <div className="t-cta">
                                <Link href="/?interest=infertility#book" className="btn btn-primary">Book</Link>
                            </div>
                        </div>

                        <div className="treatment">
                            <div className="t-icon"><Icons.Search style={{ "width": "24px", "height": "24px" }} /></div>
                            <div>
                                <div className="t-title">Micro-TESE</div>
                                <div className="t-sub">Microscopic sperm extraction for non-obstructive azoospermia — paired with ICSI</div>
                                <div className="t-tags">
                                    <span className="chip">Microsurgical</span>
                                    <span className="chip">Azoospermia</span>
                                    <span className="chip">IVF-coordinated</span>
                                </div>
                            </div>
                            <div className="t-cta">
                                <Link href="/?interest=infertility#book" className="btn btn-ghost">Book</Link>
                            </div>
                        </div>

                        <div className="treatment">
                            <div className="t-icon"><Icons.FlaskConical style={{ "width": "24px", "height": "24px" }} /></div>
                            <div>
                                <div className="t-title">Hormonal Management</div>
                                <div className="t-sub">Targeted therapy for hypogonadism, hyperprolactinaemia, and related conditions</div>
                                <div className="t-tags">
                                    <span className="chip">Non-surgical</span>
                                    <span className="chip">Evidence-based</span>
                                    <span className="chip">Reversible causes</span>
                                </div>
                            </div>
                            <div className="t-cta">
                                <Link href="/?interest=infertility#book" className="btn btn-ghost">Consult</Link>
                            </div>
                        </div>

                        <div className="treatment">
                            <div className="t-icon"><Icons.HeartPulse style={{ "width": "24px", "height": "24px" }} /></div>
                            <div>
                                <div className="t-title">Lifestyle & Medical Optimisation</div>
                                <div className="t-sub">Structured plan for weight, metabolic health, nutraceuticals, and habits</div>
                                <div className="t-tags">
                                    <span className="chip">Nutrition</span>
                                    <span className="chip">Supplements</span>
                                    <span className="chip">Monitoring</span>
                                </div>
                            </div>
                            <div className="t-cta">
                                <Link href="/?interest=infertility#book" className="btn btn-ghost">Consult</Link>
                            </div>
                        </div>

                    </div>

                    <div className="card mt-10" style={{ "background": "#fff", "padding": "1.5rem" }}>
                        <div className="flex items-start gap-4">
                            <div className="service-icon" style={{ "marginBottom": "0", "flexShrink": "0" }}><Icons.Info style={{ "width": "22px", "height": "22px" }} /></div>
                            <div>
                                <div className="font-semibold mb-1">Transparent pricing</div>
                                <p className="body-sm">Indicative ranges: Microsurgical varicocele repair from ₹70,000 · Micro-TESE from ₹1,10,000 (coordinated with IVF) · Initial andrology consultation from ₹1,500. Final cost depends on complexity and hospital stay. <strong>Partial coverage under most cashless insurance policies</strong>; we'll confirm exact eligibility before admission.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  RECOVERY  */}
            <section className="section-tight edge" data-bg="#ffffff" data-theme="light">
                <div className="container-x">
                    <div className="max-w-3xl mb-10">
                        <div className="chip mb-4"><span className="chip-dot"></span>Recovery · Microsurgical Varicocele Repair</div>
                        <h2 className="heading split-words">Outpatient procedure. Week-one return to normal.</h2>
                    </div>

                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-day">Day 0</div>
                            <div className="heading-sm mb-1">Procedure day</div>
                            <p className="body">Microsurgical repair under general or spinal anaesthesia, approximately 90 minutes. Small 2cm inguinal incision. Same-day discharge in most cases.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-day">Day 1–3</div>
                            <div className="heading-sm mb-1">Home rest</div>
                            <p className="body">Mild discomfort managed with oral analgesics. Light walking encouraged. Supportive underwear advised.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-day">Day 4–7</div>
                            <div className="heading-sm mb-1">Desk work resumes</div>
                            <p className="body">Most patients return to office and non-strenuous activity. Avoid lifting, cycling, or gym for two weeks.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-day">Week 2–4</div>
                            <div className="heading-sm mb-1">Full activity</div>
                            <p className="body">Resume gym, cycling, and normal sexual activity. Incision fully healed.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-day">Month 3</div>
                            <div className="heading-sm mb-1">Follow-up semen analysis</div>
                            <p className="body">Early parameter trends visible. Significant improvement in sperm count and motility typically seen at 3 months.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-day">Month 6</div>
                            <div className="heading-sm mb-1">Maximum benefit</div>
                            <p className="body">Sperm regeneration cycles complete. Full effect of surgery assessable — 60–70% of patients see meaningful improvement. Natural conception or IVF coordination follows.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/*  FAQ  */}
            <section className="section-tight edge" data-bg="#f5f7ff" data-theme="light">
                <div className="container-x">
                    <div className="max-w-3xl mb-10">
                        <div className="chip mb-4"><span className="chip-dot"></span>Questions</div>
                        <h2 className="heading split-words">About male fertility & andrology care.</h2>
                    </div>

                    <div className="faq-group max-w-3xl">
                        <div className="faq-item">
                            <div className="faq-q">
                                <span>How is my privacy protected?</span>
                                <div className="faq-toggle"><Icons.Plus style={{ "width": "16px", "height": "16px" }} /></div>
                            </div>
                            <div className="faq-a"><div>All andrology consultations are treated with complete confidentiality. Records are stored in secured clinical systems accessible only to the treating team. Reports are shared only with you — never with family members, employers, or insurers — unless you explicitly authorise it in writing. WhatsApp correspondence is handled on dedicated clinical lines.</div></div>
                        </div>
                        <div className="faq-item">
                            <div className="faq-q">
                                <span>What are realistic success rates?</span>
                                <div className="faq-toggle"><Icons.Plus style={{ "width": "16px", "height": "16px" }} /></div>
                            </div>
                            <div className="faq-a"><div>It depends on the underlying cause. For microsurgical varicocele repair, 60–70% of patients see meaningful semen parameter improvement, and natural pregnancy rates improve significantly over 12–24 months. For hormonal causes, outcomes are often excellent. For severe non-obstructive azoospermia, Micro-TESE finds usable sperm in 40–60% of cases when paired with ICSI. We give you honest, case-specific estimates — never blanket promises.</div></div>
                        </div>
                        <div className="faq-item">
                            <div className="faq-q">
                                <span>Is the cost transparent — no surprises later?</span>
                                <div className="faq-toggle"><Icons.Plus style={{ "width": "16px", "height": "16px" }} /></div>
                            </div>
                            <div className="faq-a"><div>Yes. Every patient receives a written, itemised estimate before admission — including surgeon fees, anaesthesia, hospital stay, OT charges, and consumables. If something changes intraoperatively (rare), you're informed and consent is re-taken. No hidden costs, no last-minute additions.</div></div>
                        </div>
                        <div className="faq-item">
                            <div className="faq-q">
                                <span>How long until we can expect a pregnancy?</span>
                                <div className="faq-toggle"><Icons.Plus style={{ "width": "16px", "height": "16px" }} /></div>
                            </div>
                            <div className="faq-a"><div>For surgical interventions like varicocele repair, sperm takes ~3 months to regenerate, so parameter improvement is assessed at 3–6 months. Natural conception typically follows within 12–24 months in responders. If IVF/ICSI is part of the plan, the timeline collapses dramatically — often 2–4 months from procedure to transfer. We review timelines with you and your partner together at the plan stage.</div></div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  CTA  */}
            <section className="cta-band edge section-tight" data-bg="#2B5CE6" data-theme="dark">
                <div className="container-x relative text-center">
                    <div className="chip mb-6 mx-auto" style={{ "background": "rgba(255,255,255,0.15)", "color": "#fff" }}>
                        <span className="chip-dot" style={{ "background": "#fff" }}></span>
                        Confidential, evidence-based care
                    </div>
                    <h2 className="display-sm mb-6 split-words" style={{ "color": "#fff" }}>Let's look at your case.</h2>
                    <p className="body-lg mb-10 max-w-xl mx-auto" style={{ "color": "rgba(255,255,255,0.85)" }}>
                        Send existing reports on WhatsApp for a discreet same-day opinion, or book a consultation slot.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/?interest=infertility#book" className="btn btn-white btn-lg">
                            <Icons.Calendar style={{ "width": "18px", "height": "18px" }} />
                            Book Free Consultation
                        </Link>
                        <a href="https://wa.me/918800263884" className="btn btn-lg" style={{ "background": "rgba(255,255,255,0.1)", "color": "#fff", "border": "1px solid rgba(255,255,255,0.2)" }}>
                            <Icons.MessageCircle style={{ "width": "18px", "height": "18px" }} />
                            WhatsApp Reports
                        </a>
                    </div>
                </div>
            </section>


        </>
    );
}
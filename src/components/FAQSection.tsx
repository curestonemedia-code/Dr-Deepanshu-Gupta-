'use client';
import React, { useState } from 'react';

// ── ICONS ──
const PlusIcon = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const MinusIcon = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const MessageCircleIcon = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

const ArrowUpRightIcon = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
    </svg>
);

const ShieldCheckIcon = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 12 15 16 10" />
    </svg>
);

// ── FAQ ITEM ──
function FAQItem({ question, answer, index, isOpen, onToggle }: {
    question: string;
    answer: string;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className={`border-b border-slate-200/80 transition-all duration-300 ${isOpen ? 'bg-blue-50/30' : 'bg-transparent hover:bg-slate-50/50'}`}>
            <button
                onClick={onToggle}
                className="w-full flex items-start gap-4 md:gap-5 py-5 md:py-6 px-4 md:px-6 text-left group"
                aria-expanded={isOpen}
            >
                {/* Number Badge */}
                <span className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 mt-0.5
                    ${isOpen ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Question */}
                <span className={`flex-1 text-base md:text-lg font-semibold leading-snug transition-colors duration-300 pr-2
                    ${isOpen ? 'text-blue-900' : 'text-slate-800 group-hover:text-slate-900'}`}>
                    {question}
                </span>

                {/* Toggle Icon */}
                <span className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5
                    ${isOpen ? 'bg-blue-600 text-white rotate-0 shadow-md shadow-blue-600/20' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
                    {isOpen ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                </span>
            </button>

            {/* Answer */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-6 md:pb-7 pl-16 md:pl-[4.5rem]">
                    <div className="relative">
                        <div className="absolute -left-4 md:-left-5 top-0 bottom-0 w-0.5 bg-blue-200 rounded-full" />
                        <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed md:leading-[1.7]">
                            {answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── MAIN SECTION ──
export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: 'Is laser surgery really painless?',
            a: 'The procedure itself is done under anaesthesia, so you feel nothing during. Post-operatively, because there are no cuts or incisions, discomfort is typically mild — most patients are off pain medication within 24–48 hours. Compared to open or PCNL surgery, the pain profile is dramatically lower.'
        },
        {
            q: 'What does "fluoroscopy-free" actually mean, and why should I care?',
            a: 'Most stone surgeries worldwide still use real-time X-ray (fluoroscopy) to guide instruments. That means repeated radiation exposure for you, the surgeon, and OT staff. My protocol uses high-resolution ultrasound and direct endoscopic vision instead, delivering zero radiation with equal or better precision. Particularly important for young patients, women of reproductive age, and anyone who may need repeat procedures.'
        },
        {
            q: 'How long until I can go back to work?',
            a: 'For RIRS/laser stone surgery, most patients resume desk work within 48–72 hours and full physical activity within a week. For HoLEP (prostate surgery), light activity resumes in 3–5 days, heavy exertion after 2 weeks.'
        },
        {
            q: 'Will my health insurance cover the surgery?',
            a: "Yes, in the vast majority of cases. We're empanelled with most major Indian insurers including Star Health, HDFC Ergo, ICICI Lombard, Bajaj Allianz, CGHS and ECHS. Our team handles cashless pre-authorisation directly."
        },
        {
            q: "What if the stone doesn't fully clear in one session?",
            a: 'Our single-session clearance rate is 98%+ even for complex and staghorn stones. For the rare case where residual fragments remain, a short second session is planned and typically included under the same treatment package.'
        },
        {
            q: 'Can I consult online before travelling to Gurugram?',
            a: 'Absolutely. Send your reports, CT/ultrasound scans, and prior prescriptions on WhatsApp for a written preliminary opinion within 2 hours. If surgery is indicated, we coordinate travel, stay, and discharge timing so you can be in-and-out within 48 hours.'
        },
        {
            q: 'What are the typical costs?',
            a: 'Transparent pricing based on procedure and complexity. Laser stone removal (RIRS) starts from ₹85,000; Mini-PCNL from ₹1,20,000; HoLEP from ₹1,50,000. We provide a written estimate before admission — no hidden charges.'
        },
        {
            q: 'What happens after discharge? Is there follow-up?',
            a: "Yes — follow-up is part of the treatment, not an afterthought. You'll have a scheduled review at 2 weeks for DJ stent removal (if placed), then a 6-week metabolic evaluation. WhatsApp access to our team remains open throughout."
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
            },
        })),
    };

    return (
        <section id="faq" className="py-20 md:py-28 bg-[#f5f7ff] relative overflow-hidden" data-bg="#f5f7ff" data-theme="light">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
            />
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-5 md:px-12 lg:px-20 relative">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                    
                    {/* Left Column - Sticky Header */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28">
                            <div className="flex items-center gap-2 mb-5">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-slate-400">
                                    06 / Questions
                                </span>
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-tight text-slate-900 leading-[1.1] font-sans">
                                Everything<br className="hidden lg:block" /> patients ask.
                            </h2>
                            
                            <p className="text-base md:text-lg text-slate-500 mt-5 leading-relaxed max-w-md font-normal">
                                The most common concerns we hear in the consultation room, answered honestly. If yours isn't here, message us directly.
                            </p>

                            {/* WhatsApp CTA */}
                            <a 
                                href="https://wa.me/918800263884" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 mt-8 px-6 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/50 transition-all duration-300 group animate-none"
                            >
                                <MessageCircleIcon className="text-green-600 group-hover:scale-110 transition-transform" />
                                <span>Ask on WhatsApp</span>
                                <ArrowUpRightIcon className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>

                            {/* Trust Badge */}
                            <div className="mt-8 flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100/50">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <ShieldCheckIcon className="text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-800">Verified Answers</div>
                                    <div className="text-xs text-slate-500">By Dr. Deepanshu Gupta</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - FAQ List */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_40px_rgba(0,0,0,0.03)] overflow-hidden">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    index={index}
                                    question={faq.q}
                                    answer={faq.a}
                                    isOpen={openIndex === index}
                                    onToggle={() => toggleFAQ(index)}
                                />
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-8 text-center lg:text-left">
                            <p className="text-sm text-slate-400 inline-flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Typically responds within 2 hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

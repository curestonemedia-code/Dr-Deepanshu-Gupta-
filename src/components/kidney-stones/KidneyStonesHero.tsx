'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// uploadDate is required by Google's video rich-result guidelines — date and
// duration pulled from the video's own YouTube watch page metadata.
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Bilateral Kidney Stones — How Are They Removed?",
  description: "Dr. Deepanshu Gupta explains treatment for bilateral (both-kidney) kidney stones and how they are removed with laser surgery.",
  thumbnailUrl: ["https://img.youtube.com/vi/J4Twv-dMfR4/hqdefault.jpg"],
  uploadDate: "2023-09-16T04:30:07-07:00",
  duration: "PT4M41S",
  embedUrl: "https://www.youtube.com/embed/J4Twv-dMfR4",
  contentUrl: "https://www.youtube.com/watch?v=J4Twv-dMfR4",
  publisher: {
    "@type": "Physician",
    "@id": "https://drdeepanshugupta.com/#physician",
    name: "Dr. Deepanshu Gupta",
  },
};

export default function KidneyStonesHero() {
  return (
    <section className="cond-hero edge" data-bg="#ffffff" data-theme="light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema).replace(/</g, "\\u003c") }}
        />
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

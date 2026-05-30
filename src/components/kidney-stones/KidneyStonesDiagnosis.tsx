'use client';
import React from 'react';

export default function KidneyStonesDiagnosis() {
  return (
    <section className="section-tight edge" data-bg="#ffffff" data-theme="light">
        <div className="container-x">
            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                    <div className="chip mb-4"><span className="chip-dot"></span>Diagnosis Process</div>
                    <h2 className="heading split-words">From first call to confirmed plan — 48 hours.</h2>
                    <p className="body-lg mt-6">Most of our patients arrive with reports from another clinic. We review everything, order any gaps, and confirm a precise treatment plan inside two days.</p>
                </div>
                <div className="lg:col-span-7">
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-day">Day 0 · Initial Contact</div>
                            <div className="heading-sm mb-2">WhatsApp or phone consult</div>
                            <p className="body">Send existing reports, scans, and prescriptions. We review within 2 hours and share a preliminary opinion.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-day">Day 1 · In-person review</div>
                            <div className="heading-sm mb-2">Detailed consultation</div>
                            <p className="body">Physical examination, imaging review, and — if needed — additional ultrasound or low-dose non-contrast CT done on-site.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-day">Day 2 · Final plan</div>
                            <div className="heading-sm mb-2">Treatment plan & written estimate</div>
                            <p className="body">Exact procedure, anaesthesia type, admission duration, and all-inclusive cost confirmed in writing. Cashless insurance pre-approval initiated.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

'use client';
import React from 'react';

export default function KidneyStonesRecovery() {
  return (
    <section className="section-tight edge" data-bg="#ffffff" data-theme="light">
        <div className="container-x">
            <div className="max-w-3xl mb-10">
                <div className="chip mb-4"><span className="chip-dot"></span>Recovery Timeline</div>
                <h2 className="heading split-words">Back to your life, not a hospital bed.</h2>
            </div>

            <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-day">Hour 0–2</div>
                    <div className="heading-sm mb-1">In Recovery</div>
                    <p className="body">You wake up comfortable. Mild grogginess from anaesthesia. Water sips within the hour.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-day">Hour 4–6</div>
                    <div className="heading-sm mb-1">Walking & eating</div>
                    <p className="body">Light meal and short walks. Most patients are surprised how unaffected they feel.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-day">Day 1</div>
                    <div className="heading-sm mb-1">Discharge</div>
                    <p className="body">Typically discharged within 24 hours. Short walks, normal diet, mild oral analgesia if needed.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-day">Day 2–4</div>
                    <div className="heading-sm mb-1">Back to desk work</div>
                    <p className="body">Most patients resume office work, light social activity. DJ stent (if placed) causes mild frequency/urgency — settles quickly.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-day">Week 2</div>
                    <div className="heading-sm mb-1">Stent removal</div>
                    <p className="body">Brief 15-minute OPD procedure to remove the DJ stent. Full physical activity resumes.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-day">Week 6</div>
                    <div className="heading-sm mb-1">Metabolic review</div>
                    <p className="body">Blood and urine workup to understand why the stone formed. Personalised prevention plan so it doesn't happen again.</p>
                </div>
            </div>
        </div>
    </section>
  );
}

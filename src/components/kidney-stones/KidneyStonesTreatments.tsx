'use client';
import React from 'react';
import Link from 'next/link';
import { Zap, Target, Waves, Pill, Info } from 'lucide-react';

export default function KidneyStonesTreatments() {
  return (
    <section className="section edge" data-bg="#f5f7ff" data-theme="light">
        <div className="container-x">
            <div className="max-w-3xl mb-10">
                <div className="chip mb-4"><span className="chip-dot"></span>Treatment Options</div>
                <h2 className="display-sm split-words">Matched to your stone, not the other way around.</h2>
                <p className="body-lg mt-6">Stone size, location, density, and your anatomy all inform which approach gives the cleanest result with fastest recovery. Here's what we use.</p>
            </div>

            <div className="grid gap-4">
                <div className="treatment featured">
                    <div className="t-icon"><Zap style={{ width: '24px', height: '24px' }} /></div>
                    <div>
                        <div className="t-title">FANS-RIRS (Fluoroscopy-Free Retrograde Intra-Renal Surgery)</div>
                        <div className="t-sub">Best for most stones 5–25 mm in the kidney or upper ureter</div>
                        <div className="t-tags">
                            <span className="chip">Laser</span>
                            <span className="chip">No cuts</span>
                            <span className="chip">Zero radiation</span>
                            <span className="chip">24h discharge</span>
                        </div>
                    </div>
                    <div className="t-cta">
                        <Link href="/?interest=kidney-stones#book" className="btn btn-primary">Book</Link>
                    </div>
                </div>

                <div className="treatment">
                    <div className="t-icon"><Target style={{ width: '24px', height: '24px' }} /></div>
                    <div>
                        <div className="t-title">Mini-PCNL</div>
                        <div className="t-sub">For staghorn or large complex stones — microscopic keyhole tract</div>
                        <div className="t-tags">
                            <span className="chip">Large stones</span>
                            <span className="chip">Keyhole</span>
                            <span className="chip">2-day stay</span>
                        </div>
                    </div>
                    <div className="t-cta">
                        <Link href="/?interest=kidney-stones#book" className="btn btn-ghost">Book</Link>
                    </div>
                </div>

                <div className="treatment">
                    <div className="t-icon"><Waves style={{ width: '24px', height: '24px' }} /></div>
                    <div>
                        <div className="t-title">ESWL (Shock Wave Lithotripsy)</div>
                        <div className="t-sub">Non-invasive option for small, favourable stones &lt; 10 mm</div>
                        <div className="t-tags">
                            <span className="chip">Non-invasive</span>
                            <span className="chip">Outpatient</span>
                            <span className="chip">Multi-session</span>
                        </div>
                    </div>
                    <div className="t-cta">
                        <Link href="/?interest=kidney-stones#book" className="btn btn-ghost">Book</Link>
                    </div>
                </div>

                <div className="treatment">
                    <div className="t-icon"><Pill style={{ width: '24px', height: '24px' }} /></div>
                    <div>
                        <div className="t-title">Medical Expulsive Therapy</div>
                        <div className="t-sub">For small asymptomatic stones — supported by lifestyle and diet guidance</div>
                        <div className="t-tags">
                            <span className="chip">Medication</span>
                            <span className="chip">Diet plan</span>
                            <span className="chip">Monitoring</span>
                        </div>
                    </div>
                    <div className="t-cta">
                        <Link href="/?interest=kidney-stones#book" className="btn btn-ghost">Consult</Link>
                    </div>
                </div>
            </div>

            <div className="card mt-10" style={{ background: '#fff', padding: '1.5rem' }}>
                <div className="flex items-start gap-4">
                    <div className="service-icon" style={{ marginBottom: '0', flexShrink: '0' }}>
                        <Info style={{ width: '22px', height: '22px' }} />
                    </div>
                    <div>
                        <div className="font-semibold mb-1">Transparent pricing</div>
                        <p className="body-sm">Indicative ranges: FANS-RIRS from ₹85,000 · Mini-PCNL from ₹1,20,000 · ESWL from ₹25,000 per session. Final cost depends on stone burden and hospital stay. <strong>Most costs are fully covered under cashless insurance</strong> (Star, HDFC Ergo, ICICI Lombard, Bajaj Allianz, CGHS, ECHS, and more).</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

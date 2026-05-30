'use client';
import React from 'react';
import { Check } from 'lucide-react';

export default function KidneyStonesSymptoms() {
  return (
    <section className="section-tight edge" data-bg="#f5f7ff" data-theme="light">
        <div className="container-x">
            <div className="max-w-3xl mb-10">
                <div className="chip mb-4"><span className="chip-dot"></span>Signs & Symptoms</div>
                <h2 className="heading split-words">If any of this sounds familiar, it's time to get scanned.</h2>
            </div>

            <ul className="symptom-list">
                <li>
                    <div className="check"><Check style={{ width: '14px', height: '14px' }} /></div>
                    <div>
                        <strong>Sharp pain in the back or side</strong>
                        <div className="body-sm mt-1">Often radiating to the lower abdomen or groin — comes in waves.</div>
                    </div>
                </li>
                <li>
                    <div className="check"><Check style={{ width: '14px', height: '14px' }} /></div>
                    <div>
                        <strong>Blood in urine (pink, red, or brown)</strong>
                        <div className="body-sm mt-1">Even a faint tint is worth investigating immediately.</div>
                    </div>
                </li>
                <li>
                    <div className="check"><Check style={{ width: '14px', height: '14px' }} /></div>
                    <div>
                        <strong>Burning or painful urination</strong>
                        <div className="body-sm mt-1">Often confused with a UTI — but can indicate a stone passing.</div>
                    </div>
                </li>
                <li>
                    <div className="check"><Check style={{ width: '14px', height: '14px' }} /></div>
                    <div>
                        <strong>Nausea and vomiting</strong>
                        <div className="body-sm mt-1">Typically accompanies severe renal colic.</div>
                    </div>
                </li>
                <li>
                    <div className="check"><Check style={{ width: '14px', height: '14px' }} /></div>
                    <div>
                        <strong>Frequent urge to urinate</strong>
                        <div className="body-sm mt-1">Especially when the stone is in the lower ureter or bladder.</div>
                    </div>
                </li>
                <li>
                    <div className="check"><Check style={{ width: '14px', height: '14px' }} /></div>
                    <div>
                        <strong>Fever and chills</strong>
                        <div className="body-sm mt-1">A red flag — may indicate an infected obstructed stone. Seek care within hours.</div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
  );
}

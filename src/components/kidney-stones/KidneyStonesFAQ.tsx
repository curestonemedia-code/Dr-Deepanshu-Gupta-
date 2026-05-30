'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className={`faq-item border-b border-slate-200/80 transition-all duration-300 ${isOpen ? 'bg-blue-50/20' : 'bg-transparent'}`}>
      <button
        onClick={onToggle}
        className="faq-q w-full flex items-center justify-between py-5 px-6 text-left group"
        aria-expanded={isOpen}
        style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyItems: 'space-between' }}
      >
        <span className={`text-base md:text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-blue-900' : 'text-slate-800'}`}>
          {question}
        </span>
        <div className={`faq-toggle flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
          {isOpen ? <Minus style={{ width: '16px', height: '16px' }} /> : <Plus style={{ width: '16px', height: '16px' }} />}
        </div>
      </button>

      <div className={`faq-a overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm md:text-[15px]">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function KidneyStonesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Can you really avoid fluoroscopy for all stone sizes?',
      a: 'Yes — for essentially every case I see. Using high-resolution ultrasound for guidance and direct endoscopic vision inside the kidney, we achieve the same (often better) precision without a single milligray of radiation exposure. This is especially important for young patients and anyone likely to need future imaging or repeat procedures.',
    },
    {
      q: 'My stone is 20+ mm. Is RIRS still possible, or do I need open surgery?',
      a: 'Open surgery is almost never required in modern practice. For stones in the 15–25 mm range, FANS-RIRS with Thulium laser dusting typically clears them in a single session. For 25 mm+ or staghorn stones, Mini-PCNL via a 5mm keyhole tract achieves complete clearance. Either way — no large incisions, no weeks of recovery.',
    },
    {
      q: 'Why does my stone keep coming back?',
      a: 'Stone recurrence is driven by an underlying metabolic or dietary factor — uric acid levels, calcium metabolism, hydration patterns, diet composition. Without addressing that, any surgery only clears the current stone. That\'s why every patient gets a metabolic workup at the 6-week mark and a personalised prevention plan.',
    },
    {
      q: 'Is it safe if I\'m pregnant or planning to conceive?',
      a: 'This is precisely why the fluoroscopy-free protocol matters. For pregnant patients or those planning conception, we can safely perform RIRS without exposing the patient or foetus to any radiation. We coordinate closely with your obstetrician throughout.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-tight edge" data-bg="#f5f7ff" data-theme="light">
        <div className="container-x">
            <div className="max-w-3xl mb-10">
                <div className="chip mb-4"><span className="chip-dot"></span>Questions</div>
                <h2 className="heading split-words">About kidney stone treatment.</h2>
            </div>

            <div className="faq-group max-w-3xl bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_40px_rgba(0,0,0,0.03)] overflow-hidden">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                ))}
            </div>
        </div>
    </section>
  );
}

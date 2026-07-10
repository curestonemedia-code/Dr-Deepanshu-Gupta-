"use client";

import { useState } from "react";
import type { FaqItem } from "@/constants/faqs";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_40px_rgba(0,0,0,0.03)] overflow-hidden">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={i} className={`border-b border-slate-200/80 last:border-b-0 transition-colors ${isOpen ? "bg-blue-50/20" : ""}`}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 px-6 text-left"
              aria-expanded={isOpen}
            >
              <span className={`text-base md:text-lg font-semibold ${isOpen ? "text-blue-900" : "text-slate-800"}`}>
                {faq.q}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "bg-blue-600 text-white rotate-45" : "bg-slate-100 text-slate-500"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-sm md:text-[15px] text-slate-600 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

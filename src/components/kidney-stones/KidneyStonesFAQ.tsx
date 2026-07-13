'use client';
import FaqAccordion from '@/components/FaqAccordion';

export default function KidneyStonesFAQ() {
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
    <section className="section-tight edge" data-bg="#f5f7ff" data-theme="light">
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        />
        <div className="container-x">
            <div className="max-w-3xl mb-10">
                <div className="chip mb-4"><span className="chip-dot"></span>Questions</div>
                <h2 className="heading split-words">About kidney stone treatment.</h2>
            </div>

            <div className="max-w-3xl">
                <FaqAccordion items={faqs} />
            </div>
        </div>
    </section>
  );
}

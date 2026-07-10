import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { ALL_FAQS, FAQ_CATEGORIES } from "@/constants/faqs";

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "FAQs — Kidney Stones, Prostate & Andrology";
const DESCRIPTION =
  "Answers to common questions on FANS-RIRS kidney stone surgery, HoLEP prostate treatment, and male fertility care with Dr. Deepanshu Gupta at Cure Stone Hospital, Gurugram.";
const URL = `${SITE_URL}/faq`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Dr. Deepanshu Gupta",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/doctor.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/doctor.png"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "FAQ", item: URL },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />

      <section className="section-tight edge relative overflow-hidden bg-slate-50/50" data-bg="#f8fafc" data-theme="light">
        <div className="container mx-auto px-5 md:px-12 lg:px-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-[0.1em] text-blue-700 uppercase">FAQ</span>
          </div>
          <h1 className="display-sm text-slate-900 font-bold mb-6">Frequently Asked Questions</h1>
          <p className="body-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Answers on kidney stones, prostate treatment, and male fertility &amp; andrology care.
          </p>

          <nav aria-label="FAQ categories" className="flex flex-wrap justify-center gap-2">
            {FAQ_CATEGORIES.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section edge">
        <div className="container mx-auto px-5 md:px-12 lg:px-20 max-w-3xl space-y-16">
          {FAQ_CATEGORIES.map((category) => (
            <div key={category.slug} id={category.slug} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <h2 className="heading">{category.title}</h2>
                {category.relatedHref && (
                  <Link href={category.relatedHref} className="text-sm font-black text-blue-600 hover:underline whitespace-nowrap">
                    {category.relatedLabel} →
                  </Link>
                )}
              </div>
              <FaqAccordion items={category.items} />
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band edge section-tight" data-bg="#2B5CE6" data-theme="dark">
        <div className="container-x relative text-center">
          <h2 className="display-sm mb-6 split-words" style={{ color: "#fff" }}>Still have questions?</h2>
          <p className="body-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
            Send your reports on WhatsApp or book a free consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/?interest=other#book" className="btn btn-white btn-lg">
              Book a Consultation
            </Link>
            <a
              href="https://wa.me/918800263884"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

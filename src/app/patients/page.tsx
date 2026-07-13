import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LiveOTSection from "@/components/LiveOTSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "Patient Stories & Live OT Footage";
const DESCRIPTION =
  "Real patient testimonials and unedited live operating theatre footage from FANS-RIRS kidney stone surgery, HoLEP prostate treatment, and andrology care with Dr. Deepanshu Gupta at Cure Stone Hospital, Gurugram.";
const URL = `${SITE_URL}/patients`;

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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Patients", item: URL },
  ],
};

export default function PatientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />

      <section className="cond-hero edge" data-bg="#f8fafc" data-theme="light">
        <div className="cond-hero-bg"></div>
        <div className="container-x relative text-center">
          <div className="cond-breadcrumb justify-center">
            <Link href="/">Home</Link>
            <ChevronRight style={{ width: "14px", height: "14px" }} />
            <span>Patients</span>
          </div>
          <div className="chip mb-6 mx-auto w-fit">
            <span className="chip-dot"></span>Patients
          </div>
          <h1 className="display-sm text-slate-900 mb-6">Patient Stories & Live OT Footage</h1>
          <p className="body-lg text-slate-600 max-w-2xl mx-auto">
            Unscripted patient experiences and real, unedited operating theatre footage from kidney stone, prostate, and andrology procedures.
          </p>
        </div>
      </section>

      <LiveOTSection />
      <TestimonialsSection />

      <section className="pb-24 text-center px-5">
        <Link
          href="/?interest=other#book"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#2563eb] text-white! font-black rounded-full hover:bg-blue-700 transition-all"
        >
          Book Free Consultation
        </Link>
      </section>
    </>
  );
}

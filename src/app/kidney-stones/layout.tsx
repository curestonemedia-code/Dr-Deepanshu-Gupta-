import type { Metadata } from "next";
import { FAQ_CATEGORIES } from "@/constants/faqs";

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "Kidney Stone Treatment (FANS-RIRS)";
const DESCRIPTION =
  "Fluoroscopy-free FANS-RIRS laser treatment for kidney stones of every size, including complex and staghorn cases, with Dr. Deepanshu Gupta at Cure Stone Hospital, Gurugram.";
const URL = `${SITE_URL}/kidney-stones`;

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

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  about: {
    "@type": "MedicalCondition",
    name: "Kidney Stones",
  },
  mainContentOfPage: {
    "@type": "WebPageElement",
  },
  reviewedBy: {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: "Dr. Deepanshu Gupta",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Kidney Stones", item: URL },
  ],
};

const procedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "FANS-RIRS — Fluoroscopy-Free Retrograde Intra-Renal Surgery",
  procedureType: "http://schema.org/PercutaneousProcedure",
  description:
    "A flexible ureteroscope is passed through natural urinary pathways to reach the kidney, where a laser fragments the stone under ultrasound and direct endoscopic guidance instead of X-ray fluoroscopy, avoiding radiation exposure.",
  howPerformed:
    "Performed under anaesthesia using a flexible ureteroscope and Thulium/Holmium laser, guided by high-resolution ultrasound and direct endoscopic vision rather than fluoroscopy.",
  preparation: "Suitable for stones from 5–25mm in the kidney or upper ureter, confirmed by CT/ultrasound imaging.",
  followup: "Most patients are discharged within 24–48 hours, with a 2-week review for stent removal and a 6-week metabolic evaluation.",
  bodyLocation: "Kidney",
  provider: {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: "Dr. Deepanshu Gupta",
  },
};

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "kidney-stones")!;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategory.items.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function KidneyStonesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      {children}
    </>
  );
}

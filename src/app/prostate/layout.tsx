import type { Metadata } from "next";
import { FAQ_CATEGORIES } from "@/constants/faqs";

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "Prostate Enlargement (BPH) Treatment — HoLEP";
const DESCRIPTION =
  "HoLEP and laser enucleation for prostate enlargement (BPH) with Dr. Deepanshu Gupta at Cure Stone Hospital, Gurugram — size-independent, minimal bleeding, rapid return to normal life.";
const URL = `${SITE_URL}/prostate`;

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
    name: "Benign Prostatic Hyperplasia (BPH)",
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
    { "@type": "ListItem", position: 2, name: "Prostate / BPH", item: URL },
  ],
};

const procedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "HoLEP — Holmium Laser Enucleation of the Prostate",
  procedureType: "http://schema.org/PercutaneousProcedure",
  description:
    "Size-independent laser enucleation for prostate enlargement (BPH), removing obstructing prostate tissue with minimal bleeding and a low re-treatment rate.",
  howPerformed:
    "A holmium laser enucleates the enlarged prostate tissue via a scope passed through the urethra; the tissue is then morcellated and removed, with no external incision.",
  preparation: "Suitable for any prostate size, including glands larger than 80g where TURP is not indicated.",
  followup: "Catheter typically removed on Day 2 with same-day discharge; light activity resumes in 3–5 days, full activity in 2–4 weeks.",
  bodyLocation: "Prostate",
  provider: {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: "Dr. Deepanshu Gupta",
  },
};

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "prostate")!;

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

export default function ProstateLayout({ children }: { children: React.ReactNode }) {
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

import type { Metadata } from "next";
import { FAQ_CATEGORIES } from "@/constants/faqs";

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "Male Infertility & Andrology Care";
const DESCRIPTION =
  "Evidence-based management of male fertility concerns and andrological health — varicocele, micro-TESE, and hormonal evaluation with Dr. Deepanshu Gupta at Cure Stone Hospital, Gurugram.";
const URL = `${SITE_URL}/andrology`;

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
    name: "Male Infertility",
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
    { "@type": "ListItem", position: 2, name: "Male Infertility & Andrology", item: URL },
  ],
};

const procedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Microsurgical Varicocele Repair",
  procedureType: "http://schema.org/SurgicalProcedure",
  description:
    "Gold-standard microsurgical repair for varicocele using operating-microscope magnification to ligate dilated veins while preserving the testicular artery and lymphatics, improving sperm counts in 60–70% of cases.",
  howPerformed:
    "Performed under magnification with an operating microscope through a small sub-inguinal incision, allowing precise identification and ligation of the affected veins while sparing the artery and lymphatic channels.",
  followup: "Same-day discharge, with semen parameters typically reassessed over the following months.",
  bodyLocation: "Scrotum / spermatic cord",
  provider: {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: "Dr. Deepanshu Gupta",
  },
};

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "andrology")!;

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

export default function AndrologyLayout({ children }: { children: React.ReactNode }) {
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

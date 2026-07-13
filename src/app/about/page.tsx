import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DoctorProfileSection from "@/components/DoctorProfileSection";
import ExperienceAndMemberships from "@/components/ExperienceAndMemberships";

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "About Dr. Deepanshu Gupta";
const DESCRIPTION =
  "Credentials, work experience and professional memberships of Dr. Deepanshu Gupta — MCh Urology (Rank 1, RML Hospital), MS (Gold Medalist), Senior Consultant at Cure Stone Hospital, Gurugram.";
const URL = `${SITE_URL}/about`;

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
    type: "profile",
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
    { "@type": "ListItem", position: 2, name: "About", item: URL },
  ],
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  mainEntity: {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: "Dr. Deepanshu Gupta",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema).replace(/</g, "\\u003c") }}
      />
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
            <span>About</span>
          </div>
          <div className="chip mb-6 mx-auto w-fit">
            <span className="chip-dot"></span>About
          </div>
          <h1 className="display-sm text-slate-900 mb-6">
            Dr. Deepanshu Gupta
          </h1>
          <p className="body-lg text-slate-600 max-w-2xl mx-auto">
            Senior Urologist &amp; Kidney Stone Specialist at Cure Stone Hospital, Gurugram — credentials, work experience and professional memberships.
          </p>
        </div>
      </section>

      <DoctorProfileSection />
      <ExperienceAndMemberships />

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

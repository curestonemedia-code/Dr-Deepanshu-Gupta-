import type { Metadata } from "next";
import Link from "next/link";
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

      <section className="section-tight edge relative overflow-hidden bg-slate-50/50" data-bg="#f8fafc" data-theme="light">
        <div className="container mx-auto px-5 md:px-12 lg:px-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-[0.1em] text-blue-700 uppercase">About</span>
          </div>
          <h1 className="display-sm text-slate-900 font-bold mb-6">
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
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#2563eb] text-white font-black rounded-full hover:bg-blue-700 transition-all"
        >
          Book a Consultation
        </Link>
      </section>
    </>
  );
}

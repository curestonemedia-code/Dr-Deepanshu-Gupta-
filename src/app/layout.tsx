import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "Dr. Deepanshu Gupta | Urologist & Kidney Stone Specialist";
const DESCRIPTION =
  "Dr. Deepanshu Gupta — MCh Urology (Rank 1, RML Hospital), Specializing in fluoroscopy-free FANS-RIRS laser surgery for kidney stones, HoLEP for prostate enlargement, and andrology care at Cure Stone Hospital, Gurugram.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Dr. Deepanshu Gupta",
  },
  description: DESCRIPTION,
  keywords: [
    "Dr. Deepanshu Gupta",
    "urologist Gurugram",
    "kidney stone specialist Gurugram",
    "FANS-RIRS laser surgery",
    "fluoroscopy-free RIRS",
    "HoLEP prostate surgery",
    "andrologist Gurugram",
    "male infertility specialist",
    "Cure Stone Hospital",
  ],
  authors: [{ name: "Dr. Deepanshu Gupta", url: SITE_URL }],
  creator: "Dr. Deepanshu Gupta",
  category: "Healthcare / Urology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Dr. Deepanshu Gupta",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/doctor.png",
        width: 1200,
        height: 630,
        alt: "Dr. Deepanshu Gupta — Urologist & Kidney Stone Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/doctor.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    other: {
      "msvalidate.01": "49B6C1C05846941FBB0130BAE5832A8B",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
    ],
  },
};

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": `${SITE_URL}/#physician`,
  name: "Dr. Deepanshu Gupta",
  image: `${SITE_URL}/doctor.png`,
  url: SITE_URL,
  jobTitle: "Senior Urologist & Kidney Stone Specialist",
  medicalSpecialty: ["Urology", "Andrology"],
  description: DESCRIPTION,
  alumniOf: "PGIMS Rohtak, RML Hospital New Delhi",
  hasCredential: "MBBS, , MCh Urology (Rank 1, RML Hospital)",
  worksFor: {
    "@type": "MedicalBusiness",
    name: "Cure Stone Hospital",
    "@id": "https://thecurestone.com/#organization",
    url: "https://thecurestone.com",
  },
  telephone: "+91-88002-63884",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 52, Near Plot 3, Rd No D-13 A, Ardee City",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122003",
    addressCountry: "IN",
  },
  sameAs: [
    "https://thecurestone.com",
    "https://www.facebook.com/curestone/",
    "https://www.instagram.com/the_cure_stone/",
    "https://www.youtube.com/c/Urogyaan",
    "https://www.linkedin.com/company/cure-stone/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1000",
    bestRating: "5",
    worstRating: "1",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Dr. Deepanshu Gupta",
  description: DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#physician` },
  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased bg-gradient-primary`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
        />
        {/* Warms the DNS/TLS connection to the CRM ahead of form submission,
            since it's a separate origin from this site's own hosting. */}
        <link rel="preconnect" href="https://crm.thecurestone.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://crm.thecurestone.com" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Gurugram, Haryana, India" />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-500 ease-in-out bg-white text-gray-900">
        <SmoothScroll>
          <ScrollProgress />
          <Preloader />
          <Nav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

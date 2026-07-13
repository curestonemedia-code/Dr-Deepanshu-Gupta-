import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Clock, ChevronRight } from "lucide-react";

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "Contact Dr. Deepanshu Gupta";
const DESCRIPTION =
  "Contact Dr. Deepanshu Gupta at Cure Stone Hospital, Sector 52, Gurugram for a kidney stone, prostate, or andrology consultation. Call, WhatsApp, or book online.";
const URL = `${SITE_URL}/contact`;

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
    { "@type": "ListItem", position: 2, name: "Contact", item: URL },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  about: {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: "Dr. Deepanshu Gupta",
  },
  mainEntity: {
    "@type": "MedicalBusiness",
    "@id": "https://thecurestone.com/#organization",
    name: "Cure Stone Hospital",
    telephone: "+91-88002-63884",
    email: "care@thecurestone.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sector 52, Near Plot 3, Rd No D-13 A, Ardee City",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122003",
      addressCountry: "IN",
    },
  },
};

const contactCards = [
  {
    icon: Phone,
    label: "Call",
    value: "+91 88002 63884",
    href: "tel:+918800263884",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message Us",
    href: "https://wa.me/918800263884",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "care@thecurestone.com",
    href: "mailto:care@thecurestone.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema).replace(/</g, "\\u003c") }}
      />

      <section className="cond-hero edge" data-bg="#f8fafc" data-theme="light">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.070288!3d28.439817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin"
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 border-0 opacity-15 grayscale"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
          aria-hidden="true"
          title="Cure Stone Hospital map background"
        />
        {/* <div className="cond-hero-bg"></div> */}
        <div className="container-x relative text-center">
          <div className="cond-breadcrumb justify-center">
            <Link href="/">Home</Link>
            <ChevronRight style={{ width: "14px", height: "14px" }} />
            <span>Contact</span>
          </div>
          <div className="chip mb-6 mx-auto w-fit">
            <span className="chip-dot"></span>Contact
          </div>
          <h1 className="display-sm text-slate-900 mb-6">Get in Touch</h1>
          <p className="body-lg text-slate-600 max-w-2xl mx-auto">
            Speak with our care team for appointments, scan review, or a second opinion at Cure Stone Hospital, Sector 52, Gurugram.
          </p>
        </div>
      </section>

      <section className="section-tight edge">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="group bg-white border border-slate-100 p-8 rounded-3xl text-center shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <card.icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{card.label}</p>
                <p className="text-lg font-bold text-slate-900">{card.value}</p>
              </a>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="w-full h-80 bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.070288!3d28.439817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Cure Stone Hospital Location"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Hospital Location</p>
                  <p className="text-lg font-bold text-slate-900">Cure Stone Hospital</p>
                  <p className="text-slate-600 mt-1">
                    Sector 52, Near Plot 3, Rd No D-13 A, Ardee City, Gurugram, Haryana 122003
                  </p>
                  <a
                    href="https://maps.app.goo.gl/6HjEJfWJu2MwhYiT9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm font-black text-blue-600 hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Consultation Hours</p>
                  <p className="text-slate-900 font-bold">Monday – Saturday, by appointment</p>
                  <p className="text-slate-600 mt-1">Emergency support available 24/7</p>
                </div>
              </div>

              <Link
                href="/?interest=other#book"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2563eb] text-white! font-black rounded-full hover:bg-blue-700 transition-all"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

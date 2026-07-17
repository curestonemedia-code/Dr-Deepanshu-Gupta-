import type { Metadata } from "next";
import Link from "next/link";
import { Home, Calendar, MessageCircle, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

const quickLinks = [
  { label: "Kidney Stones (FANS-RIRS)", href: "/?interest=kidney-stones#book" },
  { label: "Prostate / BPH (HoLEP)", href: "/prostate" },
  { label: "Andrology & Male Fertility", href: "/andrology" },
  { label: "FAQs", href: "/faq" },
];

export default function NotFound() {
  return (
    <section className="cond-hero edge min-h-[70vh] flex items-center" data-bg="#f8fafc" data-theme="light">
      <div className="cond-hero-bg"></div>
      <div className="container-x relative text-center">
        <div className="chip mb-6 mx-auto w-fit">
          <span className="chip-dot"></span>404 Error
        </div>
        <h1 className="display-sm text-slate-900 mb-6">This page took a wrong turn.</h1>
        <p className="body-lg text-slate-600 max-w-2xl mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link href="/" className="btn btn-primary btn-lg">
            <Home style={{ width: "16px", height: "16px" }} />
            Back to Home
          </Link>
          <Link href="/?interest=other#book" className="btn btn-ghost btn-lg">
            <Calendar style={{ width: "16px", height: "16px" }} />
            Book Free Consultation
          </Link>
          <a
            href="https://wa.me/918800263884"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-lg"
          >
            <MessageCircle style={{ width: "16px", height: "16px" }} />
            WhatsApp Us
          </a>
        </div>

        <div className="max-w-xl mx-auto">
          <p className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            <Search style={{ width: "14px", height: "14px" }} />
            Or find what you need
          </p>
          <nav aria-label="Popular pages" className="flex flex-wrap justify-center gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

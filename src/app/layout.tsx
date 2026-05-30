import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dr. Deepanshu Gupta — Master Urologist | CureStone",
  description: "Dr. Deepanshu Gupta — MCh Urology Rank 1, pioneering fluoroscopy-free laser surgery in North India. 30,000+ procedures, zero radiation, absolute precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased bg-gradient-primary`}
    >
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

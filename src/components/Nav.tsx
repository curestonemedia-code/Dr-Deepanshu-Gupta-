'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
        ScrollTrigger.create({
          start: 'top -40',
          end: 'max',
          onToggle: (self) => setScrolled(self.isActive),
        });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname === `/${path}`;
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <Link href="/" className="brand-logo py-1">
        <img src="/logo.png" alt="Dr. Deepanshu Gupta" className="h-10 md:h-11 w-auto object-contain" />
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link href="/#conditions" className="nav-link">Conditions</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/#testimonials" className="nav-link">Patients</Link>
        <Link href="/faq" className="nav-link">FAQ</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
      </div>
      
      <Link href="/#book" className="btn btn-primary">
        <Calendar style={{ width: '16px', height: '16px' }} />
        Book Consult
      </Link>
    </nav>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NAV_LINKS = [
  { href: '/#conditions', label: 'Conditions' },
  { href: '/about', label: 'About' },
  { href: '/patients', label: 'Patients' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu on route change. Adjusted during render (not an
  // effect) per React's guidance for resetting state when a prop changes.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

  return (
    <nav id="navbar" className={scrolled || menuOpen ? 'scrolled' : ''}>
      <div className="nav-inner container-x edge">
        <Link href="/" className="brand-logo py-1">
          <img src="/logo.png" alt="Dr. Deepanshu Gupta" className="h-10 md:h-11 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link href="/#book" className="btn btn-primary whitespace-nowrap shrink-0">
            <Calendar style={{ width: '16px', height: '16px' }} className="shrink-0" />
            Book Free Consultation
          </Link>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X style={{ width: '22px', height: '22px' }} /> : <Menu style={{ width: '22px', height: '22px' }} />}
          </button>
        </div>
      </div>

      <div className={`nav-mobile-menu md:hidden ${menuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-links" style={{ fontWeight: 600! }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/#book" className="btn btn-primary justify-center" onClick={() => setMenuOpen(false)}>
          <Calendar style={{ width: '16px', height: '16px' }} />
          Book Free Consultation
        </Link>
      </div>
    </nav>
  );
}

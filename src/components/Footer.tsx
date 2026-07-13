import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer data-bg="#020617" data-theme="dark">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-10 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="md:col-span-5">
              <Link href="/" className="brand-logo">
                <img src="/logo.png" alt="Dr. Deepanshu Gupta" className="h-11 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
              </Link>
              <p className="mt-6 max-w-sm" style={{ color: 'var(--on-dark-muted)', fontSize: '0.9rem', lineHeight: '1.65' }}>
                MCh Urology (Rank 1, RML Hospital) · Senior Consultant at Cure Stone Hospital, specializing in fluoroscopy-free laser urology.
              </p>
            </div>

            <div className="md:col-span-3">
              <div className="eyebrow mb-4" style={{ color: 'var(--brand-light)' }}>Clinical Hub</div>
              <a
                href="https://thecurestone.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', fontWeight: 500 }}
                className="hover:underline"
              >
                Cure Stone Hospital
              </a>
              <div className="mt-2" style={{ color: 'var(--on-dark-muted)', fontSize: '0.875rem', lineHeight: '1.65' }}>
                Sector 52, Near Plot 3, Rd No D-13 A, Ardee City<br/>Gurugram, Haryana 122003<br/>+91 88002 63884
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="eyebrow mb-4" style={{ color: 'var(--brand-light)' }}>Conditions</div>
              <div className="flex flex-col gap-2" style={{ fontSize: '0.875rem' }}>
                <Link href="/kidney-stones" style={{ color: 'var(--on-dark-muted)' }} className="hover:text-white transition">Kidney Stones</Link>
                <Link href="/prostate" style={{ color: 'var(--on-dark-muted)' }} className="hover:text-white transition">Prostate / BPH</Link>
                <Link href="/andrology" style={{ color: 'var(--on-dark-muted)' }} className="hover:text-white transition">Male Health</Link>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="eyebrow mb-4" style={{ color: 'var(--brand-light)' }}>Explore</div>
              <div className="flex flex-col gap-2" style={{ fontSize: '0.875rem' }}>
                <Link href="/about" style={{ color: 'var(--on-dark-muted)' }} className="hover:text-white transition">About</Link>
                <Link href="/patients" style={{ color: 'var(--on-dark-muted)' }} className="hover:text-white transition">Patients</Link>
                <Link href="/faq" style={{ color: 'var(--on-dark-muted)' }} className="hover:text-white transition">FAQ</Link>
                <Link href="/contact" style={{ color: 'var(--on-dark-muted)' }} className="hover:text-white transition">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ color: 'var(--on-dark-muted)', fontSize: '0.8rem' }}>
            <div>© 2026 Dr. Deepanshu Gupta · Cure Stone Hospital. All rights reserved.</div>
            <div>Designed with ♥ by Gulshan Chawla</div>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/918800263884" className="fab" aria-label="WhatsApp">
        <MessageCircle style={{ width: '24px', height: '24px' }} />
      </a>
    </>
  );
}

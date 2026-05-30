'use client';
import React from 'react';
import Link from 'next/link';
import { Calendar, MessageCircle } from 'lucide-react';

export default function KidneyStonesCTA() {
  return (
    <section className="cta-band edge section-tight" data-bg="#2B5CE6" data-theme="dark">
        <div className="container-x relative text-center">
            <div className="chip mb-6 mx-auto" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                <span className="chip-dot" style={{ background: '#fff' }}></span>
                Ready to move forward?
            </div>
            <h2 className="display-sm mb-6 split-words" style={{ color: '#fff' }}>Let's look at your case.</h2>
            <p className="body-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Send your reports on WhatsApp for a same-day opinion, or book a consultation slot directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/?interest=kidney-stones#book" className="btn btn-white btn-lg">
                    <Calendar style={{ width: '18px', height: '18px' }} />
                    Book a Consultation
                </Link>
                <a href="https://wa.me/918800263884" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <MessageCircle style={{ width: '18px', height: '18px' }} />
                    WhatsApp Reports
                </a>
            </div>
        </div>
    </section>
  );
}

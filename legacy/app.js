/* ============================================================
   Dr. Deepanshu Gupta · CureStone — Shared App JS
   ============================================================ */

(() => {
    'use strict';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Icons ----------
    function initIcons() {
        if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
    }
    initIcons();

    // ---------- Word split ----------
    document.querySelectorAll('.split-words').forEach(el => {
        const text = el.innerHTML.trim();
        const tokens = text.split(/(\s+)/);
        el.innerHTML = tokens.map(tok => {
            if (/^\s+$/.test(tok)) return tok;
            return `<span class="word-wrap"><span class="word-inner">${tok}</span></span>`;
        }).join('');
        el.classList.add('ready');
    });

    // ---------- Preloader ----------
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderCount = document.getElementById('preloader-count');
    const loaderTextInner = document.getElementById('loader-text-inner');

    function runIntro() {
        if (!preloader) return;
        const tl = gsap.timeline();
        tl.to(loaderTextInner, { y: '0%', duration: 0.8, ease: 'power3.out' })
          .to(preloaderBar, { width: '100%', duration: 1.0, ease: 'expo.inOut' }, '<0.1')
          .to({ v: 0 }, {
              v: 100, duration: 1.0, ease: 'expo.inOut',
              onUpdate: function() {
                  const v = Math.round(this.targets()[0].v);
                  if (preloaderCount) preloaderCount.textContent = String(v).padStart(3, '0');
              }
          }, '<')
          .to(preloader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.1')
          .add(() => preloader.style.display = 'none')
          .from('#top', { scale: 1.04, duration: 1.4, ease: 'power3.out', transformOrigin: 'center top' }, '-=0.6')
          .to('.hero-line', { y: '0%', duration: 1.1, stagger: 0.1, ease: 'power3.out' }, '-=1.2')
          .to('.fade-up', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power2.out' }, '-=0.9');
    }
    if (document.querySelector('.fade-up')) gsap.set('.fade-up', { y: 20 });

    let introStarted = false;
    const startOnce = () => { if (introStarted) return; introStarted = true; runIntro(); };
    window.addEventListener('load', startOnce);
    setTimeout(startOnce, 2500);

    // ---------- Lenis ----------
    let lenis;
    if (!reduceMotion && window.Lenis) {
        lenis = new Lenis({
            duration: 1.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        window.__lenis = lenis;
    }

    // ---------- GSAP / ScrollTrigger ----------
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        if (lenis) {
            lenis.on('scroll', () => ScrollTrigger.update());
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
        }
    }

    // ---------- Scroll progress ----------
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar && window.ScrollTrigger) {
        ScrollTrigger.create({
            start: 0, end: 'max',
            onUpdate: (self) => { progressBar.style.width = (self.progress * 100) + '%'; },
        });
    }

    // ---------- Body bg + theme per section ----------
    const themedSections = document.querySelectorAll('[data-bg]');
    if (themedSections.length && window.ScrollTrigger) {
        themedSections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 55%',
                end: 'bottom 45%',
                onEnter: () => applySectionTheme(section),
                onEnterBack: () => applySectionTheme(section),
            });
        });
    }
    function applySectionTheme(section) {
        const bg = section.dataset.bg;
        const theme = section.dataset.theme;
        gsap.to(document.body, { backgroundColor: bg, duration: 0.8, ease: 'power2.inOut' });
        if (theme === 'dark') document.body.classList.add('on-dark');
        else document.body.classList.remove('on-dark');
    }

    // ---------- Word reveal ----------
    document.querySelectorAll('.split-words').forEach(heading => {
        gsap.to(heading.querySelectorAll('.word-inner'), {
            y: '0%', duration: 1.1, stagger: 0.05, ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 85%' },
        });
    });

    // ---------- Fade-in-scroll ----------
    gsap.utils.toArray('.fade-in-scroll').forEach(el => {
        gsap.from(el, {
            opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
        });
    });

    // ---------- Stat counters ----------
    gsap.utils.toArray('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
            v: target, duration: 2.2, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
            onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-IN'); },
        });
    });

    // ---------- 3D tilt cards ----------
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rx = ((y / rect.height) - 0.5) * -8;
            const ry = ((x / rect.width) - 0.5) * 8;
            gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
    });

    // ---------- Nav scrolled state ----------
    const navbar = document.getElementById('navbar');
    if (navbar && window.ScrollTrigger) {
        ScrollTrigger.create({
            start: 'top -40', end: 'max',
            onToggle: (self) => navbar.classList.toggle('scrolled', self.isActive),
        });
    }

    // ---------- Smooth anchor scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            if (target.length <= 1) return;
            const el = document.querySelector(target);
            if (!el) return;
            e.preventDefault();
            if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.3 });
            else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ---------- FAQ accordion ----------
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        if (!q) return;
        q.addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            // Close others in same group if grouped
            const group = item.closest('.faq-group');
            if (group) group.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });

    // ---------- Video testimonial modal ----------
    const vModal = document.getElementById('video-modal');
    const vFrame = document.getElementById('video-modal-frame');
    const vClose = document.getElementById('video-modal-close');

    document.querySelectorAll('[data-video]').forEach(card => {
        card.addEventListener('click', () => {
            if (!vModal || !vFrame) return;
            const vid = card.dataset.video;
            vFrame.src = `https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`;
            vModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });
    function closeVideo() {
        if (!vModal || !vFrame) return;
        vModal.classList.remove('open');
        vFrame.src = '';
        document.body.style.overflow = '';
    }
    if (vClose) vClose.addEventListener('click', closeVideo);
    if (vModal) vModal.addEventListener('click', (e) => { if (e.target === vModal) closeVideo(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });

    // ---------- BOOKING WIDGET ----------
    const booking = document.getElementById('booking');
    if (booking) {
        const state = {
            step: 1,
            condition: null,
            date: '',
            slot: null,
            name: '',
            phone: '',
            email: '',
            note: '',
        };
        const totalSteps = 3;

        // Auto-fill condition from ?interest= query (used by condition page CTAs)
        const params = new URLSearchParams(window.location.search);
        const preInterest = params.get('interest');
        if (preInterest) {
            const pick = booking.querySelector(`.cond-pick[data-value="${preInterest}"]`);
            if (pick) {
                pick.click();
            }
        }

        // Condition picker
        booking.querySelectorAll('.cond-pick').forEach(btn => {
            btn.addEventListener('click', () => {
                booking.querySelectorAll('.cond-pick').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.condition = btn.dataset.value;
                clearError(btn.closest('.booking-step'));
            });
        });

        // Date input
        const dateInput = booking.querySelector('#bk-date');
        if (dateInput) {
            const today = new Date();
            today.setDate(today.getDate() + 1); // tomorrow min
            const min = today.toISOString().split('T')[0];
            dateInput.min = min;
            dateInput.addEventListener('change', () => {
                state.date = dateInput.value;
                clearError(dateInput.closest('.booking-step'));
            });
        }

        // Slot picker
        booking.querySelectorAll('.slot').forEach(btn => {
            btn.addEventListener('click', () => {
                booking.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
                btn.classList.add('selected');
                state.slot = btn.dataset.value;
                clearError(btn.closest('.booking-step'));
            });
        });

        // Navigation
        booking.querySelectorAll('[data-next]').forEach(btn => {
            btn.addEventListener('click', () => nextStep());
        });
        booking.querySelectorAll('[data-prev]').forEach(btn => {
            btn.addEventListener('click', () => prevStep());
        });

        // Submit
        const submitBtn = booking.querySelector('#bk-submit');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => submitBooking());
        }

        function validateStep(step) {
            clearError(booking.querySelector(`[data-step="${step}"]`));
            if (step === 1) {
                if (!state.condition) { showError(1, 'Please select what brings you here.'); return false; }
                return true;
            }
            if (step === 2) {
                if (!state.date) { showError(2, 'Please choose a date.'); return false; }
                if (!state.slot) { showError(2, 'Please pick a time slot.'); return false; }
                return true;
            }
            if (step === 3) {
                const name = booking.querySelector('#bk-name').value.trim();
                const phone = booking.querySelector('#bk-phone').value.trim();
                const email = booking.querySelector('#bk-email').value.trim();
                const note = booking.querySelector('#bk-note').value.trim();
                if (name.length < 2) { showError(3, 'Please enter your full name.'); return false; }
                if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) { showError(3, 'Please enter a valid phone number.'); return false; }
                if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showError(3, 'Please enter a valid email address.'); return false; }
                state.name = name; state.phone = phone; state.email = email; state.note = note;
                return true;
            }
            return true;
        }

        function showError(step, msg) {
            const el = booking.querySelector(`[data-step="${step}"] .field-error`);
            if (el) { el.textContent = msg; el.classList.add('show'); }
        }
        function clearError(stepEl) {
            if (!stepEl) return;
            const el = stepEl.querySelector('.field-error');
            if (el) el.classList.remove('show');
        }

        function nextStep() {
            if (!validateStep(state.step)) return;
            if (state.step < totalSteps) { state.step++; render(); }
        }
        function prevStep() {
            if (state.step > 1) { state.step--; render(); }
        }
        function render() {
            booking.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
            const active = booking.querySelector(`.booking-step[data-step="${state.step}"]`);
            if (active) active.classList.add('active');
            booking.querySelectorAll('.booking-step-dot').forEach((d, i) => {
                d.classList.remove('active', 'complete');
                if (i + 1 < state.step) d.classList.add('complete');
                else if (i + 1 === state.step) d.classList.add('active');
            });
        }
        render();

        async function submitBooking() {
            if (!validateStep(3)) return;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting…';

            const payload = {
                id: 'CS-' + Date.now().toString().slice(-8),
                createdAt: new Date().toISOString(),
                condition: state.condition,
                date: state.date,
                slot: state.slot,
                name: state.name,
                phone: state.phone,
                email: state.email,
                note: state.note,
                source: window.location.pathname,
            };

            // Save to localStorage (demo persistence)
            try {
                const pending = JSON.parse(localStorage.getItem('curestone_bookings') || '[]');
                pending.push(payload);
                localStorage.setItem('curestone_bookings', JSON.stringify(pending));
            } catch (e) { /* ignore */ }

            // -------------------------------------------------------------
            // WIRE TO CURETRACK BACKEND: replace the block below with a real
            // fetch() to your FastAPI endpoint. Example:
            //
            //   const res = await fetch('https://curetrack.api/bookings', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload),
            //   });
            //   if (!res.ok) throw new Error('Booking failed');
            //   const data = await res.json();
            //   payload.id = data.bookingId;
            // -------------------------------------------------------------
            await new Promise(r => setTimeout(r, 900)); // simulate network

            // Render success
            const success = booking.querySelector('.booking-success');
            const refEl = booking.querySelector('#bk-ref');
            const formEl = booking.querySelector('.booking-form');
            if (refEl) refEl.textContent = payload.id;
            if (success && formEl) {
                formEl.style.display = 'none';
                success.classList.add('active');
            }
        }
    }

    // ---------- Resize ----------
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.ScrollTrigger) ScrollTrigger.refresh();
        }, 200);
    });

    // ---------- PAGE TRANSITIONS (zoom in / zoom out) ----------
    // Page enter: on condition pages (no preloader), zoom-in reveal the hero
    if (!document.getElementById('preloader')) {
        const firstSection = document.querySelector('.cond-hero') || document.querySelector('section');
        if (firstSection) {
            gsap.from(firstSection, {
                opacity: 0, scale: 0.94,
                duration: 1.1, ease: 'power3.out',
                transformOrigin: 'center top',
                clearProps: 'transform,opacity',
            });
        }
    }

    // Page exit: on internal .html link click, zoom-out overlay then navigate
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href) return;
        // Only same-folder .html links
        if (!/^[^:/?#]+\.html(\?|#|$)/i.test(href) && !/^\.\/[^/]+\.html/i.test(href)) return;
        const target = href.split('?')[0].split('#')[0].split('/').pop().toLowerCase();
        if (!target || target === currentPage) return;

        e.preventDefault();

        // Build a brand-coloured expanding overlay
        const overlay = document.createElement('div');
        overlay.style.cssText =
            'position:fixed;inset:0;background:#2B5CE6;z-index:10002;pointer-events:none;' +
            'transform:scale(0);transform-origin:50% 50%;border-radius:50%;will-change:transform;';
        document.body.appendChild(overlay);

        // Also slightly scale the main content away so it feels like a proper zoom-out
        const contentEls = Array.from(document.body.children).filter(el =>
            el !== overlay &&
            el.id !== 'preloader' &&
            el.id !== 'navbar' &&
            el.id !== 'scroll-progress' &&
            !el.classList.contains('fab') &&
            !el.classList.contains('video-modal')
        );

        gsap.to(contentEls, {
            scale: 0.94, opacity: 0.2,
            duration: 0.55, ease: 'power2.in',
            transformOrigin: 'center center',
        });
        gsap.to(overlay, {
            scale: 3, borderRadius: '0%',
            duration: 0.7, ease: 'power3.inOut',
            onComplete: () => { window.location.href = href; },
        });
    });
})();

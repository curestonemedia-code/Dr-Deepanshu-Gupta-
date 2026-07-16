'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { wrapWords } from '../../utils/text';

export default function Prostate() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Wrap words before GSAP animations run
    document.querySelectorAll('.split-words').forEach(el => wrapWords(el as HTMLElement));
    
    let ctx = gsap.context(() => {
        
        const firstSection = document.querySelector('.cond-hero') || document.querySelector('section');
        if (firstSection) {
            gsap.from(firstSection, {
                opacity: 0, scale: 0.94,
                duration: 1.1, ease: 'power3.out',
                transformOrigin: 'center top',
                clearProps: 'transform,opacity',
            });
        }
    

        const themedSections = document.querySelectorAll('[data-bg]');
        if (themedSections.length) {
            themedSections.forEach(section => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 55%',
                    end: 'bottom 45%',
                    onEnter: () => applySectionTheme(section as HTMLElement),
                    onEnterBack: () => applySectionTheme(section as HTMLElement),
                });
            });
        }
        function applySectionTheme(section: HTMLElement) {
            const bg = section.dataset.bg;
            const theme = section.dataset.theme;
            if (bg) gsap.to(document.body, { backgroundColor: bg, duration: 0.8, ease: 'power2.inOut' });
            if (theme === 'dark') document.body.classList.add('on-dark');
            else document.body.classList.remove('on-dark');
        }

        document.querySelectorAll('.split-words').forEach(heading => {
            gsap.to(heading.querySelectorAll('.word-inner'), {
                y: '0%', duration: 1.1, stagger: 0.05, ease: 'power3.out',
                scrollTrigger: { trigger: heading, start: 'top 85%' },
            });
        });

        gsap.utils.toArray('.fade-in-scroll').forEach(el => {
            gsap.from(el as HTMLElement, {
                opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el as HTMLElement, start: 'top 85%' },
            });
        });

        gsap.utils.toArray('[data-count]').forEach(el => {
            const target = parseFloat((el as HTMLElement).dataset.count || '0');
            const obj = { v: 0 };
            gsap.to(obj, {
                v: target, duration: 2.2, ease: 'expo.out',
                scrollTrigger: { trigger: el as HTMLElement, start: 'top 80%' },
                onUpdate: () => { (el as HTMLElement).textContent = Math.round(obj.v).toLocaleString('en-IN'); },
            });
        });
    });

    return () => {
        ctx.revert();
    };
  }, []);

  return (
    <>
      
<section className="cond-hero edge" data-bg="#ffffff" data-theme="light">
    <div className="cond-hero-bg"></div>
    <div className="container-x relative">
        <div className="cond-breadcrumb">
            <Link href="/">Home</Link>
            <Icons.ChevronRight  style={{"width":"14px","height":"14px"}} />
            <Link href="/#conditions">Conditions</Link>
            <Icons.ChevronRight  style={{"width":"14px","height":"14px"}} />
            <span>Prostate / BPH</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
                <div className="chip mb-6"><span className="chip-dot"></span>Prostate Enlargement · BPH</div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black mb-6 split-words">Back to sleeping through the night.</h1>
                <p className="body-lg max-w-2xl">Holmium laser enucleation (HoLEP) is the modern gold standard for benign prostate enlargement — size-independent, catheter-free quickly, and with results that last a lifetime. No long-term TURP drawbacks, no re-treatment anxiety.</p>
            </div>
            <div className="lg:col-span-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="card" style={{"padding":"1.25rem"}}>
                        <div className="body-sm">Durability</div>
                        <div className="text-3xl font-semibold mt-1" style={{"letterSpacing":"-0.02em"}}>Lifetime</div>
                    </div>
                    <div className="card" style={{"padding":"1.25rem"}}>
                        <div className="body-sm">Catheter-out</div>
                        <div className="text-3xl font-semibold mt-1" style={{"letterSpacing":"-0.02em"}}>48<span className="mark">h</span></div>
                    </div>
                    <div className="card" style={{"padding":"1.25rem"}}>
                        <div className="body-sm">Blood loss</div>
                        <div className="text-3xl font-semibold mt-1" style={{"letterSpacing":"-0.02em"}}>Minimal</div>
                    </div>
                    <div className="card" style={{"padding":"1.25rem"}}>
                        <div className="body-sm">Any size</div>
                        <div className="text-3xl font-semibold mt-1" style={{"letterSpacing":"-0.02em"}}>Yes</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/*  SYMPTOMS  */}
<section className="section-tight edge" data-bg="#f5f7ff" data-theme="light">
    <div className="container-x">
        <div className="max-w-3xl mb-10">
            <div className="chip mb-4"><span className="chip-dot"></span>Signs & Symptoms</div>
            <h2 className="heading split-words">The quiet ways your prostate tells you it's time.</h2>
        </div>

        <ul className="symptom-list">
            <li><div className="check"><Icons.Check  style={{"width":"14px","height":"14px"}} /></div><div><strong>Waking multiple times at night to urinate</strong><div className="body-sm mt-1">Nocturia that disrupts sleep is the #1 quality-of-life marker.</div></div></li>
            <li><div className="check"><Icons.Check  style={{"width":"14px","height":"14px"}} /></div><div><strong>Weak or interrupted urinary stream</strong><div className="body-sm mt-1">Stream takes longer to start and doesn't flow forcefully.</div></div></li>
            <li><div className="check"><Icons.Check  style={{"width":"14px","height":"14px"}} /></div><div><strong>Feeling of incomplete emptying</strong><div className="body-sm mt-1">"I just went, but I still need to go again soon."</div></div></li>
            <li><div className="check"><Icons.Check  style={{"width":"14px","height":"14px"}} /></div><div><strong>Urgency — can't hold it</strong><div className="body-sm mt-1">Sudden, strong urge to urinate with little warning.</div></div></li>
            <li><div className="check"><Icons.Check  style={{"width":"14px","height":"14px"}} /></div><div><strong>Difficulty starting urination</strong><div className="body-sm mt-1">Hesitancy or straining to begin the stream.</div></div></li>
            <li><div className="check"><Icons.Check  style={{"width":"14px","height":"14px"}} /></div><div><strong>Recurrent UTIs or blood in urine</strong><div className="body-sm mt-1">Sign that BPH is affecting bladder function — don't delay evaluation.</div></div></li>
        </ul>
    </div>
</section>

{/*  DIAGNOSIS  */}
<section className="section-tight edge" data-bg="#ffffff" data-theme="light">
    <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
                <div className="chip mb-4"><span className="chip-dot"></span>Evaluation Process</div>
                <h2 className="heading split-words">A careful, discreet evaluation.</h2>
                <p className="body-lg mt-6">BPH evaluation is methodical and respects your privacy. No invasive tests unless clearly needed.</p>
            </div>
            <div className="lg:col-span-7">
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-day">Step 1</div>
                        <div className="heading-sm mb-2">Symptom score (IPSS)</div>
                        <p className="body">A standardised questionnaire quantifying your symptoms. Takes 3 minutes. Sets a clear baseline to track progress.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-day">Step 2</div>
                        <div className="heading-sm mb-2">Uroflowmetry + post-void residual</div>
                        <p className="body">Painless tests measuring urine flow and how much is left behind. Done in 15 minutes, tells us exactly how obstructed you are.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-day">Step 3</div>
                        <div className="heading-sm mb-2">Ultrasound + PSA</div>
                        <p className="body">Precise prostate size, bladder wall thickness, and PSA blood test — the blood test that screens for both BPH and prostate cancer.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-day">Step 4</div>
                        <div className="heading-sm mb-2">Treatment plan</div>
                        <p className="body">We discuss options: lifestyle, medication, or procedure. If surgery is indicated, exact procedure and written cost estimate within 24 hours.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/*  TREATMENT OPTIONS  */}
<section className="section edge" data-bg="#f5f7ff" data-theme="light">
    <div className="container-x">
        <div className="max-w-3xl mb-10">
            <div className="chip mb-4"><span className="chip-dot"></span>Treatment Options</div>
            <h2 className="display-sm split-words">From medication to the modern gold standard.</h2>
            <p className="body-lg mt-6">Not every man with BPH needs surgery. But when surgery is the right answer, HoLEP is often the preferred option.</p>
        </div>

        <div className="grid gap-4">

            <div className="treatment featured">
                <div className="t-icon"><Icons.Zap  style={{"width":"24px","height":"24px"}} /></div>
                <div>
                    <div className="t-title">HoLEP (Holmium Laser Enucleation)</div>
                    <div className="t-sub">Modern gold standard — size-independent, durable, minimal bleeding</div>
                    <div className="t-tags">
                        <span className="chip">Any prostate size</span>
                        <span className="chip">Lifetime result</span>
                        <span className="chip">48h catheter</span>
                        <span className="chip">Day-3 discharge</span>
                    </div>
                </div>
                <div className="t-cta">
                    <Link href="/?interest=prostate#book" className="btn btn-primary">Book</Link>
                </div>
            </div>

            <div className="treatment">
                <div className="t-icon"><Icons.Activity  style={{"width":"24px","height":"24px"}} /></div>
                <div>
                    <div className="t-title">ThuLEP (Thulium Laser Enucleation)</div>
                    <div className="t-sub">Alternative laser technique with similar long-term outcomes</div>
                    <div className="t-tags">
                        <span className="chip">Laser</span>
                        <span className="chip">Durable</span>
                        <span className="chip">Bloodless</span>
                    </div>
                </div>
                <div className="t-cta">
                    <Link href="/?interest=prostate#book" className="btn btn-ghost">Book</Link>
                </div>
            </div>

            <div className="treatment">
                <div className="t-icon"><Icons.Scissors  style={{"width":"24px","height":"24px"}} /></div>
                <div>
                    <div className="t-title">TURP (Transurethral Resection)</div>
                    <div className="t-sub">Traditional approach — appropriate for smaller prostates (&lt; 80g)</div>
                    <div className="t-tags">
                        <span className="chip">Smaller glands</span>
                        <span className="chip">Proven</span>
                        <span className="chip">3-day stay</span>
                    </div>
                </div>
                <div className="t-cta">
                    <Link href="/?interest=prostate#book" className="btn btn-ghost">Book</Link>
                </div>
            </div>

            <div className="treatment">
                <div className="t-icon"><Icons.Pill  style={{"width":"24px","height":"24px"}} /></div>
                <div>
                    <div className="t-title">Medical Therapy</div>
                    <div className="t-sub">Alpha-blockers, 5-ARI — appropriate for mild to moderate symptoms</div>
                    <div className="t-tags">
                        <span className="chip">No surgery</span>
                        <span className="chip">Daily medication</span>
                        <span className="chip">Monitored</span>
                    </div>
                </div>
                <div className="t-cta">
                    <Link href="/?interest=prostate#book" className="btn btn-ghost">Consult</Link>
                </div>
            </div>

        </div>

        <div className="card mt-10" style={{"background":"#fff","padding":"1.5rem"}}>
            <div className="flex items-start gap-4">
                <div className="service-icon" style={{"marginBottom":"0","flexShrink":"0"}}><Icons.Info  style={{"width":"22px","height":"22px"}} /></div>
                <div>
                    <div className="font-semibold mb-1">Transparent pricing</div>
                    <p className="body-sm">Indicative ranges: HoLEP from ₹1,50,000 · ThuLEP from ₹1,40,000 · TURP from ₹90,000. Final cost depends on prostate size and hospital stay. <strong>Covered by most cashless insurance policies</strong>.</p>
                </div>
            </div>
        </div>
    </div>
</section>

{/*  RECOVERY  */}
<section className="section-tight edge" data-bg="#ffffff" data-theme="light">
    <div className="container-x">
        <div className="max-w-3xl mb-10">
            <div className="chip mb-4"><span className="chip-dot"></span>Recovery Timeline · HoLEP</div>
            <h2 className="heading split-words">Back to normal within the week.</h2>
        </div>

        <div className="timeline">
            <div className="timeline-item">
                <div className="timeline-day">Day 0</div>
                <div className="heading-sm mb-1">Procedure day</div>
                <p className="body">Surgery under spinal or general anaesthesia, 60–90 minutes depending on gland size. Catheter placed intraoperatively.</p>
            </div>
            <div className="timeline-item">
                <div className="timeline-day">Day 1</div>
                <div className="heading-sm mb-1">Walking, eating, monitoring</div>
                <p className="body">Normal food, walking the ward, clear urine on light wash.</p>
            </div>
            <div className="timeline-item">
                <div className="timeline-day">Day 2</div>
                <div className="heading-sm mb-1">Catheter out · discharge</div>
                <p className="body">Catheter removed. You urinate freely, often with a stronger stream than you've had in years. Home the same day.</p>
            </div>
            <div className="timeline-item">
                <div className="timeline-day">Day 3–7</div>
                <div className="heading-sm mb-1">Light activity</div>
                <p className="body">Desk work, gentle walks. Avoid lifting, cycling, or strenuous exercise for two weeks.</p>
            </div>
            <div className="timeline-item">
                <div className="timeline-day">Week 2–4</div>
                <div className="heading-sm mb-1">Full activity</div>
                <p className="body">Resume gym, cycling, travel. Stream and emptying continue to improve for up to 3 months.</p>
            </div>
            <div className="timeline-item">
                <div className="timeline-day">Month 3</div>
                <div className="heading-sm mb-1">Review & long-term outcome</div>
                <p className="body">Follow-up uroflowmetry confirms the result. Most patients report a lasting improvement, with HoLEP offering a durable, size-independent option for BPH.</p>
            </div>
        </div>
    </div>
</section>

{/*  FAQ  */}
<section className="section-tight edge" data-bg="#f5f7ff" data-theme="light">
    <div className="container-x">
        <div className="max-w-3xl mb-10">
            <div className="chip mb-4"><span className="chip-dot"></span>Questions</div>
            <h2 className="heading split-words">About prostate treatment.</h2>
        </div>

        <div className="faq-group max-w-3xl">
            <div className="faq-item">
                <div className="faq-q">
                    <span>Will HoLEP affect my sexual function?</span>
                    <div className="faq-toggle"><Icons.Plus  style={{"width":"16px","height":"16px"}} /></div>
                </div>
                <div className="faq-a"><div>Erectile function is preserved in virtually all cases. Retrograde ejaculation (where semen goes into the bladder rather than externally) occurs in most patients after any BPH surgery — this is normal and harmless, but something we discuss in detail before you consent. Overall sexual satisfaction typically improves because sleep improves and symptom distress resolves.</div></div>
            </div>
            <div className="faq-item">
                <div className="faq-q">
                    <span>Why is HoLEP better than TURP, which my local doctor recommended?</span>
                    <div className="faq-toggle"><Icons.Plus  style={{"width":"16px","height":"16px"}} /></div>
                </div>
                <div className="faq-a"><div>TURP is a 70-year-old technique and still works well for small prostates. HoLEP is size-independent (no limit on prostate size), causes significantly less bleeding (important for patients on blood thinners), and has a re-treatment rate of under 1% at 10 years — versus TURP's 10–15%. If your prostate is larger than 60–80g, HoLEP is almost always the better choice.</div></div>
            </div>
            <div className="faq-item">
                <div className="faq-q">
                    <span>Can I skip surgery if I don't want it?</span>
                    <div className="faq-toggle"><Icons.Plus  style={{"width":"16px","height":"16px"}} /></div>
                </div>
                <div className="faq-a"><div>Absolutely — most men with BPH don't need surgery. Medical therapy, lifestyle changes (fluid timing, caffeine/alcohol moderation), and regular monitoring work well for mild to moderate symptoms. Surgery becomes the right answer when symptoms significantly affect quality of life, when medication side effects become unacceptable, or when BPH causes complications like recurrent UTIs or bladder stones.</div></div>
            </div>
            <div className="faq-item">
                <div className="faq-q">
                    <span>Do I need to stay in hospital for long?</span>
                    <div className="faq-toggle"><Icons.Plus  style={{"width":"16px","height":"16px"}} /></div>
                </div>
                <div className="faq-a"><div>HoLEP typically requires 2 nights in hospital — procedure day, monitoring, then catheter removal on day 2 before discharge. For patients travelling from outside NCR, we coordinate travel so you're on a flight home the same afternoon.</div></div>
            </div>
        </div>
    </div>
</section>

{/*  CTA  */}
<section className="cta-band edge section-tight" data-bg="#2B5CE6" data-theme="dark">
    <div className="container-x relative text-center">
        <div className="chip mb-6 mx-auto" style={{"background":"rgba(255,255,255,0.15)","color":"#fff"}}>
            <span className="chip-dot" style={{"background":"#fff"}}></span>
            Ready to sleep through the night?
        </div>
        <h2 className="display-sm mb-6 split-words" style={{"color":"#fff"}}>Let's look at your case.</h2>
        <p className="body-lg mb-10 max-w-xl mx-auto" style={{"color":"rgba(255,255,255,0.85)"}}>
            Confidential consultation. Send your reports on WhatsApp for a same-day opinion.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/?interest=prostate#book" className="btn btn-white btn-lg">
                <Icons.Calendar  style={{"width":"18px","height":"18px"}} />
                Book Free Consultation
            </Link>
            <a href="https://wa.me/918800263884" className="btn btn-lg" style={{"background":"rgba(255,255,255,0.1)","color":"#fff","border":"1px solid rgba(255,255,255,0.2)"}}>
                <Icons.MessageCircle  style={{"width":"18px","height":"18px"}} />
                WhatsApp Reports
            </a>
        </div>
    </div>
</section>


    </>
  );
}
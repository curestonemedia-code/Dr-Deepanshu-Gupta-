export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  slug: string;
  title: string;
  relatedHref?: string;
  relatedLabel?: string;
  items: FaqItem[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    slug: "general",
    title: "General Questions",
    relatedHref: "/?interest=other#book",
    relatedLabel: "Book a Consultation",
    items: [
      {
        q: "Is laser surgery really painless?",
        a: "The procedure itself is done under anaesthesia, so you feel nothing during. Post-operatively, because there are no cuts or incisions, discomfort is typically mild — most patients are off pain medication within 24–48 hours. Compared to open or PCNL surgery, the pain profile is dramatically lower.",
      },
      {
        q: 'What does "fluoroscopy-free" actually mean, and why should I care?',
        a: "Most stone surgeries worldwide still use real-time X-ray (fluoroscopy) to guide instruments. That means repeated radiation exposure for you, the surgeon, and OT staff. Dr. Gupta's protocol uses high-resolution ultrasound and direct endoscopic vision instead, delivering zero radiation with equal or better precision. Particularly important for young patients, women of reproductive age, and anyone who may need repeat procedures.",
      },
      {
        q: "How long until I can go back to work?",
        a: "For RIRS/laser stone surgery, most patients resume desk work within 48–72 hours and full physical activity within a week. For HoLEP (prostate surgery), light activity resumes in 3–5 days, heavy exertion after 2 weeks.",
      },
      {
        q: "Will my health insurance cover the surgery?",
        a: "Yes, in the vast majority of cases. We're empanelled with most major Indian insurers including Star Health, HDFC Ergo, ICICI Lombard, Bajaj Allianz, CGHS and ECHS. Our team handles cashless pre-authorisation directly.",
      },
      {
        q: "Can I consult online before travelling to Gurugram?",
        a: "Absolutely. Send your reports, CT/ultrasound scans, and prior prescriptions on WhatsApp for a written preliminary opinion. If surgery is indicated, we coordinate travel, stay, and discharge timing so you can be in-and-out within 48 hours.",
      },
      {
        q: "What happens after discharge? Is there follow-up?",
        a: "Yes — follow-up is part of the treatment, not an afterthought. You'll have a scheduled review at 2 weeks for DJ stent removal (if placed), then a 6-week metabolic evaluation. WhatsApp access to our team remains open throughout.",
      },
    ],
  },
  {
    slug: "kidney-stones",
    title: "Kidney Stones",
    relatedHref: "/kidney-stones",
    relatedLabel: "Kidney Stone Treatment",
    items: [
      {
        q: "Can you really avoid fluoroscopy for all stone sizes?",
        a: "Yes — for essentially every case. Using high-resolution ultrasound for guidance and direct endoscopic vision inside the kidney, we achieve the same (often better) precision without a single milligray of radiation exposure. This is especially important for young patients and anyone likely to need future imaging or repeat procedures.",
      },
      {
        q: "My stone is 20+ mm. Is RIRS still possible, or do I need open surgery?",
        a: "Open surgery is almost never required in modern practice. For stones in the 15–25 mm range, FANS-RIRS with Thulium laser dusting typically clears them in a single session. For 25 mm+ or staghorn stones, Mini-PCNL via a 5mm keyhole tract achieves complete clearance. Either way — no large incisions, no weeks of recovery.",
      },
      {
        q: "Why does my stone keep coming back?",
        a: "Stone recurrence is driven by an underlying metabolic or dietary factor — uric acid levels, calcium metabolism, hydration patterns, diet composition. Without addressing that, any surgery only clears the current stone. That's why every patient gets a metabolic workup at the 6-week mark and a personalised prevention plan.",
      },
      {
        q: "Is it safe if I'm pregnant or planning to conceive?",
        a: "This is precisely why the fluoroscopy-free protocol matters. For pregnant patients or those planning conception, RIRS can be performed safely without exposing the patient or foetus to any radiation. We coordinate closely with your obstetrician throughout.",
      },
    ],
  },
  {
    slug: "prostate",
    title: "Prostate / BPH",
    relatedHref: "/prostate",
    relatedLabel: "Prostate Treatment (HoLEP)",
    items: [
      {
        q: "Will HoLEP affect my sexual function?",
        a: "Erectile function is preserved in virtually all cases. Retrograde ejaculation (where semen goes into the bladder rather than externally) occurs in most patients after any BPH surgery — this is normal and harmless, but something we discuss in detail before you consent. Overall sexual satisfaction typically improves because sleep improves and symptom distress resolves.",
      },
      {
        q: "Why is HoLEP better than TURP, which my local doctor recommended?",
        a: "TURP is a decades-old technique and still works well for small prostates. HoLEP is size-independent (no limit on prostate size), causes significantly less bleeding (important for patients on blood thinners), and has a re-treatment rate of under 1% at 10 years — versus TURP's 10–15%. If your prostate is larger than 60–80g, HoLEP is generally the preferred option.",
      },
      {
        q: "Can I skip surgery if I don't want it?",
        a: "Most men with BPH don't need surgery. Medical therapy, lifestyle changes (fluid timing, caffeine/alcohol moderation), and regular monitoring work well for mild to moderate symptoms. Surgery becomes the right answer when symptoms significantly affect quality of life, when medication side effects become unacceptable, or when BPH causes complications like recurrent UTIs or bladder stones.",
      },
    ],
  },
  {
    slug: "andrology",
    title: "Male Fertility & Andrology",
    relatedHref: "/andrology",
    relatedLabel: "Male Fertility & Andrology",
    items: [
      {
        q: "How is my privacy protected?",
        a: "All andrology consultations are treated with complete confidentiality. Records are stored in secured clinical systems accessible only to the treating team. Reports are shared only with you — never with family members, employers, or insurers — unless you explicitly authorise it in writing.",
      },
      {
        q: "What are realistic success rates?",
        a: "It depends on the underlying cause. For microsurgical varicocele repair, 60–70% of patients see meaningful semen parameter improvement, with natural pregnancy rates improving significantly over 12–24 months. For severe non-obstructive azoospermia, Micro-TESE finds usable sperm in 40–60% of cases when paired with ICSI. We give honest, case-specific estimates rather than blanket promises.",
      },
      {
        q: "Is the cost transparent — no surprises later?",
        a: "Yes. Every patient receives a written, itemised estimate before admission — including surgeon fees, anaesthesia, hospital stay, OT charges, and consumables. If something changes intraoperatively (rare), you're informed and consent is re-taken.",
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((category) => category.items);

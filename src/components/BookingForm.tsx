"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, MessageCircle } from "lucide-react";
import {
  cleanText,
  normalizeIndianPhone,
  validateIndianPhone,
  validateName,
  validateOptionalDescription,
  validateOptionalEmail,
  validateSelect,
} from "@/utils/formValidation";
import { sendCrmLead } from "@/utils/crmWebhook";

const CONDITIONS = [
  { value: "kidney-stones", label: "Kidney Stones (FANS-RIRS)" },
  { value: "prostate", label: "Prostate / BPH (HoLEP)" },
  { value: "infertility", label: "Male Fertility & Andrology" },
  { value: "other", label: "General Urology / Second Opinion" },
];

type FormField = "fullName" | "phone" | "condition" | "email" | "description";
type FormErrors = Partial<Record<FormField, string>>;

const baseFieldClass =
  "w-full px-5 py-3.5 bg-slate-50 border rounded-xl outline-none focus:border-[#2563eb] focus:bg-white transition-all text-slate-900 font-medium";

function getFieldClass(field: FormField, errors: FormErrors, extra = "") {
  return `${baseFieldClass} ${errors[field] ? "border-red-300 bg-red-50 focus:border-red-500" : "border-transparent"} ${extra}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="ml-1 mt-1.5 text-xs font-bold text-red-600" role="alert">
      {message}
    </p>
  );
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const requestedCondition = searchParams.get("interest") || "";
  const preselectedCondition = CONDITIONS.some((c) => c.value === requestedCondition) ? requestedCondition : "";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // Lenis (smooth-scroll) plus GSAP ScrollTrigger pinning elsewhere on the page
  // can throw off the browser's native #book hash-jump on load, since both
  // recalculate scroll height after this component mounts. Re-assert the
  // scroll target once things settle for links like /?interest=...#book.
  useEffect(() => {
    if (window.location.hash !== "#book") return;
    const timer = setTimeout(() => {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const phone = normalizeIndianPhone(fd.get("phone"));
    const data = {
      name: cleanText(fd.get("fullName")),
      phone,
      condition: cleanText(fd.get("condition")),
      email: cleanText(fd.get("email")),
      description: cleanText(fd.get("description")),
    };

    const nextErrors: FormErrors = {
      fullName: validateName(data.name),
      phone: validateIndianPhone(phone),
      condition: validateSelect(data.condition, CONDITIONS.map((c) => c.value), "Condition"),
      email: validateOptionalEmail(data.email),
      description: validateOptionalDescription(data.description),
    };
    const activeErrors = Object.fromEntries(Object.entries(nextErrors).filter(([, message]) => message));

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      const firstField = Object.keys(activeErrors)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const conditionLabel = CONDITIONS.find((c) => c.value === data.condition)?.label || "General Urology";
      const result = await sendCrmLead({
        form_type: "get_estimate",
        name: data.name,
        phone,
        consultationType: conditionLabel,
      });
      setPatientId(result.patient_id || null);
      setSubmitted(true);
    } catch {
      alert("There was a connection issue. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/70 backdrop-blur-2xl p-10 md:p-14 rounded-[2.5rem] border border-white shadow-2xl shadow-blue-600/5 text-center">
        <div className="w-20 h-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-3">Booking Received{patientId ? `, Ref. ${patientId}` : "!"}</h3>
        <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">
          Our coordinator will call you within 15 minutes to confirm your consultation slot.
        </p>
        <a
          href="https://wa.me/918800263884"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-black rounded-full hover:bg-green-700 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          Message on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white shadow-2xl shadow-blue-600/5 space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name *</label>
          <input
            name="fullName"
            required
            type="text"
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            aria-invalid={Boolean(errors.fullName)}
            className={getFieldClass("fullName", errors, "mt-1.5")}
          />
          <FieldError message={errors.fullName} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number *</label>
          <div className="flex mt-1.5">
            <span className="bg-slate-100 border border-r-0 border-transparent rounded-l-xl py-3.5 px-4 text-slate-600 font-medium flex items-center">+91</span>
            <input
              name="phone"
              required
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              pattern="[6-9][0-9]{9}"
              maxLength={10}
              defaultValue=""
              aria-invalid={Boolean(errors.phone)}
              className={getFieldClass("phone", errors, "rounded-l-none")}
            />
          </div>
          <FieldError message={errors.phone} />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">What brings you here? *</label>
        <select
          name="condition"
          required
          defaultValue={preselectedCondition}
          aria-invalid={Boolean(errors.condition)}
          className={getFieldClass("condition", errors, "mt-1.5 appearance-none")}
        >
          <option value="">Select a condition</option>
          {CONDITIONS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <FieldError message={errors.condition} />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email (Optional)</label>
        <input
          name="email"
          type="email"
          maxLength={120}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          className={getFieldClass("email", errors, "mt-1.5")}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Brief Description (Optional)</label>
        <textarea
          name="description"
          rows={3}
          maxLength={500}
          placeholder="e.g. Detected 14mm kidney stone in CT last week, looking for a second opinion..."
          aria-invalid={Boolean(errors.description)}
          className={getFieldClass("description", errors, "mt-1.5 resize-none")}
        />
        <FieldError message={errors.description} />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full py-4 bg-[#2563eb] text-white font-black rounded-xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.01] active:scale-95 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            Schedule Free Consultation
          </>
        )}
      </button>

      <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">
        Secure &amp; confidential · No charges for first-time enquiries
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, MessageCircle } from "lucide-react";
import {
  cleanText,
  normalizeIndianPhone,
  validateIndianPhone,
  validateName,
  validateOptionalDescription,
  validateSelect,
} from "@/utils/formValidation";
import { sendCrmLead } from "@/utils/crmWebhook";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  STONE_SIZES,
  STONE_SIZE_CATEGORIES,
  SUB_TREATMENTS,
  SUB_TREATMENT_CATEGORY,
  SUB_TREATMENT_SLUGS,
} from "@/constants/leadFormOptions";

type FormField = "fullName" | "phone" | "category" | "stoneSize" | "subTreatment" | "description";
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

const CATEGORY_BY_SLUG = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([label, slug]) => [slug, label]),
);
const SUB_TREATMENT_BY_SLUG = Object.fromEntries(
  Object.entries(SUB_TREATMENT_SLUGS).map(([label, slug]) => [slug, label]),
);

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedCategory = CATEGORY_BY_SLUG[searchParams.get("interest") || ""] || "";
  const preselectedSubTreatment = SUB_TREATMENT_BY_SLUG[searchParams.get("subTreatment") || ""] || "";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [category, setCategory] = useState(preselectedCategory);

  const showStoneSize = STONE_SIZE_CATEGORIES.includes(category as (typeof STONE_SIZE_CATEGORIES)[number]);
  const showSubTreatment = category === SUB_TREATMENT_CATEGORY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const phone = normalizeIndianPhone(fd.get("phone"));
    const data = {
      name: cleanText(fd.get("fullName")),
      phone,
      category: cleanText(fd.get("category")),
      stoneSize: cleanText(fd.get("stoneSize")),
      subTreatment: cleanText(fd.get("subTreatment")),
      description: cleanText(fd.get("description")),
    };

    const nextErrors: FormErrors = {
      fullName: validateName(data.name),
      phone: validateIndianPhone(phone),
      category: validateSelect(data.category, CATEGORIES as unknown as string[], "Category"),
      description: validateOptionalDescription(data.description),
    };
    if (showStoneSize) {
      nextErrors.stoneSize = validateSelect(data.stoneSize, STONE_SIZES, "Stone size");
    }
    if (showSubTreatment) {
      nextErrors.subTreatment = validateSelect(data.subTreatment, SUB_TREATMENTS, "Sub-treatment");
    }
    const activeErrors = Object.fromEntries(Object.entries(nextErrors).filter(([, message]) => message));

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      const firstField = Object.keys(activeErrors)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);

    // What CRM staff see as the lead's complaint/summary text - keeps the
    // shared webhook working with zero backend changes (it folds whatever
    // arrives under `consultationType` into a free-text field).
    const consultationType =
      showSubTreatment && data.subTreatment ? `${data.category} — ${data.subTreatment}` : data.category;

    try {
      const result = await sendCrmLead({
        form_type: "book_appointment",
        name: data.name,
        phone,
        consultationType,
        category: data.category,
        ...(showStoneSize ? { stoneSize: data.stoneSize } : {}),
        ...(showSubTreatment && data.subTreatment ? { subTreatment: data.subTreatment } : {}),
        description: data.description || "No description",
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
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category *</label>
        <select
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-invalid={Boolean(errors.category)}
          className={getFieldClass("category", errors, "mt-1.5 appearance-none")}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <FieldError message={errors.category} />
      </div>

      {showStoneSize && (
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Stone Size *</label>
          <select
            name="stoneSize"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.stoneSize)}
            className={getFieldClass("stoneSize", errors, "mt-1.5 appearance-none")}
          >
            <option value="">Select range</option>
            {STONE_SIZES.map((sz) => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
          <FieldError message={errors.stoneSize} />
        </div>
      )}

      {showSubTreatment && (
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sub-treatment *</label>
          <select
            name="subTreatment"
            required
            defaultValue={preselectedSubTreatment}
            aria-invalid={Boolean(errors.subTreatment)}
            className={getFieldClass("subTreatment", errors, "mt-1.5 appearance-none")}
          >
            <option value="">Select sub-treatment</option>
            {SUB_TREATMENTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <FieldError message={errors.subTreatment} />
        </div>
      )}

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

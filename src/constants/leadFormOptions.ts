/**
 * Single source of truth for BookingForm's category taxonomy. Kept in sync
 * by hand with the equivalent file in the Cure Stone (thecurestone.com)
 * repo - the two sites are separate deploys with no shared package to
 * import between them.
 *
 * CTA links sitewide pre-select a category (and optionally a sub-treatment)
 * via `?interest=<slug>&subTreatment=<slug>` query params, since BookingForm
 * itself only lives once, on the homepage. The *_SLUGS maps translate those
 * URL-friendly slugs to/from the human-readable labels actually submitted
 * to the CRM.
 */

export const CATEGORIES = [
  "Kidney Stone Treatment",
  "Urology & Andrology",
  "Gall Bladder Stone Surgery",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Categories where the Stone Size field is shown instead of Sub-treatment. */
export const STONE_SIZE_CATEGORIES: Category[] = ["Kidney Stone Treatment", "Gall Bladder Stone Surgery"];

/** The one category where the Sub-treatment field is shown instead of Stone Size. */
export const SUB_TREATMENT_CATEGORY: Category = "Urology & Andrology";

export const CATEGORY_SLUGS: Record<Category, string> = {
  "Kidney Stone Treatment": "kidney-stone-treatment",
  "Urology & Andrology": "urology-andrology",
  "Gall Bladder Stone Surgery": "gall-bladder-stone-surgery",
};

export const STONE_SIZES = [
  "Less than 5mm",
  "5mm - 10mm",
  "10mm - 15mm",
  "15mm - 20mm",
  "20mm - 30mm",
  "Greater than 30mm",
  "Unknown / Not Diagnosed",
];

export const SUB_TREATMENTS = [
  "Circumcision (Laser/Stapler)",
  "Pyeloplasty",
  "Ureteroplasty",
  "TURP",
  "HoLEP",
  "Frenuloplasty",
  "Urethral Stricture",
];

export const SUB_TREATMENT_SLUGS: Record<string, string> = {
  "Circumcision (Laser/Stapler)": "circumcision",
  Pyeloplasty: "pyeloplasty",
  Ureteroplasty: "ureteroplasty",
  TURP: "turp",
  HoLEP: "holep",
  Frenuloplasty: "frenuloplasty",
  "Urethral Stricture": "urethral-stricture",
};

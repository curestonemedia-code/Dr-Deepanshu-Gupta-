const CRM_WEBHOOK_URL =
  "https://crm.thecurestone.com/api/webhook/website-leads?wh_token=a219235a3e0bca4bafac34581d23d4c3d64643b5e1e2eda329e9a7ff4670d57b";

// This booking form collects name, phone and a condition/procedure interest
// but not state or stone size, so it maps to the CRM's "get_estimate" shape
// rather than "book_appointment" (which requires those extra fields).
export type CrmLeadPayload = {
  form_type: "get_estimate";
  name: string;
  phone: string;
  consultationType: string;
};

export type CrmLeadResponse = {
  status: string;
  patient_id?: string;
  created?: boolean;
};

function postToCrm(payload: CrmLeadPayload) {
  return fetch(CRM_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(5000),
    body: JSON.stringify(payload),
  });
}

/**
 * Submits a lead to the shared Cure Stone CRM. This is the form's sole
 * backend call, so failures (network, timeout, non-2xx) are thrown for the
 * caller's own try/catch to surface to the user.
 *
 * A same-payload retry covers the cold DNS/TLS/CORS-preflight cost the
 * visitor's browser sometimes pays on the very first request to a different
 * origin than the one serving this site; only network-level failures are
 * retried, not a real 400/401 response.
 */
export async function sendCrmLead(payload: CrmLeadPayload): Promise<CrmLeadResponse> {
  let res: Response;
  try {
    res = await postToCrm(payload);
  } catch (firstError) {
    console.warn("CRM webhook first attempt failed, retrying once:", firstError);
    res = await postToCrm(payload);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`CRM webhook returned ${res.status}: ${body}`);
  }

  return res.json();
}

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  title: string;
  description: string;
};

/** This marketing site is Oceana-only — inquiries must land on OCEANAPROFX admin. */
const PORTAL_BROKER_CODE =
  process.env.NEXT_PUBLIC_PORTAL_BROKER_CODE?.trim() || "OCEANAPROFX";

export async function createInquiry(payload: InquiryPayload) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
  }

  const response = await fetch(`${baseUrl}/inquiry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      portalBrokerCode: PORTAL_BROKER_CODE,
    }),
  });

  if (!response.ok) {
    let message = "Failed to submit inquiry";
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // Ignore JSON parse error and keep default message.
    }
    throw new Error(message);
  }

  return response.json().catch(() => null);
}

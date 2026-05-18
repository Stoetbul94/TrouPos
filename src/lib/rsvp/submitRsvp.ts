import type { RsvpPayload, RsvpResult } from "@/types/rsvp";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitRsvp(payload: RsvpPayload): Promise<RsvpResult> {
  await delay(500);

  if (process.env.NODE_ENV === "development") {
    console.info("[RSVP stub]", payload);
  }

  return {
    ok: true,
    reference: `RSVP-${Date.now().toString(36).toUpperCase()}`,
  };
}

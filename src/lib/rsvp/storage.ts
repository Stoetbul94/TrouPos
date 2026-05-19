import type { RsvpDraft } from "@/types/rsvp";
import type { PremiumRsvpFormValues } from "./premiumSchema";

const PREFIX = "trou-rsvp-draft:";

function key(slug: string) {
  return `${PREFIX}${slug}`;
}

type RsvpDraftInput = Omit<RsvpDraft, "savedAt"> | Omit<PremiumRsvpFormValues, "invitationSlug">;

export function saveRsvpDraft(slug: string, draft: RsvpDraftInput) {
  if (typeof window === "undefined") return;
  try {
    const payload: RsvpDraft = { ...draft, savedAt: new Date().toISOString() };
    localStorage.setItem(key(slug), JSON.stringify(payload));
  } catch {
    // Storage full or private mode
  }
}

export function loadRsvpDraft(slug: string): RsvpDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key(slug));
    if (!raw) return null;
    return JSON.parse(raw) as RsvpDraft;
  } catch {
    return null;
  }
}

export function clearRsvpDraft(slug: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key(slug));
  } catch {
    // ignore
  }
}

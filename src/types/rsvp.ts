export type RsvpAttendance = "attending" | "declined" | "maybe";

export type MealPreference = "standard" | "vegetarian" | "vegan" | "halaal" | "kosher";

export interface RsvpGuest {
  name: string;
  mealPreference?: MealPreference;
}

export interface RsvpPayload {
  invitationSlug: string;
  attendance: RsvpAttendance;
  guestCount: number;
  guests: RsvpGuest[];
  email?: string;
  phone?: string;
  message?: string;
  dietaryNotes?: string;
}

export interface RsvpResult {
  ok: boolean;
  reference?: string;
  error?: string;
}

/** Premium RSVP form draft fields (stored alongside legacy payload fields). */
export interface PremiumRsvpDraftFields {
  fullName?: string;
  attending?: "yes" | "no";
  guestCount?: number;
  dietaryRequirements?: string;
  personalMessage?: string;
}

export interface RsvpDraft extends Partial<RsvpPayload>, PremiumRsvpDraftFields {
  savedAt: string;
}

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

export interface RsvpDraft extends Partial<RsvpPayload> {
  savedAt: string;
}

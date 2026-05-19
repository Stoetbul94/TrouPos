import type { WeddingInvitationContent } from "@/types/invitation-content";

export type AddToCalendarVariant = "dark" | "light";

export interface AddToCalendarProps {
  content: WeddingInvitationContent;
  variant?: AddToCalendarVariant;
  className?: string;
  /** Event length in hours (default 5) */
  durationHours?: number;
  /** Shown in event description + ICS URL field */
  inviteUrl?: string;
  /** Stable UID for ICS (e.g. invitation slug) */
  eventUid?: string;
  heading?: string;
}

export interface CalendarProviderOption {
  id: import("@/lib/calendar").CalendarProvider;
  label: string;
  description: string;
}

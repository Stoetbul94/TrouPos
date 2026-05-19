export type RsvpFormVariant = "dark" | "light";

export type RsvpFormStatus = "idle" | "submitting" | "success" | "error";

export interface PremiumRsvpFormProps {
  invitationSlug: string;
  className?: string;
  variant?: RsvpFormVariant;
  title?: string;
  description?: string;
}

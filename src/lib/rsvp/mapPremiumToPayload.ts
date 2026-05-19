import type { RsvpPayload } from "@/types/rsvp";
import type { PremiumRsvpFormValues } from "./premiumSchema";

export function mapPremiumToPayload(values: PremiumRsvpFormValues): RsvpPayload {
  const isAttending = values.attending === "yes";

  return {
    invitationSlug: values.invitationSlug,
    attendance: isAttending ? "attending" : "declined",
    guestCount: isAttending ? (values.guestCount ?? 1) : 1,
    guests: [{ name: values.fullName.trim() }],
    message: values.personalMessage?.trim() || undefined,
    dietaryNotes: isAttending
      ? values.dietaryRequirements?.trim() || undefined
      : undefined,
  };
}

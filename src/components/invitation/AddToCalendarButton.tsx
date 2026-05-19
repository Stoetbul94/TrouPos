"use client";

import type { Invitation } from "@/types/invitation";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { AddToCalendar } from "@/components/invitation/calendar/AddToCalendar";

type CalendarProps = {
  className?: string;
  variant?: "dark" | "light";
  durationHours?: number;
  inviteUrl?: string;
  eventUid?: string;
};

/** @deprecated Use AddToCalendar from @/components/invitation/calendar for all providers */
export function AddToCalendarButton({
  invitation,
  content,
  className,
  variant = "dark",
  durationHours,
  inviteUrl,
  eventUid,
}: CalendarProps &
  (
    | { invitation: Invitation; content?: never }
    | { content: WeddingInvitationContent; invitation?: never }
  )) {
  const calendarContent =
    content ?? (invitation ? invitationContentFromLegacy(invitation) : null);

  if (!calendarContent) return null;

  return (
    <AddToCalendar
      content={calendarContent}
      variant={variant}
      className={className}
      durationHours={durationHours}
      inviteUrl={inviteUrl}
      eventUid={eventUid ?? invitation?.slug}
    />
  );
}

function invitationContentFromLegacy(
  invitation: Invitation,
): WeddingInvitationContent {
  const event = invitation.events[0];
  return {
    brideName: invitation.couple.partnerOne,
    groomName: invitation.couple.partnerTwo,
    weddingDate: invitation.weddingDate,
    weddingTime: "14:00",
    venueName: event?.venue.name ?? "",
    venueAddress: event?.venue.address ?? "",
    googleMapsLink: event?.venue.mapUrl ?? "",
    countdownDate: invitation.weddingDate,
    galleryImages: [],
    themeColor: invitation.theme?.accentColor ?? "#c9a962",
  };
}

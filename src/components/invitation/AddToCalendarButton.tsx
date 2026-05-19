import type { Invitation } from "@/types/invitation";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { combineDateAndTime } from "@/lib/invitations/contentAdapter";
import { buildGoogleCalendarUrl } from "@/lib/utils/urls";
import { formatWeddingDate } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";

type CalendarProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function AddToCalendarButton({
  invitation,
  content,
  className,
  variant = "dark",
}: CalendarProps &
  ({ invitation: Invitation; content?: never } | { content: WeddingInvitationContent; invitation?: never })) {
  const calendarContent = content ?? (invitation ? invitationContentFromLegacy(invitation) : null);
  if (!calendarContent) return null;

  const startsAt = combineDateAndTime(
    calendarContent.weddingDate,
    calendarContent.weddingTime,
  );
  const title = `${calendarContent.brideName} & ${calendarContent.groomName} Wedding`;
  const location = `${calendarContent.venueName}, ${calendarContent.venueAddress}`;
  const href = buildGoogleCalendarUrl({
    title,
    start: startsAt,
    location,
    details: `Wedding celebration — ${formatWeddingDate(startsAt)}`,
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-2.5 text-sm font-medium tracking-wide transition duration-300",
        variant === "light"
          ? "border-gold/40 bg-gold/10 text-charcoal hover:bg-gold/20"
          : "border-gold/50 text-gold hover:bg-gold/10",
        className,
      )}
    >
      Add to calendar
    </a>
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

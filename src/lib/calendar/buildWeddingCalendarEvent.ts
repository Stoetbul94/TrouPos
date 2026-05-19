import type { WeddingInvitationContent } from "@/types/invitation-content";
import { combineDateAndTime } from "@/lib/invitations/contentAdapter";
import { formatWeddingDate, parseInvitationDate } from "@/lib/utils/dates";
import type { WeddingCalendarEvent } from "./types";

const DEFAULT_DURATION_HOURS = 5;

export function buildWeddingCalendarEvent(
  content: WeddingInvitationContent,
  options?: {
    durationHours?: number;
    uid?: string;
    inviteUrl?: string;
  },
): WeddingCalendarEvent {
  const startIso = combineDateAndTime(content.weddingDate, content.weddingTime);
  const start = parseInvitationDate(startIso);
  const end = new Date(start.getTime() + (options?.durationHours ?? DEFAULT_DURATION_HOURS) * 3_600_000);

  const title = `${content.brideName} & ${content.groomName} — Wedding`;
  const location = [content.venueName, content.venueAddress].filter(Boolean).join(", ");

  const descriptionParts = [
    content.welcomeMessage,
    `Join us on ${formatWeddingDate(startIso)}.`,
    content.googleMapsLink ? `Venue: ${content.googleMapsLink}` : undefined,
    options?.inviteUrl ? `Invitation: ${options.inviteUrl}` : undefined,
  ].filter(Boolean);

  return {
    uid: options?.uid ?? `wedding-${start.getTime()}@troupos.app`,
    title,
    description: descriptionParts.join("\n\n"),
    location,
    start,
    end,
    url: options?.inviteUrl,
  };
}

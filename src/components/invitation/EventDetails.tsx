import type { WeddingInvitationContent } from "@/types/invitation-content";
import type { WeddingEvent } from "@/types/invitation";
import { WeddingDetailsSection } from "@/components/invitation/WeddingDetailsSection";

/** @deprecated Use WeddingDetailsSection with content prop */
export function EventDetails({
  events,
  content,
  variant = "dark",
}: {
  events?: WeddingEvent[];
  content?: WeddingInvitationContent;
  variant?: "dark" | "light";
}) {
  if (content) {
    return (
      <WeddingDetailsSection
        content={content}
        variant={variant}
        layout="events-list"
      />
    );
  }
  if (!events?.length) return null;

  const event = events[0];
  const fallbackContent: WeddingInvitationContent = {
    brideName: "",
    groomName: "",
    weddingDate: event?.startsAt ?? "",
    weddingTime: "14:00",
    venueName: event?.venue.name ?? "",
    venueAddress: event?.venue.address ?? "",
    googleMapsLink: event?.venue.mapUrl ?? "",
    countdownDate: event?.startsAt ?? "",
    galleryImages: [],
    themeColor: "#c9a962",
  };

  return (
    <WeddingDetailsSection
      content={fallbackContent}
      variant={variant}
      layout="events-list"
      showCalendar={false}
    />
  );
}

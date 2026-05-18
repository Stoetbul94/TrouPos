import type { Invitation } from "@/types/invitation";
import { MapEmbed } from "@/components/invitation/MapEmbed";

export function VenueMap({ invitation }: { invitation: Invitation }) {
  const primaryVenue = invitation.events[0]?.venue;
  if (!primaryVenue) return null;
  return <MapEmbed venue={primaryVenue} />;
}

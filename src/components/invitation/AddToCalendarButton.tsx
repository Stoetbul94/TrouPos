import type { Invitation } from "@/types/invitation";
import { buildGoogleCalendarUrl } from "@/lib/utils/urls";
import { formatWeddingDate } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";

export function AddToCalendarButton({
  invitation,
  className,
  variant = "dark",
}: {
  invitation: Invitation;
  className?: string;
  variant?: "dark" | "light";
}) {
  const ceremony = invitation.events[0];
  if (!ceremony) return null;

  const title = `${invitation.couple.partnerOne} & ${invitation.couple.partnerTwo} Wedding`;
  const location = `${ceremony.venue.name}, ${ceremony.venue.address}, ${ceremony.venue.city}`;
  const href = buildGoogleCalendarUrl({
    title,
    start: ceremony.startsAt,
    end: ceremony.endsAt,
    location,
    details: `Wedding celebration — ${formatWeddingDate(invitation.weddingDate)}`,
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

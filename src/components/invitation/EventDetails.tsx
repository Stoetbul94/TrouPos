import type { WeddingEvent } from "@/types/invitation";
import { formatEventTime, formatWeddingDate } from "@/lib/utils/dates";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";

export function EventDetails({ events }: { events: WeddingEvent[] }) {
  return (
    <Container>
      <MotionSection>
        <h2 className="mb-10 text-center font-display text-3xl font-light tracking-wide sm:text-4xl">
          The Celebration
        </h2>
        <ul className="space-y-10">
          {events.map((event) => (
            <li
              key={event.id}
              className="border-t border-ivory/10 pt-8 first:border-0 first:pt-0"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                {formatWeddingDate(event.startsAt, "d MMMM yyyy")}
              </p>
              <h3 className="mt-2 font-display text-2xl">{event.title}</h3>
              <p className="mt-1 text-sm text-ivory/70">
                {formatEventTime(event.startsAt)}
                {event.endsAt && ` – ${formatEventTime(event.endsAt)}`}
              </p>
              <p className="mt-3 font-medium">{event.venue.name}</p>
              <p className="text-sm text-ivory/60">
                {event.venue.address}, {event.venue.city}
                {event.venue.province && `, ${event.venue.province}`}
              </p>
              {event.description && (
                <p className="mt-2 text-sm italic text-ivory/50">
                  {event.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </MotionSection>
    </Container>
  );
}

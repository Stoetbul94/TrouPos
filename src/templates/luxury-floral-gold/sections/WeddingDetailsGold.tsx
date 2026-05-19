"use client";

import { m } from "framer-motion";
import type { Invitation } from "@/types/invitation";
import { formatEventTime, formatWeddingDate } from "@/lib/utils/dates";
import { AddToCalendarButton } from "@/components/invitation/AddToCalendarButton";
import { Container } from "@/components/layout/Container";
import { FloralSectionReveal } from "./FloralSectionReveal";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function WeddingDetailsGold({ invitation }: { invitation: Invitation }) {
  return (
    <section id="details" className="scroll-mt-24 py-[var(--section-py)]">
      <Container>
        <FloralSectionReveal className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-muted">
            Wedding details
          </p>
          <h2 className="mt-3 font-display text-3xl font-light text-charcoal sm:text-4xl">
            The celebration
          </h2>
        </FloralSectionReveal>

        <m.ul
          className="mt-12 space-y-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {invitation.events.map((event) => (
            <m.li
              key={event.id}
              variants={fadeUp}
              className="relative rounded-2xl border border-gold/15 bg-white/50 p-8 shadow-sm shadow-gold/5 backdrop-blur-sm"
            >
              <div
                className="absolute -left-px top-8 h-16 w-1 rounded-full bg-gradient-to-b from-gold to-gold-muted/30"
                aria-hidden
              />
              <p className="text-xs uppercase tracking-[0.25em] text-gold-muted">
                {formatWeddingDate(event.startsAt, "EEEE, d MMMM")}
              </p>
              <h3 className="mt-2 font-display text-2xl text-charcoal">
                {event.title}
              </h3>
              <p className="mt-1 text-sm text-charcoal/60">
                {formatEventTime(event.startsAt)}
                {event.endsAt && ` – ${formatEventTime(event.endsAt)}`}
              </p>
              <p className="mt-4 font-medium text-charcoal">{event.venue.name}</p>
              <p className="text-sm text-charcoal/55">
                {event.venue.address}, {event.venue.city}
                {event.venue.province && `, ${event.venue.province}`}
              </p>
              {event.description && (
                <p className="mt-3 text-sm italic text-charcoal/45">
                  {event.description}
                </p>
              )}
              {event.dressCode && (
                <p className="mt-3 text-xs uppercase tracking-widest text-gold-muted">
                  Dress: {event.dressCode}
                </p>
              )}
            </m.li>
          ))}
        </m.ul>

        <FloralSectionReveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <AddToCalendarButton invitation={invitation} variant="light" />
        </FloralSectionReveal>
      </Container>
    </section>
  );
}

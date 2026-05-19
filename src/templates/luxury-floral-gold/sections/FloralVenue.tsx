"use client";

import type { WeddingInvitationContent } from "@/types/invitation-content";
import { MapEmbed } from "@/components/invitation/MapEmbed";
import { Container } from "@/components/layout/Container";
import { FloralSectionReveal } from "./FloralSectionReveal";

export function FloralVenue({ content }: { content: WeddingInvitationContent }) {
  if (!content.googleMapsLink) return null;

  const venue = {
    name: content.venueName,
    address: content.venueAddress,
    city: "",
    mapUrl: content.googleMapsLink,
  };

  return (
    <section id="venue" className="scroll-mt-24 py-[var(--section-py)]">
      <Container>
        <FloralSectionReveal className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-muted">
            Venue
          </p>
          <h2 className="mt-3 font-display text-3xl font-light text-charcoal sm:text-4xl">
            Join us here
          </h2>
        </FloralSectionReveal>
      </Container>
      <MapEmbed venue={venue} variant="light" showTitle={false} />
    </section>
  );
}

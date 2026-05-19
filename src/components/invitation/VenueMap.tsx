"use client";

import type { WeddingInvitationContent } from "@/types/invitation-content";
import { MapEmbed } from "@/components/invitation/MapEmbed";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/motion/MotionSection";
import { contentToVenue } from "@/lib/invitations/contentAdapter";
import { cn } from "@/lib/utils/cn";

export function VenueMap({
  content,
  variant = "dark",
  showHeading = true,
  className,
}: {
  content: WeddingInvitationContent;
  variant?: "dark" | "light";
  showHeading?: boolean;
  className?: string;
}) {
  if (!content.googleMapsLink) return null;

  const venue = contentToVenue(content);

  if (!showHeading) {
    return (
      <section id="venue" className={cn("scroll-mt-24", className)}>
        <MapEmbed venue={venue} variant={variant} showTitle={false} />
      </section>
    );
  }

  return (
    <section id="venue" className={cn("scroll-mt-24 py-[var(--section-py)]", className)}>
      <Container>
        <MotionSection className="mb-8 text-center">
          <p
            className={cn(
              "text-xs uppercase tracking-[0.35em]",
              variant === "light" ? "text-gold-muted" : "text-gold",
            )}
          >
            Venue
          </p>
          <h2
            className={cn(
              "mt-3 font-display text-3xl font-light sm:text-4xl",
              variant === "light" ? "text-charcoal" : "text-ivory",
            )}
          >
            Join us here
          </h2>
        </MotionSection>
      </Container>
      <MapEmbed venue={venue} variant={variant} showTitle={false} />
    </section>
  );
}

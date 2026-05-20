"use client";

import type { WeddingInvitationContent } from "@/types/invitation-content";
import { AmbientSection } from "@/components/cinematic/AmbientSection";
import { MapEmbed } from "@/components/invitation/MapEmbed";
import { BleedContainer } from "@/components/layout/BleedContainer";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/motion/MotionSection";
import { contentToVenue } from "@/lib/invitations/contentAdapter";
import { cn } from "@/lib/utils/cn";

export function VenueMap({
  content,
  variant = "dark",
  showHeading = true,
  className,
  ambienceImage,
}: {
  content: WeddingInvitationContent;
  variant?: "dark" | "light";
  showHeading?: boolean;
  className?: string;
  ambienceImage?: string;
}) {
  if (!content.googleMapsLink) return null;

  const venue = contentToVenue(content);
  const wash = ambienceImage ?? content.atmosphere?.venueAmbience;

  const mapBlock = (
    <BleedContainer>
      <MapEmbed venue={venue} variant={variant} showTitle={false} />
    </BleedContainer>
  );

  if (!showHeading) {
    return (
      <section id="venue" className={cn("scroll-mt-24", className)}>
        {mapBlock}
      </section>
    );
  }

  const inner = (
    <>
      <Container width="editorial">
        <MotionSection variant="revealSoft" className="mb-8 text-center lg:mb-12">
          <p
            className={cn(
              "type-eyebrow",
              variant === "light" ? "text-gold-muted" : "text-gold",
            )}
          >
            Venue
          </p>
          <h2
            className={cn(
              "type-section-title mt-3",
              variant === "light" ? "text-charcoal" : "text-ivory",
            )}
          >
            Join us here
          </h2>
        </MotionSection>
      </Container>
      {mapBlock}
    </>
  );

  if (wash) {
    return (
      <AmbientSection
        id="venue"
        backgroundImage={wash}
        variant={variant === "light" ? "light" : "dark"}
        overlay="none"
        containerWidth="full"
        washOpacity={0.2}
        className={cn("scroll-mt-24 !py-0", className)}
        contentClassName="py-[var(--section-py)] lg:py-[var(--section-py-lg)]"
      >
        <div
          className="pointer-events-none mx-auto mb-8 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-gold/20 to-transparent lg:mb-12"
          aria-hidden
        />
        {inner}
      </AmbientSection>
    );
  }

  return (
    <section
      id="venue"
      className={cn(
        "scroll-mt-24 py-[var(--section-py)] lg:py-[var(--section-py-lg)]",
        className,
      )}
    >
      <div
        className="pointer-events-none mx-auto mb-8 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-gold/15 to-transparent lg:mb-12"
        aria-hidden
      />
      {inner}
    </section>
  );
}

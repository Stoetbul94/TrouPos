"use client";

import Link from "next/link";
import { AmbientSection } from "@/components/cinematic/AmbientSection";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/motion/MotionSection";

export function DynamicRsvpSection({
  rsvpLink,
  invitationSlug,
  variant = "dark",
}: {
  rsvpLink?: string;
  invitationSlug: string;
  variant?: "dark" | "light";
}) {
  if (rsvpLink) {
    return (
      <AmbientSection variant="elevated" containerWidth="prose" className="!py-0">
        <Container width="narrow" className="py-16 lg:py-20">
          <MotionSection variant="revealSoft" className="text-center">
            <p className="type-eyebrow">RSVP</p>
            <h2 className="type-section-title mt-3 text-ivory">Kindly respond</h2>
            <Link
              href={rsvpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-8 py-2.5 text-sm font-medium text-charcoal transition hover:bg-gold/90"
            >
              RSVP online
            </Link>
          </MotionSection>
        </Container>
      </AmbientSection>
    );
  }

  return (
    <AmbientSection variant="elevated" containerWidth="prose" className="!py-0">
      <div className="py-[var(--section-py)] lg:py-[var(--section-py-lg)]">
        <RsvpForm invitationSlug={invitationSlug} variant={variant} />
      </div>
    </AmbientSection>
  );
}

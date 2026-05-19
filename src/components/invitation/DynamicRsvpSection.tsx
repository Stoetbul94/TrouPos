"use client";

import Link from "next/link";
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
      <Container narrow>
        <MotionSection className="py-16 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">RSVP</p>
          <h2 className="mt-3 font-display text-3xl font-light">Kindly respond</h2>
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
    );
  }

  return <RsvpForm invitationSlug={invitationSlug} variant={variant} />;
}

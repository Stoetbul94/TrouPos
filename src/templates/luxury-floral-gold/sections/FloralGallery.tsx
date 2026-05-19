"use client";

import type { Invitation } from "@/types/invitation";
import { Gallery } from "@/components/invitation/Gallery";
import { Container } from "@/components/layout/Container";
import { FloralSectionReveal } from "./FloralSectionReveal";

export function FloralGallery({ invitation }: { invitation: Invitation }) {
  const images = invitation.media.gallery;
  if (!images?.length) return null;

  return (
    <section className="bg-gradient-to-b from-[#faf6f0] to-champagne/20 py-[var(--section-py)]">
      <Container>
        <FloralSectionReveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-muted">
            Our moments
          </p>
          <h2 className="mt-3 font-display text-3xl font-light text-charcoal sm:text-4xl">
            A love in bloom
          </h2>
        </FloralSectionReveal>
      </Container>
      <Gallery images={images} variant="light" showTitle={false} />
    </section>
  );
}

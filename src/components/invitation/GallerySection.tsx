"use client";

import type { WeddingInvitationContent } from "@/types/invitation-content";
import { Gallery } from "@/components/invitation/Gallery";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/motion/MotionSection";
import { galleryContentToImages } from "@/lib/invitations/contentAdapter";
import { cn } from "@/lib/utils/cn";

export function GallerySection({
  content,
  variant = "dark",
  showHeading = true,
  className,
  subtitle = "Moments",
  title = "Our moments",
}: {
  content: WeddingInvitationContent;
  variant?: "dark" | "light";
  showHeading?: boolean;
  className?: string;
  subtitle?: string;
  title?: string;
}) {
  const images = galleryContentToImages(content.galleryImages);
  if (!images.length) return null;

  return (
    <section
      className={cn(
        "scroll-mt-24 py-[var(--section-py)]",
        variant === "light" &&
          "bg-gradient-to-b from-[#faf6f0] to-champagne/20",
        className,
      )}
    >
      {showHeading && (
        <Container>
          <MotionSection className="mb-10 text-center">
            <p
              className={cn(
                "text-xs uppercase tracking-[0.35em]",
                variant === "light" ? "text-gold-muted" : "text-gold",
              )}
            >
              {subtitle}
            </p>
            <h2
              className={cn(
                "mt-3 font-display text-3xl font-light sm:text-4xl",
                variant === "light" ? "text-charcoal" : "text-ivory",
              )}
            >
              {title}
            </h2>
          </MotionSection>
        </Container>
      )}
      <Gallery images={images} variant={variant} showTitle={false} />
    </section>
  );
}

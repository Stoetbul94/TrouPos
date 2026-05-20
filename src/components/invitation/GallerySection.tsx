"use client";

import type { WeddingInvitationContent } from "@/types/invitation-content";
import { AmbientSection } from "@/components/cinematic/AmbientSection";
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
  fullBleed = true,
}: {
  content: WeddingInvitationContent;
  variant?: "dark" | "light";
  showHeading?: boolean;
  className?: string;
  subtitle?: string;
  title?: string;
  fullBleed?: boolean;
}) {
  const images = galleryContentToImages(content.galleryImages);
  if (!images.length) return null;

  const wash = content.atmosphere?.galleryWash;

  const heading = showHeading && (
    <Container width="editorial">
      <MotionSection variant="revealSoft" className="mb-10 text-center lg:mb-14">
        <p
          className={cn(
            "type-eyebrow",
            variant === "light" ? "text-gold-muted" : "text-gold",
          )}
        >
          {subtitle}
        </p>
        <h2
          className={cn(
            "type-section-title mt-3",
            variant === "light" ? "text-charcoal" : "text-ivory",
          )}
        >
          {title}
        </h2>
      </MotionSection>
    </Container>
  );

  const gallery = (
    <Gallery
      images={images}
      variant={variant}
      showTitle={!showHeading}
      fullBleed={fullBleed}
    />
  );

  if (wash) {
    return (
      <AmbientSection
        backgroundImage={wash}
        variant={variant === "light" ? "light" : "dark"}
        overlay="none"
        containerWidth="full"
        className={cn("!py-0", className)}
        contentClassName="py-[var(--section-py)] lg:py-[var(--section-py-lg)]"
      >
        {heading}
        {gallery}
      </AmbientSection>
    );
  }

  return (
    <section
      className={cn(
        "scroll-mt-24 py-[var(--section-py)] lg:py-[var(--section-py-lg)]",
        variant === "light" &&
          "bg-gradient-to-b from-[#faf6f0] to-champagne/20",
        className,
      )}
    >
      {heading}
      {gallery}
    </section>
  );
}

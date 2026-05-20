"use client";

import { CinematicLayer } from "@/components/cinematic/CinematicLayer";
import { MotionSection } from "@/components/motion/MotionSection";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Container } from "@/components/layout/Container";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { cn } from "@/lib/utils/cn";

export function QuoteSection({
  quote,
  variant = "light",
  backgroundImage,
}: {
  quote: string;
  variant?: "dark" | "light";
  backgroundImage?: string;
}) {
  const { enabled: parallaxEnabled } = useSectionParallax();
  const hasBg = Boolean(backgroundImage);

  const quoteContent = (
    <MotionSection
      variant="revealSoft"
      className="mx-auto w-full max-w-2xl text-center lg:max-w-3xl"
    >
      <span
        className={cn(
          "font-display text-5xl leading-none lg:text-6xl",
          variant === "light" && !hasBg
            ? "text-[var(--theme-accent,#c9a962)]/30"
            : "text-gold/30",
        )}
      >
        &ldquo;
      </span>
      <blockquote
        className={cn(
          "type-pull-quote mt-2",
          hasBg && "quote-text-shadow",
          variant === "light" && !hasBg ? "text-charcoal/80" : "text-ivory/90",
        )}
      >
        {quote}
      </blockquote>
    </MotionSection>
  );

  const inner = (
    <Container
      width={hasBg ? "editorial" : "narrow"}
      className="flex min-h-[40vh] items-center py-[var(--section-py)] sm:min-h-[50vh] lg:min-h-[55vh] lg:py-[var(--section-py-lg)]"
    >
      {parallaxEnabled && hasBg ? (
        <ParallaxLayer offset={20} className="w-full">
          {quoteContent}
        </ParallaxLayer>
      ) : (
        quoteContent
      )}
    </Container>
  );

  if (!hasBg) {
    return <section>{inner}</section>;
  }

  return (
    <CinematicLayer
      imageSrc={backgroundImage}
      imageAlt=""
      overlay="quote"
      minHeight="min-h-[40vh] sm:min-h-[50vh] lg:min-h-[55vh]"
      imageClassName="object-cover object-center"
      sizes="100vw"
      foregroundClassName="w-full"
      className="scrim-strong"
    >
      {inner}
    </CinematicLayer>
  );
}

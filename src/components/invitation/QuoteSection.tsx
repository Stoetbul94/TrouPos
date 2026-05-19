"use client";

import { CinematicLayer } from "@/components/cinematic/CinematicLayer";
import { useLiteEffects } from "@/components/providers/MotionProvider";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
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
  const lite = useLiteEffects();
  const hasBg = Boolean(backgroundImage);

  const inner = (
    <Container narrow className="flex min-h-[40vh] items-center py-16 sm:min-h-[50vh] sm:py-20">
      <MotionSection
        className={cn(
          "mx-auto w-full max-w-2xl text-center",
          hasBg &&
            (lite
              ? "glass-panel-solid rounded-2xl px-6 py-10 sm:px-10"
              : "glass-panel rounded-2xl px-6 py-10 sm:px-10"),
        )}
      >
        <span
          className={cn(
            "font-display text-5xl leading-none",
            variant === "light" && !hasBg
              ? "text-[var(--theme-accent,#c9a962)]/30"
              : "text-gold/30",
          )}
        >
          &ldquo;
        </span>
        <blockquote
          className={cn(
            "mt-2 font-display text-xl font-light italic leading-relaxed sm:text-2xl",
            variant === "light" && !hasBg ? "text-charcoal/80" : "text-ivory/85",
          )}
        >
          {quote}
        </blockquote>
      </MotionSection>
    </Container>
  );

  if (!hasBg) {
    return <section className="py-16 sm:py-20">{inner}</section>;
  }

  return (
    <CinematicLayer
      imageSrc={backgroundImage}
      imageAlt=""
      overlay="quote"
      minHeight="min-h-[40vh] sm:min-h-[50vh]"
      imageClassName="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 100vw"
    >
      {inner}
    </CinematicLayer>
  );
}

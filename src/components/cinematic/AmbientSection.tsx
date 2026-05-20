"use client";

import { Container } from "@/components/layout/Container";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { useLiteEffects } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";
import { CinematicOverlays } from "./CinematicOverlays";

export type AmbientVariant = "dark" | "light" | "elevated";

export function AmbientSection({
  children,
  backgroundImage,
  backgroundAlt = "",
  variant = "dark",
  className,
  contentClassName,
  containerWidth = "prose",
  overlay = "none",
  id,
}: {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundAlt?: string;
  variant?: AmbientVariant;
  className?: string;
  contentClassName?: string;
  containerWidth?: import("@/components/layout/Container").ContainerWidth;
  overlay?: "sectionDark" | "sectionLight" | "none";
  id?: string;
}) {
  const lite = useLiteEffects();
  const resolvedOverlay =
    overlay !== "none"
      ? overlay
      : variant === "light"
        ? "sectionLight"
        : variant === "dark"
          ? "sectionDark"
          : "none";

  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-[var(--section-py)] lg:py-[var(--section-py-lg)]",
        variant === "elevated" && "bg-charcoal/95",
        variant === "light" && !backgroundImage && "bg-[#faf8f5]",
        variant === "dark" && !backgroundImage && "bg-charcoal",
        className,
      )}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className={cn(
              "absolute inset-0 opacity-[0.12]",
              !lite && "scale-110",
            )}
          >
            <OptimizedMedia
              src={backgroundImage}
              alt={backgroundAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={65}
              className="object-cover"
            />
          </div>
          {resolvedOverlay !== "none" && (
            <CinematicOverlays preset={resolvedOverlay} />
          )}
        </div>
      )}
      <Container
        width={containerWidth}
        className={cn("relative z-10", contentClassName)}
      >
        {children}
      </Container>
    </section>
  );
}

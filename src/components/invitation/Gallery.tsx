"use client";

import type { GalleryImage } from "@/types/invitation";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
import { m } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

const OBJECT_POSITIONS = [
  "object-center",
  "object-[center_20%]",
  "object-[center_70%]",
  "object-[30%_center]",
  "object-[70%_center]",
  "object-[center_40%]",
] as const;

export function Gallery({
  images,
  variant = "dark",
  showTitle = true,
  fullBleed = false,
}: {
  images: GalleryImage[];
  variant?: "dark" | "light";
  showTitle?: boolean;
  fullBleed?: boolean;
}) {
  if (!images.length) return null;

  const grid = (
    <m.div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4",
        fullBleed ? "px-4 sm:px-6" : "",
        images.length >= 4 ? "sm:grid-cols-3" : "sm:grid-cols-3",
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {images.map((img, i) => {
        const isHero = i === 0;
        return (
          <m.div
            key={img.id}
            variants={fadeUp}
            className={cn(
              "relative overflow-hidden rounded-sm",
              isHero && "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2",
            )}
          >
            <OptimizedMedia
              src={img.src}
              alt={img.alt}
              aspectRatio={isHero ? "4/5" : "1/1"}
              sizes={
                isHero
                  ? "(max-width: 640px) 100vw, 66vw"
                  : "(max-width: 640px) 50vw, 33vw"
              }
              className={cn(
                "h-full w-full",
                OBJECT_POSITIONS[i % OBJECT_POSITIONS.length],
              )}
            />
            <div className="cinematic-vignette pointer-events-none absolute inset-0" aria-hidden />
          </m.div>
        );
      })}
    </m.div>
  );

  if (fullBleed) {
    return (
      <>
        {showTitle && (
          <Container>
            <MotionSection>
              <h2
                className={cn(
                  "mb-8 text-center font-display text-3xl font-light",
                  variant === "light" ? "text-charcoal" : "text-ivory",
                )}
              >
                Moments
              </h2>
            </MotionSection>
          </Container>
        )}
        <div className="w-full max-w-[100vw] overflow-hidden">{grid}</div>
      </>
    );
  }

  return (
    <Container>
      <MotionSection>
        {showTitle && (
          <h2
            className={cn(
              "mb-8 text-center font-display text-3xl font-light",
              variant === "light" ? "text-charcoal" : "text-ivory",
            )}
          >
            Moments
          </h2>
        )}
        {grid}
      </MotionSection>
    </Container>
  );
}

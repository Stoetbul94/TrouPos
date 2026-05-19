"use client";

import type { StoryBeat } from "@/types/invitation";
import { AmbientSection } from "@/components/cinematic/AmbientSection";
import { EditorialImage } from "@/components/cinematic/EditorialImage";
import { MotionSection } from "@/components/motion/MotionSection";
import { m } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

export function StorySection({
  story,
  variant = "dark",
  ambienceImage,
}: {
  story: StoryBeat[];
  variant?: "dark" | "light";
  ambienceImage?: string;
}) {
  return (
    <AmbientSection
      backgroundImage={ambienceImage}
      variant={variant === "light" ? "light" : "dark"}
      overlay="none"
      className="!py-0"
      contentClassName="py-[var(--section-py)]"
    >
      <MotionSection>
        <h2 className="mb-12 scroll-mt-24 text-center font-display text-3xl font-light sm:text-4xl">
          Our Story
        </h2>
        <m.ol
          className="relative space-y-12 border-l border-gold/30 pl-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {story.map((beat, index) => (
            <m.li key={beat.id} variants={fadeUp} className="relative">
              {beat.year && (
                <span className="absolute -left-8 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-charcoal">
                  ·
                </span>
              )}
              <div
                className={cn(
                  beat.image && "grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10",
                  beat.image && index % 2 === 1 && "[&>*:first-child]:sm:order-2",
                )}
              >
                {beat.image && (
                  <EditorialImage
                    src={beat.image}
                    alt={beat.imageAlt ?? beat.title}
                    aspectRatio="4/3"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                )}
                <div>
                  {beat.year && (
                    <p className="text-xs uppercase tracking-[0.25em] text-gold">
                      {beat.year}
                    </p>
                  )}
                  <h3
                    className={cn(
                      "mt-1 font-display text-xl",
                      variant === "light" ? "text-charcoal" : "",
                    )}
                  >
                    {beat.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      variant === "light" ? "text-charcoal/70" : "text-ivory/65",
                    )}
                  >
                    {beat.body}
                  </p>
                </div>
              </div>
            </m.li>
          ))}
        </m.ol>
      </MotionSection>
    </AmbientSection>
  );
}

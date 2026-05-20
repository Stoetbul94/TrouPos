"use client";

import type { StoryBeat } from "@/types/invitation";
import { AmbientSection } from "@/components/cinematic/AmbientSection";
import { EditorialImage } from "@/components/cinematic/EditorialImage";
import { MotionSection } from "@/components/motion/MotionSection";
import { m } from "framer-motion";
import { staggerChapter, fadeUp } from "@/lib/animations/variants";
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
      containerWidth="editorial"
      className="!py-0"
      contentClassName="py-[var(--section-py)] lg:py-[var(--section-py-lg)]"
    >
      <MotionSection variant="revealSoft">
        <h2 className="type-section-title mb-12 text-center lg:mb-16">
          Our Story
        </h2>
        <m.ol
          className="relative space-y-12 lg:space-y-[var(--chapter-gap)]"
          variants={staggerChapter}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {story.map((beat, index) => (
            <m.li key={beat.id} variants={fadeUp} className="relative">
              {beat.year && (
                <span className="absolute -left-8 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-charcoal">
                  ·
                </span>
              )}
              {beat.image ? (
                <div
                  className={cn(
                    "grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10",
                    index % 2 === 1 && "lg:[&>*:first-child]:order-2",
                  )}
                >
                  <div className="lg:col-span-5">
                    <EditorialImage
                      src={beat.image}
                      alt={beat.imageAlt ?? beat.title}
                      aspectRatio="4/3"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <div className="lg:col-span-7">
                    <StoryBeatCopy beat={beat} variant={variant} />
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-2xl lg:max-w-3xl">
                  <StoryBeatCopy beat={beat} variant={variant} />
                </div>
              )}
            </m.li>
          ))}
        </m.ol>
      </MotionSection>
    </AmbientSection>
  );
}

function StoryBeatCopy({
  beat,
  variant,
}: {
  beat: StoryBeat;
  variant: "dark" | "light";
}) {
  return (
    <>
      {beat.year && <p className="type-eyebrow">{beat.year}</p>}
      <h3
        className={cn(
          "type-deck mt-1",
          variant === "light" ? "text-charcoal" : "text-ivory",
        )}
      >
        {beat.title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed lg:text-base",
          variant === "light" ? "text-charcoal/70" : "text-ivory/65",
        )}
      >
        {beat.body}
      </p>
    </>
  );
}

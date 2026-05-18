"use client";

import type { StoryBeat } from "@/types/invitation";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
import { m } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";

export function StoryTimeline({
  story,
  variant = "dark",
}: {
  story: StoryBeat[];
  variant?: "dark" | "light";
}) {
  return (
    <Container>
      <MotionSection>
        <h2 className="mb-12 text-center font-display text-3xl font-light sm:text-4xl">
          Our Story
        </h2>
        <m.ol
          className="relative space-y-12 border-l border-gold/30 pl-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {story.map((beat) => (
            <m.li key={beat.id} variants={fadeUp} className="relative">
              {beat.year && (
                <span className="absolute -left-8 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-charcoal">
                  ·
                </span>
              )}
              {beat.year && (
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  {beat.year}
                </p>
              )}
              <h3
                className={`mt-1 font-display text-xl ${variant === "light" ? "text-charcoal" : ""}`}
              >
                {beat.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${variant === "light" ? "text-charcoal/70" : "text-ivory/65"}`}
              >
                {beat.body}
              </p>
            </m.li>
          ))}
        </m.ol>
      </MotionSection>
    </Container>
  );
}

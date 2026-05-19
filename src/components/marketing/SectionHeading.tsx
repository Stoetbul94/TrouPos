"use client";

import { m } from "framer-motion";
import { fadeUp } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";
import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <m.div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeUp}
    >
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-light tracking-wide sm:text-4xl md:text-5xl",
          eyebrow && "mt-3",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-ivory/60 sm:text-base">
          {description}
        </p>
      )}
    </m.div>
  );
}

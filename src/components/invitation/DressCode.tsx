"use client";

import { AmbientSection } from "@/components/cinematic/AmbientSection";
import { useLiteEffects } from "@/components/providers/MotionProvider";
import { MotionSection } from "@/components/motion/MotionSection";
import { cn } from "@/lib/utils/cn";

export function DressCode({
  dressCode,
  variant = "dark",
}: {
  dressCode: string;
  variant?: "dark" | "light";
}) {
  const lite = useLiteEffects();

  return (
    <AmbientSection
      variant={variant === "light" ? "light" : "elevated"}
      className="!py-12"
      contentClassName="max-w-3xl mx-auto"
    >
      <MotionSection
        className={cn(
          "mx-auto max-w-xl rounded-2xl px-8 py-10 text-center",
          lite
            ? "border border-ivory/10 bg-charcoal/80"
            : "glass-panel",
          variant === "light" && lite && "border-charcoal/10 bg-white/80",
        )}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Dress Code</p>
        <p className="mt-4 font-display text-xl leading-relaxed sm:text-2xl">
          {dressCode}
        </p>
      </MotionSection>
    </AmbientSection>
  );
}

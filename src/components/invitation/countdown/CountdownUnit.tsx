"use client";

import { AnimatePresence, m } from "framer-motion";
import { useLiteEffects } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";
import type { CountdownUnitProps } from "./types";

const digitTransitionBlur = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const },
  },
};

const digitTransitionLite = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

export function CountdownUnit({
  label,
  value,
  theme,
  reducedMotion,
}: CountdownUnitProps) {
  const lite = useLiteEffects();
  const isLight = theme === "light";
  const display = String(value).padStart(2, "0");
  const digitTransition =
    reducedMotion || lite ? digitTransitionLite : digitTransitionBlur;

  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-1 flex-col items-center rounded-xl border px-1.5 py-2.5 xs:px-2 xs:py-3 sm:min-w-[5rem] sm:px-3 sm:py-4",
        isLight
          ? "border-gold/25 bg-white/70 shadow-sm shadow-gold/5"
          : "border-gold/20 bg-ivory/[0.04] shadow-lg shadow-black/15 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent",
          isLight && "via-[var(--theme-accent,#c9a962)]/40",
        )}
        aria-hidden
      />

      <div
        className="relative flex h-10 items-center justify-center overflow-hidden sm:h-12"
        aria-live="polite"
        aria-atomic="true"
      >
        {reducedMotion ? (
          <span
            className={cn(
              "font-display text-2xl tabular-nums tracking-wide sm:text-4xl",
              isLight ? "text-charcoal" : "text-ivory",
            )}
          >
            {display}
          </span>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={display}
              variants={digitTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                "font-display text-xl tabular-nums tracking-wide xs:text-2xl sm:text-4xl",
                isLight ? "text-charcoal" : "text-ivory",
              )}
            >
              {display}
            </m.span>
          </AnimatePresence>
        )}
      </div>

      <p
        className={cn(
          "mt-2 text-[9px] font-medium uppercase tracking-[0.28em] sm:text-[10px] sm:tracking-[0.32em]",
          isLight ? "text-charcoal/50" : "text-ivory/45",
        )}
      >
        {label}
      </p>
    </div>
  );
}

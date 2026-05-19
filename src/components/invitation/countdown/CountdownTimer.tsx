"use client";

import { m } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { useLiteEffects, useMotionReduced } from "@/components/providers/MotionProvider";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { CountdownUnit } from "./CountdownUnit";
import type { CountdownTimerProps } from "./types";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export function CountdownTimer({
  targetDate,
  theme = "dark",
  className,
  completeMessage = "The celebration begins",
}: CountdownTimerProps) {
  const reduced = useMotionReduced();
  const lite = useLiteEffects();
  const values = useCountdown(targetDate);
  const isLight = theme === "light";
  const units = lite
    ? UNITS.filter((u) => u.key !== "seconds")
    : UNITS;

  if (!values) {
    return (
      <div
        className={cn(
          cn(
            "grid gap-2 opacity-0 sm:gap-4",
            lite ? "grid-cols-3" : "grid-cols-4",
          ),
          className,
        )}
        aria-hidden
      >
        {units.map(({ label }) => (
          <div
            key={label}
            className="min-h-[4.5rem] rounded-xl border border-transparent sm:min-h-[5.5rem]"
          />
        ))}
      </div>
    );
  }

  if (values.isComplete) {
    return (
      <m.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "text-center font-display text-xl font-light tracking-wide sm:text-2xl",
          isLight ? "text-gold-muted" : "text-gold",
          className,
        )}
      >
        {completeMessage}
      </m.p>
    );
  }

  const unitValues = {
    days: values.days,
    hours: values.hours,
    minutes: values.minutes,
    seconds: values.seconds,
  };

  return (
    <m.div
      role="timer"
      aria-label="Wedding countdown"
      className={cn("w-full max-w-xl mx-auto", className)}
      variants={staggerContainer}
      initial={reduced ? false : "hidden"}
      animate="visible"
    >
      <m.div
        variants={fadeUp}
        className={cn(
          "grid gap-1.5 xs:gap-2 sm:gap-4",
          lite ? "grid-cols-3" : "grid-cols-4",
        )}
      >
        {units.map(({ key, label }) => (
          <CountdownUnit
            key={key}
            label={label}
            value={unitValues[key]}
            theme={theme}
            reducedMotion={reduced}
          />
        ))}
      </m.div>

      <m.div
        variants={fadeUp}
        className={cn(
          "mx-auto mt-4 h-px max-w-[12rem] bg-gradient-to-r from-transparent via-gold/40 to-transparent",
          isLight && "via-[var(--theme-accent,#c9a962)]/35",
        )}
        aria-hidden
      />
    </m.div>
  );
}

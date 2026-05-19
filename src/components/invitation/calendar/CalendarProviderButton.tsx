"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { AddToCalendarVariant } from "./types";

export function CalendarProviderButton({
  label,
  description,
  onClick,
  href,
  variant,
  className,
}: {
  label: string;
  description: string;
  onClick?: () => void;
  href?: string;
  variant: AddToCalendarVariant;
  className?: string;
}) {
  const isLight = variant === "light";

  const styles = cn(
    "touch-target flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition duration-300",
    isLight
      ? "border-gold/20 bg-white/70 text-charcoal hover:border-gold/35 hover:bg-white"
      : "border-ivory/15 bg-ivory/[0.04] text-ivory hover:border-gold/35 hover:bg-ivory/[0.07]",
    className,
  );

  const content = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium tracking-wide">{label}</span>
        <span
          className={cn(
            "mt-0.5 block truncate text-xs",
            isLight ? "text-charcoal/55" : "text-ivory/50",
          )}
        >
          {description}
        </span>
      </span>
      <span
        className={cn(
          "shrink-0 text-lg leading-none",
          isLight ? "text-gold-muted" : "text-gold",
        )}
        aria-hidden
      >
        →
      </span>
    </>
  );

  if (href) {
    return (
      <m.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.99 }}
        className={styles}
      >
        {content}
      </m.a>
    );
  }

  return (
    <m.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      className={styles}
    >
      {content}
    </m.button>
  );
}

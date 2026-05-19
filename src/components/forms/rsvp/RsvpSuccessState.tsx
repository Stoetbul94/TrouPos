"use client";

import { m } from "framer-motion";
import { fadeUp, scaleIn } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import type { RsvpFormVariant } from "./types";

export function RsvpSuccessState({
  reference,
  variant = "dark",
  onReset,
}: {
  reference?: string;
  variant?: RsvpFormVariant;
  onReset?: () => void;
}) {
  const isLight = variant === "light";

  return (
    <m.div
      className="py-16 text-center"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <m.div
        variants={scaleIn}
        className={cn(
          "mx-auto flex h-16 w-16 items-center justify-center rounded-full border",
          isLight
            ? "border-gold/40 bg-gold/10 text-gold-muted"
            : "border-gold/50 bg-gold/10 text-gold",
        )}
        aria-hidden
      >
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </m.div>
      <p
        className={cn(
          "mt-6 text-xs uppercase tracking-[0.35em]",
          isLight ? "text-gold-muted" : "text-gold",
        )}
      >
        Thank you
      </p>
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-light sm:text-4xl",
          isLight ? "text-charcoal" : "text-ivory",
        )}
      >
        RSVP received
      </h2>
      <p
        className={cn(
          "mx-auto mt-3 max-w-sm text-sm leading-relaxed",
          isLight ? "text-charcoal/60" : "text-ivory/60",
        )}
      >
        We cannot wait to celebrate with you. Your response has been saved.
      </p>
      {reference && (
        <p className={cn("mt-4 text-xs", isLight ? "text-charcoal/45" : "text-ivory/45")}>
          Reference: {reference}
        </p>
      )}
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className={cn(
            "mt-8 text-xs uppercase tracking-[0.25em] underline-offset-4 hover:underline",
            isLight ? "text-charcoal/50" : "text-ivory/50",
          )}
        >
          Submit another response
        </button>
      )}
    </m.div>
  );
}

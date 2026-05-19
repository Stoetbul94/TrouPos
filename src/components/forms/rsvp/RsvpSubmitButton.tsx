"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export function RsvpSubmitButton({
  isLoading,
  variant = "dark",
  className,
}: {
  isLoading: boolean;
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <m.button
      type="submit"
      disabled={isLoading}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      className={cn(
        "relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium tracking-wide transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "light"
          ? "bg-charcoal text-ivory hover:bg-charcoal/90"
          : "bg-gold text-charcoal hover:bg-gold/90 shadow-lg shadow-black/20",
        className,
      )}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      <span>{isLoading ? "Sending your RSVP…" : "Send RSVP"}</span>
    </m.button>
  );
}

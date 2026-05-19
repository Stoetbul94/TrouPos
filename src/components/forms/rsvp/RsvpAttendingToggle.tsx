"use client";

import { cn } from "@/lib/utils/cn";
import type { RsvpFormVariant } from "./types";

export function RsvpAttendingToggle({
  value,
  onChange,
  name,
  variant = "dark",
  error,
}: {
  value: "yes" | "no";
  onChange: (value: "yes" | "no") => void;
  name: string;
  variant?: RsvpFormVariant;
  error?: string;
}) {
  const isLight = variant === "light";

  const options: { value: "yes" | "no"; label: string }[] = [
    { value: "yes", label: "Yes, with joy" },
    { value: "no", label: "Regretfully, no" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={cn(
                "flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-sm transition duration-300",
                selected
                  ? isLight
                    ? "border-[var(--theme-accent,#c9a962)] bg-[var(--theme-accent,#c9a962)]/10 text-charcoal"
                    : "border-gold bg-gold/15 text-gold"
                  : isLight
                    ? "border-charcoal/15 bg-white/50 text-charcoal/60 hover:border-charcoal/25"
                    : "border-ivory/15 bg-ivory/[0.03] text-ivory/60 hover:border-ivory/30",
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

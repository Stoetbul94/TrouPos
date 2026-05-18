import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-lg border border-ivory/15 bg-charcoal/40 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/40 outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/30",
        className,
      )}
      {...props}
    />
  );
}

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-charcoal hover:bg-gold/90 border border-gold/20 shadow-lg shadow-black/20",
  secondary:
    "bg-transparent text-ivory border border-ivory/30 hover:border-ivory/60",
  ghost: "bg-transparent text-ivory/80 hover:text-ivory",
  outline:
    "bg-transparent border border-gold/50 text-gold hover:bg-gold/10",
};

export function Button({
  className,
  variant = "primary",
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "touch-target inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100",
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-charcoal hover:bg-gold/90 border border-gold/20 shadow-lg shadow-black/25",
  secondary:
    "bg-ivory/5 text-ivory border border-ivory/20 backdrop-blur-sm hover:border-ivory/40 hover:bg-ivory/10",
  outline:
    "bg-transparent border border-gold/40 text-gold hover:bg-gold/10",
  ghost:
    "bg-transparent text-ivory/70 hover:text-gold border border-transparent",
};

interface CTALinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  fullWidth?: boolean;
}

export function CTALink({
  className,
  variant = "primary",
  fullWidth,
  children,
  ...props
}: CTALinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300",
        variants[variant],
        fullWidth && "w-full sm:w-auto",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

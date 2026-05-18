import type { Couple } from "@/types/invitation";
import { cn } from "@/lib/utils/cn";

export function CoupleNames({
  couple,
  className,
  size = "hero",
}: {
  couple: Couple;
  className?: string;
  size?: "hero" | "section";
}) {
  return (
    <div className={cn("text-center", className)}>
      {couple.tagline && (
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-ivory/70">
          {couple.tagline}
        </p>
      )}
      <h1
        className={cn(
          "font-display font-light leading-tight tracking-wide",
          size === "hero"
            ? "text-4xl xs:text-5xl sm:text-6xl md:text-7xl"
            : "text-3xl sm:text-4xl",
        )}
      >
        <span className="block">{couple.partnerOne}</span>
        <span className="my-2 block text-lg font-normal italic text-gold sm:text-xl">
          &
        </span>
        <span className="block">{couple.partnerTwo}</span>
      </h1>
    </div>
  );
}

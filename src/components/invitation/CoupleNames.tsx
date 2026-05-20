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
        <p className="type-eyebrow mb-3 text-ivory/70">{couple.tagline}</p>
      )}
      <h1
        className={cn(
          "font-display font-light leading-tight tracking-wide",
          size === "hero"
            ? "text-display-fluid xs:text-5xl sm:text-6xl"
            : "text-heading-fluid",
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

import type { PricingTier } from "@/types/gallery";
import { cn } from "@/lib/utils/cn";

const tierStyles: Record<PricingTier, string> = {
  Essential: "border-ivory/20 bg-ivory/5 text-ivory/70",
  Signature: "border-gold/30 bg-gold/10 text-gold",
  Couture: "border-champagne/30 bg-champagne/10 text-champagne",
};

export function PricingTierBadge({ tier }: { tier: PricingTier }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        tierStyles[tier],
      )}
    >
      {tier}
    </span>
  );
}

import type { GiftRegistry } from "@/types/invitation";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

export function GiftRegistrySection({
  gift,
  variant = "dark",
}: {
  gift: GiftRegistry;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <Container narrow>
      <MotionSection className="text-center">
        <p
          className={cn(
            "text-xs uppercase tracking-[0.35em]",
            isLight ? "text-gold-muted" : "text-gold",
          )}
        >
          With gratitude
        </p>
        <h2
          className={cn(
            "mt-3 font-display text-3xl font-light sm:text-4xl",
            isLight ? "text-charcoal" : "text-ivory",
          )}
        >
          {gift.title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-md text-sm leading-relaxed",
            isLight ? "text-charcoal/65" : "text-ivory/60",
          )}
        >
          {gift.description}
        </p>

        {(gift.accountNumber || gift.externalUrl) && (
          <div
            className={cn(
              "mt-8 rounded-2xl border p-6 text-left text-sm",
              isLight
                ? "border-gold/20 bg-white/60"
                : "border-ivory/10 bg-ivory/[0.03]",
            )}
          >
            {gift.bankName && (
              <p className={isLight ? "text-charcoal/80" : "text-ivory/75"}>
                <span className="font-medium">Bank:</span> {gift.bankName}
              </p>
            )}
            {gift.accountHolder && (
              <p className={cn("mt-2", isLight ? "text-charcoal/80" : "text-ivory/75")}>
                <span className="font-medium">Account:</span> {gift.accountHolder}
              </p>
            )}
            {gift.accountNumber && (
              <p className={cn("mt-2 font-mono", isLight ? "text-charcoal" : "text-gold")}>
                {gift.accountNumber}
              </p>
            )}
            {gift.branchCode && (
              <p className={cn("mt-2", isLight ? "text-charcoal/70" : "text-ivory/55")}>
                Branch: {gift.branchCode}
              </p>
            )}
            {gift.reference && (
              <p className={cn("mt-2", isLight ? "text-charcoal/70" : "text-ivory/55")}>
                Reference: {gift.reference}
              </p>
            )}
          </div>
        )}

        {gift.externalUrl && (
          <a
            href={gift.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-6 inline-flex min-h-11 items-center justify-center rounded-full border px-6 text-sm tracking-wide transition",
              isLight
                ? "border-charcoal/20 text-charcoal hover:border-gold/40 hover:text-gold-muted"
                : "border-ivory/25 text-ivory hover:border-gold/40",
            )}
          >
            View gift registry
          </a>
        )}
      </MotionSection>
    </Container>
  );
}

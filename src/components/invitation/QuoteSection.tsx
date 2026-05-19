import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

export function QuoteSection({
  quote,
  variant = "light",
}: {
  quote: string;
  variant?: "dark" | "light";
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container narrow>
        <MotionSection className="text-center">
          <span
            className={cn(
              "font-display text-5xl leading-none",
              variant === "light" ? "text-[var(--theme-accent,#c9a962)]/30" : "text-gold/30",
            )}
          >
            &ldquo;
          </span>
          <blockquote
            className={cn(
              "mt-2 font-display text-xl font-light italic leading-relaxed sm:text-2xl",
              variant === "light" ? "text-charcoal/80" : "text-ivory/80",
            )}
          >
            {quote}
          </blockquote>
        </MotionSection>
      </Container>
    </section>
  );
}

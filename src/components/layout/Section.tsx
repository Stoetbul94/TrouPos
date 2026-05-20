import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type SectionVariant = "default" | "flush" | "chapter";

export function Section({
  children,
  id,
  className,
  dark,
  variant = "default",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
  variant?: SectionVariant;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        variant === "default" && "py-[var(--section-py)] lg:py-[var(--section-py-lg)]",
        variant === "flush" && "py-0",
        variant === "chapter" &&
          "min-h-[50vh] py-[var(--section-py-lg)] lg:min-h-[55vh]",
        dark && "bg-charcoal text-ivory",
        className,
      )}
    >
      {children}
    </section>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Section({
  children,
  id,
  className,
  dark,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-[var(--section-py)]",
        dark && "bg-charcoal text-ivory",
        className,
      )}
    >
      {children}
    </section>
  );
}

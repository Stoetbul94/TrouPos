import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Container({
  children,
  className,
  narrow,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        narrow ? "max-w-xl" : "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

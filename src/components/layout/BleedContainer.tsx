import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function BleedContainer({
  children,
  className,
  insetX = false,
}: {
  children: ReactNode;
  className?: string;
  /** Mobile-safe gutters; desktop edge-to-edge */
  insetX?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-[100vw]",
        insetX && "px-4 sm:px-6 lg:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

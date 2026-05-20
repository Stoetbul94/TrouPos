import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function EditorialGrid({
  children,
  className,
  aside,
  asidePosition = "right",
  fullBleed,
}: {
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
  asidePosition?: "left" | "right";
  fullBleed?: ReactNode;
}) {
  if (!aside) {
    return (
      <div className={cn("grid gap-8 lg:gap-12", className)}>
        {children}
        {fullBleed && (
          <div className="col-span-full -mx-[var(--page-px)] w-[calc(100%+2*var(--page-px))] max-w-[100vw] lg:-mx-[var(--page-px-lg)] lg:w-[calc(100%+2*var(--page-px-lg))]">
            {fullBleed}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-10",
        className,
      )}
    >
      <div
        className={cn(
          "lg:col-span-7 xl:col-span-8",
          asidePosition === "left" && "lg:order-2",
        )}
      >
        {children}
      </div>
      <aside
        className={cn(
          "lg:col-span-5 xl:col-span-4",
          asidePosition === "left" && "lg:order-1",
        )}
      >
        {aside}
      </aside>
      {fullBleed && (
        <div className="col-span-full -mx-[var(--page-px)] w-[calc(100%+2*var(--page-px))] max-w-[100vw] lg:-mx-[var(--page-px-lg)] lg:w-[calc(100%+2*var(--page-px-lg))]">
          {fullBleed}
        </div>
      )}
    </div>
  );
}

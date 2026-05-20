import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type ContainerWidth =
  | "narrow"
  | "prose"
  | "editorial"
  | "wide"
  | "full";

const widthClasses: Record<ContainerWidth, string> = {
  narrow: "max-w-xl",
  prose: "max-w-3xl",
  editorial: "max-w-3xl lg:max-w-5xl xl:max-w-6xl",
  wide: "max-w-3xl lg:max-w-6xl xl:max-w-7xl",
  full: "max-w-none",
};

export function Container({
  children,
  className,
  narrow,
  width = "prose",
}: {
  children: ReactNode;
  className?: string;
  /** @deprecated Use `width="narrow"` */
  narrow?: boolean;
  width?: ContainerWidth;
}) {
  const resolvedWidth: ContainerWidth = narrow ? "narrow" : width;

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[100vw] px-[var(--page-px)] lg:px-[var(--page-px-lg)]",
        widthClasses[resolvedWidth],
        className,
      )}
    >
      {children}
    </div>
  );
}

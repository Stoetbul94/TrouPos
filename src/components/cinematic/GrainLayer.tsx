import { cn } from "@/lib/utils/cn";

export function GrainLayer({
  intensity = "subtle",
  className,
}: {
  intensity?: "subtle" | "hero";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grain-overlay pointer-events-none absolute inset-0 z-[2]",
        intensity === "hero" && "opacity-100",
        intensity === "subtle" && "opacity-80",
        className,
      )}
      aria-hidden
    />
  );
}

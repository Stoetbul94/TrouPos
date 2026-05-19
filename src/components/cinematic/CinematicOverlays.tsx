import { cn } from "@/lib/utils/cn";

export type OverlayPreset =
  | "hero"
  | "sectionDark"
  | "sectionLight"
  | "quote"
  | "vignette"
  | "none";

export function CinematicOverlays({
  preset,
  className,
}: {
  preset: OverlayPreset;
  className?: string;
}) {
  if (preset === "none") return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-[1]", className)} aria-hidden>
      {preset === "hero" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/75" />
          <div className="cinematic-hero-glow absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />
        </>
      )}
      {preset === "sectionDark" && (
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal" />
      )}
      {preset === "sectionLight" && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] via-[#faf8f5]/98 to-champagne/30" />
      )}
      {preset === "quote" && (
        <>
          <div className="absolute inset-0 bg-charcoal/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
          <div className="cinematic-hero-glow absolute inset-0 opacity-60" />
        </>
      )}
      {preset === "vignette" && <div className="cinematic-vignette absolute inset-0" />}
    </div>
  );
}

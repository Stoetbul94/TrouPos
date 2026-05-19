"use client";

import { useState } from "react";
import { useMotionReduced } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";

export function BackgroundMusicPlayer({ src }: { src?: string }) {
  const reduced = useMotionReduced();
  const [playing, setPlaying] = useState(false);

  if (!src || reduced) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 sm:bottom-28">
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-[var(--theme-accent,#c9a962)]/40 bg-charcoal/80 text-xs text-ivory backdrop-blur-md transition hover:border-[var(--theme-accent,#c9a962)]",
          playing && "bg-[var(--theme-accent,#c9a962)]/20",
        )}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? "❚❚" : "♫"}
      </button>
      {playing && (
        <audio src={src} autoPlay loop className="hidden" aria-hidden />
      )}
    </div>
  );
}

"use client";

import { m } from "framer-motion";
import { useLiteEffects, useMotionReduced } from "@/components/providers/MotionProvider";

export function FloatingAccent({ count = 4 }: { count?: number }) {
  const lite = useLiteEffects();
  const reduced = useMotionReduced();

  if (lite || reduced) return null;

  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${12 + i * 18}%`,
    left: i % 2 === 0 ? `${8 + i * 4}%` : `${88 - i * 3}%`,
    size: 4 + (i % 2),
    delay: i * 0.4,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((dot) => (
        <m.span
          key={dot.id}
          className="absolute rounded-full bg-gold/25 blur-[2px]"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
          }}
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -8, 0] }}
          transition={{
            duration: 6 + dot.id,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

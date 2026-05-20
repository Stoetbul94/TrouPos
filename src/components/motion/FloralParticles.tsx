"use client";

import { m } from "framer-motion";
import { useMemo } from "react";
import { useLiteEffects, usePerformance } from "@/components/providers/MotionProvider";

export function FloralParticles() {
  const lite = useLiteEffects();
  const { isMobile } = usePerformance();

  const petalCount = lite ? 0 : isMobile ? 6 : 8;

  const petals = useMemo(
    () =>
      Array.from({ length: petalCount }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 17) % 84)}%`,
        size: 6 + (i % 4) * 2,
        delay: i * 0.35,
        duration: 8 + (i % 5) * 1.5,
        drift: (i % 2 === 0 ? 1 : -1) * (12 + (i % 3) * 8),
      })),
    [petalCount],
  );

  if (petalCount === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((petal) => (
        <m.span
          key={petal.id}
          className="absolute rounded-full bg-gradient-to-br from-gold/40 to-champagne/20 blur-[1px] will-change-transform"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.4,
            top: "-5%",
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, petal.drift, 0],
            opacity: [0, 0.6, 0.4, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

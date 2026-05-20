"use client";

import { m } from "framer-motion";

const PARTICLES = [
  { id: 0, x: "12%", y: "18%", size: 3, dur: 5.2, delay: 0 },
  { id: 1, x: "78%", y: "24%", size: 2, dur: 6.1, delay: 0.3 },
  { id: 2, x: "45%", y: "12%", size: 2, dur: 5.8, delay: 0.6 },
  { id: 3, x: "88%", y: "62%", size: 3, dur: 6.4, delay: 0.2 },
  { id: 4, x: "22%", y: "72%", size: 2, dur: 5.5, delay: 0.5 },
  { id: 5, x: "62%", y: "82%", size: 2, dur: 6.8, delay: 0.8 },
  { id: 6, x: "8%", y: "48%", size: 2, dur: 5.9, delay: 0.4 },
  { id: 7, x: "92%", y: "38%", size: 3, dur: 6.2, delay: 0.7 },
] as const;

/** Lightweight gold dust — transform/opacity only for in-app browsers */
export function IntroAmbientParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {PARTICLES.map((p) => (
        <m.span
          key={p.id}
          className="absolute rounded-full bg-gold/30 will-change-transform"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px rgba(201, 162, 39, 0.35)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.15, 0.45, 0.15],
            y: [0, -14, 0],
            x: [0, p.id % 2 === 0 ? 6 : -6, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

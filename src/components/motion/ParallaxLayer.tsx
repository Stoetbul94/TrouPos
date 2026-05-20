"use client";

import { m, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useLiteEffects, useMotionReduced } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";

export function ParallaxLayer({
  children,
  offset = 40,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const reduced = useMotionReduced();
  const lite = useLiteEffects();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (reduced || lite) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <m.div style={{ y }}>{children}</m.div>
    </div>
  );
}

"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeIn } from "@/lib/animations/variants";
import { useMotionReduced } from "@/components/providers/MotionProvider";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useMotionReduced();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <m.div initial="hidden" animate="visible" variants={fadeIn}>
      {children}
    </m.div>
  );
}

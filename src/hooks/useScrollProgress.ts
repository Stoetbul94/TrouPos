"use client";

import { useEffect, useState } from "react";
import { rafThrottle } from "@/lib/utils/rafThrottle";
import { useLiteEffects } from "@/components/providers/MotionProvider";

export function useScrollProgress() {
  const lite = useLiteEffects();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (lite) return;

    const onScroll = rafThrottle(() => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
    });

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lite]);

  return lite ? 0 : progress;
}

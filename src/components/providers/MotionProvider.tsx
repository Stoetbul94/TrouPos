"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import {
  useDevicePerformance,
  type DevicePerformance,
} from "@/hooks/useDevicePerformance";

const PerformanceContext = createContext<DevicePerformance | null>(null);

/** Skip Framer scroll/page animations */
export function useMotionReduced(): boolean {
  const ctx = useContext(PerformanceContext);
  return ctx?.shouldReduceAnimations ?? false;
}

/** Skip particles, video, 1s intervals — lighter media */
export function useLiteEffects(): boolean {
  const ctx = useContext(PerformanceContext);
  return ctx?.shouldReduceEffects ?? false;
}

export function usePerformance(): DevicePerformance {
  const ctx = useContext(PerformanceContext);
  if (!ctx) {
    return {
      reducedMotion: false,
      saveData: false,
      isMobile: false,
      isInAppBrowser: false,
      shouldReduceAnimations: false,
      shouldReduceEffects: false,
    };
  }
  return ctx;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const performance = useDevicePerformance();

  return (
    <PerformanceContext.Provider value={performance}>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </PerformanceContext.Provider>
  );
}

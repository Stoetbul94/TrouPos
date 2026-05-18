"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ReducedMotionContext = createContext(false);

export function useMotionReduced() {
  return useContext(ReducedMotionContext);
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <ReducedMotionContext.Provider value={reduced}>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </ReducedMotionContext.Provider>
  );
}

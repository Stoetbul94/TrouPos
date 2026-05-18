"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "./MotionProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <MotionProvider>{children}</MotionProvider>;
}

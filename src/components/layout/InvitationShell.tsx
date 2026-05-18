"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils/cn";

export function InvitationShell({
  children,
  variant = "dark",
  className,
}: {
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
}) {
  const progress = useScrollProgress();

  return (
    <div
      className={cn(
        "relative min-h-dvh overflow-x-hidden",
        variant === "light" && "invite-classic bg-ivory text-charcoal",
        variant === "dark" && "bg-charcoal text-ivory",
        className,
      )}
    >
      <m.div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gold"
        style={{ scaleX: progress }}
        aria-hidden
      />
      {children}
    </div>
  );
}

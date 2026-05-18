"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

export function StickyCta({
  label = "RSVP",
  onClick,
  className,
}: {
  label?: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-charcoal/90 px-5 py-3 backdrop-blur-md",
        "pb-[calc(0.75rem+var(--safe-bottom))]",
        className,
      )}
    >
      <Button fullWidth onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}

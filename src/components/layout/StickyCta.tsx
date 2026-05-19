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
        "fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-charcoal/95 px-4 py-3 mobile-blur-light",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        "supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
      )}
      role="region"
      aria-label="Quick actions"
    >
      <Button fullWidth onClick={onClick} className="min-h-12 text-base">
        {label}
      </Button>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { GiftSectionVariant } from "./types";

export function CopyAccountButton({
  accountNumber,
  variant = "dark",
  className,
}: {
  accountNumber: string;
  variant?: GiftSectionVariant;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const isLight = variant === "light";

  const copy = useCallback(async () => {
    const normalized = accountNumber.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(normalized);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for older browsers / in-app webviews
      const textarea = document.createElement("textarea");
      textarea.value = normalized;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  }, [accountNumber]);

  return (
    <m.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full border px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300",
        isLight
          ? "border-charcoal/15 bg-charcoal text-ivory hover:bg-charcoal/90"
          : "border-gold/40 bg-gold/10 text-gold hover:bg-gold/15",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copied ? "copied" : "copy"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          {copied ? (
            <>
              <span aria-hidden className="text-base leading-none">
                ✓
              </span>
              Copied to clipboard
            </>
          ) : (
            "Copy account number"
          )}
        </m.span>
      </AnimatePresence>
    </m.button>
  );
}

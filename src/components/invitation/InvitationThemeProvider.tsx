"use client";

import type { ReactNode } from "react";
import type { FontStyle, WeddingInvitationContent } from "@/types/invitation-content";
import { cn } from "@/lib/utils/cn";

const fontClassMap: Record<FontStyle, string> = {
  cormorant: "font-display",
  inter: "font-sans",
  playfair: "font-display",
};

export function InvitationThemeProvider({
  content,
  children,
  className,
}: {
  content: Pick<WeddingInvitationContent, "themeColor" | "fontStyle" | "backgroundColor">;
  children: ReactNode;
  className?: string;
}) {
  const fontStyle = content.fontStyle ?? "cormorant";

  return (
    <div
      className={cn(fontClassMap[fontStyle], className)}
      style={
        {
          "--theme-accent": content.themeColor,
          "--theme-background": content.backgroundColor ?? "#faf6f0",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { m } from "framer-motion";
import {
  buildGoogleCalendarUrl,
  buildOutlookCalendarUrl,
  buildWeddingCalendarEvent,
  downloadIcsFile,
} from "@/lib/calendar";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { useMotionReduced } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";
import { CalendarProviderButton } from "./CalendarProviderButton";
import type { AddToCalendarProps } from "./types";

export function AddToCalendar({
  content,
  variant = "dark",
  className,
  durationHours,
  inviteUrl,
  eventUid,
  heading = "Save the date",
}: AddToCalendarProps) {
  const reduced = useMotionReduced();
  const isLight = variant === "light";

  const event = useMemo(
    () =>
      buildWeddingCalendarEvent(content, {
        durationHours,
        inviteUrl,
        uid: eventUid,
      }),
    [content, durationHours, inviteUrl, eventUid],
  );

  const googleUrl = buildGoogleCalendarUrl(event);
  const outlookUrl = buildOutlookCalendarUrl(event, "live");

  const handleAppleCalendar = () => {
    const slug =
      eventUid?.replace(/[^a-z0-9-]/gi, "") ||
      `${content.brideName}-${content.groomName}`.toLowerCase().replace(/\s+/g, "-");
    downloadIcsFile(event, `${slug || "wedding"}.ics`);
  };

  return (
    <m.div
      className={cn("w-full max-w-md", className)}
      variants={staggerContainer}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <m.p
        variants={fadeUp}
        className={cn(
          "text-center text-xs uppercase tracking-[0.35em]",
          isLight ? "text-gold-muted" : "text-gold",
        )}
      >
        {heading}
      </m.p>

      <m.div
        variants={fadeUp}
        className="mt-4 flex flex-col gap-2 sm:gap-2.5"
        role="group"
        aria-label="Add wedding to calendar"
      >
        <CalendarProviderButton
          variant={variant}
          label="Google Calendar"
          description="Add in browser or app"
          href={googleUrl}
        />
        <CalendarProviderButton
          variant={variant}
          label="Apple Calendar"
          description="Download .ics for iPhone & Mac"
          onClick={handleAppleCalendar}
        />
        <CalendarProviderButton
          variant={variant}
          label="Outlook"
          description="Outlook.com or Microsoft 365"
          href={outlookUrl}
        />
      </m.div>
    </m.div>
  );
}

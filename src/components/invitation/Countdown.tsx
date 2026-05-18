"use client";

import { useEffect, useState } from "react";
import { parseInvitationDate } from "@/lib/utils/dates";
import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

export function Countdown({ targetDate }: { targetDate: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="flex justify-center gap-6 text-center opacity-0">
        <span>—</span>
      </div>
    );
  }

  const target = parseInvitationDate(targetDate);
  const days = Math.max(0, differenceInDays(target, now));
  const hours = Math.max(0, differenceInHours(target, now) % 24);
  const minutes = Math.max(0, differenceInMinutes(target, now) % 60);

  return (
    <div className="flex justify-center gap-6 sm:gap-10">
      {[
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <span className="font-display text-3xl tabular-nums sm:text-4xl">
            {String(value).padStart(2, "0")}
          </span>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ivory/50">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

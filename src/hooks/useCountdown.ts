"use client";

import { useEffect, useMemo, useState } from "react";
import { parseInvitationDate } from "@/lib/utils/dates";
import { useLiteEffects } from "@/components/providers/MotionProvider";

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function useCountdown(targetDate: string): CountdownValues | null {
  const lite = useLiteEffects();
  const [now, setNow] = useState<Date | null>(null);
  const tickMs = lite ? 60_000 : 1_000;

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);

  return useMemo(() => {
    if (!now) return null;

    const target = parseInvitationDate(targetDate);
    const diffMs = Math.max(0, target.getTime() - now.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);

    return {
      days: Math.floor(totalSeconds / 86_400),
      hours: Math.floor((totalSeconds % 86_400) / 3_600),
      minutes: Math.floor((totalSeconds % 3_600) / 60),
      seconds: lite ? 0 : totalSeconds % 60,
      isComplete: diffMs === 0,
    };
  }, [now, targetDate, lite]);
}

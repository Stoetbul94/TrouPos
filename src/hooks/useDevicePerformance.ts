"use client";

import { useEffect, useState } from "react";

export interface DevicePerformance {
  /** prefers-reduced-motion */
  reducedMotion: boolean;
  /** Save-Data header or slow connection */
  saveData: boolean;
  /** Coarse pointer + narrow viewport */
  isMobile: boolean;
  /** In-app browsers (WhatsApp, Instagram, etc.) */
  isInAppBrowser: boolean;
  /** Skip heavy motion (Framer whileInView, page transitions) */
  shouldReduceAnimations: boolean;
  /** Skip particles, video, 1s timers; use lighter images */
  shouldReduceEffects: boolean;
}

const IN_APP_PATTERN =
  /WhatsApp|Instagram|FBAN|FBAV|Line\/|MicroMessenger|Twitter/i;

function detect(): DevicePerformance {
  if (typeof window === "undefined") {
    return {
      reducedMotion: false,
      saveData: false,
      isMobile: false,
      isInAppBrowser: false,
      shouldReduceAnimations: false,
      shouldReduceEffects: false,
    };
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const saveData =
    Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData,
    ) ||
    window.matchMedia("(prefers-reduced-data: reduce)").matches;

  const isMobile = window.matchMedia(
    "(max-width: 767px) and (pointer: coarse)",
  ).matches;

  const isInAppBrowser = IN_APP_PATTERN.test(navigator.userAgent);

  const lowMemory =
    "deviceMemory" in navigator &&
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory !==
      undefined &&
    ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <=
      4;

  const lowCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  const shouldReduceEffects =
    reducedMotion ||
    saveData ||
    isInAppBrowser ||
    (isMobile && (lowMemory || lowCores));

  const shouldReduceAnimations =
    shouldReduceEffects || (isMobile && isInAppBrowser);

  return {
    reducedMotion,
    saveData,
    isMobile,
    isInAppBrowser,
    shouldReduceAnimations,
    shouldReduceEffects,
  };
}

export function useDevicePerformance(): DevicePerformance {
  const [perf, setPerf] = useState(detect);

  useEffect(() => {
    setPerf(detect());

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia(
      "(max-width: 767px) and (pointer: coarse)",
    );

    const refresh = () => setPerf(detect());

    reducedMq.addEventListener("change", refresh);
    mobileMq.addEventListener("change", refresh);

    return () => {
      reducedMq.removeEventListener("change", refresh);
      mobileMq.removeEventListener("change", refresh);
    };
  }, []);

  return perf;
}

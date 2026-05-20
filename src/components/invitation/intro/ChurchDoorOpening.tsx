"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import type { ReactNode } from "react";
import {
  CHURCH_DOOR_ASSETS,
  CHURCH_DOOR_INTRO_MS,
  introSessionKey,
} from "@/lib/constants/churchDoorIntro";
import { motionEasings } from "@/lib/constants/motion";
import { useLiteEffects, useMotionReduced } from "@/components/providers/MotionProvider";
import { ChurchDoorPanel } from "./ChurchDoorPanel";
import { IntroAmbientParticles } from "./IntroAmbientParticles";

const luxuryEase = motionEasings.luxury;
const entranceEase = motionEasings.entrance;

type Phase = "idle" | "playing" | "exiting" | "done";

function shouldSkipIntro(storageKey: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen(storageKey: string): void {
  try {
    sessionStorage.setItem(storageKey, "1");
  } catch {
    /* private mode */
  }
}

export function ChurchDoorOpening({
  children,
  enabled = true,
  slug,
}: {
  children: ReactNode;
  /** Allow per-invite opt-out later */
  enabled?: boolean;
  slug?: string;
}) {
  const storageKey = introSessionKey(slug);
  const reduced = useMotionReduced();
  const lite = useLiteEffects();
  const skipMotion = reduced || lite;

  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !enabled) {
      setPhase("done");
      return;
    }
    if (skipMotion || shouldSkipIntro(storageKey)) {
      setPhase("done");
      return;
    }
    setPhase("playing");
    const t = window.setTimeout(() => {
      markIntroSeen(storageKey);
      setPhase("exiting");
    }, CHURCH_DOOR_INTRO_MS);
    return () => window.clearTimeout(t);
  }, [mounted, enabled, skipMotion, storageKey]);

  const finishEarly = useCallback(() => {
    markIntroSeen(storageKey);
    setPhase("exiting");
  }, [storageKey]);

  if (!mounted) {
    return (
      <div
        className="min-h-dvh bg-[#0a0908]"
        aria-busy="true"
        aria-label="Loading invitation"
      />
    );
  }

  if (phase === "done" || skipMotion) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-dvh">
      <m.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "playing" ? 0 : 1 }}
        transition={{
          opacity: { delay: 2.85, duration: 1.1, ease: entranceEase },
        }}
        aria-hidden={phase === "playing"}
      >
        {children}
      </m.div>

      <AnimatePresence
        onExitComplete={() => {
          setPhase("done");
        }}
      >
        {phase === "playing" && (
          <m.div
            key="church-door-intro"
            className="fixed inset-0 z-[100] touch-none overflow-hidden bg-[#0a0908]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: luxuryEase }}
            onClick={finishEarly}
            role="presentation"
          >
            <m.div
              className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0f0d0a] to-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            />

            <IntroAmbientParticles />

            {/* Golden sanctuary light behind doors */}
            <m.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                opacity: { delay: 1.05, duration: 1.35, ease: entranceEase },
                scale: { delay: 1.05, duration: 1.6, ease: luxuryEase },
              }}
            >
              <div
                className="h-[min(90vh,800px)] w-[min(92vw,720px)] rounded-full opacity-90"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(245, 220, 150, 0.55) 0%, rgba(201, 162, 39, 0.22) 35%, transparent 72%)",
                  filter: "blur(2px)",
                }}
              />
              <m.div
                className="absolute h-[min(70vh,560px)] w-[min(75vw,520px)] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255, 248, 230, 0.35) 0%, transparent 65%)",
                }}
                animate={{ opacity: [0.5, 0.85, 0.65] }}
                transition={{
                  delay: 1.2,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
              />
            </m.div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ perspective: 1400 }}
            >
              <m.div
                className="relative h-[min(78vh,640px)] w-[min(88vw,560px)]"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15, ease: entranceEase }}
              >
                <m.div
                  className="absolute inset-y-0 right-1/2 z-20"
                  initial={{ x: 0, rotateY: 0 }}
                  animate={{ x: "-102%", rotateY: -12 }}
                  transition={{
                    x: { delay: 0.75, duration: 1.65, ease: luxuryEase },
                    rotateY: { delay: 0.75, duration: 1.65, ease: luxuryEase },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ChurchDoorPanel
                    side="left"
                    panelSrc={CHURCH_DOOR_ASSETS.left}
                    trimSrc={CHURCH_DOOR_ASSETS.leftTrim}
                  />
                </m.div>

                <m.div
                  className="absolute inset-y-0 left-1/2 z-20"
                  initial={{ x: 0, rotateY: 0 }}
                  animate={{ x: "102%", rotateY: 12 }}
                  transition={{
                    x: { delay: 0.75, duration: 1.65, ease: luxuryEase },
                    rotateY: { delay: 0.75, duration: 1.65, ease: luxuryEase },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ChurchDoorPanel
                    side="right"
                    panelSrc={CHURCH_DOOR_ASSETS.right}
                    trimSrc={CHURCH_DOOR_ASSETS.rightTrim}
                  />
                </m.div>

                {/* Center seam shadow */}
                <div
                  className="pointer-events-none absolute inset-y-[8%] left-1/2 z-10 w-px -translate-x-1/2 bg-black/50 shadow-[0_0_24px_8px_rgba(0,0,0,0.6)]"
                  aria-hidden
                />
              </m.div>
            </div>

            <m.p
              className="pointer-events-none absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-0 right-0 text-center font-display text-[10px] uppercase tracking-[0.35em] text-ivory/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ delay: 0.5, duration: 2.8 }}
            >
              Tap to enter
            </m.p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

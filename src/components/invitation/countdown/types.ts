export type CountdownTheme = "dark" | "light";

export interface CountdownTimerProps {
  targetDate: string;
  theme?: CountdownTheme;
  className?: string;
  /** Shown when the target date has passed */
  completeMessage?: string;
}

export interface CountdownUnitProps {
  label: string;
  value: number;
  theme: CountdownTheme;
  reducedMotion: boolean;
}

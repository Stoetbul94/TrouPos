export const motionDurations = {
  instant: 0.15,
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const;

export const motionEasings = {
  luxury: [0.22, 1, 0.36, 1] as const,
  entrance: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 0.2, 1] as const,
} as const;

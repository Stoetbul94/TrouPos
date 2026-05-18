import type { TemplateConfig } from "@/types/template";

export const modernCinematicConfig: TemplateConfig = {
  id: "modern-cinematic",
  sections: {
    enabled: ["hero", "story", "events", "gallery", "dressCode", "venue", "rsvp"],
    heroVariant: "fullscreen",
  },
  defaultTheme: {
    accent: "#c9a962",
    background: "#0f0e0c",
  },
};

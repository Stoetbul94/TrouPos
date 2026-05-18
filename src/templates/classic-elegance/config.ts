import type { TemplateConfig } from "@/types/template";

export const classicEleganceConfig: TemplateConfig = {
  id: "classic-elegance",
  sections: {
    enabled: ["hero", "story", "events", "gallery", "dressCode", "venue", "rsvp"],
    heroVariant: "split",
  },
  defaultTheme: {
    accent: "#b8956a",
    background: "#faf8f5",
  },
};

import type { TemplateConfig } from "@/types/template";

export const luxuryFloralGoldConfig: TemplateConfig = {
  id: "luxury-floral-gold",
  sections: {
    enabled: [
      "hero",
      "events",
      "venue",
      "gallery",
      "rsvp",
      "gift",
    ],
    heroVariant: "fullscreen",
  },
  defaultTheme: {
    accent: "#c9a962",
    background: "#faf6f0",
  },
};

export const floralThemeClass = "invite-floral-gold";

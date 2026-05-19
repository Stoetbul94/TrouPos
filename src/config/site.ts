import { env, getSiteUrl } from "@/config/env";

export const siteConfig = {
  name: env.siteName,
  description: "Premium cinematic digital wedding invitations for South Africa",
  locale: "en-ZA",
  get baseUrl() {
    return getSiteUrl();
  },
  themeColor: "#1a1612",
  whatsappDefaultMessage: "You're invited to our wedding!",
} as const;

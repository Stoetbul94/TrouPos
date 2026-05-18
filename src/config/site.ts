export const siteConfig = {
  name: "Trou",
  description: "Premium cinematic digital wedding invitations for South Africa",
  locale: "en-ZA",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  themeColor: "#1a1612",
  whatsappDefaultMessage: "You're invited to our wedding!",
} as const;

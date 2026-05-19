import type { Metadata } from "next";
import { HomePage } from "@/components/marketing/HomePage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} · Luxury Digital Wedding Invitations`,
  description: siteConfig.description,
};

export default function Page() {
  return <HomePage />;
}

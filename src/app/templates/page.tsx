import type { Metadata } from "next";
import { TemplateGalleryLayout } from "@/components/gallery/TemplateGalleryLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Template Gallery",
  description: `Browse luxury wedding invitation templates — ${siteConfig.description}`,
};

export default function TemplatesPage() {
  return <TemplateGalleryLayout />;
}

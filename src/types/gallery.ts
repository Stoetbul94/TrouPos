import type { TemplateId } from "./invitation";

export type GalleryCategoryId =
  | "luxury-floral"
  | "minimal-modern"
  | "african-traditional"
  | "garden-wedding"
  | "black-tie"
  | "modern-elegant";

export type PricingTier = "Essential" | "Signature" | "Couture";

export interface GalleryCategory {
  id: GalleryCategoryId | "all";
  label: string;
}

export interface GalleryTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  category: GalleryCategoryId;
  pricingTier: PricingTier;
  /** Links to live demo when available */
  demoId?: TemplateId;
}

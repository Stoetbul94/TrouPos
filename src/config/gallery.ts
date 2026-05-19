import type { GalleryCategory, GalleryTemplate } from "@/types/gallery";

export const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "All" },
  { id: "luxury-floral", label: "Luxury Floral" },
  { id: "minimal-modern", label: "Minimal Modern" },
  { id: "african-traditional", label: "African Traditional" },
  { id: "garden-wedding", label: "Garden Wedding" },
  { id: "black-tie", label: "Black Tie" },
  { id: "modern-elegant", label: "Modern Elegant" },
];

export const galleryTemplates: GalleryTemplate[] = [
  {
    id: "floral-velvet",
    name: "Velvet Bloom",
    description: "Soft florals, layered textures, and romantic ivory typography.",
    previewImage:
      "https://images.unsplash.com/photo-1520854221256-17451cc791c3?w=800&q=80",
    category: "luxury-floral",
    pricingTier: "Signature",
    demoId: "luxury-floral-gold",
  },
  {
    id: "floral-gardenia",
    name: "Gardenia Estate",
    description: "Botanical accents with gold foil details and editorial layouts.",
    previewImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    category: "luxury-floral",
    pricingTier: "Couture",
    demoId: "luxury-floral-gold",
  },
  {
    id: "minimal-horizon",
    name: "Horizon Line",
    description: "Clean geometry, generous whitespace, and understated motion.",
    previewImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    category: "minimal-modern",
    pricingTier: "Essential",
    demoId: "modern-cinematic",
  },
  {
    id: "minimal-slate",
    name: "Slate & Silk",
    description: "Monochrome palette with sharp type and subtle parallax reveals.",
    previewImage:
      "https://images.unsplash.com/photo-1469371670804-432a26d33670?w=800&q=80",
    category: "minimal-modern",
    pricingTier: "Signature",
    demoId: "modern-cinematic",
  },
  {
    id: "traditional-ubuntu",
    name: "Ubuntu Heritage",
    description: "Rich earth tones celebrating family, culture, and togetherness.",
    previewImage:
      "https://images.unsplash.com/photo-1522673607860-1bda3141a7b2?w=800&q=80",
    category: "african-traditional",
    pricingTier: "Signature",
  },
  {
    id: "traditional-kente",
    name: "Kente Gold",
    description: "Bold patterns, ancestral motifs, and dignified ceremonial pacing.",
    previewImage:
      "https://images.unsplash.com/photo-1591604466377-1a63d147ffd2?w=800&q=80",
    category: "african-traditional",
    pricingTier: "Couture",
  },
  {
    id: "garden-meadow",
    name: "Meadow Light",
    description: "Sun-drenched greens, organic shapes, and airy outdoor romance.",
    previewImage:
      "https://images.unsplash.com/photo-1465495976277-353ecfa9f2dd?w=800&q=80",
    category: "garden-wedding",
    pricingTier: "Essential",
    demoId: "classic-elegance",
  },
  {
    id: "garden-orchard",
    name: "Orchard Lane",
    description: "Pastoral charm with handwritten accents and soft film grain.",
    previewImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    category: "garden-wedding",
    pricingTier: "Signature",
  },
  {
    id: "blacktie-noir",
    name: "Noir Gala",
    description: "Deep charcoal canvas, champagne type, and ballroom sophistication.",
    previewImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    category: "black-tie",
    pricingTier: "Signature",
    demoId: "modern-cinematic",
  },
  {
    id: "blacktie-crystal",
    name: "Crystal Evening",
    description: "High-contrast luxury with slow cinematic fades and jewel tones.",
    previewImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    category: "black-tie",
    pricingTier: "Couture",
  },
  {
    id: "elegant-sonata",
    name: "Sonata",
    description: "Refined serif pairings with graceful scroll-triggered storytelling.",
    previewImage:
      "https://images.unsplash.com/photo-1606800052052-a08af8348e18?w=800&q=80",
    category: "modern-elegant",
    pricingTier: "Essential",
    demoId: "classic-elegance",
  },
  {
    id: "elegant-atelier",
    name: "Atelier",
    description: "Fashion-house aesthetic with asymmetric layouts and gold rules.",
    previewImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    category: "modern-elegant",
    pricingTier: "Couture",
    demoId: "modern-cinematic",
  },
];

export const SELECTED_TEMPLATE_KEY = "trou-selected-template";

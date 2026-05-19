import type { SectionId, TemplateId } from "@/types/invitation";
import { classicEleganceConfig } from "@/templates/classic-elegance/config";
import { luxuryFloralGoldConfig } from "@/templates/luxury-floral-gold/config";
import { modernCinematicConfig } from "@/templates/modern-cinematic/config";

const configByTemplate: Record<TemplateId, SectionId[]> = {
  "modern-cinematic": modernCinematicConfig.sections.enabled,
  "classic-elegance": classicEleganceConfig.sections.enabled,
  "luxury-floral-gold": luxuryFloralGoldConfig.sections.enabled,
};

export function sectionsForTemplate(templateId: TemplateId): SectionId[] {
  return configByTemplate[templateId];
}

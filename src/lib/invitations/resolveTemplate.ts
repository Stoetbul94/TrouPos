import { templateRegistry, isValidTemplateId } from "@/templates/registry";
import type { TemplateId } from "@/types/invitation";
import type { TemplateComponent } from "@/types/template";

export function resolveTemplate(templateId: TemplateId): TemplateComponent {
  return templateRegistry[templateId] as unknown as TemplateComponent;
}

export function getTemplateOrNull(
  templateId: string,
): TemplateComponent | null {
  if (!isValidTemplateId(templateId)) return null;
  return resolveTemplate(templateId);
}

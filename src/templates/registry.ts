import dynamic from "next/dynamic";
import type { TemplateId } from "@/types/invitation";
import type { TemplateComponent, TemplateMeta } from "@/types/template";
import { templateCatalog } from "@/config/templates";

const templateLoaders: Record<TemplateId, () => Promise<{ default: TemplateComponent }>> = {
  "modern-cinematic": () => import("./modern-cinematic"),
  "classic-elegance": () => import("./classic-elegance"),
};

export const templateRegistry: Record<
  TemplateId,
  ReturnType<typeof dynamic<import("@/types/template").InvitationTemplateProps>>
> = {
  "modern-cinematic": dynamic(
    () => import("./modern-cinematic"),
    { loading: () => null },
  ),
  "classic-elegance": dynamic(
    () => import("./classic-elegance"),
    { loading: () => null },
  ),
};

export function getTemplateMeta(id: TemplateId): TemplateMeta | undefined {
  return templateCatalog.find((t) => t.id === id);
}

export function isValidTemplateId(id: string): id is TemplateId {
  return id in templateLoaders;
}

export const templateIds = Object.keys(templateLoaders) as TemplateId[];

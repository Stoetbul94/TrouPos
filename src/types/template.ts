import type { ComponentType } from "react";
import type { Invitation, SectionId, TemplateId } from "./invitation";

export interface InvitationTemplateProps {
  invitation: Invitation;
}

export type TemplateComponent = ComponentType<InvitationTemplateProps>;

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  previewImage: string;
  tags: string[];
}

export interface TemplateSectionConfig {
  enabled: SectionId[];
  heroVariant?: "fullscreen" | "split";
}

export interface TemplateConfig {
  id: TemplateId;
  sections: TemplateSectionConfig;
  defaultTheme: {
    accent: string;
    background: string;
  };
}

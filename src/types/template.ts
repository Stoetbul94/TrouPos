import type { ComponentType } from "react";
import type { DynamicInvitationProps } from "./invitation-content";
import type { SectionId, TemplateId } from "./invitation";

/** All templates receive prop-driven content + runtime meta */
export type InvitationTemplateProps = DynamicInvitationProps;

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

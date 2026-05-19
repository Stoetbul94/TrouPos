import { SELECTED_TEMPLATE_KEY } from "@/config/gallery";

export function saveSelectedTemplate(templateId: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SELECTED_TEMPLATE_KEY, templateId);
  } catch {
    // private mode
  }
}

export function loadSelectedTemplate(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(SELECTED_TEMPLATE_KEY);
  } catch {
    return null;
  }
}

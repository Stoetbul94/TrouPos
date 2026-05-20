/** Total intro timeline — keep under 5s for WhatsApp / mobile */
export const CHURCH_DOOR_INTRO_MS = 4600;

export const CHURCH_DOOR_ASSETS = {
  left: "/invitation/church-door-left.svg",
  right: "/invitation/church-door-right.svg",
  /** Optional PNG overlays — drop files in public/invitation/ to replace */
  leftTrim: "/invitation/church-door-left-trim.svg",
  rightTrim: "/invitation/church-door-right-trim.svg",
} as const;

export const INTRO_SESSION_KEY_PREFIX = "troupos-invite-intro-seen";

export function introSessionKey(slug?: string): string {
  return slug
    ? `${INTRO_SESSION_KEY_PREFIX}:${slug}`
    : INTRO_SESSION_KEY_PREFIX;
}

const SA_MOBILE_REGEX = /^(?:\+27|27|0)([6-8][0-9]{8})$/;

export function normalizeSaPhone(input: string): string | null {
  const digits = input.replace(/[\s\-()]/g, "");
  const match = digits.match(SA_MOBILE_REGEX);
  if (!match) return null;
  return `+27${match[1]}`;
}

export function formatSaPhoneDisplay(input: string): string {
  const normalized = normalizeSaPhone(input);
  if (!normalized) return input;
  const local = normalized.slice(3);
  return `+27 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
}

export function isValidSaPhone(input: string): boolean {
  return normalizeSaPhone(input) !== null;
}

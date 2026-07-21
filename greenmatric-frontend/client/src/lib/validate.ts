// Single source of truth for lead validation (used by forms + the createLead route).
export const PHONE_RE = /^[+\d][\d\s-]{7,}$/;

export function isValidPhone(phone: string): boolean {
  return PHONE_RE.test(phone.trim());
}

export function isValidLead(name: string, phone: string): boolean {
  return name.trim().length > 0 && isValidPhone(phone);
}

/** Règles de validation partagées par les formulaires. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Numéro gabonais : +241 / 00241 facultatif, puis 8 ou 9 chiffres. */
const PHONE_RE = /^(?:\+241|00241)?0?\d{7,8}$/;

export const normalizePhone = (value: string): string => value.replace(/[\s.\-()]/g, "");

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isPhone(value: string): boolean {
  return PHONE_RE.test(normalizePhone(value));
}

/** Matricule : lettres, chiffres, tirets ou barres obliques (4 caractères minimum). */
const MATRICULE_RE = /^[A-Za-z0-9][A-Za-z0-9\-\/ ]{2,}[A-Za-z0-9]$/;

export function isMatricule(value: string): boolean {
  return MATRICULE_RE.test(value.trim());
}

export type IdentifierMode = "email" | "phone" | "matricule" | "matricule-or-phone" | "any";

/** Retourne un message d’erreur, ou `null` si la valeur est valide. */
export function checkIdentifier(value: string, mode: IdentifierMode): string | null {
  const v = value.trim();
  if (!v) {
    return mode === "phone" ? "Saisissez votre numéro de téléphone."
      : mode === "email" ? "Saisissez votre adresse e-mail."
      : mode === "matricule" ? "Saisissez votre numéro de matricule."
      : mode === "matricule-or-phone" ? "Saisissez votre matricule ou votre numéro de téléphone."
      : "Saisissez votre e-mail ou votre numéro de téléphone.";
  }
  if (mode === "matricule" && !isMatricule(v)) return "Ce matricule n’est pas valide. Vérifiez-le sur votre attestation.";
  if (mode === "matricule-or-phone" && !isMatricule(v) && !isPhone(v)) return "Saisissez un matricule ou un numéro de téléphone valide.";
  if (mode === "email" && !isEmail(v)) return "Cette adresse e-mail n’est pas valide. Exemple : nom@entreprise.ga";
  if (mode === "phone" && !isPhone(v)) return "Ce numéro n’est pas valide. Exemple : +241 077 12 34 56";
  if (mode === "any" && !isEmail(v) && !isPhone(v)) return "Saisissez une adresse e-mail ou un numéro de téléphone valide.";
  return null;
}

export function checkPassword(value: string, minLength = 0): string | null {
  if (!value) return "Saisissez votre mot de passe.";
  if (minLength && value.length < minLength) return `Le mot de passe doit contenir au moins ${minLength} caractères.`;
  return null;
}

export function checkRequired(value: string, label: string): string | null {
  return value.trim() ? null : `Renseignez ${label}.`;
}

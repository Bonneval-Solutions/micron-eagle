export const locales = ["en-us", "es-es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en-us";

export function normalizeLocale(tag: string): Locale | null {
  const lower = tag.toLowerCase();
  if ((locales as readonly string[]).includes(lower)) {
    return lower as Locale;
  }
  return null;
}

import { createContext, useContext } from "react";
import fr from "@/locales/fr/translation.json";
import ar from "@/locales/ar/translation.json";

export type Lang = "fr" | "ar";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇲🇦" },
];

export const STORAGE_KEY = "hajar-flan-lang";

const dict: Record<Lang, unknown> = { fr, ar };

function lookup(lang: Lang, key: string): unknown {
  return key.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), dict[lang]);
}

export function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const v = lookup(lang, key) ?? lookup("fr", key);
  let s = typeof v === "string" ? v : key;
  if (vars) for (const [k, val] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(val));
  return s;
}

export type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

export const I18nContext = createContext<Ctx | null>(null);

/**
 * A missing provider (e.g. a stale module left behind by a hot reload) must never
 * blank the page: read the French copy instead of throwing.
 */
const FALLBACK: Ctx = {
  lang: "fr",
  dir: "ltr",
  setLang: () => {},
  t: (key, vars) => translate("fr", key, vars),
};

export function useI18n(): Ctx {
  return useContext(I18nContext) ?? FALLBACK;
}

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { I18nContext, STORAGE_KEY, translate, type Ctx, type Lang } from "./context";

// This module exports only the provider component, so Vite can hot-swap it in place.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "fr") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);
  const t = useCallback((key: string, vars?: Record<string, string | number>) => translate(lang, key, vars), [lang]);
  const value = useMemo<Ctx>(() => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

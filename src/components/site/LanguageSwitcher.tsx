import { LANGS, useI18n } from "@/i18n/context";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t("nav.language")} className="inline-flex rounded-full border border-border bg-card/80 p-1 shadow-soft">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={l.label}
          className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${lang === l.code ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:text-primary"}`}
        >
          <span aria-hidden="true">{l.flag}</span> <span className="hidden sm:inline">{l.label}</span>
        </button>
      ))}
    </div>
  );
}

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { media, navLinks } from "./media";
import { useI18n } from "@/i18n/context";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const reduce = useReducedMotion();
  const { t } = useI18n();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled || open ? "bg-background/90 shadow-soft backdrop-blur-md" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6" aria-label={t("nav.aria")}>
        <a href="#accueil" className="flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-ring">
          <img src={media.logo} alt={t("nav.logoAlt")} width={64} height={64} className="brand-logo h-16 w-16 object-contain" />
          <NavBrandText />
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link text-sm font-medium text-foreground/80 transition-colors hover:text-primary">{t(l.key)}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#commander" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 sm:inline-flex">{t("nav.order")}</a>
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="space-y-1 border-t border-border px-4 pb-6 pt-2 lg:hidden">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-secondary">{t(l.key)}</a>
            </li>
          ))}
          <li>
            <a href="#commander" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-primary px-5 py-3 text-center font-semibold text-primary-foreground">{t("nav.order")}</a>
          </li>
        </ul>
      )}
      <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left rtl:origin-right bg-primary" style={{ scaleX: reduce ? scrollYProgress : progress }} />
    </header>
  );
}

/** Animated brand name in the navbar: letters (Latin) or words (Arabic) wave, shine, and are magnetically attracted to the mouse. */
function NavBrandText() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  // Magnetic pull: each unit leans gently toward the cursor with a springy transition.
  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (reduce || !ref.current) return;
    const { clientX: mx, clientY: my } = e;
    ref.current.querySelectorAll<HTMLElement>(".nav-brand-letter").forEach((el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const dx = mx - (r.left + r.width / 2);
      const dy = my - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const strength = Math.max(0, 1 - dist / 90);
      el.style.setProperty("--mx", `${(dx * 0.16 * strength).toFixed(2)}px`);
      el.style.setProperty("--my", `${(dy * 0.16 * strength).toFixed(2)}px`);
      el.style.setProperty("--ms", (1 + 0.18 * strength).toFixed(3));
    });
  };
  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.querySelectorAll<HTMLElement>(".nav-brand-letter").forEach((el: HTMLElement) => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
      el.style.setProperty("--ms", "1");
    });
  };

  const words = t("nav.brand").split(" ");
  let letterIndex = 0;
  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="nav-brand-text font-display text-xl font-semibold"
    >
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="nav-brand-word">
          {lang === "ar" ? (
            <span className="nav-brand-letter" style={{ "--i": w } as CSSProperties}>{word}</span>
          ) : (
            [...word].map((ch, c) => (
              <span key={`${ch}-${c}`} className="nav-brand-letter" style={{ "--i": letterIndex++ } as CSSProperties}>{ch}</span>
            ))
          )}
        </span>
      ))}
    </span>
  );
}

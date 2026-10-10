import { ArrowRight, Heart, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL, UNIT_PRICE, whatsappLink } from "@/lib/order";
import { media, navLinks } from "./media";
import { Reveal } from "./Reveal";
import { useI18n } from "@/i18n/context";

function Wordmark() {
  const { t, lang } = useI18n();
  const arabic = lang === "ar";
  const words = t("footer.wordmark").split(" ");
  let letterIndex = 0;
  return (
    <div aria-hidden="true" dir={arabic ? "rtl" : "ltr"} className="footer-wordmark">
      {words.map((word, wi) =>
        arabic ? (
          // Arabic must never be split into letters — the script would lose its cursive joining.
          <span className="wordmark-word wordmark-letter" key={`${word}-${wi}`} style={{ "--i": wi } as CSSProperties}>
            {word}
          </span>
        ) : (
          <span className="wordmark-word" key={`${word}-${wi}`}>
            {[...word].map((letter, ci) => {
              const i = letterIndex++;
              return (
                <span className="wordmark-letter" key={`${word}-${ci}`} style={{ "--i": i } as CSSProperties}>
                  {letter}
                </span>
              );
            })}
          </span>
        )
      )}
    </div>
  );
}

type Particle = { dx: number; dy: number; s: number; r: number; d: number };
type Burst = { id: number; parts: Particle[] };

const PARTICLE_COUNT = 7;

function makeBurst(id: number): Burst {
  const parts: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const spread = ((i + 0.5) / PARTICLE_COUNT) * 2 - 1;
    parts.push({
      dx: Math.round(spread * 30 + (Math.random() * 10 - 5)),
      dy: -Math.round(34 + Math.random() * 26),
      s: Number((0.7 + Math.random() * 0.7).toFixed(2)),
      r: Math.round(Math.random() * 70 - 35),
      d: Math.round(Math.random() * 120),
    });
  }
  return { id, parts };
}

function LoveHeart() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(0);
  const { t } = useI18n();

  const sprinkle = () => {
    nextId.current += 1;
    const burst = makeBurst(nextId.current);
    setBursts((list) => [...list.slice(-3), burst]);
    window.setTimeout(() => {
      setBursts((list) => list.filter((b) => b.id !== burst.id));
    }, 1100);
  };

  return (
    <span className="heart-wrap relative inline-flex items-center justify-center">
      <button
        type="button"
        onClick={sprinkle}
        title={t("footer.heartTitle")}
        aria-label={t("footer.heartAria")}
        className="heart-button"
      >
        <Heart className="heart-icon h-3.5 w-3.5" />
      </button>
      <span aria-hidden="true" className="heart-bursts">
        {bursts.map((burst) => (
          <span className="heart-burst" key={burst.id}>
            {burst.parts.map((p, i) => (
              <Heart
                className="heart-particle"
                key={i}
                style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--s": p.s, "--r": `${p.r}deg`, "--d": `${p.d}ms` } as CSSProperties}
              />
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer relative overflow-hidden px-5 pt-16 pb-7 sm:px-8">
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-start justify-between gap-7 border-b border-footer-foreground/20 pb-12 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-footer-accent">{t("footer.eyebrow")}</p>
            <h2 className="mt-4 max-w-xl text-4xl leading-tight sm:text-5xl">{t("footer.headline1")}<br />{t("footer.headline2")}</h2>
          </div>
          <a href="#commander" className="footer-order inline-flex items-center gap-5 rounded-full bg-footer-accent px-7 py-4 font-semibold text-foreground">
            {t("footer.cta")} <ArrowRight className="h-5 w-5 rtl:rotate-180" />
          </a>
        </Reveal>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-16">
          <Reveal>
            <a href="#accueil" className="inline-flex items-center gap-4" aria-label={t("footer.homeAria")}>
              <img src={media.logo} alt={t("nav.logoAlt")} width={104} height={104} loading="lazy" className="brand-logo h-26 w-26 object-contain" />
              <div><p className="font-display text-2xl font-semibold">{t("footer.brandName")}</p><p className="mt-1 text-sm text-footer-foreground/65">{t("footer.tagline")}</p></div>
            </a>
            <p className="mt-5 max-w-xs leading-relaxed text-footer-foreground/70">{t("footer.text")}</p>
            <p className="mt-4 font-display text-2xl text-footer-accent">{UNIT_PRICE} {t("currency")} <span className="font-sans text-sm text-footer-foreground/65">{t("hero.perFlan")}</span></p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-footer-accent">{t("footer.discover")}</h3>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => <li key={link.href}><a href={link.href} className="footer-link inline-flex items-center gap-3 text-footer-foreground/75"><ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />{t(link.key)}</a></li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-footer-accent">{t("footer.contact")}</h3>
            <a href={PHONE_TEL} className="footer-link mt-6 flex items-center gap-3 text-lg"><Phone className="h-4 w-4 text-footer-accent" /><span dir="ltr">{PHONE_DISPLAY}</span></a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-link mt-4 flex items-center gap-3 text-footer-foreground/75"><Instagram className="h-4 w-4 text-footer-accent" /><span dir="ltr">{INSTAGRAM_HANDLE}</span></a>
            <p className="mt-4 flex items-center gap-3 text-footer-foreground/75"><MapPin className="h-4 w-4 text-footer-accent" />{t("footer.location")}</p>
            <div className="mt-7 flex gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={t("footer.instagramAria")} title="Instagram" className="footer-social"><Instagram className="h-5 w-5" /></a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label={t("footer.whatsappAria")} title="WhatsApp" className="footer-social"><MessageCircle className="h-5 w-5" /></a>
              <a href={PHONE_TEL} aria-label={t("footer.callAria")} title={t("footer.call")} className="footer-social"><Phone className="h-5 w-5" /></a>
            </div>
          </Reveal>
        </div>

        <Wordmark />
        <div className="grid gap-3 border-t border-footer-foreground/20 pt-6 text-xs text-footer-foreground/60 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <p className="justify-self-center sm:justify-self-start">{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <p className="inline-flex items-center justify-center gap-2 justify-self-center">{t("footer.madeWith")} <LoveHeart /> {t("footer.andCaramel")}</p>
          <span aria-hidden="true" className="hidden sm:block" />
        </div>
      </div>
    </footer>
  );
}

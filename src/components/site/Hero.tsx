import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { media } from "./media";
import { useI18n } from "@/i18n/context";
import { UNIT_PRICE } from "@/lib/order";

export function Hero() {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90]);

  return (
    <section id="accueil" className="relative overflow-hidden bg-hero pt-28 pb-20 sm:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="inline-flex rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-primary">{t("hero.badge")}</p>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold text-foreground sm:text-6xl lg:text-7xl">
            {t("hero.title")} <span className="block text-primary italic">{t("hero.tagline")}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            {t("hero.text")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#commander" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              {t("hero.order")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
            <a href="#flans" className="inline-flex items-center justify-center rounded-full border-2 border-foreground/15 px-7 py-4 font-semibold text-foreground transition hover:border-primary hover:text-primary">
              {t("hero.discover")}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-lg"
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ y }}
        >
          <div className="hero-glow absolute -inset-6 rounded-[3.5rem] bg-primary/25 blur-3xl" aria-hidden />
          <div className="hero-panel absolute -inset-4 rounded-[3rem] bg-secondary" aria-hidden />
          <div className="image-shine relative overflow-hidden rounded-[2.5rem] shadow-deep">
            <img src={media.hero} alt={t("hero.imageAlt")} width={1200} height={1200} fetchPriority="high" className="hero-image aspect-square w-full object-cover" />
          </div>
          <Sparkles className="hero-sparkle absolute -top-3 end-8 h-7 w-7 text-accent" aria-hidden />
          <Sparkles className="hero-sparkle hero-sparkle-2 absolute end-2 bottom-16 h-4 w-4 text-primary" aria-hidden />
          <div className="price-float absolute -bottom-6 -start-4 flex h-32 w-32 rotate-[-10deg] flex-col items-center justify-center rounded-full bg-primary p-2 text-center text-primary-foreground shadow-deep select-none sm:-start-8 sm:h-36 sm:w-36">
            <div className="flex items-baseline justify-center gap-1 font-display leading-none">
              <span className="text-3xl font-bold tracking-tight sm:text-4xl">{UNIT_PRICE}</span>
              <span className="text-base font-semibold sm:text-lg">{t("currency")}</span>
            </div>
            <span className="mt-1 text-xs font-medium text-primary-foreground/90 sm:text-sm">{t("hero.perFlan")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

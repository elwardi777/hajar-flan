import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { media } from "./media";
import { useI18n } from "@/i18n/context";

const MIN_DISPLAY_TIME_MS = 900;
const SAFETY_TIMEOUT_MS = 2400;

export function LoadingScreen() {
  const { t, dir } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(15);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, dismiss quickly after page loads
    const startTime = Date.now();

    // Progress simulation while assets load
    const step1 = setTimeout(() => setProgress((p) => Math.max(p, 42)), 180);
    const step2 = setTimeout(() => setProgress((p) => Math.max(p, 70)), 450);
    const step3 = setTimeout(() => setProgress((p) => Math.max(p, 88)), 750);

    const markComplete = () => {
      const elapsed = Date.now() - startTime;
      const remainingMin = Math.max(0, MIN_DISPLAY_TIME_MS - elapsed);

      setTimeout(() => {
        setProgress(100);
        setIsDone(true);
        setTimeout(() => {
          setVisible(false);
        }, 320);
      }, remainingMin);
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        markComplete();
      } else {
        const handleLoad = () => markComplete();
        window.addEventListener("load", handleLoad, { once: true });
      }
    }

    // Safety timeout: ensure loader never hangs if a network asset or font stalls
    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setIsDone(true);
      setTimeout(() => setVisible(false), 200);
    }, SAFETY_TIMEOUT_MS);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hajar-flan-loading-screen"
          role="status"
          aria-live="polite"
          aria-label={t("loader.progressAria")}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 0.985,
            transition: { duration: shouldReduceMotion ? 0.2 : 0.45, ease: [0.4, 0, 0.2, 1] },
          }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none bg-[#fdf8f4] ${
            isDone ? "pointer-events-none" : ""
          }`}
          dir={dir}
        >
          {/* Ambient luxury dessert background with soft warm glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 32%, oklch(0.96 0.03 355 / 0.8) 0%, oklch(0.985 0.012 75 / 0.95) 55%, oklch(0.95 0.03 60 / 0.6) 100%)",
            }}
          />

          {/* Soft floating caramel and golden sugar particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span
              className="loader-particle absolute rounded-full bg-accent/40 blur-[1px]"
              style={{
                width: 10,
                height: 10,
                top: "30%",
                left: "22%",
                animation: "loader-particle 4.8s infinite ease-out",
                animationDelay: "0s",
              }}
            />
            <span
              className="loader-particle absolute rounded-full bg-primary/30 blur-[1px]"
              style={{
                width: 14,
                height: 14,
                top: "60%",
                left: "78%",
                animation: "loader-particle 5.4s infinite ease-out",
                animationDelay: "1.2s",
              }}
            />
            <span
              className="loader-particle absolute rounded-full bg-accent/50 blur-[0.5px]"
              style={{
                width: 8,
                height: 8,
                top: "75%",
                left: "28%",
                animation: "loader-particle 4.2s infinite ease-out",
                animationDelay: "2.4s",
              }}
            />
            <span
              className="loader-particle absolute rounded-full bg-secondary-foreground/20 blur-[1px]"
              style={{
                width: 12,
                height: 12,
                top: "25%",
                left: "72%",
                animation: "loader-particle 6s infinite ease-out",
                animationDelay: "0.8s",
              }}
            />
          </div>

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-sm sm:max-w-md w-full">
            {/* Center Logo with halo & flan jiggle animation */}
            <div className="relative flex items-center justify-center mb-6">
              {/* Outer soft ambient halo */}
              <div
                className="loader-halo absolute -inset-5 rounded-full pointer-events-none blur-2xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.81 0.075 355 / 0.5) 0%, oklch(0.63 0.12 60 / 0.25) 60%, transparent 80%)",
                }}
              />

              {/* Decorative golden dessert ring */}
              <div
                className="loader-spin absolute -inset-3.5 rounded-full border border-dashed border-accent/40 pointer-events-none"
                style={{ borderWidth: "1.5px" }}
              />

              {/* Inner delicate frame */}
              <div className="absolute -inset-1.5 rounded-full border border-primary/25 pointer-events-none shadow-sm" />

              {/* The Hajar Flan brand logo medallion */}
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-full overflow-hidden bg-card p-1 shadow-brand loader-flan-jiggle">
                <img
                  src={media.logo}
                  alt={t("nav.logoAlt")}
                  width={144}
                  height={144}
                  className="h-full w-full object-contain drop-shadow-sm select-none"
                  loading="eager"
                  decoding="sync"
                />
              </div>

              {/* Artisanal mini flan illustration badge attached subtly at corner */}
              <div
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 h-11 w-11 sm:h-13 sm:w-13 rounded-full bg-card/95 border border-primary/20 shadow-soft flex items-center justify-center p-1.5 loader-flan-jiggle"
                style={{ animationDelay: "-0.6s" }}
                title="Flan Artisanal"
              >
                <svg
                  viewBox="0 0 48 48"
                  className="w-full h-full drop-shadow-xs overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Plate */}
                  <ellipse cx="24" cy="38" rx="20" ry="5.5" fill="#e9d8cc" />
                  <ellipse cx="24" cy="37" rx="17" ry="4" fill="#fffaf5" stroke="#d5b9a5" strokeWidth="0.8" />
                  {/* Flan custard body */}
                  <path
                    d="M13 36 L16 20 C16 17 19 16 24 16 C29 16 32 17 32 20 L35 36 Z"
                    fill="url(#custard-gradient)"
                  />
                  {/* Glossy Caramel topping with luscious drips */}
                  <path
                    d="M16 20 C16 17 19 15.5 24 15.5 C29 15.5 32 17 32 20 C32 22 30.5 23.5 29 23.5 C27.5 23.5 27 21.5 25.5 21.5 C24 21.5 23.5 24 22 24 C20.5 24 20 22 18.5 22 C17.2 22 16 21 16 20 Z"
                    fill="url(#caramel-gradient)"
                  />
                  {/* Specular caramel shine */}
                  <ellipse cx="23" cy="18" rx="4.5" ry="1.5" fill="#ffffff" opacity="0.55" />
                  {/* Animated dripping caramel droplet */}
                  <path
                    d="M28.5 23.5 C28.5 23.5 29.5 27 29.5 28.5 C29.5 29.3 28.9 30 28.1 30 C27.3 30 26.7 29.3 26.7 28.5 C26.7 27 28.5 23.5 28.5 23.5 Z"
                    fill="#b8521e"
                    className="loader-caramel-drip"
                  />
                  <defs>
                    <linearGradient id="custard-gradient" x1="24" y1="16" x2="24" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fde09c" />
                      <stop offset="1" stopColor="#f5c26b" />
                    </linearGradient>
                    <linearGradient id="caramel-gradient" x1="16" y1="16" x2="32" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#c2591a" />
                      <stop offset="0.6" stopColor="#a34110" />
                      <stop offset="1" stopColor="#7a2e0a" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Brand Title: Hajar Flan */}
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {t("loader.brand")}
            </h1>

            {/* Tagline */}
            <p className="mt-1.5 text-xs sm:text-sm font-medium italic text-foreground/80 tracking-normal">
              {t("loader.tagline")}
            </p>

            {/* Loading Indicator section */}
            <div className="mt-7 w-full flex flex-col items-center">
              {/* Elegant pill progress bar */}
              <div
                className="relative h-2 w-52 sm:w-64 rounded-full bg-secondary/80 border border-primary/20 overflow-hidden shadow-inner p-0.5"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, var(--accent) 0%, var(--primary) 50%, var(--accent) 100%)",
                  }}
                >
                  {/* Subtle shimmer highlight passing through progress fill */}
                  <div className="loader-shimmer-bar absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent w-full h-full" />
                </div>
              </div>

              {/* Status message and dancing pearls / dots */}
              <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-foreground/75 font-medium">
                <span>{t("loader.message")}</span>
                <span className="inline-flex items-center gap-1 ms-0.5">
                  <span className="loader-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="loader-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="loader-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

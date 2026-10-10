import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">{title}</h2>
    </Reveal>
  );
}

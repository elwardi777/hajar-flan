import { useState } from "react";
import { Heart, Sparkles, Users, Gift, Minus, Plus, MessageCircle, X } from "lucide-react";
import { useI18n } from "@/i18n/context";
import type { Product } from "@/lib/order";
import { UNIT_PRICE, clampQuantity, orderMessage, orderTotal, whatsappLink } from "@/lib/order";
import { media, products } from "./media";
import { Reveal, SectionTitle } from "./Reveal";
export { Footer } from "./Footer";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useI18n();
  return (
    <article className="product-showcase group mx-auto grid max-w-4xl overflow-hidden rounded-[2rem] bg-card shadow-deep md:grid-cols-2">
      <div className="image-shine relative overflow-hidden">
        <img src={product.image} alt={t(product.imageAlt)} loading="lazy" className="h-72 w-full object-cover transition duration-700 group-hover:scale-105 md:h-full" />
        <span className="absolute top-4 start-4 rounded-full bg-primary px-4 py-2 font-display text-xl font-bold text-primary-foreground">{product.price} {t("currency")}</span>
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <h3 className="text-3xl font-semibold text-foreground">{t(product.name)}</h3>
        <p className="mt-4 text-lg text-muted-foreground">{t(product.description)}</p>
        <p className="mt-6 font-display text-5xl font-bold text-primary">{product.price} {t("currency")} <span className="text-lg font-normal text-muted-foreground">{t("hero.perFlan")}</span></p>
        <a href="#commander" className="mt-8 inline-flex justify-center rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5">{t("product.cta")}</a>
      </div>
    </article>
  );
}

export function Products() {
  const { t } = useI18n();
  return (
    <section id="flans" className="px-4 py-24 sm:px-6">
      <SectionTitle eyebrow={t("products.eyebrow")} title={t("products.title")} />
      <div className="space-y-10">
        {products.map((p) => (
          <Reveal key={p.id}><ProductCard product={p} /></Reveal>
        ))}
      </div>
    </section>
  );
}

const reasons = [Heart, Sparkles, Users, Gift];

export function Why() {
  const { t } = useI18n();
  return (
    <section className="bg-secondary/60 px-4 py-24 sm:px-6">
      <SectionTitle eyebrow={t("why.eyebrow")} title={t("why.title")} />
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((Icon, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="h-full rounded-3xl bg-card p-7 shadow-soft transition duration-300 hover:-translate-y-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon /></div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{t(`why.items.${i}.title`)}</h3>
              <p className="mt-2 text-muted-foreground">{t(`why.items.${i}.text`)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const { t } = useI18n();
  return (
    <section id="histoire" className="px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <img src={media.hajar} alt={t("about.imageAlt")} loading="lazy" className="mx-auto block w-full max-w-md rounded-[2rem] shadow-deep" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("about.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">{t("about.title")}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("about.text")}
          </p>
          <img src={media.logo} alt={t("nav.logoAlt")} loading="lazy" className="brand-logo mx-auto mt-8 block h-36 w-36 object-contain" />
        </Reveal>
      </div>
    </section>
  );
}

const gallery = [
  media.gallery1,
  media.gallery2,
  media.gallery3,
  media.gallery4,
  media.gallery5,
  media.stand,
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const { t } = useI18n();
  const alt = (i: number) => t(`gallery.items.${i}`);
  return (
    <section id="galerie" className="bg-secondary/60 px-4 py-24 sm:px-6">
      <SectionTitle eyebrow={t("gallery.eyebrow")} title={t("gallery.title")} />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.map((src, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08}>
            <button type="button" onClick={() => setActive(i)} className="image-shine group relative block aspect-square w-full overflow-hidden rounded-2xl bg-card shadow-soft focus-visible:outline-2 focus-visible:outline-ring" aria-label={t("gallery.enlarge", { label: alt(i) })}>
              <img src={src} alt={alt(i)} loading="lazy" className={`h-full w-full transition duration-700 group-hover:scale-110 ${src === media.logo ? "object-contain p-6" : "object-cover"}`} />
            </button>
          </Reveal>
        ))}
      </div>
      {active !== null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 p-4" onClick={() => setActive(null)}>
          <button type="button" className="absolute top-4 end-4 rounded-full bg-background p-3 text-foreground" aria-label={t("gallery.close")} onClick={() => setActive(null)}><X /></button>
          <img src={gallery[active]!} alt={alt(active)} className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </section>
  );
}

export function OrderSection() {
  const [qty, setQty] = useState(1);
  const { t, lang } = useI18n();
  const message = orderMessage(qty, UNIT_PRICE, lang);
  return (
    <section id="commander" className="px-4 py-24 sm:px-6">
      <SectionTitle eyebrow={t("order.eyebrow")} title={t("order.title")} />
      <Reveal className="mx-auto max-w-xl rounded-[2rem] bg-card p-8 shadow-deep sm:p-10">
        <div className="flex items-center gap-4">
          <img src={media.flan1} alt="" loading="lazy" className="h-20 w-20 rounded-2xl object-cover" />
          <div>
            <p className="text-lg font-semibold text-foreground">{t(products[0]!.name)}</p>
            <p className="text-muted-foreground">{t("order.unit", { price: UNIT_PRICE })}</p>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="font-medium text-foreground">{t("order.quantity")}</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setQty((q) => clampQuantity(q - 1))} disabled={qty <= 1} aria-label={t("order.remove")} className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground disabled:opacity-40"><Minus /></button>
            <input
              type="number" min={1} value={qty} aria-label={t("order.quantity")}
              onChange={(e) => setQty(clampQuantity(Number(e.target.value)))}
              className="w-16 rounded-xl border border-input bg-background py-2 text-center text-xl font-semibold text-foreground"
            />
            <button type="button" onClick={() => setQty((q) => q + 1)} aria-label={t("order.add")} className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Plus /></button>
          </div>
        </div>
        <div className="mt-8 flex items-end justify-between border-t border-border pt-6">
          <span className="text-muted-foreground">{t("order.total")}</span>
          <span className="font-display text-5xl font-bold text-primary" aria-live="polite">{orderTotal(qty)} {t("currency")}</span>
        </div>
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5">
          <MessageCircle /> {t("order.send")}
        </a>
        <p className="mt-4 text-center text-sm text-muted-foreground">{t("order.note")}</p>
      </Reveal>
    </section>
  );
}



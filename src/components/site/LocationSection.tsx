import { MapPin, Navigation } from "lucide-react";
import { Reveal } from "./Reveal";
import { useI18n } from "@/i18n/context";

const MAP_EMBED = "https://maps.google.com/maps?q=33.377639,-7.535500&z=16&output=embed";
const MAP_DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=33.377639,-7.535500";

export function LocationSection() {
  const { t } = useI18n();
  return (
    <section id="localisation" className="bg-secondary/60 px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("location.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">{t("location.title")}</h2>
          <span className="mt-6 inline-flex rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-soft">{t("location.badge")}</span>
          <div className="mt-8 flex gap-4 rounded-3xl bg-card p-6 shadow-soft">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{t("location.name")}</h3>
              <p className="mt-2 text-muted-foreground">{t("location.text")}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center text-center">
            <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5">
              <Navigation className="h-5 w-5" /> {t("location.open")}
            </a>
            <p className="mt-4 text-sm italic text-muted-foreground">{t("location.caption")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-card shadow-deep">
            <iframe title={t("location.mapTitle")} src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-80 w-full sm:h-[28rem]" />
            <span className="pointer-events-none absolute top-4 start-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-soft">
              <MapPin className="h-4 w-4" /> {t("location.mapBadge")}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

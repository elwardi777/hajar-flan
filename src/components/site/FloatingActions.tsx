import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/order";
import { useI18n } from "@/i18n/context";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="action-stack fixed right-5 bottom-5 z-40 flex flex-col items-center gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="scroll-top"
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t("floating.top")}
            className="scroll-top"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("floating.whatsapp")}
        className="wa-fab"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

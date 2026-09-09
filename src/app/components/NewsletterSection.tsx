import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../lib/i18n";

export function NewsletterSection({ onSubscribe }: { onSubscribe?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-28 bg-[#002e1e] relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="w-14 h-14 rounded-full border border-[#efe3c4]/20 flex items-center justify-center mx-auto mb-8 text-[#efe3c4]/70"
        >
          <Sparkles size={20} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#efe3c4] mb-4"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25 }}
        >
          {t("finalCta.headline")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#efe3c4]/50 mb-10"
          style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
        >
          {t("finalCta.paragraph")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSubscribe}
          className="px-10 py-4 bg-[#efe3c4] text-[#002e1e] rounded-xl cursor-pointer inline-flex items-center gap-2"
          style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          {t("finalCta.button")}
        </motion.button>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../lib/i18n";

const PHILOSOPHY_IMG =
  "https://images.unsplash.com/photo-1759374499868-d5b54f0c41a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2dvdGElMjBDb2xvbWJpYSUyMGN1bHR1cmFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3Mzc2NTcyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const STATS: { value: string; key: "philosophy.stat1" | "philosophy.stat2" | "philosophy.stat3" }[] = [
  { value: "25", key: "philosophy.stat1" },
  { value: "400", key: "philosophy.stat2" },
  { value: "6", key: "philosophy.stat3" },
];

export function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="bg-[#002e1e] py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0"
        >
          <ImageWithFallback src={PHILOSOPHY_IMG} alt="Nuestra filosofía" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="text-[#efe3c4]/40 uppercase tracking-[0.4em] block mb-4" style={{ fontSize: "0.65rem", fontWeight: 500 }}>
            {t("philosophy.eyebrow")}
          </span>
          <h2
            className="text-[#efe3c4] mb-6"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}
          >
            {t("philosophy.headline")}
          </h2>
          <p className="text-[#efe3c4]/50 max-w-md mb-10" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
            {t("philosophy.paragraph")}
          </p>

          <div className="flex items-center gap-10 mb-10">
            {STATS.map((stat) => (
              <div key={stat.key}>
                <span
                  className="block text-[#efe3c4]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700 }}
                >
                  {stat.value}
                </span>
                <span className="text-[#efe3c4]/40 uppercase tracking-[0.15em]" style={{ fontSize: "0.65rem", fontWeight: 500 }}>
                  {t(stat.key)}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#experiencias"
            className="inline-flex items-center gap-2 text-[#efe3c4]/70 hover:text-[#efe3c4] transition-colors duration-300 uppercase tracking-[0.2em]"
            style={{ fontSize: "0.72rem", fontWeight: 600 }}
          >
            {t("philosophy.discover")}
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

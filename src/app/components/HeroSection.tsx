import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../lib/i18n";

const SLIDES = [
  "https://images.unsplash.com/photo-1763217049383-fa54764df3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwYXJ0JTIwZ2FsbGVyeSUyMGludGVyaW9yJTIwbXVzZXVtJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczNzg3MzY3fDA&ixlib=rb-4.1.0&q=80&w=1600",
  "https://images.unsplash.com/photo-1598617677009-abca71cd8319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRpbWF0ZSUyMGRpbm5lciUyMGNhbmRsZWxpZ2h0JTIwY3VsdHVyYWwlMjBldmVudHxlbnwxfHx8fDE3NzM4NDUzMDR8MA&ixlib=rb-4.1.0&q=80&w=1600",
  "https://images.unsplash.com/photo-1759474946213-db858486d1f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYW4lMjBjb2xvbmlhbCUyMGFyY2hpdGVjdHVyZSUyMGNvYmJsZXN0b25lJTIwc3RyZWV0fGVufDF8fHx8MTc3Mzc4NzM2N3ww&ixlib=rb-4.1.0&q=80&w=1600",
];

const TOTAL_SLIDES = SLIDES.length;

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setReveal(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!reveal) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 5000);
    return () => clearInterval(interval);
  }, [reveal]);

  const goTo = useCallback((delta: number) => {
    setSlideIndex((prev) => (prev + delta + TOTAL_SLIDES) % TOTAL_SLIDES);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#002e1e]">
      {/* Background carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <ImageWithFallback src={SLIDES[slideIndex]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e] via-[#002e1e]/50 to-[#002e1e]/40" />
      </div>

      {/* Prev / next arrows */}
      <button
        onClick={() => goTo(-1)}
        aria-label="Anterior"
        className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#efe3c4]/25 items-center justify-center text-[#efe3c4]/70 hover:text-[#efe3c4] hover:border-[#efe3c4]/50 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => goTo(1)}
        aria-label="Siguiente"
        className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#efe3c4]/25 items-center justify-center text-[#efe3c4]/70 hover:text-[#efe3c4] hover:border-[#efe3c4]/50 transition-all duration-300 cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={reveal ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-4 mb-6"
        >
          <motion.span
            className="h-px bg-[#efe3c4]/40"
            initial={{ width: 0 }}
            animate={reveal ? { width: 40 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          />
          <span className="text-[#efe3c4]/60 uppercase tracking-[0.35em]" style={{ fontSize: "0.68rem", fontWeight: 500 }}>
            {t("hero.eyebrow")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={reveal ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#efe3c4] max-w-4xl"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em" }}
        >
          {t("hero.headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={reveal ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[#efe3c4] mt-6"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 400 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={reveal ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-[#efe3c4]/60 max-w-xl mt-4"
          style={{ fontSize: "0.9rem", lineHeight: 1.75 }}
        >
          {t("hero.paragraph")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={reveal ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-10"
        >
          <Link
            to="/experiencias"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#002e1e] border border-[#efe3c4]/30 text-[#efe3c4] rounded-lg uppercase tracking-[0.2em] hover:bg-[#efe3c4] hover:text-[#002e1e] hover:border-[#efe3c4] transition-all duration-400"
            style={{ fontSize: "0.7rem", fontWeight: 700 }}
          >
            {t("hero.cta")}
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={reveal ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 w-full z-20 border-t border-[#efe3c4]/10"
      >
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-5">
          <div className="flex items-center gap-3">
            <div className="relative w-px h-8 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#efe3c4]/40"
                animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
            </div>
            <span className="text-[#efe3c4]/40 uppercase tracking-[0.4em]" style={{ fontSize: "0.55rem", fontWeight: 500 }}>
              {t("hero.scroll")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className="h-1 rounded-full transition-all duration-500 cursor-pointer"
                style={{
                  width: i === slideIndex ? "1.75rem" : "0.4rem",
                  background: i === slideIndex ? "rgba(239,227,196,0.7)" : "rgba(239,227,196,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

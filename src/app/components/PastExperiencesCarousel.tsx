import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

interface PastExperience {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  attendees: number;
}

const pastExperiences: PastExperience[] = [
  {
    id: 1,
    title: "Noche de teatro experimental",
    date: "Marzo 2026",
    category: "Teatro",
    image:
      "https://images.unsplash.com/photo-1609039504401-47ac3940f378?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGVyZm9ybWFuY2UlMjBzdGFnZSUyMGxpZ2h0aW5nfGVufDF8fHx8MTc3Mzc2NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 24,
  },
  {
    id: 2,
    title: "Botanica & contemplacion",
    date: "Febrero 2026",
    category: "Naturaleza",
    image:
      "https://images.unsplash.com/photo-1724893973725-2a68097be694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBnYXJkZW4lMjBncmVlbmhvdXNlJTIwdHJvcGljYWx8ZW58MXx8fHwxNzczNzY2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 16,
  },
  {
    id: 3,
    title: "Jazz intimo en La Candelaria",
    date: "Enero 2026",
    category: "Musica",
    image:
      "https://images.unsplash.com/photo-1580832945253-9a8f87b606f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwYmFyJTIwbGl2ZSUyMG11c2ljJTIwaW50aW1hdGV8ZW58MXx8fHwxNzczNzY2MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 18,
  },
  {
    id: 4,
    title: "El trazo como meditacion",
    date: "Diciembre 2025",
    category: "Taller",
    image:
      "https://images.unsplash.com/photo-1486303954368-398fea0e72cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxsaWdyYXBoeSUyMHdvcmtzaG9wJTIwaW5rJTIwcGFwZXJ8ZW58MXx8fHwxNzczNzY2MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 12,
  },
  {
    id: 5,
    title: "Cine documental colombiano",
    date: "Noviembre 2025",
    category: "Cine",
    image:
      "https://images.unsplash.com/photo-1762356121454-877acbd554bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudGFyeSUyMGZpbG0lMjBzY3JlZW5pbmclMjBjaW5lbWF8ZW58MXx8fHwxNzczNzY2MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 30,
  },
  {
    id: 6,
    title: "Ritual del cafe de origen",
    date: "Octubre 2025",
    category: "Sensorial",
    image:
      "https://images.unsplash.com/photo-1584542280746-018ea747a3f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjBjb2ZmZWUlMjBjZXJlbW9ueSUyMGFydGlzYW5hbHxlbnwxfHx8fDE3NzM3NjU3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 14,
  },
];

function ParallaxCard({ exp, index }: { exp: PastExperience; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax on the image inside each card
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="flex-shrink-0 w-[300px] md:w-[360px] group cursor-pointer relative"
    >
      {/* Image container with parallax */}
      <div className="relative h-[240px] md:h-[280px] rounded-2xl overflow-hidden mb-4">
        {/* Skeleton */}
        {!loaded && (
          <div className="absolute inset-0 bg-[#002e1e]/8 animate-pulse rounded-2xl" />
        )}

        <motion.div style={{ y: imgY }} className="absolute inset-[-20%] w-[140%] h-[140%]">
          <ImageWithFallback
            src={exp.image}
            alt={exp.title}
            className="w-full h-full object-cover"
            onLoad={() => setLoaded(true)}
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Category badge - glassmorphism */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-xl bg-white/15 border border-white/15">
          <span
            className="text-white/90 uppercase tracking-widest"
            style={{ fontSize: "0.6rem", fontWeight: 500 }}
          >
            {exp.category}
          </span>
        </div>

        {/* Hover arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-4 right-4 w-9 h-9 rounded-full backdrop-blur-xl bg-white/20 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ArrowUpRight size={14} className="text-white" />
        </motion.div>

        {/* Attendees count */}
        <div className="absolute bottom-4 left-4">
          <span
            className="text-white/60"
            style={{ fontSize: "0.7rem", fontWeight: 400 }}
          >
            {exp.attendees} asistentes
          </span>
        </div>
      </div>

      {/* Text content */}
      <div className="px-1">
        <p
          className="text-[#002e1e]/40 mb-1"
          style={{ fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.05em" }}
        >
          {exp.date}
        </p>
        <h4
          className="text-[#002e1e] group-hover:text-[#002e1e]/80 transition-colors"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.1rem",
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          {exp.title}
        </h4>
      </div>
    </motion.div>
  );
}

export function PastExperiencesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = direction === "left" ? -380 : 380;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="pt-8 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span
              className="text-[#002e1e]/40 uppercase tracking-[0.3em] block mb-3"
              style={{ fontSize: "0.7rem", fontWeight: 500 }}
            >
              Archivo
            </span>
            <h2
              className="text-[#002e1e]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 400,
              }}
            >
              Experiencias pasadas
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                canScrollLeft
                  ? "border-[#002e1e]/20 text-[#002e1e] hover:bg-[#002e1e]/5"
                  : "border-[#002e1e]/8 text-[#002e1e]/20 cursor-default"
              }`}
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                canScrollRight
                  ? "border-[#002e1e]/20 text-[#002e1e] hover:bg-[#002e1e]/5"
                  : "border-[#002e1e]/8 text-[#002e1e]/20 cursor-default"
              }`}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Left spacer for max-w alignment */}
        <div className="flex-shrink-0 hidden xl:block" style={{ width: "calc((100vw - 80rem) / 2)" }} />

        {pastExperiences.map((exp, i) => (
          <ParallaxCard key={exp.id} exp={exp} index={i} />
        ))}

        {/* Right spacer */}
        <div className="flex-shrink-0 w-6 md:w-12" />
      </div>

      {/* Mobile scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="md:hidden flex justify-center mt-6"
      >
        <div className="flex items-center gap-2 text-[#002e1e]/30">
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronRight size={14} />
          </motion.div>
          <span style={{ fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.1em" }} className="uppercase">
            Desliza para ver mas
          </span>
        </div>
      </motion.div>
    </section>
  );
}
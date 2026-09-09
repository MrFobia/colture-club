import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, MapPin, Users, ArrowUpRight, X, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  spots: number;
  image: string;
  tags: string[];
  description: string;
  quote?: string;
  quoteAuthor?: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Habitar la historia",
    subtitle: "Recorrido arquitectónico por casonas republicanas",
    date: "Abril 26",
    location: "Chapinero, Bogotá",
    spots: 12,
    image:
      "https://images.unsplash.com/photo-1759374499868-d5b54f0c41a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2dvdGElMjBDb2xvbWJpYSUyMGN1bHR1cmFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3Mzc2NTcyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Arquitectura", "Historia"],
    description:
      "Un recorrido íntimo por las joyas ocultas de la arquitectura republicana en Chapinero. Guiados por el historiador Andrés Ospina, exploraremos fachadas olvidadas, patios interiores secretos y la memoria que habita en cada muro. Terminaremos con un almuerzo en un claustro restaurado del siglo XIX.",
    quote: "La arquitectura es el testigo menos sobornable de la historia.",
    quoteAuthor: "Octavio Paz",
  },
  {
    id: 2,
    title: "La cultura también se sirve",
    subtitle: "Cena curada con chef invitado y maridaje literario",
    date: "Mayo 3",
    location: "Usaquén, Bogotá",
    spots: 8,
    image:
      "https://images.unsplash.com/photo-1773188243397-29591fa09047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZyUyMGVsZWdhbnQlMjBkaW5uZXJ8ZW58MXx8fHwxNzczNzY1NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Gastronomía", "Literatura"],
    description:
      "Cinco tiempos donde cada plato dialoga con un fragmento literario. La chef Leonor Espinosa y el escritor Juan Gabriel Vásquez nos guiarán por una experiencia donde el sabor y la palabra se encuentran. Cada bocado es una historia, cada copa un verso.",
    quote: "Cocinar es un acto de amor, un regalo, un acto de generosidad.",
    quoteAuthor: "Leonor Espinosa",
  },
  {
    id: 3,
    title: "Conversaciones que transforman",
    subtitle: "Salón literario con autor invitado",
    date: "Mayo 10",
    location: "Zona G, Bogotá",
    spots: 15,
    image:
      "https://images.unsplash.com/photo-1699543011814-3438b73cb4b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmFyeSUyMHNhbG9uJTIwYm9vayUyMGRpc2N1c3Npb24lMjBpbnRpbWF0ZXxlbnwxfHx8fDE3NzM3NjU3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Literatura", "Diálogo"],
    description:
      "Un encuentro íntimo donde las ideas fluyen sin prisa. Un autor invitado comparte su proceso creativo mientras navegamos entre páginas, preguntas y silencios productivos. No es una conferencia: es una conversación real entre mentes curiosas.",
    quote: "Uno no es lo que es por lo que escribe, sino por lo que ha leído.",
    quoteAuthor: "Jorge Luis Borges",
  },
  {
    id: 4,
    title: "Ritual del café",
    subtitle: "Ceremonia de café de origen con catación guiada",
    date: "Mayo 17",
    location: "Teusaquillo, Bogotá",
    spots: 10,
    image:
      "https://images.unsplash.com/photo-1584542280746-018ea747a3f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjBjb2ZmZWUlMjBjZXJlbW9ueSUyMGFydGlzYW5hbHxlbnwxfHx8fDE3NzM3NjU3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Café", "Sensorial"],
    description:
      "Una inmersión sensorial en el universo del café colombiano de especialidad. Desde el grano verde hasta la taza, exploraremos perfiles de sabor, métodos de extracción y la historia detrás de cada origen. Una experiencia que transforma la manera en que entendemos nuestra bebida más emblemática.",
  },
  {
    id: 5,
    title: "Noche de piano",
    subtitle: "Concierto íntimo a la luz de las velas",
    date: "Mayo 24",
    location: "Centro, Bogotá",
    spots: 20,
    image:
      "https://images.unsplash.com/photo-1690642379131-633acd739731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWFubyUyMGNvbmNlcnQlMjBjYW5kbGVsaWdodCUyMGludGltYXRlfGVufDF8fHx8MTc3Mzc2NTczNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Música", "Velada"],
    description:
      "Cien velas, un piano de cola y la penumbra justa. Un pianista colombiano interpreta obras de Satie, Debussy y Villa-Lobos en un espacio donde el silencio entre notas es tan importante como la música misma. Una experiencia diseñada para escuchar con todo el cuerpo.",
    quote: "La música es el silencio entre las notas.",
    quoteAuthor: "Claude Debussy",
  },
];

/* ── Parallax Experience Card ── */
function ExperienceCard({
  exp,
  index,
  onClick,
}: {
  exp: Experience;
  index: number;
  onClick: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  // Parallax on image
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer group h-full"
    >
      {/* Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-[#002e1e]/8 animate-pulse rounded-2xl" />
      )}

      {/* Parallax image container */}
      <motion.div
        className="absolute inset-[-16%] w-[132%] h-[132%]"
        style={{ y: imgY }}
      >
        <ImageWithFallback
          src={exp.image}
          alt={exp.title}
          className="w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/95 via-[#002e1e]/20 via-45% to-transparent transition-all duration-700 group-hover:from-[#002e1e]/80" />

      {/* Decorative number */}
      <motion.span
        className="absolute top-6 right-8 text-white/[0.04] select-none pointer-events-none mix-blend-overlay"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(6rem, 10vw, 12rem)",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        0{exp.id}
      </motion.span>

      {/* Tags — top left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-wrap gap-2 z-10">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-3.5 py-1.5 rounded-full backdrop-blur-2xl bg-white/10 border border-white/15 text-white/80 uppercase tracking-wider transition-all duration-300 group-hover:bg-white/15"
            style={{ fontSize: "0.6rem", fontWeight: 500 }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow — top right, animated on hover */}
      <motion.div className="absolute top-6 right-6 md:top-8 md:right-8 w-11 h-11 rounded-full backdrop-blur-2xl bg-white/0 border border-white/0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/10 group-hover:border-white/15 transition-all duration-500 z-10">
        <ArrowUpRight size={16} className="text-white group-hover:rotate-45 transition-transform duration-500" />
      </motion.div>

      {/* Content — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
        <p
          className="text-white/40 uppercase tracking-[0.25em] mb-3"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          {exp.date} · {exp.location}
        </p>
        <h3
          className="text-white mb-3 transition-transform duration-500 group-hover:translate-x-2"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 2.5vw, 2.4rem)",
            fontWeight: 400,
            lineHeight: 1.12,
          }}
        >
          {exp.title}
        </h3>
        <p
          className="text-white/45 max-w-lg transition-all duration-500 group-hover:text-white/60"
          style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}
        >
          {exp.subtitle}
        </p>

        {/* Expanding line on hover */}
        <div className="mt-5 flex items-center gap-3 overflow-hidden">
          <motion.span
            className="block h-px bg-white/25 w-0 group-hover:w-12 transition-all duration-700 ease-out"
          />
          <span
            className="text-white/0 group-hover:text-white/40 uppercase tracking-[0.2em] transition-all duration-500 delay-100"
            style={{ fontSize: "0.65rem", fontWeight: 500 }}
          >
            Explorar
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Full-screen Detail Modal ── */
function ExperienceDetail({
  exp,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  exp: Experience;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#002e1e]/80 backdrop-blur-xl" />

      {/* Full panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative h-full w-full flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left — Immersive Image (60% on desktop) */}
        <div className="relative w-full md:w-[58%] h-[40vh] md:h-full flex-shrink-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={exp.image}
              alt={exp.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient bleed into content */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#002e1e]/60 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#002e1e]/60 md:hidden" />

          {/* Decorative large number */}
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.06, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-6 left-8 md:bottom-12 md:left-12 text-white select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(7rem, 18vw, 16rem)",
              fontWeight: 400,
              lineHeight: 0.85,
            }}
          >
            0{exp.id}
          </motion.span>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 left-6 md:top-8 md:left-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <X size={18} className="text-white" />
          </motion.button>

          {/* Nav arrows on image */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-3 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              disabled={!hasPrev}
              className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <ChevronLeft size={16} className="text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              disabled={!hasNext}
              className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <ChevronRight size={16} className="text-white" />
            </motion.button>
          </div>
        </div>

        {/* Right — Content */}
        <div className="flex-1 overflow-y-auto bg-[#f9f9f9] md:rounded-l-none">
          <div className="p-8 md:p-14 lg:p-20 flex flex-col justify-center min-h-full">
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {exp.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="px-4 py-1.5 rounded-full bg-[#efe3c4]/50 text-[#002e1e]/60 uppercase tracking-wider"
                    style={{ fontSize: "0.65rem", fontWeight: 500 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Title */}
              <h2
                className="text-[#002e1e] mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                }}
              >
                {exp.title}
              </h2>

              {/* Subtitle */}
              <p
                className="text-[#002e1e]/40 uppercase tracking-[0.18em] mb-10"
                style={{ fontSize: "0.8rem", fontWeight: 500 }}
              >
                {exp.subtitle}
              </p>

              {/* Thin divider */}
              <div className="w-16 h-px bg-[#efe3c4] mb-10" />

              {/* Meta row */}
              <div
                className="flex flex-wrap gap-6 mb-10 text-[#002e1e]/45"
                style={{ fontSize: "0.85rem" }}
              >
                <span className="flex items-center gap-2.5">
                  <Calendar size={15} className="text-[#002e1e]/25" />
                  {exp.date}
                </span>
                <span className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-[#002e1e]/25" />
                  {exp.location}
                </span>
                <span className="flex items-center gap-2.5">
                  <Users size={15} className="text-[#002e1e]/25" />
                  {exp.spots} cupos
                </span>
              </div>

              {/* Description */}
              <p
                className="text-[#002e1e]/55 mb-10 max-w-xl"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.05rem",
                  lineHeight: 2,
                  fontWeight: 300,
                }}
              >
                {exp.description}
              </p>

              {/* Quote */}
              {exp.quote && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="relative pl-8 mb-12 border-l-2 border-[#efe3c4]"
                >
                  <Quote size={16} className="text-[#efe3c4] absolute -left-[9px] -top-0.5 bg-[#f9f9f9]" />
                  <p
                    className="text-[#002e1e]/35 italic"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                    }}
                  >
                    &ldquo;{exp.quote}&rdquo;
                  </p>
                  <span
                    className="text-[#002e1e]/25 mt-3 block"
                    style={{ fontSize: "0.75rem", fontStyle: "normal" }}
                  >
                    — {exp.quoteAuthor}
                  </span>
                </motion.div>
              )}

              {/* CTA */}
              <motion.button
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-5 text-[#002e1e] cursor-pointer group/btn w-fit"
              >
                <span
                  className="uppercase tracking-widest"
                  style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.18em" }}
                >
                  Reservar mi lugar
                </span>
                <span className="w-12 h-px bg-[#002e1e]/25 group-hover/btn:w-20 transition-all duration-300" />
                <ArrowUpRight size={16} className="text-[#002e1e]/40 group-hover/btn:rotate-45 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function BentoExperiences() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedExp = selectedIndex !== null ? experiences[selectedIndex] : null;

  return (
    <>
      <section
        ref={ref}
        id="experiencias"
        className="py-28 md:py-44 w-full"
      >
        {/* Header */}
        <div className="px-6 md:px-16 lg:px-20 mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <span
              className="text-[#002e1e]/35 uppercase tracking-[0.4em]"
              style={{ fontSize: "0.65rem", fontWeight: 500 }}
            >
              Próximas experiencias
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2
                className="text-[#002e1e] max-w-2xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                }}
              >
                Experiencias que despiertan los sentidos
              </h2>
              <motion.button
                whileHover={{ x: 6, gap: "1rem" }}
                whileTap={{ scale: 0.97 }}
                className="text-[#002e1e]/40 uppercase tracking-widest flex items-center gap-3 cursor-pointer shrink-0"
                style={{ fontSize: "0.7rem", fontWeight: 500 }}
              >
                Ver todas <ArrowUpRight size={13} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Row 1 — Cinematic hero + tall vertical */}
        <div className="px-3 md:px-6 lg:px-8 mb-3 md:mb-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4" style={{ height: "auto" }}>
            <div className="md:col-span-7 h-[420px] md:h-[640px] lg:h-[720px]">
              <ExperienceCard
                exp={experiences[0]}
                index={0}
                onClick={() => setSelectedIndex(0)}
              />
            </div>
            <div className="md:col-span-5 h-[380px] md:h-[640px] lg:h-[720px]">
              <ExperienceCard
                exp={experiences[1]}
                index={1}
                onClick={() => setSelectedIndex(1)}
              />
            </div>
          </div>
        </div>

        {/* Row 2 — Three varied columns with editorial rhythm */}
        <div className="px-3 md:px-6 lg:px-8 mb-3 md:mb-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            <div className="md:col-span-4 h-[340px] md:h-[480px] lg:h-[540px]">
              <ExperienceCard
                exp={experiences[2]}
                index={2}
                onClick={() => setSelectedIndex(2)}
              />
            </div>
            <div className="md:col-span-3 h-[340px] md:h-[480px] lg:h-[540px] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden rounded-2xl bg-[#002e1e]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative z-10"
              >
                <motion.span
                  className="block text-[#efe3c4]/10 mb-4 select-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(4rem, 8vw, 7rem)",
                    fontWeight: 400,
                    lineHeight: 0.9,
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✦
                </motion.span>
                <p
                  className="text-[#efe3c4]/70 italic max-w-[200px] mx-auto mb-4"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                  }}
                >
                  &ldquo;La cultura es lo que queda cuando se ha olvidado todo.&rdquo;
                </p>
                <span
                  className="text-[#efe3c4]/30 uppercase tracking-[0.2em]"
                  style={{ fontSize: "0.6rem", fontWeight: 500 }}
                >
                  Édouard Herriot
                </span>
              </motion.div>
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-[300px] h-[300px] rounded-full border border-[#efe3c4]/5" />
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-[200px] h-[200px] rounded-full border border-[#efe3c4]/8 border-dashed" />
              </motion.div>
            </div>
            <div className="md:col-span-5 h-[340px] md:h-[480px] lg:h-[540px]">
              <ExperienceCard
                exp={experiences[3]}
                index={3}
                onClick={() => setSelectedIndex(3)}
              />
            </div>
          </div>
        </div>

        {/* Row 3 — Full-width cinematic strip */}
        <div className="px-3 md:px-6 lg:px-8">
          <div className="h-[360px] md:h-[440px] lg:h-[500px]">
            <ExperienceCard
              exp={experiences[4]}
              index={4}
              onClick={() => setSelectedIndex(4)}
            />
          </div>
        </div>
      </section>

      {/* Detail modal */}
      <AnimatePresence mode="wait">
        {selectedExp && selectedIndex !== null && (
          <ExperienceDetail
            key={selectedExp.id}
            exp={selectedExp}
            onClose={() => setSelectedIndex(null)}
            onPrev={() => setSelectedIndex((i) => Math.max(0, (i ?? 0) - 1))}
            onNext={() => setSelectedIndex((i) => Math.min(experiences.length - 1, (i ?? 0) + 1))}
            hasPrev={selectedIndex > 0}
            hasNext={selectedIndex < experiences.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}
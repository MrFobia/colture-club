import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, Calendar, Clock, Users, Filter } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EXPERIENCES, CATEGORIES, type Category } from "../data/experiences";

export function ExperienciasPage({ onSubscribe }: { onSubscribe?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<Category | "Todas">("Todas");
  const heroRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const listInView = useInView(listRef, { once: true, margin: "-60px" });

  const featured = EXPERIENCES.find((e) => e.isFeatured)!;
  const pastExperiences = EXPERIENCES.filter((e) => e.isPast);
  const upcoming = EXPERIENCES.filter((e) => !e.isPast && !e.isFeatured);

  const filtered =
    activeCategory === "Todas"
      ? [...upcoming, ...pastExperiences]
      : [...upcoming, ...pastExperiences].filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Hero — Experiencia del mes */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e] via-[#002e1e]/60 to-transparent" />
          <div className="absolute inset-0 bg-[#002e1e]/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-16 md:pb-20 pt-32">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-[#efe3c4]/30 text-[#efe3c4]/70 mb-6 backdrop-blur-sm bg-white/5"
            style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" }}
          >
            Experiencia del mes
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#efe3c4] max-w-3xl mb-4"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            {featured.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="text-[#efe3c4]/60 max-w-xl mb-8"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", lineHeight: 1.7 }}
          >
            {featured.subtitle}
          </motion.p>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="flex flex-wrap items-center gap-5 mb-10"
          >
            {[
              { icon: <Calendar size={14} />, text: featured.date },
              { icon: <Clock size={14} />, text: featured.time },
              { icon: <MapPin size={14} />, text: featured.location },
              { icon: <Users size={14} />, text: `${featured.spotsLeft} cupos disponibles` },
            ].map((item, idx) => (
              <span key={idx} className="flex items-center gap-2 text-[#efe3c4]/50" style={{ fontSize: "0.8rem", fontWeight: 400 }}>
                <span className="text-[#efe3c4]/30">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to={`/experiencias/${featured.id}`}>
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#efe3c4] text-[#002e1e] cursor-pointer"
                style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                Ver experiencia
                <ArrowRight size={14} />
              </motion.span>
            </Link>

            <motion.button
              onClick={onSubscribe}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#efe3c4]/30 text-[#efe3c4] cursor-pointer backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
              style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              Suscribirme
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Listado de experiencias */}
      <section ref={listRef} className="py-20 md:py-28 px-8 md:px-16 lg:px-24">
        {/* Header + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={listInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <span
            className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
            style={{ fontSize: "0.6rem", fontWeight: 500 }}
          >
            Archivo cultural
          </span>
          <h2
            className="text-[#002e1e] mb-8"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 600 }}
          >
            Todas las experiencias
          </h2>

          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#002e1e]/25 mr-2">
              <Filter size={14} />
            </span>
            {["Todas", ...CATEGORIES].map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat as Category | "Todas")}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#002e1e] text-[#efe3c4]"
                    : "bg-[#002e1e]/5 text-[#002e1e]/50 hover:bg-[#002e1e]/10"
                }`}
                style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.05em" }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#002e1e]/30" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem" }}>
              No hay experiencias en esta categoría aún.
            </p>
          </div>
        )}
      </section>

      {/* Subscription CTA Module */}
      <section className="px-8 md:px-16 lg:px-24 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden bg-[#002e1e] p-10 md:p-16 lg:p-20"
          >
            {/* Decorative circles */}
            <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full border border-[#efe3c4]/8" />
            <div className="absolute bottom-[-40px] left-[-40px] w-[160px] h-[160px] rounded-full border border-[#efe3c4]/5" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <span
                  className="text-[#efe3c4]/30 uppercase tracking-[0.4em] block mb-5"
                  style={{ fontSize: "0.55rem", fontWeight: 600 }}
                >
                  Colture Club
                </span>
                <h3
                  className="text-[#efe3c4] mb-6"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, lineHeight: 1.15 }}
                >
                  Las experiencias no se compran,{" "}
                  <span style={{ fontStyle: "italic" }}>se viven.</span>
                </h3>
                <p
                  className="text-[#efe3c4]/50 mb-4"
                  style={{ fontSize: "0.9rem", lineHeight: 1.8, fontWeight: 400 }}
                >
                  Cada mes curamos encuentros íntimos que conectan personas con la cultura, el arte
                  y la gastronomía de formas inesperadas. Tu suscripción te da acceso prioritario
                  a cada experiencia antes que nadie.
                </p>
                <div className="flex flex-col gap-3 mt-8">
                  {[
                    "Acceso anticipado a todas las experiencias curadas",
                    "Cupos reservados antes de la apertura pública",
                    "Comunidad de afinidad intelectual y cultural",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#efe3c4]/30 shrink-0" />
                      <span className="text-[#efe3c4]/40" style={{ fontSize: "0.8rem", fontWeight: 400 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex flex-col items-start lg:items-center">
                <div className="p-8 md:p-10 rounded-xl bg-[#efe3c4]/[0.07] backdrop-blur-sm border border-[#efe3c4]/10 w-full max-w-sm">
                  <p
                    className="text-[#efe3c4]/60 mb-6"
                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.85rem", lineHeight: 1.7 }}
                  >
                    "La cultura no se consume, se convierte en encuentro."
                  </p>
                  <span
                    className="text-[#efe3c4]/25 uppercase tracking-[0.2em] block mb-2"
                    style={{ fontSize: "0.55rem", fontWeight: 600 }}
                  >
                    Planes desde
                  </span>
                  <span
                    className="text-[#efe3c4] block mb-8"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 700 }}
                  >$200.000 / mes</span>
                  <motion.button
                    onClick={onSubscribe}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-lg bg-[#efe3c4] text-[#002e1e] cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em" }}
                  >
                    SUSCRIBIRME AHORA
                    <ArrowRight size={14} />
                  </motion.button>
                  <p
                    className="text-center mt-4 text-[#efe3c4]/20"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Cancela cuando quieras · Sin compromiso
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ExperienceCard({ experience: exp, index }: { experience: typeof EXPERIENCES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/experiencias/${exp.id}`} className="block group">
        <div className="rounded-xl overflow-hidden bg-white border border-[#002e1e]/5 hover:shadow-xl transition-all duration-500 hover:border-[#002e1e]/10">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <ImageWithFallback
              src={exp.image}
              alt={exp.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category pill */}
            <span
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#002e1e]/70 backdrop-blur-md text-[#efe3c4]"
              style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              {exp.category}
            </span>

            {/* Status */}
            {exp.isPast ? (
              <span
                className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#efe3c4]/80 backdrop-blur-md text-[#002e1e]/60"
                style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Pasada
              </span>
            ) : exp.spotsLeft <= 3 ? (
              <span
                className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#002e1e] text-[#efe3c4]"
                style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Últimos cupos
              </span>
            ) : null}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3
              className="text-[#002e1e] mb-2 group-hover:text-[#002e1e]/80 transition-colors"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3 }}
            >
              {exp.title}
            </h3>
            <p
              className="text-[#002e1e]/40 mb-4"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.8rem", lineHeight: 1.6 }}
            >
              {exp.subtitle}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-[#002e1e]/35">
              <span className="flex items-center gap-1.5" style={{ fontSize: "0.7rem" }}>
                <Calendar size={12} /> {exp.date}
              </span>
              <span className="flex items-center gap-1.5" style={{ fontSize: "0.7rem" }}>
                <MapPin size={12} /> {exp.location}
              </span>
            </div>


          </div>
        </div>
      </Link>
    </motion.div>
  );
}
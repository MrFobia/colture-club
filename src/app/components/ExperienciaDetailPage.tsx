import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowLeft, Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { useParams, Link, useOutletContext } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EXPERIENCES } from "../data/experiences";

export function ExperienciaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { onSubscribe } = useOutletContext<{ onSubscribe: () => void }>();
  const exp = EXPERIENCES.find((e) => e.id === id);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { once: true, margin: "-60px" });
  const [activeImg, setActiveImg] = useState(0);

  if (!exp) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center" style={{ fontFamily: "var(--font-sans)" }}>
        <div className="text-center">
          <h2 className="text-[#002e1e] mb-4" style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700 }}>
            Experiencia no encontrada
          </h2>
          <Link to="/experiencias" className="text-[#002e1e]/50 hover:text-[#002e1e] transition-colors underline" style={{ fontSize: "0.85rem" }}>
            Volver a experiencias
          </Link>
        </div>
      </div>
    );
  }

  const otherExperiences = EXPERIENCES.filter((e) => e.id !== id).slice(0, 3);

  const metaItems = [
    { icon: <Calendar size={16} />, label: "Fecha", value: exp.date },
    { icon: <Clock size={16} />, label: "Hora", value: exp.time },
    { icon: <MapPin size={16} />, label: "Lugar", value: exp.location },
    { icon: <Users size={16} />, label: "Capacidad", value: `${exp.capacity} personas` },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Hero image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <ImageWithFallback
          src={exp.gallery[activeImg] || exp.image}
          alt={exp.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/80 via-[#002e1e]/30 to-[#002e1e]/10" />

        {/* Back button */}
        <div className="absolute top-28 left-8 md:left-16 lg:left-24 z-10">
          <Link to="/experiencias">
            <motion.span
              whileHover={{ x: -3 }}
              className="inline-flex items-center gap-2 text-[#efe3c4]/70 hover:text-[#efe3c4] transition-colors cursor-pointer"
              style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em" }}
            >
              <ArrowLeft size={16} />
              Volver a experiencias
            </motion.span>
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-24 pb-12 z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 rounded-full border border-[#efe3c4]/25 text-[#efe3c4]/60 mb-4 backdrop-blur-sm bg-white/5"
            style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            {exp.category} {exp.isPast ? " · Experiencia pasada" : ""}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#efe3c4] max-w-3xl"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            {exp.title}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="px-8 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: Description */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[#002e1e]/45 mb-10"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              {exp.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span
                className="text-[#002e1e]/25 uppercase tracking-[0.3em] block mb-5"
                style={{ fontSize: "0.6rem", fontWeight: 600 }}
              >
                Descripción
              </span>
              {exp.longDescription.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-[#002e1e]/65 mb-5"
                  style={{ fontSize: "0.95rem", lineHeight: 1.9, fontWeight: 400 }}
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <span
                className="text-[#002e1e]/25 uppercase tracking-[0.3em] block mb-5"
                style={{ fontSize: "0.6rem", fontWeight: 600 }}
              >
                Experiencias
              </span>
              <div className="grid grid-cols-2 gap-3">
                {exp.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-4 rounded-lg bg-[#002e1e]/[0.03]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#002e1e]/20" />
                    <span className="text-[#002e1e]/60" style={{ fontSize: "0.85rem", fontWeight: 400 }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Sidebar — Agenda, fecha, lugar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="sticky top-28 rounded-xl border border-[#002e1e]/8 bg-white p-7 shadow-sm"
            >
              <span
                className="text-[#002e1e]/25 uppercase tracking-[0.3em] block mb-6"
                style={{ fontSize: "0.55rem", fontWeight: 600 }}
              >
                Detalles
              </span>

              <div className="space-y-5 mb-8">
                {metaItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-[#002e1e]/25 mt-0.5">{item.icon}</span>
                    <div>
                      <span className="text-[#002e1e]/30 block" style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {item.label}
                      </span>
                      <span className="text-[#002e1e]/70" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="p-4 rounded-lg bg-[#efe3c4]/30 mb-8">
                <span className="text-[#002e1e]/30 block mb-1" style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Dirección
                </span>
                <span className="text-[#002e1e]/60" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                  {exp.address}
                </span>
              </div>

              {/* Subscription CTA */}
              <div className="border-t border-[#002e1e]/5 pt-6">
                {exp.isPast ? (
                  <div className="w-full py-4 rounded-lg bg-[#002e1e]/5 text-center text-[#002e1e]/30" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em" }}>
                    EXPERIENCIA FINALIZADA
                  </div>
                ) : (
                  <>
                    <p
                      className="text-[#002e1e]/45 mb-5"
                      style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.8rem", lineHeight: 1.7 }}
                    >Suscríbete para acceder a esta y todas las experiencias antes que nadie.</p>
                    <motion.button
                      onClick={onSubscribe}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-lg bg-[#002e1e] text-[#efe3c4] cursor-pointer flex items-center justify-center gap-2"
                      style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em" }}
                    >
                      SUSCRIBIRME
                      <ArrowRight size={14} />
                    </motion.button>
                    {exp.spotsLeft > 0 && (
                      <p className="text-center mt-3 text-[#002e1e]/30" style={{ fontSize: "0.7rem" }}>
                        {exp.spotsLeft} de {exp.capacity} cupos disponibles
                      </p>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="px-8 md:px-16 lg:px-24 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={galleryInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#002e1e]/25 uppercase tracking-[0.3em] block mb-6"
            style={{ fontSize: "0.6rem", fontWeight: 600 }}
          >
            Galería
          </motion.span>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
            {exp.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                onClick={() => setActiveImg(i)}
                className={`relative rounded-lg overflow-hidden cursor-pointer group ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${exp.title} - ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#002e1e]/0 group-hover:bg-[#002e1e]/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-[#002e1e] py-16 md:py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <span
            className="text-[#efe3c4]/30 uppercase tracking-[0.4em] block mb-4"
            style={{ fontSize: "0.6rem", fontWeight: 500 }}
          >
            Más experiencias
          </span>
          <h3
            className="text-[#efe3c4] mb-10"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 600 }}
          >
            También te puede interesar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherExperiences.map((e) => (
              <Link key={e.id} to={`/experiencias/${e.id}`} className="block group">
                <div className="rounded-xl overflow-hidden border border-[#efe3c4]/10 hover:border-[#efe3c4]/20 transition-colors duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[#efe3c4]/25 block mb-2" style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {e.category}
                    </span>
                    <h4 className="text-[#efe3c4] mb-1" style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 600, lineHeight: 1.3 }}>
                      {e.title}
                    </h4>
                    <span className="text-[#efe3c4]/30 flex items-center gap-1.5" style={{ fontSize: "0.7rem" }}>
                      <Calendar size={11} /> {e.date}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
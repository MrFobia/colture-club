import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Valentina Restrepo",
    role: "Arquitecta",
    location: "Bogotá",
    quote:
      "Colture Club me devolvio la capacidad de asombrarme. Cada experiencia es un universo cuidadosamente pensado.",
    highlight: "capacidad de asombrarme",
    image:
      "https://images.unsplash.com/photo-1759873911595-34ca1493880f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwb3J0cmFpdCUyMGNvbnRlbXBsYXRpdmV8ZW58MXx8fHwxNzczNzY1NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
  },
  {
    id: 2,
    name: "Santiago Herrera",
    role: "Editor literario",
    location: "Medellín",
    quote:
      "No es una agenda cultural. Es una comunidad de personas que eligen vivir con intencion y curiosidad.",
    highlight: "vivir con intencion",
    image:
      "https://images.unsplash.com/photo-1752860872185-78926b52ef77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMHRob3VnaHRmdWx8ZW58MXx8fHwxNzczNzY1NzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
  },
  {
    id: 3,
    name: "Camila Ospina",
    role: "Curadora de arte",
    location: "Cartagena",
    quote:
      "La atencion al detalle es extraordinaria. Cada velada se siente como una pieza de arte en si misma.",
    highlight: "pieza de arte",
    image:
      "https://images.unsplash.com/photo-1763824371988-8c8eb3d13eff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljcyUyMHBvdHRlcnklMjB3b3Jrc2hvcCUyMGFydGlzYW58ZW58MXx8fHwxNzczNzY1NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
  },
  {
    id: 4,
    name: "Mariana Velasco",
    role: "Directora creativa",
    location: "Cali",
    quote:
      "Encontre en Colture Club un espacio donde la belleza y el pensamiento critico conviven sin pretension.",
    highlight: "belleza y el pensamiento critico",
    image:
      "https://images.unsplash.com/photo-1614275696879-1759006c4e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXQlMjBsYXRpbnxlbnwxfHx8fDE3NzM3ODU2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
  },
  {
    id: 5,
    name: "Andrés Montoya",
    role: "Filosofo & docente",
    location: "Bogotá",
    quote:
      "Cada evento es una invitacion a pensar distinto. Lo que mas valoro es la profundidad sin solemnidad.",
    highlight: "profundidad sin solemnidad",
    image:
      "https://images.unsplash.com/photo-1607952529641-6cc34ce450f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlbGxlY3R1YWwlMjBtYW4lMjBnbGFzc2VzJTIwcG9ydHJhaXQlMjBjb2xvbWJpYW58ZW58MXx8fHwxNzczNzg1NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4,
  },
  {
    id: 6,
    name: "Isabella Duarte",
    role: "Ceramista",
    location: "Villa de Leyva",
    quote:
      "Me reconecte con lo esencial. Las experiencias de Colture Club son pausas necesarias en un mundo acelerado.",
    highlight: "pausas necesarias",
    image:
      "https://images.unsplash.com/photo-1695840358933-16dd7baa6dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwYXJ0aXN0JTIwcG9ydHJhaXQlMjBjb250ZW1wbGF0aXZlfGVufDF8fHx8MTc3Mzc4NTYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
  },
  {
    id: 7,
    name: "Felipe Ríos",
    role: "Sommelier",
    location: "Bogotá",
    quote:
      "La curacion de cada encuentro revela un nivel de sensibilidad que rara vez se ve. Es cultura con alma.",
    highlight: "cultura con alma",
    image:
      "https://images.unsplash.com/photo-1455354269813-737d9df115bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBlbGVnYW50JTIwbWFuJTIwcG9ydHJhaXQlMjB3cml0ZXJ8ZW58MXx8fHwxNzczNzg1NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
  },
];

const VISIBLE = 3;

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxIndex = testimonials.length - VISIBLE;

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(next, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [next]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  const resumeAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 5000);
  };

  const visibleTestimonials = testimonials.slice(current, current + VISIBLE);
  // Handle wrap-around
  if (visibleTestimonials.length < VISIBLE) {
    visibleTestimonials.push(
      ...testimonials.slice(0, VISIBLE - visibleTestimonials.length)
    );
  }

  return (
    <section ref={ref} className="py-24 bg-[#efe3c4]/30">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="text-[#002e1e]/40 uppercase tracking-[0.3em] block mb-4"
            style={{ fontSize: "0.7rem", fontWeight: 500 }}
          >
            Testimonios
          </span>
          <h2
            className="text-[#002e1e]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 400,
            }}
          >
            Voces de nuestra comunidad
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#002e1e] text-[#efe3c4] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#002e1e]/20 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#002e1e] text-[#efe3c4] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#002e1e]/20 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards grid */}
          <div className="grid md:grid-cols-3 gap-6 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((t, i) => {
                const isHovered = hoveredId === t.id;

                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: 60, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -60, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setHoveredId(t.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="cursor-default"
                  >
                    <div
                      className="group relative h-full rounded-2xl overflow-hidden transition-all duration-500"
                      style={{
                        background: isHovered
                          ? "rgba(0, 46, 30, 0.95)"
                          : "rgba(255,255,255,0.65)",
                        backdropFilter: "blur(20px)",
                        border: isHovered
                          ? "1px solid rgba(239,227,196,0.2)"
                          : "1px solid rgba(255,255,255,0.5)",
                        boxShadow: isHovered
                          ? "0 20px 60px rgba(0,46,30,0.25)"
                          : "0 4px 20px rgba(0,0,0,0.04)",
                        transform: isHovered
                          ? "translateY(-8px)"
                          : "translateY(0)",
                      }}
                    >
                      {/* Top accent bar */}
                      <div
                        className="h-1 w-full transition-all duration-500"
                        style={{
                          background: isHovered
                            ? "linear-gradient(90deg, #efe3c4, transparent)"
                            : "linear-gradient(90deg, #002e1e, transparent)",
                          opacity: isHovered ? 0.6 : 0.1,
                        }}
                      />

                      {/* Background decorative SVG */}
                      <svg
                        className="absolute -right-6 -bottom-6 w-32 h-32 transition-all duration-500 pointer-events-none"
                        style={{
                          opacity: isHovered ? 0.06 : 0.02,
                        }}
                        viewBox="0 0 200 200"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke={isHovered ? "#efe3c4" : "#002e1e"}
                          strokeWidth="1"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="50"
                          fill="none"
                          stroke={isHovered ? "#efe3c4" : "#002e1e"}
                          strokeWidth="1"
                        />
                      </svg>

                      <div className="p-7 md:p-8 relative z-10">
                        {/* Quote icon + rating */}
                        <div className="flex items-center justify-between mb-6">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                            style={{
                              background: isHovered
                                ? "rgba(239,227,196,0.1)"
                                : "rgba(0,46,30,0.05)",
                            }}
                          >
                            <Quote
                              size={18}
                              className="transition-colors duration-500"
                              style={{
                                color: isHovered
                                  ? "rgba(239,227,196,0.5)"
                                  : "rgba(0,46,30,0.2)",
                              }}
                            />
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: t.rating }).map((_, s) => (
                              <Star
                                key={s}
                                size={12}
                                className="transition-colors duration-500"
                                style={{
                                  fill: isHovered
                                    ? "rgba(239,227,196,0.4)"
                                    : "rgba(0,46,30,0.15)",
                                  color: "transparent",
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Quote text with highlighted phrase */}
                        <p
                          className="mb-8 transition-colors duration-500"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.15rem",
                            fontStyle: "italic",
                            lineHeight: 1.7,
                            fontWeight: 400,
                            color: isHovered
                              ? "rgba(239,227,196,0.85)"
                              : "rgba(0,46,30,0.75)",
                          }}
                        >
                          &ldquo;
                          {t.quote.split(t.highlight).map((part, idx, arr) => (
                            <span key={idx}>
                              {part}
                              {idx < arr.length - 1 && (
                                <span
                                  className="transition-all duration-500"
                                  style={{
                                    color: isHovered
                                      ? "#efe3c4"
                                      : "#002e1e",
                                    fontWeight: 600,
                                    fontStyle: "normal",
                                  }}
                                >
                                  {t.highlight}
                                </span>
                              )}
                            </span>
                          ))}
                          &rdquo;
                        </p>

                        {/* Divider */}
                        <div
                          className="h-px mb-6 transition-all duration-500"
                          style={{
                            background: isHovered
                              ? "rgba(239,227,196,0.12)"
                              : "rgba(0,46,30,0.08)",
                            width: isHovered ? "100%" : "40%",
                          }}
                        />

                        {/* Author info */}
                        <div className="flex items-center gap-4">
                          <div
                            className="relative rounded-full overflow-hidden transition-all duration-500"
                            style={{
                              width: "3rem",
                              height: "3rem",
                              boxShadow: isHovered
                                ? "0 0 0 2px rgba(239,227,196,0.3)"
                                : "0 0 0 2px rgba(0,46,30,0.08)",
                            }}
                          >
                            <ImageWithFallback
                              src={t.image}
                              alt={t.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className="transition-colors duration-500 truncate"
                              style={{
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                color: isHovered ? "#efe3c4" : "#002e1e",
                              }}
                            >
                              {t.name}
                            </p>
                            <p
                              className="transition-colors duration-500 truncate"
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 400,
                                color: isHovered
                                  ? "rgba(239,227,196,0.45)"
                                  : "rgba(0,46,30,0.45)",
                              }}
                            >
                              {t.role} · {t.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i > maxIndex ? maxIndex : i)}
                className="h-1.5 rounded-full transition-all duration-500 cursor-pointer hover:opacity-80"
                style={{
                  width:
                    i >= current && i < current + VISIBLE ? "1.5rem" : "0.4rem",
                  background:
                    i >= current && i < current + VISIBLE
                      ? "#002e1e"
                      : "rgba(0,46,30,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

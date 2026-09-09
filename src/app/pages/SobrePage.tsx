import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useOutletContext } from "react-router";
import {
  ArrowRight,
  Heart,
  Eye,
  Compass,
  Sparkles,
  Quote,
  Linkedin,
  Instagram,
  Globe,
  Users,
  Leaf,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TestimonialsSection } from "../components/TestimonialsSection";

/* ── Images ── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1769117695165-6ecb44ff1150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwY29udGVtcGxhdGl2ZSUyMGN1bHR1cmFsJTIwc3BhY2V8ZW58MXx8fHwxNzczODQ5OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  // TODO: pre-existing broken figma:asset import replaced with a placeholder — swap for the real founder photo.
  founder: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

/* ── Data ── */
const VALUES = [
  { icon: Eye, title: "Contemplación", desc: "Creemos que detenerse a observar es un acto de resistencia creativa." },
  { icon: Compass, title: "Curaduría", desc: "Cada experiencia es seleccionada con intención, nunca al azar." },
  { icon: Users, title: "Comunidad", desc: "Un club de afinidad intelectual donde las conexiones son genuinas." },
  { icon: Leaf, title: "Territorio", desc: "Celebramos lo local como fuente inagotable de inspiración cultural." },
];

const MILESTONES = [
  { year: "2021", text: "Ana María Durán funda Colture Club como un newsletter cultural en Bogotá." },
  { year: "2022", text: "Primeras experiencias presenciales: cenas curadas y recorridos artísticos." },
  { year: "2023", text: "Lanzamiento del modelo de membresía con más de 500 suscriptores." },
  { year: "2024", text: "Alianzas con galerías, chefs y espacios culturales en toda Colombia." },
  { year: "2025", text: "Expansión a Medellín y Cartagena. Más de 2.000 miembros activos." },
  { year: "2026", text: "Plataforma digital completa y comunidad consolidada en 5 ciudades." },
];

const ALLIES = [
  "Museo de Arte Moderno de Bogotá",
  "Galería Casas Riegner",
  "Fundación Arteria",
  "Chef Leonor Espinosa",
  "Teatro Colón",
  "Festival Estéreo Picnic",
  "Revista Arcadia",
  "Casa Cuervo",
];

/* ─────────── Main Page ─────────── */
export default function SobrePage() {
  const { onSubscribe } = useOutletContext<{ onSubscribe: () => void }>();

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: "var(--font-sans)" }}>
      <HeroSection />
      <HistorySection />
      <FounderSection />
      <TeamSection />
      <TestimonialsSection />
      <CTASection onSubscribe={onSubscribe} />
    </div>
  );
}

/* ───── HERO ───── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[75vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback src={IMG.hero} alt="Sobre Colture Club" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e] via-[#002e1e]/60 to-[#002e1e]/20" />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-20 md:pb-28 pt-40">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#efe3c4]/20 text-[#efe3c4]/60 mb-6 backdrop-blur-sm bg-white/5"
          style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" }}
        >
          <Heart size={12} />
          Sobre nosotros
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#efe3c4] max-w-3xl mb-6"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.08 }}
        >
          Cultura como{" "}
          <span style={{ fontStyle: "italic" }}>forma de vida.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-[#efe3c4]/50 max-w-xl"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", lineHeight: 1.7 }}
        >
          Somos un club de afinidad intelectual que cura experiencias culturales para quienes entienden que vivir bien es vivir con propósito.
        </motion.p>
      </div>
    </section>
  );
}

/* ───── 1. HISTORIA Y PROPÓSITO ───── */
function HistorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mb-20"
      >
        <span
          className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          Historia y propósito
        </span>
        <h2
          className="text-[#002e1e] mb-6"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 700, lineHeight: 1.15 }}
        >
          Nació de una pregunta sencilla: <span style={{ fontStyle: "italic" }}>¿y si la cultura fuera accesible para todos?</span>
        </h2>
        <p className="text-[#002e1e]/50" style={{ fontSize: "0.95rem", lineHeight: 1.85 }}>
          Colture Club nació en 2021 en Bogotá como un newsletter cultural. Lo que empezó como una carta semanal con recomendaciones curadas se transformó en una comunidad vibrante de personas que comparten una misma convicción: la cultura no es un lujo, es una necesidad.
        </p>
      </motion.div>

      {/* Values grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 rounded-2xl border border-[#002e1e]/6 bg-white/50 backdrop-blur-sm hover:shadow-lg hover:bg-white transition-all duration-500 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#002e1e]/[0.05] flex items-center justify-center mb-5 group-hover:bg-[#efe3c4]/60 transition-colors duration-500">
              <v.icon size={18} className="text-[#002e1e]/40 group-hover:text-[#002e1e] transition-colors duration-500" />
            </div>
            <h3
              className="text-[#002e1e] mb-2"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", fontWeight: 700 }}
            >
              {v.title}
            </h3>
            <p className="text-[#002e1e]/40" style={{ fontSize: "0.82rem", lineHeight: 1.65 }}>
              {v.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-8"
      >
        <h3
          className="text-[#002e1e] mb-10"
          style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 700 }}
        >
          Nuestro camino
        </h3>
      </motion.div>

      <div className="relative">
        {/* Line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[#002e1e]/8 hidden md:block" />

        <div className="space-y-0">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35 + 0.1 * i, duration: 0.6 }}
              className="flex gap-6 py-5 group"
            >
              {/* Dot */}
              <div className="relative shrink-0 hidden md:flex items-start pt-1">
                <div className="w-[10px] h-[10px] rounded-full bg-[#002e1e]/10 group-hover:bg-[#efe3c4] group-hover:ring-4 group-hover:ring-[#efe3c4]/30 transition-all duration-500 z-10" />
              </div>

              <div>
                <span
                  className="text-[#002e1e]/25 block mb-1"
                  style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em" }}
                >
                  {m.year}
                </span>
                <p className="text-[#002e1e]/60 group-hover:text-[#002e1e] transition-colors duration-400" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {m.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── 2. ANA MARÍA DURÁN (FUNDADORA) ───── */
function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#002e1e]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <span
          className="text-[#efe3c4]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          Fundadora
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden aspect-[3/4] max-h-[580px]"
        >
          <ImageWithFallback
            src={IMG.founder}
            alt="Ana María Durán"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/40 via-transparent to-transparent" />
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <h2
            className="text-[#efe3c4] mb-3"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Ana María Durán
          </h2>
          <span
            className="text-[#efe3c4]/30 block mb-8"
            style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Fundadora & Directora General
          </span>

          {/* Quote */}
          <div className="pl-5 border-l-2 border-[#efe3c4]/20 mb-8">
            <Quote size={16} className="text-[#efe3c4]/15 mb-2" />
            <p
              className="text-[#efe3c4]/70"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.7 }}
            >
              "La cultura no debería tener puertas cerradas. Colture Club existe para abrir esas puertas y crear comunidad alrededor de lo que nos hace más humanos."
            </p>
          </div>

          <div className="space-y-5 mb-10">
            <p className="text-[#efe3c4]/45" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>
              Ana María es gestora cultural, comunicadora social y emprendedora bogotana. Con más de 12 años de experiencia en el ecosistema cultural colombiano, ha trabajado con museos, galerías, festivales y artistas independientes.
            </p>
            <p className="text-[#efe3c4]/45" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>
              Antes de fundar Colture Club, lideró la curaduría de experiencias en el Museo de Arte Moderno de Bogotá y fue directora de comunicaciones del Festival Internacional de Cine de Cartagena.
            </p>
            <p className="text-[#efe3c4]/45" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>
              Su visión es democratizar el acceso a experiencias culturales significativas, creando puentes entre artistas, creadores y una audiencia curiosa que entiende la cultura como nutrición del espíritu.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Globe, label: "Web" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-[#efe3c4]/10 flex items-center justify-center text-[#efe3c4]/30 hover:text-[#efe3c4] hover:border-[#efe3c4]/30 transition-colors duration-300 cursor-pointer"
              >
                <s.icon size={15} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───── 3. EQUIPO / ALIADOS ESTRATÉGICOS ───── */
function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <span
          className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          Aliados estratégicos
        </span>
        <h2
          className="text-[#002e1e] mb-3"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 700, lineHeight: 1.15 }}
        >
          Nos acompañan
        </h2>
        <p
          className="max-w-lg text-[#002e1e]/40"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.7 }}
        >
          Instituciones, artistas y espacios que comparten nuestra visión cultural.
        </p>
      </motion.div>

      {/* Team grid */}
      {/* Removed — team module eliminated */}

      {/* Allies */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {ALLIES.map((ally, i) => (
          <motion.div
            key={ally}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 + 0.06 * i, duration: 0.6 }}
            className="p-5 rounded-xl border border-[#002e1e]/6 bg-white/40 hover:bg-white hover:shadow-md transition-all duration-500 flex items-center justify-center text-center min-h-[90px] group cursor-pointer"
          >
            <span
              className="text-[#002e1e]/40 group-hover:text-[#002e1e] transition-colors duration-400"
              style={{ fontFamily: "var(--font-serif)", fontSize: "0.82rem", fontWeight: 600, lineHeight: 1.4 }}
            >
              {ally}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───── CTA FINAL ───── */
function CTASection({ onSubscribe }: { onSubscribe: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#002e1e]">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="w-14 h-14 rounded-full bg-[#efe3c4]/10 flex items-center justify-center mx-auto mb-8">
          <Sparkles size={22} className="text-[#efe3c4]" />
        </div>

        <h2
          className="text-[#efe3c4] mb-4"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, lineHeight: 1.15 }}
        >
          ¿Listo para vivir la cultura de otra manera?
        </h2>
        <p className="text-[#efe3c4]/40 mb-10" style={{ fontSize: "0.92rem", lineHeight: 1.7 }}>
          Únete a Colture Club y accede a experiencias curadas que transforman la forma en que vives tu ciudad.
        </p>

        <motion.button
          onClick={onSubscribe}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 bg-[#efe3c4] text-[#002e1e] rounded-lg cursor-pointer flex items-center gap-2 mx-auto"
          style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          Suscribirme
          <ArrowRight size={14} />
        </motion.button>
      </motion.div>
    </section>
  );
}
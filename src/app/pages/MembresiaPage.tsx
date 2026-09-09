import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useOutletContext } from "react-router";
import {
  ArrowRight,
  Star,
  Crown,
  Gem,
  Check,
  Sparkles,
  Users,
  CalendarHeart,
  Telescope,
  Mail,
  User,
  MessageSquare,
  Send,
  Heart,
  Gift,
  BookOpen,
  Globe,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const heroImg =
  "https://images.unsplash.com/photo-1588833662667-a6fb06a6f238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY3VsdHVyYWwlMjBnYXRoZXJpbmclMjBpbnRpbWF0ZSUyMGRpbm5lcnxlbnwxfHx8fDE3NzM4NDc5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const galleryImg =
  "https://images.unsplash.com/photo-1719398026703-0d3f3d162e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMHBlb3BsZXxlbnwxfHx8fDE3NzM4NDQyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const PLANS = [
  {
    id: "basico",
    name: "Básico",
    price: "$200.000 COP / año",
    bg: "#f9f9f9",
    text: "#002e1e",
    accent: "#002e1e",
    border: "#002e1e/10",
    icon: <Star size={22} />,
    features: [
      "Newsletter mensual curada",
      "Noticias culturales Bogotá",
      "Prioridad en cupos",
      "Acceso a precios de miembro",
      "Archivo de experiencias",
    ],
    idealFor: "Personas curiosas que quieren explorar la cultura con guía y contexto.",
  },
  {
    id: "intermedio",
    name: "Intermedio",
    price: "$500.000 COP / año",
    bg: "#efe3c4",
    text: "#002e1e",
    accent: "#002e1e",
    border: "#c9b88a",
    icon: <Crown size={22} />,
    tag: "Más popular",
    features: [
      "Todo lo de Básico +",
      "Acceso anticipado a experiencias",
      "Invitación a sesiones privadas",
      "Descuento en experiencias",
      "Contenido editorial exclusivo",
    ],
    idealFor: "Para quienes ya viven la cultura activamente y buscan profundidad.",
  },
  {
    id: "full",
    name: "Full",
    price: "$1.000.000 COP / año",
    bg: "#002e1e",
    text: "#efe3c4",
    accent: "#efe3c4",
    border: "#002e1e",
    icon: <Gem size={22} />,
    features: [
      "Todo lo de Intermedio +",
      "Experiencias a medida",
      "Acceso directo a curadora",
      "Curaduría personalizada",
      "Viajes culturales prioritarios",
    ],
    idealFor: "Coleccionistas y personas que buscan la experiencia más exclusiva.",
  },
];

const BENEFITS = [
  {
    icon: <CalendarHeart size={28} />,
    title: "Acceso anticipado",
    desc: "Entérate primero de cada experiencia curada y reserva tu cupo antes que nadie.",
  },
  {
    icon: <Users size={28} />,
    title: "Comunidad selecta",
    desc: "Conecta con personas que comparten tu afinidad por la cultura, el arte y la gastronomía.",
  },
  {
    icon: <Telescope size={28} />,
    title: "Curaduría experta",
    desc: "Cada experiencia es seleccionada a mano por nuestra curadora cultural residente.",
  },
  {
    icon: <Gift size={28} />,
    title: "Beneficios exclusivos",
    desc: "Descuentos, invitaciones privadas y contenido editorial solo para miembros.",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Archivo cultural",
    desc: "Accede al registro completo de experiencias pasadas con fotos, reseñas y memorias.",
  },
  {
    icon: <Globe size={28} />,
    title: "Viajes culturales",
    desc: "Prioridad en viajes curados a destinos culturales dentro y fuera de Colombia.",
  },
];

export default function MembresiaPage() {
  const { onSubscribe } = useOutletContext<{ onSubscribe: () => void }>();

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: "var(--font-sans)" }}>
      {/* 1 — Hero: Sobre la membresía */}
      <HeroSection onSubscribe={onSubscribe} />

      {/* 2 — Tipos de planes */}
      <PlansSection onSubscribe={onSubscribe} />

      {/* 3 — Beneficios de la membresía */}
      <BenefitsSection />

      {/* 4 — Formulario de contacto */}
      <ContactSection />
    </div>
  );
}

/* ───── 1. HERO — Sobre la membresía ───── */
function HeroSection({ onSubscribe }: { onSubscribe: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback src={heroImg} alt="Membresía Colture Club" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e] via-[#002e1e]/70 to-[#002e1e]/20" />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-20 md:pb-28 pt-40">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#efe3c4]/20 text-[#efe3c4]/60 mb-6 backdrop-blur-sm bg-white/5"
          style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" }}
        >
          <Sparkles size={12} />
          Membresía
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#efe3c4] max-w-3xl mb-6"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.08 }}
        >
          La cultura es mejor{" "}
          <span style={{ fontStyle: "italic" }}>en compañía.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-[#efe3c4]/50 max-w-xl mb-10"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", lineHeight: 1.7 }}
        >
          Colture Club es un espacio de afinidad intelectual donde cada experiencia se vive con intención.
          Tu membresía te conecta con lo que más importa: personas, arte y momentos irrepetibles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <motion.button
            onClick={onSubscribe}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#efe3c4] text-[#002e1e] rounded-xl cursor-pointer"
            style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            Suscribirme
            <ArrowRight size={14} />
          </motion.button>
          <motion.a
            href="#planes"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#efe3c4]/25 text-[#efe3c4] cursor-pointer backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
            style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            Ver planes
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ───── 2. TIPOS DE PLANES ───── */
function PlansSection({ onSubscribe }: { onSubscribe: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="planes" ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span
          className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          Tipos de planes
        </span>
        <h2
          className="text-[#002e1e] mb-4"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700 }}
        >
          Elige cómo vivir la cultura
        </h2>
        <p
          className="text-[#002e1e]/40 max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.7 }}
        >
          Tres niveles diseñados para distintas formas de conectar con experiencias culturales curadas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl group"
            style={{
              backgroundColor: plan.bg,
              borderColor: plan.bg === "#002e1e" ? "rgba(239,227,196,0.15)" : `${plan.border}`,
            }}
          >
            {plan.tag && (
              <div
                className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl"
                style={{
                  backgroundColor: plan.accent,
                  color: plan.bg,
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {plan.tag}
              </div>
            )}

            <div className="p-8 md:p-10">
              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-6" style={{ color: plan.accent }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: plan.bg === "#002e1e" ? "rgba(239,227,196,0.1)" : "rgba(0,46,30,0.06)",
                  }}
                >
                  {plan.icon}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 700, color: plan.text }}
                >
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <p
                className="mb-2"
                style={{ fontSize: "1.4rem", fontWeight: 700, color: plan.text, fontFamily: "var(--font-serif)" }}
              >
                {plan.price.split(" / ")[0]}
              </p>
              <p
                className="mb-8"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: plan.bg === "#002e1e" ? "rgba(239,227,196,0.4)" : "rgba(0,46,30,0.35)",
                  letterSpacing: "0.05em",
                }}
              >
                por año
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: plan.bg === "#002e1e" ? "#efe3c4" : "#002e1e" }}
                    />
                    <span
                      style={{
                        fontSize: "0.82rem",
                        color: plan.bg === "#002e1e" ? "rgba(239,227,196,0.7)" : "rgba(0,46,30,0.6)",
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Ideal for */}
              <p
                className="mb-8"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "0.78rem",
                  lineHeight: 1.6,
                  color: plan.bg === "#002e1e" ? "rgba(239,227,196,0.35)" : "rgba(0,46,30,0.35)",
                }}
              >
                {plan.idealFor}
              </p>

              {/* CTA */}
              <motion.button
                onClick={onSubscribe}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  backgroundColor: plan.bg === "#002e1e" ? "#efe3c4" : "#002e1e",
                  color: plan.bg === "#002e1e" ? "#002e1e" : "#efe3c4",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Elegir {plan.name}
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───── 3. BENEFICIOS ───── */
function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#002e1e]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span
          className="text-[#efe3c4]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          Beneficios
        </span>
        <h2
          className="text-[#efe3c4] mb-4"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700 }}
        >
          ¿Por qué ser miembro?
        </h2>
        <p
          className="text-[#efe3c4]/40 max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.7 }}
        >
          Más que una suscripción, es una invitación a vivir la cultura de otra manera.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 rounded-xl border border-[#efe3c4]/8 bg-[#efe3c4]/[0.04] hover:bg-[#efe3c4]/[0.07] transition-all duration-500 group"
          >
            <div className="text-[#efe3c4]/30 mb-5 group-hover:text-[#efe3c4]/50 transition-colors duration-300">
              {b.icon}
            </div>
            <h4
              className="text-[#efe3c4] mb-3"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", fontWeight: 700 }}
            >
              {b.title}
            </h4>
            <p
              className="text-[#efe3c4]/40"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              {b.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Decorative image strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-20 max-w-5xl mx-auto rounded-xl overflow-hidden"
        style={{ height: "220px" }}
      >
        <ImageWithFallback
          src={galleryImg}
          alt="Experiencia cultural"
          className="w-full h-full object-cover opacity-40"
        />
      </motion.div>
    </section>
  );
}

/* ───── 4. FORMULARIO DE CONTACTO ───── */
function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* Left copy */}
          <div>
            <span
              className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
              style={{ fontSize: "0.6rem", fontWeight: 500 }}
            >
              Contacto
            </span>
            <h2
              className="text-[#002e1e] mb-4"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700 }}
            >
              ¿Tienes preguntas?
            </h2>
            <p
              className="text-[#002e1e]/45 mb-8"
              style={{ fontSize: "0.92rem", lineHeight: 1.8 }}
            >
              Si quieres saber más sobre la membresía, los planes o las experiencias que curamos,
              escríbenos. Nos encanta conversar con personas curiosas.
            </p>

            <div className="flex items-center gap-3 text-[#002e1e]/30">
              <Mail size={16} />
              <span style={{ fontSize: "0.85rem" }}>hola@coltureclub.co</span>
            </div>
          </div>

          {/* Right form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-xl bg-[#002e1e] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#efe3c4]/10 flex items-center justify-center mx-auto mb-5">
                  <Heart size={20} className="text-[#efe3c4]" />
                </div>
                <h4
                  className="text-[#efe3c4] mb-2"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700 }}
                >
                  Mensaje enviado
                </h4>
                <p className="text-[#efe3c4]/40" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                  Te responderemos pronto. Mientras tanto, explora nuestras experiencias.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    className="block mb-2 text-[#002e1e]/40"
                    style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Nombre
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#002e1e]/20" />
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-[#002e1e]/[0.03] border border-[#002e1e]/8 text-[#002e1e] placeholder:text-[#002e1e]/20 focus:outline-none focus:border-[#002e1e]/20 transition-colors"
                      style={{ fontSize: "0.88rem" }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block mb-2 text-[#002e1e]/40"
                    style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#002e1e]/20" />
                    <input
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-[#002e1e]/[0.03] border border-[#002e1e]/8 text-[#002e1e] placeholder:text-[#002e1e]/20 focus:outline-none focus:border-[#002e1e]/20 transition-colors"
                      style={{ fontSize: "0.88rem" }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block mb-2 text-[#002e1e]/40"
                    style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Mensaje
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-4 top-4 text-[#002e1e]/20" />
                    <textarea
                      required
                      rows={4}
                      placeholder="Cuéntanos qué te gustaría saber..."
                      className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-[#002e1e]/[0.03] border border-[#002e1e]/8 text-[#002e1e] placeholder:text-[#002e1e]/20 focus:outline-none focus:border-[#002e1e]/20 transition-colors resize-none"
                      style={{ fontSize: "0.88rem" }}
                    />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-lg bg-[#002e1e] text-[#efe3c4] cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  Enviar mensaje
                  <Send size={14} />
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
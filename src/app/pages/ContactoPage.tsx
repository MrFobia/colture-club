import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useOutletContext } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Linkedin,
  Globe,
  ArrowRight,
  MessageCircle,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const HERO_IMG =
  "https://images.unsplash.com/photo-1699046794994-865a62e9ff6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwdXMlMjBjdWx0dXJhbCUyMGVsZWdhbnQlMjBkYXJrJTIwZ3JlZW58ZW58MXx8fHwxNzczODUxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const INTERESTS = [
  "Experiencias gastronómicas",
  "Arte y galerías",
  "Música y conciertos",
  "Recorridos culturales",
  "Talleres creativos",
  "Cine y audiovisual",
  "Literatura y conversatorios",
  "Bienestar y naturaleza",
];

const SOCIALS = [
  { icon: Instagram, label: "@coltureclub", href: "#" },
  { icon: Linkedin, label: "Colture Club", href: "#" },
  { icon: Globe, label: "coltureclub.com", href: "#" },
];

/* ─────────── Main Page ─────────── */
export default function ContactoPage() {
  const { onSubscribe } = useOutletContext<{ onSubscribe: () => void }>();

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: "var(--font-sans)" }}>
      <HeroSection />
      <ContactFormSection />
      <InterestSection />
      <ContactInfoSection />
    </div>
  );
}

/* ───── 1. BANNER PRINCIPAL ───── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback src={HERO_IMG} alt="Contáctanos" className="w-full h-full object-cover" />
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
          <MessageCircle size={12} />
          Contáctanos
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#efe3c4] max-w-3xl mb-6"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.08 }}
        >
          Hablemos de{" "}
          <span style={{ fontStyle: "italic" }}>cultura.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-[#efe3c4]/50 max-w-xl"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", lineHeight: 1.7 }}
        >
          Queremos escucharte. Si tienes una pregunta, propuesta o simplemente quieres conectar, este es el lugar.
        </motion.p>
      </div>
    </section>
  );
}

/* ───── 2. FORMULARIO DE CONTACTO ───── */
function ContactFormSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputBase =
    "w-full px-5 py-4 rounded-xl border border-[#002e1e]/8 bg-white/60 backdrop-blur-sm text-[#002e1e] placeholder-[#002e1e]/25 focus:outline-none focus:border-[#002e1e]/20 focus:bg-white transition-all duration-400";
  const inputStyle = { fontSize: "0.88rem", lineHeight: 1.6 };

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left – intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
            style={{ fontSize: "0.6rem", fontWeight: 500 }}
          >
            Formulario de contacto
          </span>
          <h2
            className="text-[#002e1e] mb-6"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 700, lineHeight: 1.15 }}
          >
            Escríbenos y te{" "}
            <span style={{ fontStyle: "italic" }}>responderemos pronto.</span>
          </h2>
          <p className="text-[#002e1e]/45 mb-8" style={{ fontSize: "0.92rem", lineHeight: 1.85 }}>
            Ya sea que quieras proponernos una alianza, sugerir una experiencia, colaborar como artista o simplemente saludarnos — estamos aquí para ti.
          </p>

          <div className="space-y-5">
            {[
              { icon: Mail, text: "hola@coltureclub.com" },
              { icon: Phone, text: "+57 310 456 7890" },
              { icon: MapPin, text: "Bogotá, Colombia" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#002e1e]/[0.05] flex items-center justify-center group-hover:bg-[#efe3c4]/60 transition-colors duration-500">
                  <item.icon size={16} className="text-[#002e1e]/35 group-hover:text-[#002e1e] transition-colors duration-500" />
                </div>
                <span className="text-[#002e1e]/55 group-hover:text-[#002e1e] transition-colors duration-400" style={{ fontSize: "0.88rem" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right – form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Tu nombre"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputBase}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Tu correo electrónico"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputBase}
              style={inputStyle}
            />
          </div>

          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
            className={inputBase}
            style={{ ...inputStyle, color: form.subject ? undefined : "rgba(0,46,30,0.25)" }}
          >
            <option value="" disabled>Selecciona un asunto</option>
            <option value="alianza">Propuesta de alianza</option>
            <option value="experiencia">Sugerencia de experiencia</option>
            <option value="prensa">Prensa y medios</option>
            <option value="soporte">Soporte de membresía</option>
            <option value="otro">Otro</option>
          </select>

          <textarea
            placeholder="Tu mensaje..."
            rows={5}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputBase} resize-none`}
            style={inputStyle}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-10 py-4 bg-[#002e1e] text-[#efe3c4] rounded-xl cursor-pointer flex items-center justify-center gap-2"
            style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            {submitted ? (
              <>
                <CheckCircle size={14} />
                Mensaje enviado
              </>
            ) : (
              <>
                <Send size={14} />
                Enviar mensaje
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

/* ───── 3. EXPERIENCIAS QUE TE PUEDEN INTERESAR ───── */

const EXPERIENCE_CATEGORIES = ["Todas", "Gastronomía", "Arte", "Música", "Recorridos", "Talleres", "Bienestar"] as const;

const SUGGESTED_EXPERIENCES = [
  {
    title: "Cena de autor en La Candelaria",
    category: "Gastronomía",
    date: "24 Abr 2026",
    image: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZGlubmVyJTIwZWxlZ2FudCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzczODUxOTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    desc: "Un recorrido de 7 tiempos por los sabores de Bogotá con el chef invitado Daniel Castaño.",
  },
  {
    title: "Exposición: Fragmentos Urbanos",
    category: "Arte",
    date: "10 May 2026",
    image: "https://images.unsplash.com/photo-1723721229325-b286656e768a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NzM4MDAyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    desc: "Arte contemporáneo colombiano que dialoga con la arquitectura de la ciudad.",
  },
  {
    title: "Jazz Nocturno en Chapinero",
    category: "Música",
    date: "17 May 2026",
    image: "https://images.unsplash.com/photo-1768935434604-2301398d92d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWMlMjBwZXJmb3JtYW5jZSUyMHN0YWdlfGVufDF8fHx8MTc3Mzg1MTk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    desc: "Una velada íntima con el cuarteto de Lucía Estrada en un espacio secreto.",
  },
  {
    title: "Bogotá Oculta: Recorrido Patrimonial",
    category: "Recorridos",
    date: "3 Jun 2026",
    image: "https://images.unsplash.com/photo-1760985174858-3fcf4d81b739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMHdhbGtpbmclMjB0b3VyJTIwaGlzdG9yaWMlMjBjaXR5fGVufDF8fHx8MTc3Mzg1MTk5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    desc: "Descubre rincones históricos que no están en ninguna guía turística.",
  },
  {
    title: "Taller de Cerámica Contemplativa",
    category: "Talleres",
    date: "12 Jun 2026",
    image: "https://images.unsplash.com/photo-1766499670904-edab815e8fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvdHRlcnklMjB3b3Jrc2hvcCUyMGhhbmRzfGVufDF8fHx8MTc3Mzg1MTk5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    desc: "Moldea, respira y conecta en este taller guiado por la ceramista Paula Ríos.",
  },
  {
    title: "Amanecer en los Cerros: Meditación Guiada",
    category: "Bienestar",
    date: "21 Jun 2026",
    image: "https://images.unsplash.com/photo-1758274526671-ad18176acb01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwbmF0dXJlJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc3Mzg1MTk5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    desc: "Comienza el día con una sesión de mindfulness en plena naturaleza bogotana.",
  },
];

function InterestSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<string>("Todas");

  const filtered =
    activeCategory === "Todas"
      ? SUGGESTED_EXPERIENCES
      : SUGGESTED_EXPERIENCES.filter((e) => e.category === activeCategory);

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#002e1e]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center mb-14"
      >
        <span
          className="text-[#efe3c4]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >Experiencias con Colture club</span>
        <h2
          className="text-[#efe3c4] mb-4"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 700, lineHeight: 1.15 }}
        >
          Esto podría{" "}
          <span style={{ fontStyle: "italic" }}>interesarte.</span>
        </h2>
        <p
          className="text-[#efe3c4]/40 max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.7 }}
        >
          Explora las experiencias que estamos preparando para nuestra comunidad.
        </p>
      </motion.div>



      {/* Experience cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((exp, i) => (
            <motion.div
              key={exp.title}
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl overflow-hidden border border-[#efe3c4]/8 bg-white/[0.03] backdrop-blur-sm hover:border-[#efe3c4]/20 transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/60 to-transparent" />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#efe3c4]/15 backdrop-blur-md text-[#efe3c4]/80 border border-[#efe3c4]/10"
                  style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {exp.category}
                </span>
              </div>
              <div className="p-6">
                <span className="text-[#efe3c4]/25 block mb-2" style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {exp.date}
                </span>
                <h3
                  className="text-[#efe3c4] mb-2 group-hover:text-[#efe3c4]/90 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3 }}
                >
                  {exp.title}
                </h3>
                <p className="text-[#efe3c4]/30" style={{ fontSize: "0.82rem", lineHeight: 1.65 }}>
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ───── 4. DATOS DE CONTACTO Y REDES ───── */
function ContactInfoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="lg:col-span-1"
        >
          <span
            className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
            style={{ fontSize: "0.6rem", fontWeight: 500 }}
          >
            Encuéntranos
          </span>
          <h2
            className="text-[#002e1e] mb-6"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, lineHeight: 1.15 }}
          >
            Datos de contacto{" "}
            <span style={{ fontStyle: "italic" }}>y redes</span>
          </h2>
          <p className="text-[#002e1e]/40 mb-10" style={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
            Nos encanta conectar. Síguenos en redes para estar al día con todo lo que pasa en la comunidad Colture Club.
          </p>

          {/* Social links */}
          <div className="space-y-4">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + 0.08 * i, duration: 0.6 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full border border-[#002e1e]/8 flex items-center justify-center group-hover:bg-[#002e1e] group-hover:border-[#002e1e] transition-all duration-500">
                  <s.icon size={16} className="text-[#002e1e]/40 group-hover:text-[#efe3c4] transition-colors duration-500" />
                </div>
                <span className="text-[#002e1e]/50 group-hover:text-[#002e1e] transition-colors duration-400" style={{ fontSize: "0.88rem", fontWeight: 500 }}>
                  {s.label}
                </span>
                <ArrowRight size={14} className="text-[#002e1e]/0 group-hover:text-[#002e1e]/40 transition-all duration-400 ml-auto" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              icon: Mail,
              title: "Email",
              detail: "hola@coltureclub.com",
              desc: "Para consultas generales y propuestas.",
            },
            {
              icon: Phone,
              title: "Teléfono",
              detail: "+57 310 456 7890",
              desc: "Lunes a viernes, 9am – 6pm COT.",
            },
            {
              icon: MapPin,
              title: "Ubicación",
              detail: "Bogotá, Colombia",
              desc: "Zona G — Cra 5 #70-22, oficina 301.",
            },
            {
              icon: MessageCircle,
              title: "WhatsApp",
              detail: "+57 310 456 7890",
              desc: "Para atención rápida y experiencias.",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="p-7 rounded-2xl border border-[#002e1e]/6 bg-white/50 backdrop-blur-sm hover:shadow-lg hover:bg-white transition-all duration-500 group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-[#002e1e]/[0.05] flex items-center justify-center mb-5 group-hover:bg-[#efe3c4]/60 transition-colors duration-500">
                <card.icon size={18} className="text-[#002e1e]/40 group-hover:text-[#002e1e] transition-colors duration-500" />
              </div>
              <h3
                className="text-[#002e1e] mb-1"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", fontWeight: 700 }}
              >
                {card.title}
              </h3>
              <span className="text-[#002e1e]/70 block mb-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                {card.detail}
              </span>
              <p className="text-[#002e1e]/35" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useOutletContext, Link } from "react-router";
import {
  ArrowRight,
  Play,
  Mic,
  PenLine,
  Mail,
  Newspaper,
  Sparkles,
  Clock,
  Eye,
  ChevronRight,
  Quote,
  ExternalLink,
  BookOpen,
  Video,
  X,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ── Images ── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1525813428023-215a7186c776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGVkaXRvcmlhbCUyMGRlc2lnbiUyMGxheW91dHxlbnwxfHx8fDE3NzM4NDgzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  interview1: "https://images.unsplash.com/photo-1764032760214-bbf340016105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBpbnRlcnZpZXclMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NzM4NDgzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  interview2: "https://images.unsplash.com/photo-1769117619995-78fc971f041b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJhdG9yJTIwYXJ0JTIwY29udGVtcG9yYXJ5JTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzM4NDgzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  interview3: "https://images.unsplash.com/photo-1758876019290-be620a8971f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBjcmVhdGl2ZSUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzg0ODMzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  video: "https://images.unsplash.com/photo-1762028892567-6ebfbb894992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzM4MzY5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  blog: "https://images.unsplash.com/photo-1722951604342-6f35934263cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGJsb2clMjB3cml0aW5nJTIwZGVzayUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzM4NDgzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  newsletter: "https://images.unsplash.com/photo-1683117927786-f146451082fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzbGV0dGVyJTIwZW1haWwlMjBkZXNpZ24lMjBtaW5pbWFsfGVufDF8fHx8MTc3Mzg0ODM0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  press: "https://images.unsplash.com/photo-1722684768315-11fc753354f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBwcmVzcyUyMG1lZGlhJTIwY292ZXJhZ2V8ZW58MXx8fHwxNzczNzU4NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

/* ── Mock data ── */
const INTERVIEWS = [
  {
    id: "1",
    name: "Alejandra Borrero",
    role: "Artista",
    excerpt: "\"El arte contemporáneo colombiano no necesita validación externa — necesita conversación interna.\"",
    img: IMG.interview1,
    readTime: "8 min",
    date: "12 Feb 2026",
    fullText: [
      "Alejandra Borrero nos recibe en su estudio del centro de Bogotá, rodeada de lienzos a medio terminar y el aroma inconfundible de la trementina. Su mirada, intensa y serena a la vez, anticipa una conversación que promete ir más allá de lo superficial.",
      "\"El arte contemporáneo colombiano no necesita validación externa — necesita conversación interna\", dice mientras sirve café en tazas de cerámica hechas a mano. \"Durante décadas miramos hacia afuera buscando aprobación. Hoy, lo más interesante está pasando aquí, en nuestros barrios, en nuestras montañas, en nuestras cocinas.\"",
      "Su obra reciente explora la relación entre memoria colectiva y paisaje urbano. Instalaciones que transforman espacios abandonados en galerías efímeras, intervenciones que obligan al transeúnte a detenerse y mirar.",
      "\"La contemplación es un acto político\", afirma. \"En un mundo que nos pide velocidad, detenerse a observar una obra durante diez minutos es casi revolucionario. Eso es lo que busco: crear pausas necesarias.\"",
      "Cuando le preguntamos sobre el papel de plataformas como Colture Club, sonríe: \"Son puentes. Conectan a personas que tienen hambre de cultura con experiencias que alimentan esa hambre. No es consumo — es nutrición del espíritu.\""
    ],
  },
  {
    id: "2",
    name: "Carlos Jacanamijoy",
    role: "Curador",
    excerpt: "\"La curaduría es un acto de escucha profunda: entender qué necesita una sala para hablar.\"",
    img: IMG.interview2,
    readTime: "6 min",
    date: "28 Ene 2026",
    fullText: [
      "Carlos Jacanamijoy ha curado más de cuarenta exposiciones en los últimos diez años. Desde retrospectivas en el MAMBO hasta intervenciones en espacios no convencionales como mercados y estaciones de tren.",
      "\"La curaduría es un acto de escucha profunda\", explica desde su oficina en Chapinero, con vista a los cerros orientales. \"No se trata de imponer una narrativa, sino de entender qué necesita una sala para hablar. Cada espacio tiene su propia voz.\"",
      "Su enfoque desafía la curaduría tradicional. En lugar de organizar obras por período o estilo, Jacanamijoy prefiere crear \"constelaciones emocionales\" — agrupaciones que generan diálogos inesperados entre piezas de diferentes épocas y disciplinas.",
      "\"Bogotá tiene una escena artística increíblemente diversa. Mi trabajo es hacer visible esa diversidad, crear encuentros que de otra forma no sucederían. Un ceramista de Ráquira junto a un artista digital de Medellín — esas tensiones son las que generan algo nuevo.\"",
      "Sobre el futuro de la curaduría en Colombia, es optimista: \"Estamos viviendo un momento único. La tecnología nos permite llegar a más personas, pero lo esencial sigue siendo lo mismo: crear experiencias que transformen.\""
    ],
  },
  {
    id: "3",
    name: "Mónica Ramírez",
    role: "Empresaria cultural",
    excerpt: "\"Bogotá tiene una energía creativa que todavía el mundo no termina de descubrir.\"",
    img: IMG.interview3,
    readTime: "10 min",
    date: "15 Ene 2026",
    fullText: [
      "Mónica Ramírez fundó su primera galería a los 26 años con los ahorros de toda su vida. Hoy, quince años después, gestiona un ecosistema cultural que incluye tres espacios expositivos, una editorial independiente y un programa de residencias artísticas.",
      "\"Bogotá tiene una energía creativa que todavía el mundo no termina de descubrir\", dice con convicción. \"Somos una ciudad de siete millones de personas con una oferta cultural que rivaliza con ciudades mucho más establecidas en el circuito internacional.\"",
      "Su visión del emprendimiento cultural es pragmática sin perder la pasión: \"No puedes separar el arte del negocio. Si quieres que los artistas vivan de su trabajo, necesitas crear estructuras sostenibles. Eso no es venderse — es sobrevivir para seguir creando.\"",
      "Ramírez ha sido pionera en modelos de suscripción cultural en Colombia, algo que ve como natural: \"La gente paga por Netflix, por Spotify. ¿Por qué no pagarían por acceso a experiencias culturales curadas, pensadas específicamente para ellos?\"",
      "\"Lo que hacemos en Colture Club es exactamente eso: democratizar el acceso a experiencias que antes eran exclusivas de un círculo muy pequeño. La cultura no debería tener puertas cerradas.\""
    ],
  },
];

const VIDEOS = [
  { id: "v1", title: "Detrás de la experiencia: Taller de cerámica Raku", duration: "4:32", category: "Experiencia" },
  { id: "v2", title: "Conversaciones con Ana María: ¿Qué es curar cultura?", duration: "12:07", category: "Entrevista" },
  { id: "v3", title: "Recorrido: Feria del Millón 2026", duration: "6:45", category: "Recorrido" },
  { id: "v4", title: "La cocina como patrimonio: Chef Leonor Espinosa", duration: "8:20", category: "Gastronomía" },
];

const BLOG_POSTS = [
  {
    id: "b1",
    title: "5 galerías emergentes que están redefiniendo el arte en Bogotá",
    category: "Tendencias",
    date: "8 Mar 2026",
    readTime: "5 min",
    excerpt: "Un recorrido por los espacios independientes que están cambiando la conversación artística en la capital.",
  },
  {
    id: "b2",
    title: "El renacimiento de la cerámica artesanal colombiana",
    category: "Artesanía",
    date: "22 Feb 2026",
    readTime: "7 min",
    excerpt: "De Ráquira a los estudios de diseño contemporáneo: cómo la cerámica volvió a estar en el centro.",
  },
  {
    id: "b3",
    title: "Curaduría gastronómica: cuando comer es un acto cultural",
    category: "Gastronomía",
    date: "10 Feb 2026",
    readTime: "6 min",
    excerpt: "Exploramos la intersección entre alta cocina, territorio y memoria colectiva en Colombia.",
  },
];

const NEWSLETTERS = [
  { id: "n1", edition: "Edición 24", title: "El arte de desacelerar: cultura y contemplación", date: "Mar 2026", profiles: "Ana María Restrepo, Carlos Vives" },
  { id: "n2", edition: "Edición 23", title: "Bogotá subterránea: espacios culturales ocultos", date: "Feb 2026", profiles: "Diego Martínez, Laura Prieto" },
  { id: "n3", edition: "Edición 22", title: "Textiles y memoria: el hilo que nos conecta", date: "Ene 2026", profiles: "Olga de Amaral, Felipe Arturo" },
  { id: "n4", edition: "Edición 21", title: "Sonidos de Colombia: más allá del vallenato", date: "Dic 2025", profiles: "Monsieur Periné, Lido Pimienta" },
];

const PRESS = [
  { id: "p1", outlet: "El Tiempo", title: "Colture Club: la plataforma que está cambiando la forma de vivir la cultura en Bogotá", date: "Feb 2026", url: "#" },
  { id: "p2", outlet: "Revista Arcadia", title: "Ana María Restrepo y el arte de curar experiencias", date: "Ene 2026", url: "#" },
  { id: "p3", outlet: "Forbes Colombia", title: "Las startups culturales que están transformando Latinoamérica", date: "Dic 2025", url: "#" },
  { id: "p4", outlet: "Semana", title: "Membresías culturales: el nuevo lujo silencioso", date: "Nov 2025", url: "#" },
];

/* ─────────── Shared Components ─────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
      style={{ fontSize: "0.6rem", fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={light ? "text-[#efe3c4]" : "text-[#002e1e]"}
      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 700, lineHeight: 1.15 }}
    >
      {children}
    </h2>
  );
}

function SectionSub({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`max-w-lg ${light ? "text-[#efe3c4]/40" : "text-[#002e1e]/40"}`}
      style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.7 }}
    >
      {children}
    </p>
  );
}

function ViewAll({ label = "Ver todos", light, href = "#" }: { label?: string; light?: boolean; href?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 4 }}
      className={`inline-flex items-center gap-2 cursor-pointer group ${light ? "text-[#efe3c4]/50 hover:text-[#efe3c4]" : "text-[#002e1e]/40 hover:text-[#002e1e]"} transition-colors duration-300`}
      style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}
    >
      {label}
      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
    </motion.a>
  );
}

/* ─────────── Interview Off-Canvas ─────────── */

type Interview = (typeof INTERVIEWS)[number];

function InterviewOffCanvas({ interview, onClose }: { interview: Interview | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {interview && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-[#002e1e]/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[520px] md:w-[580px] bg-[#f9f9f9] z-50 overflow-y-auto shadow-2xl"
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-[#002e1e]/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-[#002e1e]/20 transition-colors"
            >
              <X size={18} className="text-[#002e1e]" />
            </motion.button>

            {/* Hero image */}
            <div className="relative h-[360px] overflow-hidden">
              <ImageWithFallback
                src={interview.img}
                alt={interview.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/80 via-[#002e1e]/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span
                  className="inline-block px-3 py-1 rounded-full bg-[#efe3c4]/15 text-[#efe3c4]/70 mb-3 backdrop-blur-sm"
                  style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  {interview.role}
                </span>
                <h2
                  className="text-[#efe3c4]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.15 }}
                >
                  {interview.name}
                </h2>
                <div className="flex items-center gap-4 text-[#efe3c4]/40 mt-3" style={{ fontSize: "0.72rem" }}>
                  <span className="flex items-center gap-1"><Clock size={11} /> {interview.readTime}</span>
                  <span>{interview.date}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10">
              {/* Pull quote */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mb-8 pl-5 border-l-2 border-[#efe3c4]"
              >
                <Quote size={16} className="text-[#002e1e]/15 mb-2" />
                <p
                  className="text-[#002e1e]/70"
                  style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.7 }}
                >
                  {interview.excerpt}
                </p>
              </motion.div>

              {/* Paragraphs */}
              {interview.fullText.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + 0.08 * i, duration: 0.5 }}
                  className="text-[#002e1e]/60 mb-5"
                  style={{ fontSize: "0.9rem", lineHeight: 1.85 }}
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#002e1e]/8"
              >
                {["Arte", "Cultura", "Bogotá", "Entrevista"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#002e1e]/[0.04] text-[#002e1e]/35"
                    style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────── Main Page ─────────── */

export default function EditorialPage() {
  const { onSubscribe } = useOutletContext<{ onSubscribe: () => void }>();

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: "var(--font-sans)" }}>
      <HeroSection />
      <InterviewsSection />
      <VideosSection />
      <BlogSection />
      <NewsletterSection onSubscribe={onSubscribe} />
      <PressSection />
    </div>
  );
}

/* ───── HERO ───── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback src={IMG.hero} alt="Editorial Colture Club" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e] via-[#002e1e]/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-20 md:pb-28 pt-40">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#efe3c4]/20 text-[#efe3c4]/60 mb-6 backdrop-blur-sm bg-white/5"
          style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" }}
        >
          <PenLine size={12} />
          Editorial
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#efe3c4] max-w-3xl mb-6"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.08 }}
        >
          Ideas que{" "}
          <span style={{ fontStyle: "italic" }}>alimentan</span> la curiosidad.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-[#efe3c4]/50 max-w-xl"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", lineHeight: 1.7 }}
        >
          Entrevistas, artículos, videos y reflexiones curadas para quienes entienden la cultura como forma de vida.
        </motion.p>
      </div>
    </section>
  );
}

/* ───── 1. DESTACADOS ENTREVISTAS ───── */
function InterviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
      >
        <div>
          <SectionLabel>Destacados</SectionLabel>
          <SectionTitle>Entrevistas</SectionTitle>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INTERVIEWS.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer"
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
            onClick={() => setSelectedInterview(item)}
          >
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden mb-5 aspect-[4/5]">
              <ImageWithFallback
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/60 via-transparent to-transparent" />

              {/* Quote overlay */}
              <motion.div
                initial={false}
                animate={{ opacity: activeId === item.id ? 1 : 0, y: activeId === item.id ? 0 : 10 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-0 left-0 right-0 p-6"
              >
                <div className="flex items-start gap-2">
                  <Quote size={14} className="text-[#efe3c4]/40 shrink-0 mt-1" />
                  <p
                    className="text-[#efe3c4]/80"
                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.82rem", lineHeight: 1.6 }}
                  >
                    {item.excerpt}
                  </p>
                </div>
              </motion.div>

              {/* Role badge */}
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#002e1e]/60 backdrop-blur-sm text-[#efe3c4]/70"
                style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                {item.role}
              </div>
            </div>

            {/* Meta */}
            <h3
              className="text-[#002e1e] mb-2 group-hover:text-[#002e1e]/70 transition-colors"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 700 }}
            >
              {item.name}
            </h3>
            <div className="flex items-center gap-4 text-[#002e1e]/30" style={{ fontSize: "0.72rem" }}>
              <span className="flex items-center gap-1"><Clock size={11} /> {item.readTime}</span>
              <span>{item.date}</span>
            </div>
          </motion.article>
        ))}
      </div>

      <InterviewOffCanvas interview={selectedInterview} onClose={() => setSelectedInterview(null)} />
    </section>
  );
}

/* ───── 2. CLIPS Y CÁPSULAS DE VIDEO ───── */
function VideosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#002e1e]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
      >
        <div>
          <span
            className="text-[#efe3c4]/30 uppercase tracking-[0.4em] block mb-4"
            style={{ fontSize: "0.6rem", fontWeight: 500 }}
          >
            Multimedia
          </span>
          <SectionTitle light>Clips y cápsulas de video</SectionTitle>
        </div>
      </motion.div>

      {/* Featured video */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.8 }}
        className="relative rounded-2xl overflow-hidden mb-8 aspect-video group cursor-pointer"
      >
        <ImageWithFallback src={IMG.video} alt="Video destacado" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-[#002e1e]/40 group-hover:bg-[#002e1e]/30 transition-colors duration-500" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#efe3c4] flex items-center justify-center shadow-xl"
          >
            <Play size={24} className="text-[#002e1e] ml-1" fill="#002e1e" />
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-[#efe3c4]" style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 700 }}>
            {VIDEOS[0].title}
          </p>
          <span className="text-[#efe3c4]/40 mt-1 flex items-center gap-2" style={{ fontSize: "0.72rem" }}>
            <Video size={12} /> {VIDEOS[0].duration} · {VIDEOS[0].category}
          </span>
        </div>
      </motion.div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {VIDEOS.slice(1).map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 + 0.1 * i, duration: 0.7 }}
            className="p-5 rounded-xl border border-[#efe3c4]/8 bg-[#efe3c4]/[0.03] hover:bg-[#efe3c4]/[0.07] transition-all duration-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#efe3c4]/10 flex items-center justify-center shrink-0 group-hover:bg-[#efe3c4]/15 transition-colors">
                <Play size={14} className="text-[#efe3c4]/50 ml-0.5" fill="rgba(239,227,196,0.5)" />
              </div>
              <span className="text-[#efe3c4]/30" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
                {v.duration}
              </span>
            </div>
            <h4 className="text-[#efe3c4]/80 mb-2" style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.45 }}>
              {v.title}
            </h4>
            <span
              className="text-[#efe3c4]/25 px-2 py-0.5 rounded-full border border-[#efe3c4]/10"
              style={{ fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              {v.category}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───── 3. BLOG CURATORIALES / ARTÍCULOS DE TENDENCIAS ───── */
function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
      >
        <div>
          <SectionLabel>Blog curatorial</SectionLabel>
          <SectionTitle>Artículos de tendencias</SectionTitle>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Featured article (large) */}
        <motion.article
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="lg:col-span-2 group cursor-pointer relative rounded-2xl overflow-hidden"
        >
          <div className="relative h-[400px]">
            <ImageWithFallback src={IMG.blog} alt={BLOG_POSTS[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e]/80 via-[#002e1e]/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span
                className="inline-block px-3 py-1 rounded-full bg-[#efe3c4]/15 text-[#efe3c4]/60 mb-2 backdrop-blur-sm"
                style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {BLOG_POSTS[0].category}
              </span>
              <h3
                className="text-[#efe3c4] mb-1"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 1.6vw, 1.25rem)", fontWeight: 700, lineHeight: 1.25 }}
              >
                {BLOG_POSTS[0].title}
              </h3>
              <p className="text-[#efe3c4]/45 mb-2 max-w-md" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
                {BLOG_POSTS[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-[#efe3c4]/30" style={{ fontSize: "0.7rem" }}>
                <span className="flex items-center gap-1"><Clock size={11} /> {BLOG_POSTS[0].readTime}</span>
                <span>{BLOG_POSTS[0].date}</span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Smaller articles stacked vertically */}
        <div className="flex flex-col gap-4">
          {BLOG_POSTS.slice(1).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + 0.1 * i, duration: 0.7 }}
              className="p-3 rounded-2xl border border-[#002e1e]/6 bg-white hover:shadow-lg transition-all duration-500 cursor-pointer group flex flex-col"
            >
              <span
                className="inline-block self-start px-2 py-0.5 rounded-full bg-[#002e1e]/[0.04] text-[#002e1e]/40 mb-1.5"
                style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {post.category}
              </span>
              <h4
                className="text-[#002e1e] mb-1 group-hover:text-[#002e1e]/70 transition-colors"
                style={{ fontFamily: "var(--font-serif)", fontSize: "0.85rem", fontWeight: 700, lineHeight: 1.25 }}
              >
                {post.title}
              </h4>
              <p className="text-[#002e1e]/35 mb-1.5 line-clamp-2" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-[#002e1e]/25" style={{ fontSize: "0.65rem" }}>
                <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                <span>{post.date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── 4. NEWSLETTER (EDICIONES PASADAS) ───── */
function NewsletterSection({ onSubscribe }: { onSubscribe: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#efe3c4]/40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
      >
        <div>
          <SectionLabel>Ediciones pasadas</SectionLabel>
          <SectionTitle>Newsletter</SectionTitle>
          <p className="text-[#002e1e]/35 mt-2" style={{ fontSize: "0.85rem" }}>
            Artistas, curadores, empresarios — en tu bandeja de entrada.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {NEWSLETTERS.map((nl, i) => (
          <motion.div
            key={nl.id}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 md:p-8 rounded-xl bg-white/70 backdrop-blur-sm border border-[#002e1e]/5 hover:bg-white hover:shadow-md transition-all duration-500 cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#002e1e]/[0.05] flex items-center justify-center group-hover:bg-[#002e1e]/[0.08] transition-colors">
                  <Mail size={16} className="text-[#002e1e]/30" />
                </div>
                <div>
                  <span className="text-[#002e1e]/30 block" style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {nl.edition}
                  </span>
                  <span className="text-[#002e1e]/25" style={{ fontSize: "0.7rem" }}>{nl.date}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#002e1e]/15 group-hover:text-[#002e1e]/35 transition-colors mt-1" />
            </div>

            <h4
              className="text-[#002e1e] mb-3 group-hover:text-[#002e1e]/70 transition-colors"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 }}
            >
              {nl.title}
            </h4>
            <p className="text-[#002e1e]/30" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
              <span className="text-[#002e1e]/20" style={{ fontWeight: 500 }}>Perfiles: </span>
              {nl.profiles}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Subscribe strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="rounded-xl bg-[#002e1e] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#efe3c4]/10 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-[#efe3c4]" />
          </div>
          <div>
            <h4 className="text-[#efe3c4]" style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", fontWeight: 700 }}>
              Recibe la newsletter en primera fila
            </h4>
            <p className="text-[#efe3c4]/35" style={{ fontSize: "0.82rem" }}>
              Suscríbete y no te pierdas ninguna edición.
            </p>
          </div>
        </div>
        <motion.button
          onClick={onSubscribe}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 bg-[#efe3c4] text-[#002e1e] cursor-pointer flex items-center gap-2 shrink-0 rounded-lg"
          style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          Suscribirme
          <ArrowRight size={14} />
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ───── 5. PRENSA Y APARICIÓN EN MEDIOS ───── */
function PressSection() {
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
        <SectionLabel>Prensa</SectionLabel>
        <SectionTitle>Aparición en medios</SectionTitle>
      </motion.div>

      <div className="space-y-0 border-t border-[#002e1e]/8">
        {PRESS.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url}
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.08 * i, duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-6 border-b border-[#002e1e]/6 group cursor-pointer hover:px-4 transition-all duration-400"
          >
            <div className="flex-1">
              <span
                className="text-[#002e1e]/25 block mb-1"
                style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {item.outlet}
              </span>
              <h4
                className="text-[#002e1e] group-hover:text-[#002e1e]/65 transition-colors"
                style={{ fontFamily: "var(--font-serif)", fontSize: "0.98rem", fontWeight: 600, lineHeight: 1.4 }}
              >
                {item.title}
              </h4>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[#002e1e]/25" style={{ fontSize: "0.72rem" }}>{item.date}</span>
              <ExternalLink size={14} className="text-[#002e1e]/15 group-hover:text-[#002e1e]/40 transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
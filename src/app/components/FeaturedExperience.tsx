import { useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";

const IMG_LEFT =
  "https://images.unsplash.com/photo-1756074277712-1df732f679f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwaW50aW1hdGUlMjBhdG1vc3BoZXJpYyUyMGRhcmt8ZW58MXx8fHwxNzczNzc2OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const IMG_RIGHT =
  "https://images.unsplash.com/photo-1610212012464-84cae355adcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZyUyMGVsZWdhbnQlMjBoYW5kcyUyMGNsb3NldXAlMjBtb29keXxlbnwxfHx8fDE3NzM3NzY5OTQ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const marqueeText =
  "Cultura · Arquitectura · Gastronomía · Literatura · Música · Café · Arte · Conversación · ";

export function FeaturedExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Mouse parallax state
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const springConfig = { stiffness: 50, damping: 25, mass: 1 };
  const smoothMouseX = useSpring(0, springConfig);
  const smoothMouseY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      smoothMouseX.set(x);
      smoothMouseY.set(y);
    },
    [smoothMouseX, smoothMouseY]
  );

  const handleMouseLeave = useCallback(() => {
    smoothMouseX.set(0);
    smoothMouseY.set(0);
  }, [smoothMouseX, smoothMouseY]);

  // Different parallax intensities for depth layers
  const imgLayer1X = useTransform(smoothMouseX, (v) => v * -40);
  const imgLayer1Y = useTransform(smoothMouseY, (v) => v * -30);
  const imgLayer2X = useTransform(smoothMouseX, (v) => v * -25);
  const imgLayer2Y = useTransform(smoothMouseY, (v) => v * -20);
  const imgLayer3X = useTransform(smoothMouseX, (v) => v * -55);
  const imgLayer3Y = useTransform(smoothMouseY, (v) => v * -40);
  const svgLayerX = useTransform(smoothMouseX, (v) => v * -15);
  const svgLayerY = useTransform(smoothMouseY, (v) => v * -10);
  const textLayerX = useTransform(smoothMouseX, (v) => v * -5);
  const textLayerY = useTransform(smoothMouseY, (v) => v * -4);

  // Parallax for images
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgLeftY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const imgRightY = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  return (
    <section ref={ref} className="relative bg-[#f9f9f9] overflow-hidden">
      {/* ── Horizontal Marquee Strip ── */}
      {/* ... remove this code ... */}

      {/* ── Main Editorial Section ── */}
      <div
        className="relative py-32 md:py-44 lg:py-56 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── SVG Background Illustrations ── */}
        {/* Topographic contour lines — top left */}
        <motion.svg
          style={{ x: svgLayerX, y: svgLayerY }}
          className="absolute -top-20 -left-20 w-[600px] h-[600px] opacity-[0.04] pointer-events-none"
          viewBox="0 0 600 600"
          fill="none"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse
              key={`topo-tl-${i}`}
              cx={200 + i * 8}
              cy={250 + i * 5}
              rx={100 + i * 50}
              ry={80 + i * 42}
              stroke="#002e1e"
              strokeWidth={1.2}
              fill="none"
            />
          ))}
        </motion.svg>

        {/* Topographic contour lines — bottom right */}
        <motion.svg
          style={{ x: svgLayerX, y: svgLayerY }}
          className="absolute -bottom-32 -right-16 w-[700px] h-[700px] opacity-[0.035] pointer-events-none"
          viewBox="0 0 700 700"
          fill="none"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <ellipse
              key={`topo-br-${i}`}
              cx={350 - i * 6}
              cy={350 + i * 4}
              rx={80 + i * 48}
              ry={65 + i * 40}
              stroke="#002e1e"
              strokeWidth={1}
              fill="none"
            />
          ))}
        </motion.svg>

        {/* Organic wave — center background */}
        <motion.svg
          style={{ x: svgLayerX, y: svgLayerY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] opacity-[0.025] pointer-events-none"
          viewBox="0 0 900 400"
          fill="none"
        >
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`wave-${i}`}
              d={`M0 ${200 + i * 25} C150 ${140 + i * 30}, 300 ${260 + i * 20}, 450 ${190 + i * 25} S750 ${240 + i * 15}, 900 ${200 + i * 25}`}
              stroke="#002e1e"
              strokeWidth={1.2}
              fill="none"
            />
          ))}
        </motion.svg>

        {/* Dot grid — subtle texture */}
        <motion.svg
          style={{ x: svgLayerX, y: svgLayerY }}
          className="absolute top-20 right-20 w-[200px] h-[200px] opacity-[0.03] pointer-events-none hidden lg:block"
          viewBox="0 0 200 200"
        >
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 10 }).map((_, c) => (
              <circle
                key={`dot-${r}-${c}`}
                cx={10 + c * 20}
                cy={10 + r * 20}
                r={1.5}
                fill="#002e1e"
              />
            ))
          )}
        </motion.svg>

        {/* ── Floating Images ── */}
        {/* Image 1 — top left, tilted */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -8 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -8 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[8%] left-[4%] md:left-[8%] lg:left-[6%] w-[200px] md:w-[260px] lg:w-[300px] z-10 hidden md:block"
          style={{ x: imgLayer1X, y: imgLayer1Y }}
        >
          <motion.div
            style={{ y: imgLeftY }}
            whileHover={{ scale: 1.06, rotate: -2, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-[#002e1e]/10 hover:shadow-[0_25px_60px_-10px_rgba(0,46,30,0.2)] transition-shadow duration-500 cursor-pointer"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1756074277712-1df732f679f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwaW50aW1hdGUlMjBhdG1vc3BoZXJpYyUyMGRhcmt8ZW58MXx8fHwxNzczNzc2OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Experiencia cultural"
              className="w-full h-[260px] md:h-[320px] lg:h-[380px] object-cover transition-transform duration-700 hover:scale-110"
            />
          </motion.div>
        </motion.div>

        {/* Image 2 — right side, tilted opposite */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotate: 6 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 6 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[30%] right-[3%] md:right-[6%] lg:right-[5%] w-[180px] md:w-[240px] lg:w-[280px] z-10 hidden md:block"
          style={{ x: imgLayer2X, y: imgLayer2Y }}
        >
          <motion.div
            style={{ y: imgRightY }}
            whileHover={{ scale: 1.06, rotate: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-[#002e1e]/10 hover:shadow-[0_25px_60px_-10px_rgba(0,46,30,0.2)] transition-shadow duration-500 cursor-pointer"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759375504598-9f5d96ce8926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2dvdGElMjBDb2xvbWJpYSUyMHN1bnNldCUyMGNpdHlzY2FwZSUyMGFlcmlhbHxlbnwxfHx8fDE3NzM3NzczODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Bogotá al atardecer"
              className="w-full h-[230px] md:h-[290px] lg:h-[340px] object-cover transition-transform duration-700 hover:scale-110"
            />
          </motion.div>
        </motion.div>

        {/* Image 3 — bottom left, smaller */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 4 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 4 } : {}}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[8%] left-[10%] md:left-[14%] lg:left-[12%] w-[160px] md:w-[200px] lg:w-[220px] z-10 hidden lg:block"
          style={{ x: imgLayer3X, y: imgLayer3Y }}
        >
          <motion.div
            style={{ y: imgLeftY }}
            whileHover={{ scale: 1.06, rotate: -1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-[#002e1e]/10 hover:shadow-[0_25px_60px_-10px_rgba(0,46,30,0.2)] transition-shadow duration-500 cursor-pointer"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1672851612794-6687bf0bf1a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBwbGFudGF0aW9uJTIwQ29sb21iaWElMjBsdXNoJTIwZ3JlZW58ZW58MXx8fHwxNzczNzc3MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Café colombiano"
              className="w-full h-[200px] md:h-[250px] object-cover transition-transform duration-700 hover:scale-110"
            />
          </motion.div>
        </motion.div>

        {/* ── Centered Text Content ── */}
        <motion.div
          style={{ x: textLayerX, y: textLayerY }}
          className="relative z-20 max-w-3xl mx-auto text-center px-6"
        >
          {/* Big editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-[#002e1e]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                fontWeight: 400,
                lineHeight: 1.08,
              }}
            >
              Cultura nacida de una{" "}
              <span className="italic">ciudad</span> tejida por{" "}
              <span className="italic">siglos</span> de historia.
            </h2>
          </motion.div>

          {/* Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 1 }}
            className="w-20 h-px bg-[#002e1e]/15 mx-auto mt-16 mb-12 origin-center"
          />

          {/* Subheader label */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-[#002e1e]/35 uppercase tracking-[0.4em] block mb-6"
            style={{ fontSize: "0.6rem", fontWeight: 500 }}
          >
            Nuestra filosofía
          </motion.span>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-[#002e1e]/45 max-w-md mx-auto mb-14"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              lineHeight: 2.1,
              fontWeight: 300,
              letterSpacing: "0.01em",
            }}
          >
            Cada experiencia es un universo curado con intención:
            los espacios, las personas, los silencios.
            Diseñamos encuentros donde la cultura no se consume — se habita.
          </motion.p>

          {/* Stats row */}
          <div className="flex justify-center gap-12 md:gap-16 mb-14">
            {[
              { num: "50+", label: "Experiencias" },
              { num: "800+", label: "Asistentes" },
              { num: "12", label: "Categorías" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center"
              >
                <span
                  className="block text-[#002e1e]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.8rem",
                    fontWeight: 400,
                  }}
                >
                  {stat.num}
                </span>
                <span
                  className="text-[#002e1e]/25 uppercase tracking-[0.15em]"
                  style={{ fontSize: "0.55rem", fontWeight: 500 }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 text-[#002e1e] cursor-pointer group/cta"
            >
              <span
                className="uppercase tracking-[0.2em]"
                style={{ fontSize: "0.75rem", fontWeight: 600 }}
              >
                Descubrir más
              </span>
              <span className="w-8 h-px bg-[#002e1e]/20 group-hover/cta:w-14 transition-all duration-500" />
              <ArrowUpRight
                size={14}
                className="text-[#002e1e]/40 group-hover/cta:rotate-45 transition-transform duration-300"
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Marquee (reverse direction) ── */}
      <div className="py-6 md:py-8 border-y border-[#002e1e]/6 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0"
          >
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="text-[#002e1e]/6 uppercase tracking-[0.3em] px-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
                  fontWeight: 400,
                }}
              >
                {marqueeText}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
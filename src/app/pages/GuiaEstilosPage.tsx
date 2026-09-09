const COLORS = [
  { name: "Verde primario", var: "--primary", hex: "#002e1e" },
  { name: "Crema secundario", var: "--secondary", hex: "#efe3c4" },
  { name: "Fondo", var: "--background", hex: "#f9f9f9" },
  { name: "Superficie / card", var: "--card", hex: "#ffffff" },
];

const SANS_WEIGHTS = [
  { label: "Light", weight: 300 },
  { label: "Regular", weight: 400 },
  { label: "Medium", weight: 500 },
  { label: "SemiBold", weight: 600 },
  { label: "Bold", weight: 700 },
  { label: "Black", weight: 900 },
];

const SERIF_WEIGHTS = [
  { label: "Regular", weight: 400, italic: false },
  { label: "Regular Italic", weight: 400, italic: true },
  { label: "Bold", weight: 700, italic: false },
  { label: "Bold Italic", weight: 700, italic: true },
];

const TYPE_SCALE = [
  { tag: "Eyebrow / overline", font: "var(--font-sans)", size: "0.6rem", weight: 600, tracking: "0.25em", transform: "uppercase", sample: "Membresía" },
  { tag: "H1 — Hero", font: "var(--font-serif)", size: "clamp(2.2rem, 5vw, 4rem)", weight: 700, sample: "La cultura es mejor en compañía." },
  { tag: "H2 — Título de sección", font: "var(--font-serif)", size: "clamp(1.6rem, 3vw, 2.4rem)", weight: 700, sample: "Elige cómo vivir la cultura" },
  { tag: "H3 — Título de tarjeta", font: "var(--font-serif)", size: "1.3rem", weight: 700, sample: "Básica" },
  { tag: "H4 — Subtítulo", font: "var(--font-serif)", size: "1.05rem", weight: 700, sample: "Acceso anticipado" },
  { tag: "Body — Párrafo", font: "var(--font-sans)", size: "0.92rem", weight: 400, sample: "Cada plan es una puerta a experiencias que transforman." },
  { tag: "Body italic — Bajada editorial", font: "var(--font-serif)", size: "0.95rem", weight: 400, italic: true, sample: "Ideal para personas curiosas que quieren explorar la cultura con guía y contexto." },
  { tag: "Label — Formulario", font: "var(--font-sans)", size: "0.7rem", weight: 600, tracking: "0.1em", transform: "uppercase", sample: "Nombre" },
  { tag: "Button", font: "var(--font-sans)", size: "0.7rem", weight: 700, tracking: "0.2em", transform: "uppercase", sample: "Suscribirme" },
  { tag: "Caption", font: "var(--font-sans)", size: "0.75rem", weight: 300, sample: "© 2026 Colture Club. Todos los derechos reservados." },
];

export default function GuiaEstilosPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Header */}
      <section className="px-8 md:px-16 lg:px-24 pt-40 pb-16 bg-[#002e1e]">
        <span
          className="inline-block text-[#efe3c4]/50 uppercase tracking-[0.4em] mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 600 }}
        >
          Design system
        </span>
        <h1
          className="text-[#efe3c4] max-w-2xl mb-4"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
        >
          Guía de estilos tipográficos
        </h1>
        <p
          className="text-[#efe3c4]/50 max-w-xl"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.7 }}
        >
          Familias, pesos y escala tipográfica que usa Colture Club en todo el sitio.
        </p>
      </section>

      {/* Font families */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <span
          className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          Familias tipográficas
        </span>
        <h2
          className="text-[#002e1e] mb-12"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700 }}
        >
          Montserrat + Playfair Display
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sans */}
          <div className="p-8 md:p-10 rounded-2xl border border-[#002e1e]/10 bg-white">
            <p className="text-[#002e1e]/35 mb-1" style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              --font-sans
            </p>
            <p className="text-[#002e1e] mb-6" style={{ fontFamily: "var(--font-sans)", fontSize: "2.4rem", fontWeight: 500 }}>
              Montserrat
            </p>
            <p className="text-[#002e1e]/50 mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Uso: labels, botones, cuerpo de texto, navegación y componentes de UI.
            </p>
            <div className="space-y-3">
              {SANS_WEIGHTS.map((w) => (
                <div key={w.weight} className="flex items-center justify-between border-t border-[#002e1e]/8 pt-3">
                  <span
                    className="text-[#002e1e]"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: w.weight, fontSize: "1.05rem" }}
                  >
                    Aa Colture Club
                  </span>
                  <span className="text-[#002e1e]/35" style={{ fontSize: "0.75rem" }}>
                    {w.label} · {w.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Serif */}
          <div className="p-8 md:p-10 rounded-2xl border border-[#002e1e]/10 bg-white">
            <p className="text-[#002e1e]/35 mb-1" style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              --font-serif
            </p>
            <p className="text-[#002e1e] mb-6" style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem", fontWeight: 700 }}>
              Playfair Display
            </p>
            <p className="text-[#002e1e]/50 mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Uso: títulos, headlines editoriales y bajadas en cursiva.
            </p>
            <div className="space-y-3">
              {SERIF_WEIGHTS.map((w) => (
                <div key={w.label} className="flex items-center justify-between border-t border-[#002e1e]/8 pt-3">
                  <span
                    className="text-[#002e1e]"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: w.weight, fontStyle: w.italic ? "italic" : "normal", fontSize: "1.05rem" }}
                  >
                    Aa Colture Club
                  </span>
                  <span className="text-[#002e1e]/35" style={{ fontSize: "0.75rem" }}>
                    {w.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Type scale */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-[#002e1e]">
        <span
          className="text-[#efe3c4]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          Escala tipográfica
        </span>
        <h2
          className="text-[#efe3c4] mb-12"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700 }}
        >
          Estilos usados en el sitio
        </h2>

        <div className="space-y-8">
          {TYPE_SCALE.map((s) => (
            <div key={s.tag} className="border-b border-[#efe3c4]/10 pb-8">
              <p
                className="text-[#efe3c4]/35 mb-3"
                style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                {s.tag} · {s.size} · {s.weight}
              </p>
              <p
                className="text-[#efe3c4]"
                style={{
                  fontFamily: s.font,
                  fontSize: s.size,
                  fontWeight: s.weight,
                  fontStyle: s.italic ? "italic" : "normal",
                  letterSpacing: s.tracking,
                  textTransform: s.transform as React.CSSProperties["textTransform"],
                  lineHeight: 1.3,
                }}
              >
                {s.sample}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Color palette */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <span
          className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-4"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          Paleta de color
        </span>
        <h2
          className="text-[#002e1e] mb-12"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700 }}
        >
          Aplicada sobre la tipografía
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {COLORS.map((c) => (
            <div key={c.hex} className="rounded-xl overflow-hidden border border-[#002e1e]/10">
              <div className="h-24" style={{ backgroundColor: c.hex }} />
              <div className="p-4 bg-white">
                <p className="text-[#002e1e]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  {c.name}
                </p>
                <p className="text-[#002e1e]/40" style={{ fontSize: "0.75rem" }}>
                  {c.var}
                </p>
                <p className="text-[#002e1e]/40" style={{ fontSize: "0.75rem" }}>
                  {c.hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

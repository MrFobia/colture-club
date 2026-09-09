import { motion, AnimatePresence } from "motion/react";
import { X, Check, Crown, Star, Gem } from "lucide-react";

export interface Plan {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  color: string;
  bgLight: string;
  borderColor: string;
  icon: React.ReactNode;
  features: string[];
  idealFor: string;
  cta: string;
  tag?: string;
}

export const PLANS: Plan[] = [
  {
    id: "basica",
    name: "Básica",
    price: "$200.000 COP / año",
    priceNum: 200000,
    color: "#002e1e",
    bgLight: "#f9f9f9",
    borderColor: "#002e1e",
    icon: <Star size={20} />,
    features: [
      "Newsletter mensual",
      "Noticias culturales Bogotá",
      "Prioridad cupos experiencias",
      "Acceso a precios de miembro",
      "Archivo de experiencias",
    ],
    idealFor: "Personas curiosas que quieren explorar la cultura con guía y contexto",
    cta: "Elegir Básica",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$500.000 COP / año",
    priceNum: 500000,
    color: "#002e1e",
    bgLight: "#efe3c4",
    borderColor: "#c9b88a",
    icon: <Crown size={20} />,
    features: [
      "Todo lo de Básica +",
      "Acceso anticipado experiencias",
      "Invitación sesiones privadas",
      "Descuento en experiencias",
      "Contenido editorial exclusivo",
    ],
    idealFor: "Personas que ya viven la cultura activamente y buscan profundidad",
    cta: "Elegir Premium",
    tag: "Más popular",
  },
  {
    id: "curada",
    name: "Curada",
    price: "$1.000.000 COP / año",
    priceNum: 1000000,
    color: "#efe3c4",
    bgLight: "#002e1e",
    borderColor: "#002e1e",
    icon: <Gem size={20} />,
    features: [
      "Todo lo de Premium +",
      "Experiencias a medida",
      "Acceso directo a Ana María",
      "Curaduría personalizada",
      "Viajes culturales prioritarios",
    ],
    idealFor: "Coleccionistas, directivos, personas que quieren la experiencia más exclusiva",
    cta: "Elegir Curada",
  },
];

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: Plan) => void;
}

export function SubscriptionModal({ isOpen, onClose, onSelectPlan }: SubscriptionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#002e1e]/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-[#f9f9f9] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#002e1e]/5 hover:bg-[#002e1e]/10 flex items-center justify-center cursor-pointer transition-colors z-10"
            >
              <X size={18} className="text-[#002e1e]/60" />
            </button>

            {/* Header */}
            <div className="px-8 md:px-12 pt-10 pb-6 text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#002e1e]/40 uppercase tracking-[0.4em] block mb-4"
                style={{ fontSize: "0.6rem", fontWeight: 500 }}
              >
                Membresías
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[#002e1e]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 600,
                }}
              >
                Elige tu forma de vivir la cultura
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#002e1e]/45 mt-3 max-w-md mx-auto"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                }}
              >
                Cada plan es una puerta a experiencias que transforman
              </motion.p>
            </div>

            {/* Plans grid */}
            <div className="px-6 md:px-10 pb-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {PLANS.map((plan, i) => {
                const isDark = plan.bgLight === "#002e1e";
                const textPrimary = isDark ? "#efe3c4" : "#002e1e";
                const textSecondary = isDark ? "rgba(239,227,196,0.7)" : "rgba(0,46,30,0.7)";
                const textMuted = isDark ? "rgba(239,227,196,0.4)" : "rgba(0,46,30,0.35)";
                const textSubtle = isDark ? "rgba(239,227,196,0.5)" : "rgba(0,46,30,0.5)";
                const tagColor = isDark ? "#002e1e" : "#fff";

                return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-xl border overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300"
                  style={{
                    backgroundColor: plan.bgLight,
                    borderColor: `${plan.borderColor}30`,
                  }}
                >
                  {/* Popular tag */}
                  {plan.tag && (
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: plan.color,
                        fontSize: "0.55rem",
                        fontWeight: 600,
                        color: tagColor,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {plan.tag}
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Icon + Name */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                      >
                        {plan.icon}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: textPrimary,
                        }}
                      >
                        {plan.name}
                      </h3>
                    </div>

                    {/* Price */}
                    <p
                      style={{
                        color: plan.color,
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                      }}
                      className="mb-5"
                    >
                      {plan.price}
                    </p>

                    {/* Divider */}
                    <div
                      className="w-full h-px mb-5"
                      style={{ backgroundColor: `${plan.color}20` }}
                    />

                    {/* Features */}
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check
                            size={14}
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: plan.color }}
                          />
                          <span
                            style={{ fontSize: "0.8rem", lineHeight: 1.5, fontWeight: 400, color: textSecondary }}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Ideal para */}
                    <div className="mb-5">
                      <span
                        className="uppercase tracking-[0.2em] block mb-1.5"
                        style={{ fontSize: "0.55rem", fontWeight: 600, color: textMuted }}
                      >
                        Ideal para
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: "0.75rem",
                          lineHeight: 1.6,
                          color: textSubtle,
                        }}
                      >
                        {plan.idealFor}
                      </p>
                    </div>

                    {/* CTA */}
                    <motion.button
                      onClick={() => onSelectPlan(plan)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-90"
                      style={{
                        backgroundColor: plan.color,
                        color: isDark ? "#002e1e" : "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {plan.cta}
                    </motion.button>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
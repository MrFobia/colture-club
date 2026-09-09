import { motion } from "motion/react";
import {
  CheckCircle2,
  ArrowLeft,
  CreditCard,
  Building2,
  Calendar,
  Mail,
  User,
  Receipt,
  Sparkles,
} from "lucide-react";
import type { PaymentData } from "./PaymentGateway";

interface ThankYouPageProps {
  paymentData: PaymentData;
  onGoHome: () => void;
}

export function ThankYouPage({ paymentData, onGoHome }: ThankYouPageProps) {
  const { method, plan, name, email, cardLast4, bank, date, transactionId } =
    paymentData;

  return (
    <div
      className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center px-6 py-20"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Decorative bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#002e1e]/[0.02] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#efe3c4]/30 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Success icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#002e1e] flex items-center justify-center">
              <CheckCircle2 size={36} className="text-[#efe3c4]" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Sparkles size={18} className="text-[#efe3c4]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1
            className="text-[#002e1e] mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 700,
            }}
          >
            ¡Bienvenido al Club!
          </h1>
          <p
            className="text-[#002e1e]/50 max-w-sm mx-auto"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "0.95rem",
              lineHeight: 1.7,
            }}
          >
            Tu membresía {plan.name} ha sido activada con éxito. La cultura te
            espera.
          </p>
        </motion.div>

        {/* Plan card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border overflow-hidden mb-5"
          style={{
            backgroundColor: plan.bgLight,
            borderColor: `${plan.borderColor}25`,
          }}
        >
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
              >
                {plan.icon}
              </div>
              <div>
                <span
                  className="text-[#002e1e]/35 uppercase tracking-[0.2em] block"
                  style={{ fontSize: "0.5rem", fontWeight: 600 }}
                >
                  Plan
                </span>
                <h3
                  className="text-[#002e1e]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  {plan.name}
                </h3>
              </div>
            </div>
            <span
              style={{
                color: plan.color,
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {plan.price}
            </span>
          </div>
        </motion.div>

        {/* Payment details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-[#002e1e]/8 overflow-hidden mb-5"
        >
          <div className="px-6 py-4 border-b border-[#002e1e]/5">
            <span
              className="text-[#002e1e]/40 uppercase tracking-[0.2em]"
              style={{ fontSize: "0.6rem", fontWeight: 600 }}
            >
              Detalles del pago
            </span>
          </div>

          <div className="px-6 py-4 space-y-4">
            <DetailRow
              icon={<User size={15} />}
              label="Nombre"
              value={name}
            />
            <DetailRow
              icon={<Mail size={15} />}
              label="Correo"
              value={email}
            />
            <DetailRow
              icon={method === "card" ? <CreditCard size={15} /> : <Building2 size={15} />}
              label="Método"
              value={
                method === "card"
                  ? `Tarjeta terminada en •••• ${cardLast4}`
                  : `PSE — ${bank}`
              }
            />
            <DetailRow
              icon={<Calendar size={15} />}
              label="Fecha"
              value={date}
            />
            <DetailRow
              icon={<Receipt size={15} />}
              label="Transacción"
              value={transactionId}
            />
          </div>
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8 text-[#3a7d5c]"
        >
          <div className="w-2 h-2 rounded-full bg-[#3a7d5c] animate-pulse" />
          <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
            Pago aprobado
          </span>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-center text-[#002e1e]/35 mb-8"
          style={{ fontSize: "0.75rem", lineHeight: 1.7 }}
        >
          Recibirás un correo de confirmación en{" "}
          <span className="text-[#002e1e]/50">{email}</span> con los detalles
          de tu membresía y acceso a tu primera experiencia.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onGoHome}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-10 py-4 bg-[#002e1e] text-[#efe3c4] cursor-pointer rounded-xl"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
          >
            <ArrowLeft size={16} />
            VOLVER AL INICIO
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#002e1e]/30 mt-0.5">{icon}</span>
      <div className="flex-1">
        <span
          className="text-[#002e1e]/35 block"
          style={{ fontSize: "0.65rem", fontWeight: 500 }}
        >
          {label}
        </span>
        <span
          className="text-[#002e1e]/75"
          style={{ fontSize: "0.85rem", fontWeight: 500 }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

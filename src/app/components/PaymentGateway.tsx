import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ArrowLeft,
  CreditCard,
  Building2,
  Shield,
  Lock,
} from "lucide-react";
import type { Plan } from "./SubscriptionModal";

interface PaymentGatewayProps {
  isOpen: boolean;
  plan: Plan;
  onClose: () => void;
  onBack: () => void;
  onPaymentComplete: (paymentData: PaymentData) => void;
}

export interface PaymentData {
  method: "pse" | "card";
  plan: Plan;
  name: string;
  email: string;
  // Card
  cardLast4?: string;
  // PSE
  bank?: string;
  date: string;
  transactionId: string;
}

const BANKS = [
  "Bancolombia",
  "Banco de Bogotá",
  "Davivienda",
  "BBVA Colombia",
  "Banco de Occidente",
  "Banco Popular",
  "Banco AV Villas",
  "Banco Caja Social",
  "Nequi",
];

export function PaymentGateway({
  isOpen,
  plan,
  onClose,
  onBack,
  onPaymentComplete,
}: PaymentGatewayProps) {
  const [method, setMethod] = useState<"pse" | "card" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // PSE
  const [bank, setBank] = useState("");

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const canPay =
    name &&
    email &&
    method &&
    (method === "card"
      ? cardNumber.replace(/\s/g, "").length === 16 && expiry.length >= 4 && cvv.length >= 3
      : bank !== "");

  const handlePay = () => {
    if (!canPay || !method) return;
    setProcessing(true);
    setTimeout(() => {
      const now = new Date();
      const paymentData: PaymentData = {
        method,
        plan,
        name,
        email,
        date: now.toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        transactionId: `CC-${Date.now().toString(36).toUpperCase()}`,
        ...(method === "card" && {
          cardLast4: cardNumber.replace(/\s/g, "").slice(-4),
        }),
        ...(method === "pse" && { bank }),
      };
      onPaymentComplete(paymentData);
      setProcessing(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#002e1e]/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative bg-[#f9f9f9] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-7 pb-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#002e1e]/50 hover:text-[#002e1e] transition-colors cursor-pointer"
                style={{ fontSize: "0.8rem" }}
              >
                <ArrowLeft size={16} /> Volver a planes
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#002e1e]/5 hover:bg-[#002e1e]/10 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} className="text-[#002e1e]/60" />
              </button>
            </div>

            <div className="px-7 pb-8">
              {/* Plan summary */}
              <div
                className="rounded-xl p-5 mb-6 border"
                style={{
                  backgroundColor: plan.bgLight,
                  borderColor: `${plan.borderColor}25`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-[#002e1e]/35 uppercase tracking-[0.2em] block mb-1"
                      style={{ fontSize: "0.55rem", fontWeight: 600 }}
                    >
                      Plan seleccionado
                    </span>
                    <h3
                      className="text-[#002e1e]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                      }}
                    >
                      {plan.name}
                    </h3>
                  </div>
                  <span
                    style={{
                      color: plan.color,
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {plan.price}
                  </span>
                </div>
              </div>

              {/* Personal info */}
              <div className="space-y-4 mb-6">
                <div>
                  <label
                    className="text-[#002e1e]/50 block mb-1.5"
                    style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}
                  >
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ana María Durán"
                    className="w-full px-4 py-3 rounded-lg border border-[#002e1e]/10 bg-white text-[#002e1e] placeholder-[#002e1e]/25 outline-none focus:border-[#002e1e]/30 transition-colors"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label
                    className="text-[#002e1e]/50 block mb-1.5"
                    style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}
                  >
                    CORREO ELECTRÓNICO
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ana@correo.com"
                    className="w-full px-4 py-3 rounded-lg border border-[#002e1e]/10 bg-white text-[#002e1e] placeholder-[#002e1e]/25 outline-none focus:border-[#002e1e]/30 transition-colors"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              {/* Payment method selector */}
              <label
                className="text-[#002e1e]/50 block mb-3"
                style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}
              >
                MÉTODO DE PAGO
              </label>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                  onClick={() => setMethod("card")}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    method === "card"
                      ? "border-[#002e1e] bg-[#002e1e]/5"
                      : "border-[#002e1e]/10 bg-white hover:border-[#002e1e]/25"
                  }`}
                >
                  <CreditCard
                    size={20}
                    className={method === "card" ? "text-[#002e1e]" : "text-[#002e1e]/40"}
                  />
                  <div className="text-left">
                    <span
                      className={`block ${method === "card" ? "text-[#002e1e]" : "text-[#002e1e]/60"}`}
                      style={{ fontSize: "0.8rem", fontWeight: 600 }}
                    >
                      Tarjeta
                    </span>
                    <span className="text-[#002e1e]/30" style={{ fontSize: "0.65rem" }}>
                      Crédito / Débito
                    </span>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setMethod("pse")}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    method === "pse"
                      ? "border-[#002e1e] bg-[#002e1e]/5"
                      : "border-[#002e1e]/10 bg-white hover:border-[#002e1e]/25"
                  }`}
                >
                  <Building2
                    size={20}
                    className={method === "pse" ? "text-[#002e1e]" : "text-[#002e1e]/40"}
                  />
                  <div className="text-left">
                    <span
                      className={`block ${method === "pse" ? "text-[#002e1e]" : "text-[#002e1e]/60"}`}
                      style={{ fontSize: "0.8rem", fontWeight: 600 }}
                    >
                      PSE
                    </span>
                    <span className="text-[#002e1e]/30" style={{ fontSize: "0.65rem" }}>
                      Débito bancario
                    </span>
                  </div>
                </motion.button>
              </div>

              {/* Card fields */}
              <AnimatePresence mode="wait">
                {method === "card" && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 mb-6 overflow-hidden"
                  >
                    <div>
                      <label
                        className="text-[#002e1e]/50 block mb-1.5"
                        style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}
                      >
                        NÚMERO DE TARJETA
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-3 rounded-lg border border-[#002e1e]/10 bg-white text-[#002e1e] placeholder-[#002e1e]/25 outline-none focus:border-[#002e1e]/30 transition-colors"
                        style={{ fontSize: "0.9rem", letterSpacing: "0.1em" }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          className="text-[#002e1e]/50 block mb-1.5"
                          style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}
                        >
                          VENCIMIENTO
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/AA"
                          className="w-full px-4 py-3 rounded-lg border border-[#002e1e]/10 bg-white text-[#002e1e] placeholder-[#002e1e]/25 outline-none focus:border-[#002e1e]/30 transition-colors"
                          style={{ fontSize: "0.9rem" }}
                        />
                      </div>
                      <div>
                        <label
                          className="text-[#002e1e]/50 block mb-1.5"
                          style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          className="w-full px-4 py-3 rounded-lg border border-[#002e1e]/10 bg-white text-[#002e1e] placeholder-[#002e1e]/25 outline-none focus:border-[#002e1e]/30 transition-colors"
                          style={{ fontSize: "0.9rem" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {method === "pse" && (
                  <motion.div
                    key="pse"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 overflow-hidden"
                  >
                    <label
                      className="text-[#002e1e]/50 block mb-1.5"
                      style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}
                    >
                      SELECCIONA TU BANCO
                    </label>
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#002e1e]/10 bg-white text-[#002e1e] outline-none focus:border-[#002e1e]/30 transition-colors appearance-none cursor-pointer"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <option value="">Seleccionar banco...</option>
                      {BANKS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Security badge */}
              <div className="flex items-center gap-2 mb-6 text-[#002e1e]/30">
                <Shield size={14} />
                <span style={{ fontSize: "0.7rem" }}>
                  Pago seguro · Datos encriptados · Conexión SSL
                </span>
              </div>

              {/* Pay button */}
              <motion.button
                onClick={handlePay}
                disabled={!canPay || processing}
                whileHover={canPay && !processing ? { scale: 1.01 } : {}}
                whileTap={canPay && !processing ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-opacity cursor-pointer ${
                  canPay && !processing
                    ? "bg-[#002e1e] text-[#efe3c4]"
                    : "bg-[#002e1e]/20 text-[#002e1e]/30 cursor-not-allowed"
                }`}
                style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em" }}
              >
                {processing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-[#efe3c4]/30 border-t-[#efe3c4] rounded-full"
                  />
                ) : (
                  <>
                    <Lock size={14} />
                    PAGAR {plan.price}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

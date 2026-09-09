import { type ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const AUTH_BG =
  "https://images.unsplash.com/photo-1699046794994-865a62e9ff6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600";

export function AuthShell({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen bg-[#002e1e] flex items-center justify-center px-6 py-32 overflow-hidden"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="absolute inset-0">
        <ImageWithFallback src={AUTH_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#002e1e]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002e1e] via-[#002e1e]/20 to-[#002e1e]/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-[#efe3c4]/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10"
      >
        <Link to="/" className="flex flex-col items-center gap-0 mb-8">
          <span
            className="text-[#efe3c4] uppercase"
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, letterSpacing: "0.35em" }}
          >
            Colture
          </span>
          <span
            className="text-[#efe3c4] uppercase"
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, letterSpacing: "0.35em" }}
          >
            Club
          </span>
          <div className="w-6 h-[1px] bg-[#efe3c4]/60 mt-1" />
        </Link>

        <span
          className="block text-center text-[#efe3c4]/30 uppercase tracking-[0.4em] mb-3"
          style={{ fontSize: "0.6rem", fontWeight: 500 }}
        >
          {eyebrow}
        </span>
        <h1
          className="text-center text-[#efe3c4] mb-2"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 1.9rem)", fontWeight: 700, lineHeight: 1.15 }}
        >
          {title} {titleAccent && <span style={{ fontStyle: "italic" }}>{titleAccent}</span>}
        </h1>
        {subtitle && (
          <p
            className="text-center text-[#efe3c4]/40 mb-8"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.9rem", lineHeight: 1.6 }}
          >
            {subtitle}
          </p>
        )}

        <div className={subtitle ? "" : "mt-8"}>{children}</div>

        {footer && <div className="mt-8 pt-6 border-t border-[#efe3c4]/10 text-center">{footer}</div>}
      </motion.div>
    </div>
  );
}

export const authInputClass =
  "w-full px-5 py-3.5 rounded-xl border border-[#efe3c4]/12 bg-white/[0.04] text-[#efe3c4] placeholder-[#efe3c4]/25 focus:outline-none focus:border-[#efe3c4]/40 focus:bg-white/[0.07] transition-all duration-300";

export const authInputStyle = { fontSize: "0.88rem", lineHeight: 1.6 };

export function AuthError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="mb-4 px-4 py-3 rounded-lg bg-[#d4183d]/10 border border-[#d4183d]/25 text-[#f4a5b4]"
      style={{ fontSize: "0.8rem", lineHeight: 1.5 }}
    >
      {message}
    </p>
  );
}

export function AuthSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="mb-4 px-4 py-3 rounded-lg bg-[#efe3c4]/10 border border-[#efe3c4]/25 text-[#efe3c4]"
      style={{ fontSize: "0.8rem", lineHeight: 1.5 }}
    >
      {message}
    </p>
  );
}

export function AuthSubmit({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className="w-full px-8 py-3.5 bg-[#efe3c4] text-[#002e1e] rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
    >
      {children}
    </motion.button>
  );
}

export function AuthLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="text-[#efe3c4]/60 hover:text-[#efe3c4] transition-colors duration-300"
      style={{ fontSize: "0.82rem" }}
    >
      {children}
    </Link>
  );
}

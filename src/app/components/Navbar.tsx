import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../lib/auth";
import { useLanguage, type Language } from "../lib/i18n";

export function Navbar({ onSubscribe }: { onSubscribe?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const LINKS = [
    { label: t("nav.experiencias"), to: "/experiencias" },
    { label: "Editorial", to: "/editorial" },
    { label: t("nav.membresia"), to: "/membresia" },
    { label: t("nav.nosotros"), to: "/sobre" },
    { label: t("nav.contacto"), to: "/contacto" },
  ];

  const otherLang: Language = language === "es" ? "en" : "es";

  const handleLink = (link: (typeof LINKS)[0]) => {
    if (link.to.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(link.to.slice(2));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#002e1e] border-b border-[#efe3c4]/10">
      <div className="w-full px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col items-center gap-0">
          <span
            className="tracking-[0.3em] text-[#efe3c4] uppercase"
            style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.35em" }}
          >
            Colture
          </span>
          <span
            className="tracking-[0.3em] text-[#efe3c4] uppercase"
            style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.35em" }}
          >
            Club
          </span>
          <div className="w-6 h-[1px] bg-[#efe3c4]/60 mt-1" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => {
            const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + "/");
            return (
              <Link key={link.label} to={link.to} className="relative">
                <motion.span
                  className={`transition-colors duration-300 tracking-wider uppercase cursor-pointer ${isActive ? "text-[#efe3c4]" : "text-[#efe3c4]/80 hover:text-[#efe3c4]"}`}
                  style={{ fontSize: "0.75rem", letterSpacing: "0.15em", fontWeight: isActive ? 600 : 400 }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {link.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#efe3c4] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-5">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="flex items-center gap-1 text-[#efe3c4]/70 hover:text-[#efe3c4] transition-colors duration-300 uppercase tracking-wider cursor-pointer"
              style={{ fontSize: "0.75rem", letterSpacing: "0.15em", fontWeight: 500 }}
            >
              {language.toUpperCase()}
              <ChevronDown size={12} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.button
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => {
                    setLanguage(otherLang);
                    setLangOpen(false);
                  }}
                  className="absolute top-full mt-2 right-0 px-4 py-2 bg-[#002e1e] border border-[#efe3c4]/15 rounded-lg text-[#efe3c4]/70 hover:text-[#efe3c4] uppercase tracking-wider cursor-pointer"
                  style={{ fontSize: "0.75rem", fontWeight: 500 }}
                >
                  {otherLang.toUpperCase()}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <Link to="/panel" className="flex items-center gap-2 text-[#efe3c4]/80 hover:text-[#efe3c4] transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-[#efe3c4]/15 flex items-center justify-center">
                <User size={14} />
              </div>
              <span className="tracking-wider uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}>
                {user.name.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-[#efe3c4]/80 hover:text-[#efe3c4] transition-colors duration-300 tracking-wider uppercase"
              style={{ fontSize: "0.75rem", letterSpacing: "0.15em", fontWeight: 400 }}
            >
              {t("nav.login")}
            </Link>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 bg-[#efe3c4] text-[#002e1e] rounded-lg tracking-wider uppercase cursor-pointer"
            style={{ fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 600 }}
            onClick={onSubscribe}
          >
            {t("nav.subscribe")}
          </motion.button>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#efe3c4] cursor-pointer">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-[#efe3c4]/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {LINKS.map((link) => {
                const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + "/");
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`tracking-wider uppercase ${isActive ? "text-[#efe3c4]" : "text-[#efe3c4]/80"}`}
                    style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontWeight: isActive ? 600 : 400 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <button
                onClick={() => setLanguage(otherLang)}
                className="flex items-center gap-1 text-[#efe3c4]/70 uppercase tracking-wider cursor-pointer w-fit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}
              >
                {language.toUpperCase()} → {otherLang.toUpperCase()}
              </button>

              {user ? (
                <Link
                  to="/panel"
                  className="tracking-wider uppercase text-[#efe3c4]/80"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}
                  onClick={() => setIsOpen(false)}
                >
                  Mi panel
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="tracking-wider uppercase text-[#efe3c4]/80"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.login")}
                </Link>
              )}
              <button
                className="mt-2 px-5 py-2 bg-[#efe3c4] text-[#002e1e] rounded-lg tracking-wider uppercase cursor-pointer"
                style={{ fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 600 }}
                onClick={() => {
                  setIsOpen(false);
                  onSubscribe?.();
                }}
              >
                {t("nav.subscribe")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

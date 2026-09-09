import { motion } from "motion/react";
import { Instagram, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#f9f9f9] border-t border-[#002e1e]/8">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-start gap-0 mb-6">
              <span
                className="tracking-[0.3em] text-[#002e1e] uppercase"
                style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, letterSpacing: "0.35em" }}
              >
                Colture Club
              </span>
              <div className="w-6 h-[1px] bg-[#002e1e]/30 mt-2" />
            </div>
            <p
              className="text-[#002e1e]/50 max-w-xs"
              style={{ fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300 }}
            >
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[Instagram, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-[#002e1e]/5 flex items-center justify-center text-[#002e1e]/40 hover:text-[#002e1e] hover:bg-[#002e1e]/10 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-[#002e1e]/40 uppercase tracking-widest mb-4"
              style={{ fontSize: "0.7rem", fontWeight: 600 }}
            >
              {t("footer.explore")}
            </h4>
            <ul className="space-y-3">
              {["Experiencias", "Editorial", "Membresía", "Nosotros", "Contacto"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#002e1e]/60 hover:text-[#002e1e] transition-colors"
                    style={{ fontSize: "0.85rem", fontWeight: 400 }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[#002e1e]/40 uppercase tracking-widest mb-4"
              style={{ fontSize: "0.7rem", fontWeight: 600 }}
            >
              {t("footer.contact")}
            </h4>
            <div className="space-y-3 text-[#002e1e]/60" style={{ fontSize: "0.85rem", fontWeight: 400 }}>
              <p className="flex items-center gap-2">
                <MapPin size={14} />
                Bogota, Colombia
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} />
                hola@coltureclub.co
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#002e1e]/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#002e1e]/30" style={{ fontSize: "0.75rem", fontWeight: 300 }}>
            &copy; 2026 Colture Club. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            {[t("footer.privacy"), t("footer.terms")].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#002e1e]/30 hover:text-[#002e1e]/60 transition-colors"
                style={{ fontSize: "0.75rem", fontWeight: 300 }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
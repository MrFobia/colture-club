import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "es" | "en";

const STORAGE_KEY = "cc_lang";

const dict = {
  es: {
    "nav.experiencias": "Experiencias",
    "nav.bonos": "Bonos",
    "nav.membresia": "Membresía",
    "nav.nosotros": "Nosotros",
    "nav.contacto": "Contacto",
    "nav.login": "Iniciar sesión",
    "nav.subscribe": "Suscribirme",
    "hero.eyebrow": "Experiencias curadas — Bogotá",
    "hero.headline": "La cultura no se consume, se convierte en territorio.",
    "hero.subtitle": "Latinoamérica no es tendencia. Es raíz.",
    "hero.paragraph":
      "Experiencias íntimas donde el arte, la gastronomía y el territorio se cruzan. Un club para quienes eligen vivir con profundidad.",
    "hero.cta": "Explorar experiencias",
    "hero.scroll": "Scroll",
    "philosophy.eyebrow": "Nuestra filosofía",
    "philosophy.headline": "Diseñamos acceso. Curamos contexto. Creamos comunidad.",
    "philosophy.paragraph":
      "Colture Club nace de una convicción muy simple: la cultura no es sólo entretenimiento, es capital social.",
    "philosophy.stat1": "Experiencias",
    "philosophy.stat2": "Asistentes",
    "philosophy.stat3": "Alianzas",
    "philosophy.discover": "Descubrir más",
    "finalCta.headline": "¿Listo para vivir la cultura de otra manera?",
    "finalCta.paragraph": "Únete a Colture Club y accede a experiencias curadas que transforman la forma en que vives tu ciudad.",
    "finalCta.button": "Suscribirme",
    "footer.tagline": "Cultura con propósito.",
    "footer.explore": "Explorar",
    "footer.contact": "Contacto",
    "footer.rights": "Todos los derechos reservados.",
    "footer.privacy": "Políticas de privacidad",
    "footer.terms": "Términos y condiciones",
  },
  en: {
    "nav.experiencias": "Experiences",
    "nav.bonos": "Gift Cards",
    "nav.membresia": "Membership",
    "nav.nosotros": "About",
    "nav.contacto": "Contact",
    "nav.login": "Sign in",
    "nav.subscribe": "Subscribe",
    "hero.eyebrow": "Curated experiences — Bogotá",
    "hero.headline": "Culture isn't consumed, it becomes territory.",
    "hero.subtitle": "Latin America isn't a trend. It's a root.",
    "hero.paragraph":
      "Intimate experiences where art, gastronomy and territory meet. A club for those who choose to live with depth.",
    "hero.cta": "Explore experiences",
    "hero.scroll": "Scroll",
    "philosophy.eyebrow": "Our philosophy",
    "philosophy.headline": "We design access. We curate context. We create community.",
    "philosophy.paragraph":
      "Colture Club was born from a simple conviction: culture isn't just entertainment, it's social capital.",
    "philosophy.stat1": "Experiences",
    "philosophy.stat2": "Attendees",
    "philosophy.stat3": "Partners",
    "philosophy.discover": "Discover more",
    "finalCta.headline": "Ready to experience culture differently?",
    "finalCta.paragraph": "Join Colture Club and access curated experiences that transform the way you live your city.",
    "finalCta.button": "Subscribe",
    "footer.tagline": "Culture with purpose.",
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy policy",
    "footer.terms": "Terms & conditions",
  },
} as const;

export type TranslationKey = keyof typeof dict["es"];

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "es";
    return (localStorage.getItem(STORAGE_KEY) as Language) || "es";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key) => dict[language][key] ?? dict.es[key] ?? key,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  return ctx;
}

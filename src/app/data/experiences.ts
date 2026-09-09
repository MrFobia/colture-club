export type Category = "Arte" | "Música" | "Gastronomía" | "Coleccionismo" | "Literatura" | "Bienestar";

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  address: string;
  image: string;
  gallery: string[];
  capacity: number;
  spotsLeft: number;
  price: string;
  isPast: boolean;
  isFeatured?: boolean;
  highlights: string[];
}

export const CATEGORIES: Category[] = [
  "Arte",
  "Música",
  "Gastronomía",
  "Coleccionismo",
  "Literatura",
  "Bienestar",
];

export const EXPERIENCES: Experience[] = [
  {
    id: "cena-a-ciegas-candelaria",
    title: "Cena a ciegas en La Candelaria",
    subtitle: "Una experiencia sensorial donde el sabor guía",
    description: "Descubre la gastronomía bogotana sin el sentido de la vista. Una cena íntima para 12 personas en una casona colonial restaurada.",
    longDescription: "Sumérgete en una experiencia gastronómica sin precedentes. En el corazón de La Candelaria, una casona colonial del siglo XVIII se transforma en un espacio donde los sentidos se agudizan. Sin luz, sin distracciones visuales, solo el aroma, la textura y el sabor de un menú de 7 tiempos creado por el chef invitado. Cada plato cuenta una historia de la cocina colombiana contemporánea, reinterpretada con técnicas de vanguardia.\n\nLa velada incluye maridaje con vinos naturales y una conversación guiada sobre la relación entre percepción y memoria gustativa.",
    category: "Gastronomía",
    date: "12 de Abril, 2026",
    time: "7:30 PM",
    location: "Casa Quiñones",
    address: "Calle 10 #3-52, La Candelaria, Bogotá",
    image: "https://images.unsplash.com/photo-1759774310887-1c62776ba950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY2FuZGxlbGlnaHQlMjBkaW5uZXIlMjB0YWJsZSUyMHNldHRpbmd8ZW58MXx8fHwxNzczODQ2MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1759774310887-1c62776ba950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY2FuZGxlbGlnaHQlMjBkaW5uZXIlMjB0YWJsZSUyMHNldHRpbmd8ZW58MXx8fHwxNzczODQ2MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1621494548002-bfc916172ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwa2l0Y2hlbiUyMHBsYXRpbmclMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc3Mzg0NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1598617677009-abca71cd8319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRpbWF0ZSUyMGRpbm5lciUyMGNhbmRsZWxpZ2h0JTIwY3VsdHVyYWwlMjBldmVudHxlbnwxfHx8fDE3NzM4NDUzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: 12,
    spotsLeft: 3,
    price: "$280.000 COP",
    isPast: false,
    isFeatured: true,
    highlights: ["Menú de 7 tiempos", "Maridaje con vinos naturales", "12 personas máximo", "Casona colonial s. XVIII"],
  },
  {
    id: "dialogos-con-el-barro",
    title: "Diálogos con el barro",
    subtitle: "Taller de cerámica contemplativa",
    description: "Un encuentro con la arcilla como medio de expresión y meditación. Guiado por la ceramista Lucía Jaramillo.",
    longDescription: "El barro nos enseña paciencia. En este taller de 4 horas, la ceramista Lucía Jaramillo guía un proceso donde la técnica es secundaria y la presencia es protagonista. Trabajarás con arcilla local extraída de las montañas de Boyacá, aprendiendo técnicas ancestrales de modelado a mano.\n\nEl taller incluye una sesión de meditación guiada, materiales, quema de las piezas y recogida posterior. Un espacio para desacelerar y reconectarse con lo esencial.",
    category: "Arte",
    date: "28 de Marzo, 2026",
    time: "10:00 AM",
    location: "Taller Raíz",
    address: "Cra 5 #26-40, Chapinero, Bogotá",
    image: "https://images.unsplash.com/photo-1737564483280-15481c31608a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjB3b3Jrc2hvcCUyMGhhbmRzfGVufDF8fHx8MTc3Mzg0MzgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1737564483280-15481c31608a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjB3b3Jrc2hvcCUyMGhhbmRzfGVufDF8fHx8MTc3Mzg0MzgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1571990604349-d8b7d3c7e1da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBnYXJkZW4lMjBtZWRpdGF0aW9uJTIwZ3JlZW58ZW58MXx8fHwxNzczODQ2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: 8,
    spotsLeft: 0,
    price: "$180.000 COP",
    isPast: true,
    highlights: ["Arcilla de Boyacá", "Meditación guiada", "8 personas máximo", "Incluye quema de piezas"],
  },
  {
    id: "vinilos-y-vermut",
    title: "Vinilos & Vermut",
    subtitle: "Sesión de escucha profunda",
    description: "Una tarde de escucha activa con vinilos originales de jazz latinoamericano, acompañada de vermut artesanal.",
    longDescription: "En un espacio diseñado para la escucha, cada disco se presenta con su contexto histórico y musical. Esta sesión explora el jazz latinoamericano de los años 60 y 70 — desde el Bossa Nova brasileño hasta las fusiones andinas colombianas.\n\nAcompañado de vermut artesanal colombiano y una selección de quesos locales, el coleccionista Andrés Mejía comparte piezas raras de su colección personal de más de 3.000 vinilos.",
    category: "Música",
    date: "15 de Febrero, 2026",
    time: "4:00 PM",
    location: "Salón Diecisiete",
    address: "Calle 17 #5-12, La Macarena, Bogotá",
    image: "https://images.unsplash.com/photo-1766353860398-7aebfc206b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdmlueWwlMjByZWNvcmRzJTIwY29sbGVjdGlvbiUyMG11c2ljfGVufDF8fHx8MTc3Mzg0NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1766353860398-7aebfc206b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdmlueWwlMjByZWNvcmRzJTIwY29sbGVjdGlvbiUyMG11c2ljfGVufDF8fHx8MTc3Mzg0NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1707944495801-2a5d59833f8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwc2F4b3Bob25lJTIwY2x1YiUyMG5pZ2h0JTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzczODQ2MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: 15,
    spotsLeft: 0,
    price: "$120.000 COP",
    isPast: true,
    highlights: ["Vinilos originales años 60-70", "Vermut artesanal", "Jazz latinoamericano", "Colección de 3.000 discos"],
  },
  {
    id: "cartografias-del-sabor",
    title: "Cartografías del sabor",
    subtitle: "Ruta gastronómica por Bogotá",
    description: "Un recorrido por 5 paradas secretas de la gastronomía bogotana, desde plazas de mercado hasta cocinas de autor.",
    longDescription: "Bogotá es un mapa comestible. Este recorrido de 5 horas conecta 5 puntos de la ciudad donde la cocina colombiana se reinventa: desde el bullicio del mercado de Paloquemao hasta la calma de una cocina de autor en Usaquén.\n\nCada parada incluye degustación, conversación con los cocineros y un cuaderno de viaje gastronómico para documentar la experiencia. Caminarás por calles que cuentan historias y probarás sabores que no están en ningún menú turístico.",
    category: "Gastronomía",
    date: "8 de Enero, 2026",
    time: "9:00 AM",
    location: "Punto de encuentro: Plaza de Bolívar",
    address: "Cra 7 #10-80, Centro, Bogotá",
    image: "https://images.unsplash.com/photo-1621494548002-bfc916172ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwa2l0Y2hlbiUyMHBsYXRpbmclMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc3Mzg0NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1621494548002-bfc916172ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwa2l0Y2hlbiUyMHBsYXRpbmclMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc3Mzg0NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1759774310887-1c62776ba950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY2FuZGxlbGlnaHQlMjBkaW5uZXIlMjB0YWJsZSUyMHNldHRpbmd8ZW58MXx8fHwxNzczODQ2MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: 10,
    spotsLeft: 0,
    price: "$220.000 COP",
    isPast: true,
    highlights: ["5 paradas secretas", "Degustaciones incluidas", "Cuaderno de viaje", "5 horas de recorrido"],
  },
  {
    id: "arte-contemporaneo-recorrido",
    title: "El arte como espejo",
    subtitle: "Recorrido guiado por galerías de Chapinero",
    description: "Visita curada por 4 galerías de arte contemporáneo con conversaciones con los artistas y curadores.",
    longDescription: "Este recorrido por las galerías más relevantes de Chapinero no es una visita convencional. Cada parada es una conversación: con el artista, con el curador, con la obra. Exploraremos 4 espacios que están redefiniendo la escena del arte contemporáneo colombiano.\n\nDesde instalaciones inmersivas hasta pintura experimental, cada galería revela una faceta distinta de la identidad artística latinoamericana. Incluye catálogos exclusivos y un coctel de cierre en la última galería.",
    category: "Arte",
    date: "20 de Noviembre, 2025",
    time: "3:00 PM",
    location: "Galería Santa Fe",
    address: "Cra 7 #64-50, Chapinero, Bogotá",
    image: "https://images.unsplash.com/photo-1720107724543-deba14f71a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeSUyMHBlb3BsZXxlbnwxfHx8fDE3NzM4NDYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1720107724543-deba14f71a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeSUyMHBlb3BsZXxlbnwxfHx8fDE3NzM4NDYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1763217049383-fa54764df3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwYXJ0JTIwZ2FsbGVyeSUyMGludGVyaW9yJTIwbXVzZXVtJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczNzg3MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: 15,
    spotsLeft: 0,
    price: "$150.000 COP",
    isPast: true,
    highlights: ["4 galerías curadas", "Conversación con artistas", "Catálogos exclusivos", "Coctel de cierre"],
  },
  {
    id: "ritual-del-cafe",
    title: "El ritual del café",
    subtitle: "De la semilla a la taza, un viaje sensorial",
    description: "Inmersión en el proceso del café especial colombiano con catación guiada por un Q-Grader certificado.",
    longDescription: "Colombia es café, pero pocos colombianos conocen la profundidad de su propia tradición. En este taller, un Q-Grader certificado guía un recorrido sensorial desde la semilla hasta la taza.\n\nAprenderás sobre perfiles de tueste, métodos de extracción y la historia detrás de los cafés de origen único de fincas colombianas. Incluye una catación profesional de 6 cafés de diferentes regiones y un kit para llevarte a casa.",
    category: "Gastronomía",
    date: "5 de Mayo, 2026",
    time: "10:00 AM",
    location: "Laboratorio Café Origen",
    address: "Calle 79 #9-15, Zona G, Bogotá",
    image: "https://images.unsplash.com/photo-1635991062422-b3e2f8c36dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjBjb2ZmZWUlMjBwbGFudGF0aW9uJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3Mzg0MjcxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1635991062422-b3e2f8c36dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjBjb2ZmZWUlMjBwbGFudGF0aW9uJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3Mzg0MjcxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1742320086662-56a3c278734b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBwbGFudGF0aW9uJTIwYWVyaWFsJTIwbHVzaCUyMHRyb3BpY2FsfGVufDF8fHx8MTc3Mzg0NjczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600892218480-5bf643021230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kJTIwcGlja2luZyUyMGNvZmZlZSUyMGNoZXJyaWVzJTIwcmVkfGVufDF8fHx8MTc3Mzg0NjczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1741012253890-a62490e7ea3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGRyeWluZyUyMHN1biUyMGZhcm18ZW58MXx8fHwxNzczODQ2NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1762195657410-112fbc6f2d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXBwaW5nJTIwdGFzdGluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM4NDEwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1748894851733-be6747a9c061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VyJTIwb3ZlciUyMGNvZmZlZSUyMGJyZXdpbmclMjBhcnRpc2FufGVufDF8fHx8MTc3Mzg0NjczMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: 10,
    spotsLeft: 7,
    price: "$160.000 COP",
    isPast: false,
    highlights: ["Q-Grader certificado", "6 cafés de origen", "Kit para llevar", "Catación profesional"],
  },
  {
    id: "caligrafía-contemplativa",
    title: "Caligrafía contemplativa",
    subtitle: "El trazo como meditación",
    description: "Taller de caligrafía con tinta y pluma donde el proceso importa más que el resultado.",
    longDescription: "En este taller, la caligrafía se convierte en una práctica meditativa. Con pluma metálica y tinta artesanal, explorarás el trazo como forma de presencia. No necesitas experiencia previa: lo que buscamos no es la perfección del trazo sino la calma del proceso.\n\nGuiado por el calígrafo Santiago Rueda, el taller incluye materiales importados, un cuaderno artesanal y una pieza personal para enmarcar.",
    category: "Arte",
    date: "22 de Mayo, 2026",
    time: "2:00 PM",
    location: "Espacio Blanco",
    address: "Calle 85 #12-20, Zona G, Bogotá",
    image: "https://images.unsplash.com/photo-1611348586755-53860f7ae57a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxsaWdyYXBoeSUyMGluayUyMHdyaXRpbmclMjBoYW5kcyUyMGFydHxlbnwxfHx8fDE3NzM4NDYxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1611348586755-53860f7ae57a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxsaWdyYXBoeSUyMGluayUyMHdyaXRpbmclMjBoYW5kcyUyMGFydHxlbnwxfHx8fDE3NzM4NDYxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1730832970158-152ffa2307e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmVhZGluZyUyMGxpdGVyYXJ5JTIwc2Fsb24lMjB3YXJtfGVufDF8fHx8MTc3Mzg0NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: 10,
    spotsLeft: 5,
    price: "$190.000 COP",
    isPast: false,
    highlights: ["Materiales importados", "Cuaderno artesanal", "Pieza para enmarcar", "Sin experiencia previa"],
  },
  {
    id: "lecturas-al-atardecer",
    title: "Lecturas al atardecer",
    subtitle: "Salón literario con vista a los cerros",
    description: "Un encuentro íntimo para leer, compartir y conversar sobre literatura latinoamericana contemporánea.",
    longDescription: "Cada mes, un salón literario se abre en un ático con vista a los cerros orientales de Bogotá. Un escritor invitado presenta un texto, lo lee en voz alta, y la conversación fluye entre copa y copa de vino.\n\nNo es un club de lectura convencional: es un espacio donde la literatura se vive como experiencia colectiva. Incluye el libro del autor invitado firmado y una selección de vinos y quesos.",
    category: "Literatura",
    date: "18 de Junio, 2026",
    time: "5:30 PM",
    location: "Ático Literario",
    address: "Cra 4 #27-03, Piso 8, La Macarena, Bogotá",
    image: "https://images.unsplash.com/photo-1730832970158-152ffa2307e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmVhZGluZyUyMGxpdGVyYXJ5JTIwc2Fsb24lMjB3YXJtfGVufDF8fHx8MTc3Mzg0NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1730832970158-152ffa2307e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmVhZGluZyUyMGxpdGVyYXJ5JTIwc2Fsb24lMjB3YXJtfGVufDF8fHx8MTc3Mzg0NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: 12,
    spotsLeft: 9,
    price: "$95.000 COP",
    isPast: false,
    highlights: ["Libro firmado incluido", "Vista a los cerros", "Vinos y quesos", "Escritor invitado"],
  },
];
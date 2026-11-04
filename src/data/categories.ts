export interface CategoryDef {
  slug: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "gastronomia",
    name: "Gastronomía & Restaurantes",
    icon: "Utensils",
    description: "Restaurantes, cafeterías, bares, repostería y delivery de comida.",
    color: "#ea580c",
  },
  {
    slug: "tecnologia",
    name: "Tecnología & Software",
    icon: "Laptop",
    description: "Desarrollo web, soporte técnico, ciberseguridad y marketing digital.",
    color: "#2563eb",
  },
  {
    slug: "salud-medicina",
    name: "Salud, Medicina & Farmacias",
    icon: "HeartPulse",
    description: "Clínicas, consultorios médicos, odontología, farmacias y laboratorios.",
    color: "#dc2626",
  },
  {
    slug: "servicios-profesionales",
    name: "Servicios Profesionales",
    icon: "Briefcase",
    description: "Abogados, contadores, consultorías financieras y notarías.",
    color: "#4f46e5",
  },
  {
    slug: "comercio-tiendas",
    name: "Comercio & Tiendas",
    icon: "ShoppingBag",
    description: "Moda, calzado, electrónica, supermercados y tiendas departamentales.",
    color: "#059669",
  },
  {
    slug: "belleza-spa",
    name: "Belleza, Barberías & Spa",
    icon: "Sparkles",
    description: "Salones de belleza, barberías, estética corporal, uñas y masajes.",
    color: "#db2777",
  },
  {
    slug: "automotriz",
    name: "Automotriz & Talleres",
    icon: "Car",
    description: "Talleres mecánicos, venta de repuestos, concesionarios y autolavados.",
    color: "#d97706",
  },
  {
    slug: "educacion",
    name: "Educación & Cursos",
    icon: "GraduationCap",
    description: "Universidades, academias de idiomas, cursos técnicos y colegios.",
    color: "#7c3aed",
  },
  {
    slug: "turismo-hoteles",
    name: "Turismo, Hoteles & Viajes",
    icon: "Plane",
    description: "Hoteles, hostales, agencias de viaje, guías turísticos y transporte.",
    color: "#0891b2",
  },
  {
    slug: "inmobiliaria-construccion",
    name: "Inmobiliaria & Construcción",
    icon: "Building2",
    description: "Bienes raíces, venta y arriendo de propiedades, arquitectura e ingeniería.",
    color: "#0d9488",
  },
  {
    slug: "hogar-mantenimiento",
    name: "Hogar & Mantenimiento",
    icon: "Wrench",
    description: "Plomería, electricidad, cerrajería, pintura y diseño de interiores.",
    color: "#65a30d",
  },
  {
    slug: "fitness-deportes",
    name: "Fitness, Gimnasios & Deportes",
    icon: "Dumbbell",
    description: "Gimnasios, crossfit, canchas deportivas, artes marciales y nutrición.",
    color: "#e11d48",
  },
];

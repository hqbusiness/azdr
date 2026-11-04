const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { DatabaseSync } = require("node:sqlite");

const DB_DIR = path.join(__dirname, "..", "prisma");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
const DB_PATH = path.join(DB_DIR, "directorio.db");

const db = new DatabaseSync(DB_PATH);

// Initialize schema
db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    passwordHash TEXT,
    image TEXT,
    provider TEXT DEFAULT 'credentials',
    role TEXT DEFAULT 'USER',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT,
    color TEXT
  );

  CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    shortDescription TEXT,
    categoryId TEXT NOT NULL,
    country TEXT NOT NULL,
    countryCode TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    logoUrl TEXT,
    bannerUrl TEXT,
    whatsapp TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    website TEXT,
    instagram TEXT,
    facebook TEXT,
    linkedin TEXT,
    schedule TEXT,
    featured INTEGER DEFAULT 0,
    verified INTEGER DEFAULT 1,
    rating REAL DEFAULT 5.0,
    userId TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
  CREATE INDEX IF NOT EXISTS idx_businesses_country ON businesses(country);
  CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(categoryId);
  CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses(featured);
`);

const CATEGORIES_SEED = [
  { slug: "gastronomia", name: "Gastronomía & Restaurantes", icon: "Utensils", description: "Restaurantes, cafeterías, bares y repostería.", color: "#ea580c" },
  { slug: "tecnologia", name: "Tecnología & Software", icon: "Laptop", description: "Desarrollo web, soporte técnico y soluciones digitales.", color: "#2563eb" },
  { slug: "salud-medicina", name: "Salud, Medicina & Farmacias", icon: "HeartPulse", description: "Clínicas, consultorios médicos, odontología y farmacias.", color: "#dc2626" },
  { slug: "servicios-profesionales", name: "Servicios Profesionales", icon: "Briefcase", description: "Abogados, contadores, asesorías y consultoría.", color: "#4f46e5" },
  { slug: "comercio-tiendas", name: "Comercio & Tiendas", icon: "ShoppingBag", description: "Moda, calzado, electrónica y tiendas locales.", color: "#059669" },
  { slug: "belleza-spa", name: "Belleza, Barberías & Spa", icon: "Sparkles", description: "Peluquerías, barberías, estética y masajes.", color: "#db2777" },
  { slug: "automotriz", name: "Automotriz & Talleres", icon: "Car", description: "Talleres mecánicos, repuestos y mantenimiento automotor.", color: "#d97706" },
  { slug: "educacion", name: "Educación & Cursos", icon: "GraduationCap", description: "Academias, institutos, idiomas y formación profesional.", color: "#7c3aed" },
  { slug: "turismo-hoteles", name: "Turismo, Hoteles & Viajes", icon: "Plane", description: "Hoteles boutique, hostales, tours y excursiones.", color: "#0891b2" },
  { slug: "inmobiliaria-construccion", name: "Inmobiliaria & Construcción", icon: "Building2", description: "Agencias inmobiliarias, proyectos y remodelación.", color: "#0d9488" },
  { slug: "hogar-mantenimiento", name: "Hogar & Mantenimiento", icon: "Wrench", description: "Electricistas, fontanería, reformas y carpintería.", color: "#65a30d" },
  { slug: "fitness-deportes", name: "Fitness, Gimnasios & Deportes", icon: "Dumbbell", description: "Gimnasios, entrenamiento personalizado y bienestar físico.", color: "#e11d48" },
];

const BUSINESSES_SEED = [
  {
    name: "Café San Alberto & Tostadores",
    slug: "cafe-san-alberto-bogota",
    categorySlug: "gastronomia",
    country: "Colombia",
    countryCode: "CO",
    city: "Bogotá",
    address: "Cra. 7 #71-52, Chapinero",
    latitude: 4.6548,
    longitude: -74.0568,
    logoUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
    whatsapp: "+573105558899",
    phone: "+57 1 3125678",
    email: "contacto@cafesanalberto.co",
    website: "https://cafesanalberto.co",
    instagram: "cafesanalberto",
    facebook: "cafesanalbertocol",
    schedule: "Lunes a Sábado: 07:30 - 20:00 | Domingo: 09:00 - 18:00",
    description: "Café de origen especial cosechado en las montañas de Colombia. Más que una taza, una experiencia sensorial con métodos de filtrado de clase mundial, repostería artesanal y espacio para reuniones de trabajo y coworking.",
    shortDescription: "Café especial colombiano de origen con barra de filtrados y repostería artesanal en Chapinero.",
    featured: 1,
    rating: 4.9,
  },
  {
    name: "TechNova Soluciones Digitales",
    slug: "technova-cdmx",
    categorySlug: "tecnologia",
    country: "México",
    countryCode: "MX",
    city: "Ciudad de México",
    address: "Paseo de la Reforma 222, Cuauhtémoc",
    latitude: 19.4295,
    longitude: -99.1627,
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    whatsapp: "+525541239876",
    phone: "+52 55 5241 8000",
    email: "hola@technovamx.com",
    website: "https://technovamx.com",
    instagram: "technova_mx",
    linkedin: "technova-solutions",
    schedule: "Lunes a Viernes: 09:00 - 18:30",
    description: "Agencia boutique especializada en desarrollo de software a medida, aplicaciones móviles, soluciones cloud y transformación digital para empresas en todo México y Latinoamérica.",
    shortDescription: "Desarrollo de software a la medida, aplicaciones móviles y transformación digital corporativa.",
    featured: 1,
    rating: 5.0,
  },
  {
    name: "Parrilla Don Julio Palermo",
    slug: "parrilla-don-julio-palermo",
    categorySlug: "gastronomia",
    country: "Argentina",
    countryCode: "AR",
    city: "Buenos Aires",
    address: "Guatemala 4699, Palermo Soho",
    latitude: -34.5862,
    longitude: -58.4246,
    logoUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    whatsapp: "+5491148319564",
    phone: "+54 11 4831 9564",
    email: "reservas@parrilladonjulio.ar",
    website: "https://parrilladonjulio.ar",
    instagram: "donjulioparrilla",
    schedule: "Martes a Domingo: 12:00 - 16:00 y 19:30 - 01:00",
    description: "Cortes de carne vacuna de pastura seleccionados con rigurosidad, maduración en bodega propia y una de las cavas de vinos argentinos más galardonadas de América Latina.",
    shortDescription: "Tradicional parrilla argentina de cortes premium y exclusiva cava de vinos en Palermo.",
    featured: 1,
    rating: 4.8,
  },
  {
    name: "Clínica Dental Andina",
    slug: "clinica-dental-andina-santiago",
    categorySlug: "salud-medicina",
    country: "Chile",
    countryCode: "CL",
    city: "Santiago",
    address: "Av. Providencia 1208, Providencia",
    latitude: -33.4285,
    longitude: -70.6192,
    logoUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    whatsapp: "+56987654321",
    phone: "+56 2 2345 6789",
    email: "consultas@dentalandina.cl",
    website: "https://dentalandina.cl",
    instagram: "dentalandina_cl",
    schedule: "Lunes a Viernes: 08:30 - 19:30 | Sábados: 09:00 - 14:00",
    description: "Centro odontológico integral de alta tecnología. Especialistas en ortodoncia invisible, diseño de sonrisa digital, implantología guiada y estética dental con trato personalizado.",
    shortDescription: "Centro odontológico de alta tecnología, diseño de sonrisa y ortodoncia en Providencia.",
    featured: 0,
    rating: 4.9,
  },
  {
    name: "Cusco Magic Travel & Tours",
    slug: "cusco-magic-travel-peru",
    categorySlug: "turismo-hoteles",
    country: "Perú",
    countryCode: "PE",
    city: "Cusco",
    address: "Portal de Carnes 236, Plaza de Armas",
    latitude: -13.5167,
    longitude: -71.9788,
    logoUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=80",
    whatsapp: "+51984123456",
    phone: "+51 84 256789",
    email: "info@cuscomagictravel.pe",
    website: "https://cuscomagictravel.pe",
    instagram: "cuscomagic",
    facebook: "cuscomagictours",
    schedule: "Lunes a Domingo: 07:00 - 21:00",
    description: "Agencia de turismo receptivo con guías certificados y bilingües. Paquetes personalizados a Machu Picchu, Valle Sagrado, Montaña de 7 Colores y laguna Humantay.",
    shortDescription: "Tours y excursiones personalizadas a Machu Picchu y los mejores destinos del Cusco.",
    featured: 1,
    rating: 5.0,
  },
  {
    name: "Estudio Jurídico & Notarial Paulista",
    slug: "estudio-paulista-sao-paulo",
    categorySlug: "servicios-profesionales",
    country: "Brasil",
    countryCode: "BR",
    city: "São Paulo",
    address: "Av. Paulista 1079, Bela Vista",
    latitude: -23.5644,
    longitude: -46.6524,
    logoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    whatsapp: "+5511998765432",
    phone: "+55 11 3245 7890",
    email: "atendimento@paulistajuridico.com.br",
    website: "https://paulistajuridico.com.br",
    linkedin: "paulista-advogados",
    schedule: "Segunda a Sexta: 08:30 - 18:00",
    description: "Assessoria jurídica e societária empresarial de referência na capital paulista. Especialistas em direito tributário, contratos internacionais, societário e propriedade intelectual.",
    shortDescription: "Assessoria jurídica empresarial, contratos e compliance tributário na Av. Paulista.",
    featured: 0,
    rating: 4.8,
  },
  {
    name: "Barbería & Spa El Gran Caballero",
    slug: "barberia-el-gran-caballero-medellin",
    categorySlug: "belleza-spa",
    country: "Colombia",
    countryCode: "CO",
    city: "Medellín",
    address: "Cra. 37 #8A-42, El Poblado",
    latitude: 6.2088,
    longitude: -75.5684,
    logoUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80",
    whatsapp: "+573009876543",
    phone: "+57 4 444 8899",
    email: "citas@elgrancaballero.co",
    website: "https://elgrancaballero.co",
    instagram: "grancaballero_barber",
    schedule: "Lunes a Sábado: 10:00 - 20:00",
    description: "Experiencia clásica de barbería tradicional combinada con tratamientos de spa masculino, corte a navaja, toallas calientes y servicio de coctelería de cortesía en El Poblado.",
    shortDescription: "Barbería clásica, afeitado tradicional a navaja y spa masculino en El Poblado.",
    featured: 0,
    rating: 4.9,
  },
  {
    name: "Inmobiliaria Mar del Plata Real Estate",
    slug: "inmobiliaria-mar-del-plata",
    categorySlug: "inmobiliaria-construccion",
    country: "Argentina",
    countryCode: "AR",
    city: "Mar del Plata",
    address: "Güemes 3140, Los Troncos",
    latitude: -38.0125,
    longitude: -57.5448,
    logoUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    whatsapp: "+5492235123456",
    phone: "+54 223 486 3210",
    email: "info@mardelplatarealestate.com",
    website: "https://mardelplatarealestate.com",
    instagram: "mdp_realestate",
    schedule: "Lunes a Viernes: 09:30 - 18:30 | Sábados: 10:00 - 13:00",
    description: "Venta, alquiler y tasaciones de propiedades exclusivas en la costa atlántica argentina. Departamentos frente al mar, chalets en barrios residenciales e inversiones seguras.",
    shortDescription: "Propiedades exclusivas, departamentos con vista al mar y tasaciones en Mar del Plata.",
    featured: 0,
    rating: 4.7,
  },
  {
    name: "AutoFix Taller Mecánico Especializado",
    slug: "autofix-taller-guadalajara",
    categorySlug: "automotriz",
    country: "México",
    countryCode: "MX",
    city: "Guadalajara",
    address: "Av. Vallarta 3233, Vallarta Poniente",
    latitude: 20.6756,
    longitude: -103.3922,
    logoUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&q=80",
    whatsapp: "+523314567890",
    phone: "+52 33 3616 4500",
    email: "servicio@autofixgdl.com",
    website: "https://autofixgdl.com",
    facebook: "autofixgdl",
    schedule: "Lunes a Viernes: 08:00 - 18:00 | Sábado: 08:30 - 14:00",
    description: "Taller electromecánico multimarca con diagnóstico computarizado de última generación. Servicio de frenos, suspensión, afinación mayor, aire acondicionado y garantía por escrito.",
    shortDescription: "Diagnóstico computarizado, mecánica integral y mantenimiento preventivo multimarca.",
    featured: 0,
    rating: 4.9,
  },
  {
    name: "Club Cross & Fitness Miraflores",
    slug: "cross-fitness-miraflores-lima",
    categorySlug: "fitness-deportes",
    country: "Perú",
    countryCode: "PE",
    city: "Lima",
    address: "Av. Larco 880, Miraflores",
    latitude: -12.1287,
    longitude: -77.0298,
    logoUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80",
    whatsapp: "+51999888777",
    phone: "+51 1 445 6789",
    email: "entrena@crossfitnesslima.pe",
    website: "https://crossfitnesslima.pe",
    instagram: "crossfitnesslima",
    schedule: "Lunes a Viernes: 06:00 - 22:00 | Sábado y Domingo: 08:00 - 16:00",
    description: "El centro de entrenamiento funcional y acondicionamiento más moderno de Miraflores. Entrenadores certificados, nutrición deportiva personalizada y comunidad activa.",
    shortDescription: "Entrenamiento funcional, crossfit y preparación física de alto nivel en Miraflores.",
    featured: 1,
    rating: 5.0,
  }
];

async function seed() {
  console.log("Iniciando sembrado de la base de datos SQLite...");

  // 1. Usuario Demo
  const demoEmail = "demo@directoriolatam.com";
  let user = db.prepare("SELECT * FROM users WHERE email = ?").get(demoEmail);
  const demoPasswordHash = await bcrypt.hash("demo1234", 10);
  const now = new Date().toISOString();

  if (!user) {
    const userId = crypto.randomUUID();
    db.prepare(`
      INSERT INTO users (id, email, name, passwordHash, image, provider, role, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      demoEmail,
      "Usuario Emprendedor LatAm",
      demoPasswordHash,
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      "credentials",
      "ADMIN",
      now,
      now
    );
    user = { id: userId, email: demoEmail };
    console.log("Usuario demo creado:", demoEmail);
  } else {
    console.log("Usuario demo ya existente:", demoEmail);
  }

  // 2. Categorías
  const catMap = {};
  for (const cat of CATEGORIES_SEED) {
    let existingCat = db.prepare("SELECT * FROM categories WHERE slug = ?").get(cat.slug);
    if (!existingCat) {
      const catId = crypto.randomUUID();
      db.prepare(`
        INSERT INTO categories (id, slug, name, icon, description, color)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(catId, cat.slug, cat.name, cat.icon, cat.description, cat.color);
      catMap[cat.slug] = catId;
    } else {
      catMap[cat.slug] = existingCat.id;
    }
  }
  console.log(`Categorías cargadas: ${Object.keys(catMap).length}`);

  // 3. Negocios de Muestra
  for (const b of BUSINESSES_SEED) {
    const catId = catMap[b.categorySlug];
    if (!catId) continue;

    const existingBiz = db.prepare("SELECT * FROM businesses WHERE slug = ?").get(b.slug);
    if (!existingBiz) {
      const bizId = crypto.randomUUID();
      db.prepare(`
        INSERT INTO businesses (
          id, slug, name, description, shortDescription, categoryId,
          country, countryCode, city, address, latitude, longitude,
          logoUrl, bannerUrl, whatsapp, phone, email, website,
          instagram, facebook, linkedin, schedule, featured, verified,
          rating, userId, createdAt, updatedAt
        ) VALUES (
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?
        )
      `).run(
        bizId,
        b.slug,
        b.name,
        b.description,
        b.shortDescription,
        catId,
        b.country,
        b.countryCode,
        b.city,
        b.address,
        b.latitude,
        b.longitude,
        b.logoUrl,
        b.bannerUrl,
        b.whatsapp,
        b.phone,
        b.email,
        b.website,
        b.instagram || null,
        b.facebook || null,
        b.linkedin || null,
        b.schedule || null,
        b.featured ? 1 : 0,
        1,
        b.rating,
        user.id,
        now,
        now
      );
    }
  }
  console.log(`Negocios cargados: ${BUSINESSES_SEED.length}`);
  console.log("¡Base de datos sembrada exitosamente!");
}

seed().catch((err) => {
  console.error("Error en sembrado:", err);
  process.exit(1);
});

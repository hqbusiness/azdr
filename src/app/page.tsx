import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BusinessCard from "@/components/BusinessCard";
import CategoryCard from "@/components/CategoryCard";
import { LATAM_COUNTRIES } from "@/data/locations";
import {
  Search,
  MapPin,
  Building,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Globe2,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 0; // Dynamic server rendering

export default async function HomePage() {
  // Fetch featured businesses & categories with count
  const [featuredBusinesses, categories] = await Promise.all([
    prisma.business.findMany({
      where: { featured: true },
      take: 6,
    }),
    prisma.category.findMany({
      include: {
        _count: { select: { businesses: true } },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFAF6]">
      {/* HERO SECTION - Corporate AZ Directorio Styling */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#aa0055] via-[#850042] to-[#450023] text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        {/* Subtle decorative grid pattern identical to azdirectorio.com */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #450023 0, #450023 1px, transparent 1px, transparent 42px), repeating-linear-gradient(90deg, #450023 0, #450023 1px, transparent 1px, transparent 42px)",
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#fd007e]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#450023]/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/20 border border-white/20 text-[#EFEDE6] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#FD007E]" />
              <span>Directorio Empresarial de Latinoamérica</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F6F3EC] leading-tight font-serif">
              El Índice de Empresas y Negocios{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd4e5] via-[#ffffff] to-[#ffb3d6]">
                Más Consultado
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#EFEDE6]/90 leading-relaxed max-w-2xl mx-auto font-sans">
              Descubre empresas, negocios, servicios y profesionales en las principales ciudades de Latinoamérica.
              Contacto directo e inmediato por <strong className="text-white underline decoration-[#FD007E]">WhatsApp</strong> y geolocalización precisa.
            </p>

            {/* SEARCH BAR FORM */}
            <form
              action="/negocios"
              method="GET"
              className="mt-8 p-2.5 sm:p-3 bg-[#FBFAF6] rounded-2xl shadow-2xl border border-[#D9D4C6] text-[#2C2E33] flex flex-col md:flex-row gap-2 max-w-4xl mx-auto"
            >
              {/* Keyword Search */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-white md:bg-transparent rounded-xl">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  name="search"
                  placeholder="¿Qué empresa, servicio o profesional buscas?"
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400 font-medium text-[#2C2E33]"
                />
              </div>

              {/* Category Select */}
              <div className="md:w-52 flex items-center gap-2 px-3 py-2 bg-white md:bg-transparent md:border-l border-[#D9D4C6] rounded-xl">
                <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  name="categoria"
                  defaultValue=""
                  className="w-full bg-transparent text-sm focus:outline-none text-[#2C2E33] font-medium cursor-pointer"
                >
                  <option value="">Todas las Categorías</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country Select */}
              <div className="md:w-48 flex items-center gap-2 px-3 py-2 bg-white md:bg-transparent md:border-l border-[#D9D4C6] rounded-xl">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  name="pais"
                  defaultValue=""
                  className="w-full bg-transparent text-sm focus:outline-none text-[#2C2E33] font-medium cursor-pointer"
                >
                  <option value="">Todo Latinoamérica</option>
                  {LATAM_COUNTRIES.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-7 py-3 bg-[#aa0055] hover:bg-[#8c0046] active:bg-[#6b0036] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </button>
            </form>

            {/* Quick stats / Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#EFEDE6]/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FD007E]" />
                <span>Contacto directo por WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FD007E]" />
                <span>Ubicación exacta en mapa interactivo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FD007E]" />
                <span>Empresas y negocios en la región</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-16 bg-[#EFEDE6] border-b border-[#D9D4C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#aa0055]">
                Clasificación Comercial
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2E33] font-serif mt-1">
                Explora por Categorías
              </h2>
            </div>
            <Link
              href="/negocios"
              className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#aa0055] hover:text-[#8c0046] hover:underline"
            >
              <span>Ver todas las empresas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                slug={cat.slug}
                name={cat.name}
                icon={cat.icon}
                description={cat.description}
                color={cat.color}
                count={cat._count?.businesses || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BUSINESSES */}
      <section className="py-16 bg-[#FBFAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf2f7] border border-[#f4a8c5] text-[#aa0055] text-xs font-bold uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Empresas Recomendadas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2E33] font-serif">
                Negocios Destacados en AZ Directorio
              </h2>
              <p className="text-sm text-[#5B5F66] mt-1">
                Empresas con atención al cliente inmediata vía WhatsApp.
              </p>
            </div>
            <Link
              href="/negocios?destacado=true"
              className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#aa0055] hover:text-[#8c0046] hover:underline"
            >
              <span>Ver más destacadas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredBusinesses.map((biz) => (
              <BusinessCard
                key={biz.id}
                id={biz.id}
                slug={biz.slug}
                name={biz.name}
                description={biz.description}
                shortDescription={biz.shortDescription}
                category={biz.category}
                country={biz.country}
                countryCode={biz.countryCode}
                city={biz.city}
                address={biz.address}
                logoUrl={biz.logoUrl}
                bannerUrl={biz.bannerUrl}
                whatsapp={biz.whatsapp}
                phone={biz.phone}
                rating={biz.rating}
                featured={biz.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LATIN AMERICA MAJOR CITIES DIRECTORY */}
      <section id="ciudades" className="py-16 bg-[#240013] text-[#EFEDE6] relative overflow-hidden border-t border-[#450023]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FD007E] text-xs font-bold uppercase tracking-wider mb-3 border border-white/10">
              <Globe2 className="w-4 h-4" />
              <span>Cobertura Regional</span>
            </div>
            <h2 className="text-3xl font-bold text-[#F6F3EC] font-serif">
              Ciudades Principales de Latinoamérica
            </h2>
            <p className="text-[#C8C3B4] text-sm mt-2">
              Explora empresas registradas en las principales metrópolis y capitales del continente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LATAM_COUNTRIES.map((country) => (
              <div
                key={country.code}
                className="bg-[#19000d]/90 rounded-2xl p-5 border border-[#450023] hover:border-[#8F6829]/60 transition-colors"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#450023] mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{country.flag}</span>
                    <h3 className="font-bold text-[#F6F3EC] text-base">{country.name}</h3>
                  </div>
                  <Link
                    href={`/negocios?pais=${encodeURIComponent(country.name)}`}
                    className="text-xs text-[#FD007E] hover:text-white font-medium"
                  >
                    Ver todas →
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {country.cities.map((city) => (
                    <Link
                      key={city.name}
                      href={`/negocios?pais=${encodeURIComponent(country.name)}&ciudad=${encodeURIComponent(city.name)}`}
                      className="px-2.5 py-1 rounded-lg bg-[#34001a] hover:bg-[#aa0055] hover:text-white text-xs font-medium text-[#C8C3B4] transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA PUBLISH BUSINESS BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#aa0055] via-[#8c0046] to-[#450023] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif text-[#F6F3EC]">
            ¿Tienes una empresa o negocio en Latinoamérica?
          </h2>
          <p className="text-base sm:text-lg text-[#EFEDE6]/90 max-w-2xl mx-auto font-sans">
            Aumenta tu visibilidad, recibe prospectos directos a tu WhatsApp y posiciona tu marca en AZ DIRECTORIO Empresarial.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/publicar"
              className="px-8 py-3.5 rounded-xl bg-[#450023] text-[#F6F3EC] hover:bg-[#320019] border border-[#8F6829]/60 font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <span>Agregar mi Empresa Gratis</span>
              <ArrowRight className="w-4 h-4 text-[#FD007E]" />
            </Link>
            <Link
              href="/negocios"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F3EC] font-medium text-sm border border-white/25 transition-colors"
            >
              Explorar el Directorio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import BusinessCard from "@/components/BusinessCard";
import { LATAM_COUNTRIES, getCitiesByCountry } from "@/data/locations";
import Link from "next/link";
import { Search, Filter, MapPin, Building, RotateCcw, ShieldCheck } from "lucide-react";

export const revalidate = 0; // Always fresh results

interface NegociosPageProps {
  searchParams: {
    search?: string;
    categoria?: string;
    pais?: string;
    ciudad?: string;
    destacado?: string;
  };
}

export default async function NegociosPage({ searchParams }: NegociosPageProps) {
  const { search, categoria, pais, ciudad, destacado } = searchParams;

  // Build filter query for Prisma
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { shortDescription: { contains: search } },
      { city: { contains: search } },
      { address: { contains: search } },
    ];
  }

  if (categoria) {
    where.category = { slug: categoria };
  }

  if (pais) {
    where.country = pais;
  }

  if (ciudad) {
    where.city = ciudad;
  }

  if (destacado === "true") {
    where.featured = true;
  }

  const [businesses, categories] = await Promise.all([
    prisma.business.findMany({
      where,
      take: 60,
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  // Cities for the currently selected country, if any
  const availableCities = pais ? getCitiesByCountry(pais) : [];

  const hasActiveFilters = Boolean(search || categoria || pais || ciudad || destacado);

  return (
    <div className="bg-[#FBFAF6] min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#aa0055] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#FD007E]" />
                <span>AZ DIRECTORIO Empresarial</span>
              </div>
              <h1 className="text-3xl font-bold text-[#2C2E33] tracking-tight font-serif">
                Directorio de Empresas & Servicios
              </h1>
              <p className="text-[#5B5F66] text-sm mt-1">
                Encuentra empresas verificadas, servicios profesionales y comercios en las principales ciudades de Latinoamérica.
              </p>
            </div>
            <div className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#fdf2f7] border border-[#f4a8c5] text-[#aa0055] self-start md:self-auto shadow-sm">
              {businesses.length} {businesses.length === 1 ? "empresa encontrada" : "empresas encontradas"}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#D9D4C6] mb-8">
          <form method="GET" action="/negocios" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-xs font-semibold text-[#2C2E33] mb-1">
                Buscar por palabra clave
              </label>
              <div className="flex items-center px-3 py-2 bg-[#FBFAF6] border border-[#D9D4C6] rounded-xl focus-within:border-[#aa0055]">
                <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  name="search"
                  defaultValue={search || ""}
                  placeholder="Ej: Bufete, Marketing, Software..."
                  className="w-full bg-transparent text-sm text-[#2C2E33] placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2E33] mb-1">
                Categoría
              </label>
              <div className="flex items-center px-3 py-2 bg-[#FBFAF6] border border-[#D9D4C6] rounded-xl focus-within:border-[#aa0055]">
                <Building className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <select
                  name="categoria"
                  defaultValue={categoria || ""}
                  className="w-full bg-transparent text-sm text-[#2C2E33] focus:outline-none cursor-pointer"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country Select */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2E33] mb-1">
                País (Latinoamérica)
              </label>
              <div className="flex items-center px-3 py-2 bg-[#FBFAF6] border border-[#D9D4C6] rounded-xl focus-within:border-[#aa0055]">
                <MapPin className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <select
                  name="pais"
                  defaultValue={pais || ""}
                  className="w-full bg-transparent text-sm text-[#2C2E33] focus:outline-none cursor-pointer"
                >
                  <option value="">Todos los países</option>
                  {LATAM_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City Select or input */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2E33] mb-1">
                Ciudad {pais ? `de ${pais}` : "Principal"}
              </label>
              <div className="flex items-center px-3 py-2 bg-[#FBFAF6] border border-[#D9D4C6] rounded-xl focus-within:border-[#aa0055]">
                <MapPin className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                {availableCities.length > 0 ? (
                  <select
                    name="ciudad"
                    defaultValue={ciudad || ""}
                    className="w-full bg-transparent text-sm text-[#2C2E33] focus:outline-none cursor-pointer"
                  >
                    <option value="">Todas las ciudades</option>
                    {availableCities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="ciudad"
                    defaultValue={ciudad || ""}
                    placeholder="Ej: Bogotá, Medellín, CDMX..."
                    className="w-full bg-transparent text-sm text-[#2C2E33] placeholder:text-slate-400 focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Buttons Row */}
            <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
              {hasActiveFilters ? (
                <Link
                  href="/negocios"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#aa0055] hover:text-[#8c0046] hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer filtros</span>
                </Link>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#aa0055] hover:bg-[#8c0046] active:bg-[#6b0036] text-white font-medium text-xs rounded-xl shadow-sm hover:shadow transition-all ml-auto"
              >
                Aplicar Filtros
              </button>
            </div>
          </form>
        </div>

        {/* Business Cards Grid */}
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {businesses.map((biz) => (
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
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#D9D4C6] max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-[#fdf2f7] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#aa0055]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#2C2E33] mb-1 font-serif">
              No se encontraron empresas
            </h3>
            <p className="text-xs text-[#5B5F66] mb-6">
              No hay empresas o comercios registrados que coincidan con los criterios de búsqueda actuales.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/negocios"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2C2E33] font-medium text-xs transition-colors"
              >
                Limpiar filtros
              </Link>
              <Link
                href="/publicar"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#aa0055] hover:bg-[#8c0046] text-white font-medium text-xs shadow-sm transition-colors"
              >
                Publicar empresa aquí
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

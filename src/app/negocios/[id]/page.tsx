import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LeafletMap from "@/components/LeafletMap";
import { buildWhatsAppLink, formatDisplayPhone } from "@/lib/whatsapp";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Star,
  ShieldCheck,
  ChevronRight,
  Share2,
} from "lucide-react";

export const revalidate = 0;

interface BusinessDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BusinessDetailPage({ params }: BusinessDetailPageProps) {
  const { id } = params;

  const business = await prisma.business.findFirst({
    where: {
      OR: [{ slug: id }, { id: id }],
    },
    include: {
      user: true,
    },
  });

  if (!business) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppLink(
    business.whatsapp,
    business.name,
    `¡Hola! Vi su negocio "${business.name}" en AZ DIRECTORIO Empresarial (azdirectorio.com) y me gustaría consultar información sobre sus productos/servicios.`
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/negocios" className="hover:text-brand-600 transition-colors">
              Negocios
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href={`/negocios?pais=${encodeURIComponent(business.country)}`}
              className="hover:text-brand-600 transition-colors"
            >
              {business.country}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">
              {business.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Banner Cover */}
      <div className="relative h-48 sm:h-64 lg:h-80 w-full bg-slate-900 overflow-hidden">
        {business.bannerUrl ? (
          <img
            src={business.bannerUrl}
            alt={`${business.name} portada`}
            className="w-full h-full object-cover opacity-85"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 flex items-center justify-center">
            <span className="text-white/10 text-6xl font-black">{business.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
      </div>

      {/* Profile Header & Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            {/* Logo and Titles */}
            <div className="flex items-start gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-1.5 shadow-xl border-2 border-white flex-shrink-0 overflow-hidden relative">
                {business.logoUrl ? (
                  <img
                    src={business.logoUrl}
                    alt={`${business.name} logotipo`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-500 text-white rounded-2xl flex items-center justify-center text-3xl font-black">
                    {business.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                    {business.category?.name || "Comercio"}
                  </span>
                  {business.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verificado
                    </span>
                  )}
                  {business.featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Destacado
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {business.name}
                </h1>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>
                    {business.city}, {business.country}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION: Direct WhatsApp Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-emerald-100 text-emerald-900" />
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Short description quote */}
          {business.shortDescription && (
            <p className="text-sm font-medium text-slate-600 italic pt-4">
              "{business.shortDescription}"
            </p>
          )}
        </div>

        {/* Content Columns: Left (About & Map) - Right (Contact Info & Hours) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Acerca de la Empresa
              </h2>
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {business.description}
              </div>
            </div>

            {/* Interactive Location Map */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-600" />
                  <h2 className="text-lg font-bold text-slate-900">Mapa de Ubicación</h2>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {business.city}, {business.country}
                </span>
              </div>

              <p className="text-xs text-slate-600">
                <strong className="text-slate-800">Dirección:</strong> {business.address}
              </p>

              {/* Leaflet OpenStreetMap Interactive */}
              <LeafletMap
                latitude={business.latitude}
                longitude={business.longitude}
                name={business.name}
                address={business.address}
                categoryName={business.category?.name}
                whatsapp={business.whatsapp}
                height="380px"
              />

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Coordenadas: {business.latitude.toFixed(4)}, {business.longitude.toFixed(4)}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${business.latitude},${business.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline font-semibold"
                >
                  Abrir en Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Info (Right 1 col) */}
          <div className="space-y-6">
            {/* Direct Contact Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                Información de Contacto
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800">WhatsApp Oficial</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      {formatDisplayPhone(business.whatsapp)}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                {business.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-800">Teléfono Fijo / Móvil</span>
                      <a href={`tel:${business.phone}`} className="hover:text-brand-600">
                        {business.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {business.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-semibold text-slate-800">Correo Electrónico</span>
                      <a
                        href={`mailto:${business.email}`}
                        className="hover:text-brand-600 truncate block"
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Website */}
                {business.website && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-semibold text-slate-800">Sitio Web</span>
                      <a
                        href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline truncate block"
                      >
                        {business.website}
                      </a>
                    </div>
                  </div>
                )}

                {/* Schedule */}
                {business.schedule && (
                  <div className="flex items-start gap-3 pt-1 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-800">Horario de Atención</span>
                      <p className="text-slate-500">{business.schedule}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media Card */}
            {(business.instagram || business.facebook || business.linkedin) && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Redes Sociales</h3>
                <div className="flex flex-col gap-2">
                  {business.instagram && (
                    <a
                      href={`https://instagram.com/${business.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 font-medium text-xs transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span>@{business.instagram.replace("@", "")}</span>
                    </a>
                  )}

                  {business.facebook && (
                    <a
                      href={business.facebook.startsWith("http") ? business.facebook : `https://facebook.com/${business.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-xs transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span>Facebook</span>
                    </a>
                  )}

                  {business.linkedin && (
                    <a
                      href={business.linkedin.startsWith("http") ? business.linkedin : `https://linkedin.com/company/${business.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-medium text-xs transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-sky-600" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Direct Contact Sticky Banner on Mobile / Quick CTA */}
            <div className="bg-gradient-to-tr from-brand-800 to-brand-700 text-white rounded-3xl p-6 shadow-md text-center space-y-3">
              <span className="text-2xl">📱</span>
              <h4 className="font-bold text-base">¿Deseas atención inmediata?</h4>
              <p className="text-xs text-brand-100">
                Escribe directamente al equipo de {business.name} por WhatsApp para consultas de precios y disponibilidad.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-emerald-700 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir Chat de WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

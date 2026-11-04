"use client";

import Link from "next/link";
import { MapPin, Phone, MessageCircle, Star, ArrowUpRight, ExternalLink } from "lucide-react";
import { buildWhatsAppLink, formatDisplayPhone } from "@/lib/whatsapp";

export interface BusinessCardProps {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description: string;
  category: {
    name: string;
    slug: string;
    color?: string | null;
  };
  country: string;
  countryCode: string;
  city: string;
  address: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  whatsapp: string;
  phone?: string | null;
  rating?: number;
  featured?: boolean;
}

export default function BusinessCard({
  id,
  name,
  slug,
  shortDescription,
  description,
  category,
  country,
  city,
  address,
  logoUrl,
  bannerUrl,
  whatsapp,
  phone,
  rating = 5.0,
  featured = false,
}: BusinessCardProps) {
  const whatsappUrl = buildWhatsAppLink(whatsapp, name);
  const displayDesc = shortDescription || (description ? description.slice(0, 110) + "..." : "");

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-brand-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          Destacado
        </div>
      )}

      {/* Banner / Header Image */}
      <div className="h-36 sm:h-40 w-full bg-slate-100 relative overflow-hidden">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={`${name} banner`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-slate-500">
            <span className="text-3xl font-bold text-white/20">{name.charAt(0)}</span>
          </div>
        )}

        {/* Category Pill overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm border border-white/40">
          {category?.name || "Comercio"}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Logo and Name row */}
        <div className="flex items-start gap-3.5 -mt-10 mb-3 relative">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 border-2 border-white shadow-md flex-shrink-0 overflow-hidden relative">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${name} logo`}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full bg-brand-50 rounded-xl flex items-center justify-center font-bold text-brand-700 text-lg">
                {name.charAt(0)}
              </div>
            )}
          </div>

          <div className="pt-8 flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-600 transition-colors truncate">
              <Link href={`/negocios/${slug || id}`}>
                {name}
              </Link>
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
              <span className="truncate">{city}, {country}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <p className="text-xs text-slate-500 line-clamp-1 mb-2.5">
          <span className="font-medium text-slate-600">Dirección:</span> {address}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-2">
          {displayDesc}
        </p>

        {/* Actions bar: WhatsApp Contact & Details */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 mt-auto">
          {/* WhatsApp Direct Link Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-xs shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            title={`Chatear por WhatsApp con ${name}`}
          >
            <MessageCircle className="w-4 h-4 fill-emerald-100 text-emerald-800" />
            <span>Contactar WhatsApp</span>
          </a>

          {/* View Profile Link */}
          <Link
            href={`/negocios/${slug || id}`}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Ver detalles completos y ubicación"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

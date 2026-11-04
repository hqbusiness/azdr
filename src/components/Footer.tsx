import Link from "next/link";
import { MapPin, MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { LATAM_COUNTRIES } from "@/data/locations";

export default function Footer() {
  return (
    <footer className="bg-[#1e0010] text-[#EFEDE6] mt-auto border-t border-[#450023]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" title="AZ Directorio Empresarial">
              <img
                src="/images/logo-az.png"
                alt="AZ DIRECTORIO Empresarial"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#C8C3B4] leading-relaxed">
              El índice de empresas y negocios más consultado de la región. Encuéntralas, fácil y rápido en todas las principales ciudades de Latinoamérica.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#FD007E] font-medium">
              <MessageSquare className="w-4 h-4" />
              <span>Conexión directa vía WhatsApp con cada comercio</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8F6829]">
              <ShieldCheck className="w-4 h-4" />
              <span>Indice de Empresas y Negocios más completo</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F6F3EC] mb-4 border-b border-[#450023] pb-2">
              Navegación Rápida
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/negocios" className="text-[#C8C3B4] hover:text-white transition-colors">
                  Directorio Completo
                </Link>
              </li>
              <li>
                <Link href="/negocios?categoria=" className="text-[#C8C3B4] hover:text-white transition-colors">
                  Categorías Comerciales
                </Link>
              </li>
              <li>
                <Link href="/publicar" className="text-[#C8C3B4] hover:text-[#FD007E] transition-colors">
                  Agregar mi Empresa
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-[#C8C3B4] hover:text-white transition-colors">
                  Iniciar Sesión de Propietario
                </Link>
              </li>
              <li>
                <Link href="/panel" className="text-[#C8C3B4] hover:text-white transition-colors">
                  Panel de Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Top LatAm Countries */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F6F3EC] mb-4 border-b border-[#450023] pb-2">
              Países Destacados
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {LATAM_COUNTRIES.slice(0, 10).map((c) => (
                <Link
                  key={c.code}
                  href={`/negocios?pais=${encodeURIComponent(c.name)}`}
                  className="text-[#C8C3B4] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Cities & Presence */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F6F3EC] mb-4 border-b border-[#450023] pb-2">
              Cobertura Regional
            </h3>
            <p className="text-xs text-[#C8C3B4] mb-3 leading-relaxed">
              Encuentra negocios en Bogotá, Medellín, Cali, Barranquilla, CDMX, Buenos Aires, Santiago, Lima y más ciudades.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C8C3B4]">
              <MapPin className="w-4 h-4 text-[#FD007E] flex-shrink-0" />
              <span>Presencia en más de 60 ciudades de la región.</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#450023] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C8C3B4]">
          <p>© {new Date().getFullYear()} AZ DIRECTORIO Empresarial. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-[#C8C3B4]">
            <span>Diseñado para el ecosistema empresarial de Latinoamérica •</span>
            <a
              href="https://azdirectorio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FD007E] hover:underline font-medium"
            >
              azdirectorio.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

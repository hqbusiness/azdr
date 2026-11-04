"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LATAM_COUNTRIES, CountryInfo } from "@/data/locations";
import LocationPickerMap from "@/components/LocationPickerMap";
import {
  Building,
  MapPin,
  MessageCircle,
  Image as ImageIcon,
  Clock,
  Globe,
  Mail,
  Phone,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
}

export default function PublicarPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form State
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [country, setCountry] = useState("Colombia");
  const [city, setCity] = useState("Bogotá");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(4.711);
  const [longitude, setLongitude] = useState(-74.0721);

  // WhatsApp and Contact
  const [phonePrefix, setPhonePrefix] = useState("+57");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Media & Details
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [schedule, setSchedule] = useState("Lunes a Sábado: 08:30 - 18:30");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check auth & fetch categories
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        setAuthChecking(false);
      })
      .catch(() => {
        setUser(null);
        setAuthChecking(false);
      });

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.categories) {
          setCategories(data.categories);
          if (data.categories.length > 0) {
            setCategoryId(data.categories[0].id);
          }
        }
      });
  }, []);

  // When country changes, update city list and map center
  const selectedCountryInfo = LATAM_COUNTRIES.find((c) => c.name === country) || LATAM_COUNTRIES[0];

  const handleCountryChange = (newCountryName: string) => {
    setCountry(newCountryName);
    const countryData = LATAM_COUNTRIES.find((c) => c.name === newCountryName);
    if (countryData) {
      setPhonePrefix(countryData.phonePrefix);
      if (countryData.cities.length > 0) {
        setCity(countryData.cities[0].name);
        setLatitude(countryData.cities[0].lat);
        setLongitude(countryData.cities[0].lng);
      } else {
        setLatitude(countryData.defaultLat);
        setLongitude(countryData.defaultLng);
      }
    }
  };

  const handleCityChange = (newCityName: string) => {
    setCity(newCityName);
    const foundCity = selectedCountryInfo.cities.find((c) => c.name === newCityName);
    if (foundCity) {
      setLatitude(foundCity.lat);
      setLongitude(foundCity.lng);
    }
  };

  const handleLocationPicked = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  // Sample Logo Presets for quick filling
  const presetLogos = [
    { label: "Restaurante", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" },
    { label: "Tecnología", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" },
    { label: "Salud", url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80" },
    { label: "Comercio", url: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&q=80" },
    { label: "Belleza", url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Combine prefix with number if not already prefixed
    let cleanWa = whatsappNumber.trim();
    if (!cleanWa.startsWith("+")) {
      cleanWa = `${phonePrefix}${cleanWa}`;
    }

    const payload = {
      name,
      categoryId,
      country,
      countryCode: selectedCountryInfo.code,
      city,
      address,
      latitude,
      longitude,
      whatsapp: cleanWa,
      phone,
      email,
      website,
      instagram,
      facebook,
      linkedin,
      schedule,
      description,
      shortDescription,
      logoUrl,
      bannerUrl,
    };

    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "No se pudo registrar el negocio.");
      }

      router.push(`/negocios/${data.business.slug || data.business.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/demo-login", { method: "POST" });
      const data = await res.json();
      if (data?.user) {
        setUser(data.user);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-medium">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, display helpful auth wall
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">
              Inicia Sesión para Publicar
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Para publicar y gestionar tu negocio necesitas autenticarte por correo electrónico o cuenta de Google.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Acceder como Usuario Demo (1 Clic)</span>
            </button>

            <Link
              href="/login"
              className="w-full block py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Iniciar Sesión con Correo
            </Link>

            <Link
              href="/registro"
              className="w-full block py-2.5 px-4 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-xl transition-colors"
            >
              Crear Cuenta Nueva Gratis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Formulario de Registro Comercial
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Publicar Empresa o Negocio
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Completa la información de tu empresa para aparecer en AZ DIRECTORIO Empresarial.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 shadow-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECCIÓN 1: DATOS BÁSICOS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900">
                1. Datos Básicos del Negocio
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre de la Empresa o Negocio <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Café Artesanal El Poblado"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Categoría <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resumen Corto (Para tarjetas de búsqueda)
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Ej: Café de especialidad y desayunos artesanales."
                  maxLength={120}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Descripción Completa del Negocio <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe la historia, productos, servicios destacados, experiencia y valor diferencial de tu empresa..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: UBICACIÓN GEOGRÁFICA & MAPA INTERACTIVO */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <MapPin className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900">
                2. Ubicación en Latinoamérica & Mapa
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  País <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  {LATAM_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ciudad Principal de {country} <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  {selectedCountryInfo.cities.map((ct) => (
                    <option key={ct.name} value={ct.name}>
                      {ct.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dirección Física <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej: Av. Reforma 222, Colonia Juárez"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Leaflet Location Picker */}
              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Posición en el Mapa Interactivo (Arrastra el marcador 📍)
                  </label>
                  <span className="text-[11px] text-brand-600 font-medium">
                    Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}
                  </span>
                </div>

                <LocationPickerMap
                  latitude={latitude}
                  longitude={longitude}
                  onChange={handleLocationPicked}
                  height="300px"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: WHATSAPP DIRECTO & CONTACTO */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  3. Contacto Directo por WhatsApp
                </h2>
                <p className="text-[11px] text-slate-500">
                  Los clientes podrán escribirte directamente a tu chat con un solo clic.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número de WhatsApp <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700">
                    {phonePrefix}
                  </span>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="Ej: 3105558899"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Ingresa tu número móvil sin espacios ni signos +.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teléfono Fijo / Alternativo
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: +57 1 3125678"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo Electrónico de Contacto
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contacto@tunegocio.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sitio Web Oficial
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://tunegocio.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: MEDIOS, HORARIOS Y REDES */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ImageIcon className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900">
                4. Imágenes, Horarios & Redes Sociales
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL del Logotipo
                </label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://ejemplo.com/logo.jpg"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />

                {/* Quick preset selector */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400">Ejemplos:</span>
                  {presetLogos.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setLogoUrl(p.url)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL de Imagen de Portada / Banner
                </label>
                <input
                  type="url"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="https://ejemplo.com/banner.jpg"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Horario de Atención
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="Ej: Lunes a Viernes 08:00 - 18:00 | Sábados 09:00 - 13:00"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Instagram (Usuario)
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@tunegocio"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Facebook (URL o Página)
                </label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="tunegociooficial"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <Link
              href="/panel"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Cancelar y volver
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Publicando negocio..." : "Publicar Negocio en el Directorio"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LATAM_COUNTRIES } from "@/data/locations";
import LocationPickerMap from "@/components/LocationPickerMap";
import {
  Building,
  MapPin,
  MessageCircle,
  Image as ImageIcon,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function EditarNegocioPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form State
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [country, setCountry] = useState("Colombia");
  const [city, setCity] = useState("Bogotá");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(4.711);
  const [longitude, setLongitude] = useState(-74.0721);
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [schedule, setSchedule] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    // 1. Fetch categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.categories) setCategories(data.categories);
      });

    // 2. Fetch business
    fetch(`/api/businesses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el negocio.");
        return res.json();
      })
      .then((data) => {
        const b = data.business;
        if (!b) throw new Error("Negocio no encontrado");

        setName(b.name || "");
        setCategoryId(b.categoryId || "");
        setCountry(b.country || "Colombia");
        setCity(b.city || "Bogotá");
        setAddress(b.address || "");
        setLatitude(b.latitude || 4.711);
        setLongitude(b.longitude || -74.0721);
        setWhatsapp(b.whatsapp || "");
        setPhone(b.phone || "");
        setEmail(b.email || "");
        setWebsite(b.website || "");
        setDescription(b.description || "");
        setShortDescription(b.shortDescription || "");
        setLogoUrl(b.logoUrl || "");
        setBannerUrl(b.bannerUrl || "");
        setSchedule(b.schedule || "");
        setInstagram(b.instagram || "");
        setFacebook(b.facebook || "");
        setLinkedin(b.linkedin || "");
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const selectedCountryInfo = LATAM_COUNTRIES.find((c) => c.name === country) || LATAM_COUNTRIES[0];

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const countryData = LATAM_COUNTRIES.find((c) => c.name === newCountry);
    if (countryData && countryData.cities.length > 0) {
      setCity(countryData.cities[0].name);
      setLatitude(countryData.cities[0].lat);
      setLongitude(countryData.cities[0].lng);
    }
  };

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const found = selectedCountryInfo.cities.find((c) => c.name === newCity);
    if (found) {
      setLatitude(found.lat);
      setLongitude(found.lng);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/businesses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          categoryId,
          country,
          countryCode: selectedCountryInfo.code,
          city,
          address,
          latitude,
          longitude,
          whatsapp,
          phone,
          email,
          website,
          description,
          shortDescription,
          logoUrl,
          bannerUrl,
          schedule,
          instagram,
          facebook,
          linkedin,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar.");

      router.push("/panel");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-medium">Cargando negocio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/panel"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Panel</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Editar Negocio: {name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Actualiza los datos de tu empresa, mapa de ubicación y contacto por WhatsApp.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* DATOS BÁSICOS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900">Datos Principales</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resumen Corto</label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* UBICACIÓN & MAPA */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <MapPin className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900">Ubicación y Mapa</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">País</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ciudad</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dirección</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Posición en el Mapa (Haz clic o arrastra el marcador 📍)
                  </label>
                  <span className="text-[11px] text-brand-600 font-medium">
                    Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}
                  </span>
                </div>
                <LocationPickerMap
                  latitude={latitude}
                  longitude={longitude}
                  onChange={(lat, lng) => {
                    setLatitude(lat);
                    setLongitude(lng);
                  }}
                  height="300px"
                />
              </div>
            </div>
          </div>

          {/* CONTACTO & WHATSAPP */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">WhatsApp y Medios de Contacto</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número de WhatsApp (con prefijo de país)
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono Fijo</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sitio Web</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* IMÁGENES Y HORARIO */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ImageIcon className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900">Imágenes y Horarios</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Logotipo</label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Portada / Banner</label>
                <input
                  type="url"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Horario de Atención</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex items-center justify-between pt-4">
            <Link href="/panel" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
              ← Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-sm rounded-2xl shadow-xl transition-all"
            >
              {saving ? "Guardando cambios..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildWhatsAppLink, formatDisplayPhone } from "@/lib/whatsapp";
import {
  Building,
  PlusCircle,
  Edit3,
  Trash2,
  ExternalLink,
  MessageCircle,
  MapPin,
  Sparkles,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function PanelPage() {
  const [user, setUser] = useState<any>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const loadData = async () => {
    try {
      // 1. Get current session
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData?.user) {
        router.push("/login");
        return;
      }
      setUser(meData.user);

      // 2. Get user businesses
      const bizRes = await fetch("/api/businesses");
      const bizData = await bizRes.json();
      if (bizData?.businesses) {
        // Filter by user ID (or all if admin)
        const myBiz = bizData.businesses.filter(
          (b: any) => b.userId === meData.user.id || meData.user.role === "ADMIN"
        );
        setBusinesses(myBiz);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/businesses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage(`El negocio "${name}" fue eliminado.`);
        setBusinesses((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("No se pudo eliminar el negocio.");
      }
    } catch {
      alert("Error al intentar eliminar.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-medium">Cargando panel de control...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome and Action Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-100"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                  {user.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {user.name}
                  </h1>
                  {user.role === "ADMIN" && (
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-bold text-[10px] uppercase">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{user.email}</p>
                <div className="flex items-center gap-1.5 text-xs text-brand-600 font-semibold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Propietario Verificado en AZ DIRECTORIO Empresarial</span>
                </div>
              </div>
            </div>

            <Link
              href="/publicar"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Nuevo Negocio</span>
            </Link>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <span>{message}</span>
            <button onClick={() => setMessage(null)} className="font-bold">
              ×
            </button>
          </div>
        )}

        {/* Business Listings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Mis Negocios Registrados ({businesses.length})
            </h2>
          </div>

          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((biz) => {
                const waUrl = buildWhatsAppLink(biz.whatsapp, biz.name);
                return (
                  <div
                    key={biz.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Top row */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                          {biz.logoUrl ? (
                            <img
                              src={biz.logoUrl}
                              alt={biz.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-brand-100 text-brand-700 font-bold">
                              {biz.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase font-bold text-brand-600 block truncate">
                            {biz.category?.name || "Comercio"}
                          </span>
                          <h3 className="font-bold text-slate-900 text-sm truncate">
                            {biz.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="truncate">
                              {biz.city}, {biz.country}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                        {biz.address}
                      </p>

                      {/* WhatsApp row */}
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-between text-xs mb-4">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                          <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{formatDisplayPhone(biz.whatsapp)}</span>
                        </div>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-emerald-700 hover:underline"
                        >
                          Probar Enlace ↗
                        </a>
                      </div>
                    </div>

                    {/* Actions bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <Link
                        href={`/negocios/${biz.slug || biz.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                        title="Ver ficha pública en el directorio"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver Ficha</span>
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/panel/editar/${biz.id}`}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 transition-colors"
                          title="Editar información"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(biz.id, biz.name)}
                          disabled={deletingId === biz.id}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors"
                          title="Eliminar negocio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Aún no has registrado ningún negocio
              </h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                Registra tu primer comercio, restaurante, consultorio o empresa para que clientes de toda Latinoamérica te contacten vía WhatsApp.
              </p>
              <Link
                href="/publicar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publicar mi Primer Negocio</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

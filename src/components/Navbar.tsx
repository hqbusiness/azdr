"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PlusCircle, Menu, X, Building, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

export default function Navbar() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Fetch current session
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#aa0055] border-b border-[#8F6829]/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-3 group py-1" title="AZ Directorio Empresarial">
              <img
                src="/images/logo-az.png"
                alt="AZ DIRECTORIO Empresarial"
                className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:flex flex-col border-l border-white/20 pl-3">
                <span className="text-[12px] font-bold tracking-widest text-[#F6F3EC] uppercase leading-none">
                  AZ DIRECTORIO
                </span>
                <span className="text-[10px] font-medium tracking-wider text-[#C8C3B4] uppercase mt-0.5">
                  Empresarial
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/negocios"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/negocios"
                    ? "text-white font-semibold underline underline-offset-4 decoration-[#8F6829]"
                    : "text-[#F6F3EC]/85 hover:text-white"
                }`}
              >
                Explorar Negocios
              </Link>
              <Link
                href="/negocios?categoria="
                className="text-sm font-medium text-[#F6F3EC]/85 hover:text-white transition-colors"
              >
                Categorías
              </Link>
              <Link
                href="/#ciudades"
                className="text-sm font-medium text-[#F6F3EC]/85 hover:text-white transition-colors"
              >
                Ciudades LatAm
              </Link>
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Publish Business / Add Company Button (estilo azdirectorio .btn-brass) */}
            <Link
              href="/publicar"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#450023] hover:bg-[#34001a] text-[#F6F3EC] font-semibold text-sm border border-[#8F6829]/50 shadow-sm transition-all hover:scale-[1.02] active:scale-100"
            >
              <PlusCircle className="w-4 h-4 text-[#FD007E]" />
              <span>Agregar mi Empresa</span>
            </Link>

            {/* User Session */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-black/15 transition-colors border border-white/20 text-[#F6F3EC]"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FD007E]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#450023] text-white font-bold text-xs flex items-center justify-center border border-[#8F6829]/40">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-[#F6F3EC] max-w-[120px] truncate pr-1">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/70" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 text-slate-800">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Sesión iniciada como</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/panel"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#aa0055] transition-colors"
                    >
                      <Building className="w-4 h-4 text-slate-400" />
                      Mis Negocios
                    </Link>

                    <Link
                      href="/publicar"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#aa0055] transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-slate-400" />
                      Nuevo Negocio
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-sm font-medium text-[#F6F3EC] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/registro"
                  className="px-3.5 py-2 text-sm font-medium text-white bg-white/15 hover:bg-white/25 rounded-lg transition-colors border border-white/20"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/publicar"
              className="p-2 rounded-lg bg-[#450023] text-white border border-[#8F6829]/50"
              title="Agregar mi Empresa"
            >
              <PlusCircle className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#450023] bg-[#8c0046] px-4 pt-3 pb-6 space-y-3 text-white">
          <Link
            href="/negocios"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            Explorar Negocios
          </Link>
          <Link
            href="/negocios?categoria="
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            Categorías
          </Link>
          <Link
            href="/#ciudades"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            Ciudades LatAm
          </Link>

          <div className="border-t border-white/15 pt-3">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-1">
                  <p className="text-xs text-white/70">Sesión iniciada:</p>
                  <p className="font-semibold text-white">{user.name}</p>
                </div>
                <Link
                  href="/panel"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
                >
                  Mis Negocios
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-rose-200 hover:bg-white/10"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 px-4 rounded-xl border border-white/30 font-medium text-white text-sm hover:bg-white/10"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 px-4 rounded-xl bg-[#450023] text-white font-medium text-sm border border-[#8F6829]/50"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

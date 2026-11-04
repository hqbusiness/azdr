"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al iniciar sesión.");
      }

      router.push("/panel");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/demo-login", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error en login demo");
      router.push("/panel");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    handleDemoLogin();
  };

  return (
    <div className="min-h-screen bg-[#FBFAF6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex flex-col items-center justify-center group mb-4">
          <div className="bg-[#aa0055] px-6 py-2.5 rounded-2xl shadow-lg border border-[#8F6829]/40 mb-2 group-hover:scale-105 transition-transform flex items-center justify-center">
            <img
              src="/images/logo-az.png"
              alt="AZ DIRECTORIO Empresarial"
              className="h-10 w-auto object-contain"
            />
          </div>
          <span className="text-lg font-bold tracking-wider text-[#2C2E33] uppercase">
            AZ DIRECTORIO <span className="text-[#aa0055]">Empresarial</span>
          </span>
        </Link>
        <h2 className="text-center text-2xl font-bold text-[#2C2E33] font-serif">
          Iniciar Sesión
        </h2>
        <p className="mt-1 text-center text-xs text-[#5B5F66]">
          Accede para publicar, editar y administrar tus empresas y negocios
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#D9D4C6] shadow-xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick 1-Click Demo Login Button */}
          <div className="bg-[#fdf2f7] border border-[#f4a8c5] rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#aa0055] mb-1">
              <Sparkles className="w-4 h-4 text-[#FD007E]" />
              <span>¿Quieres probar la plataforma sin registrarte?</span>
            </div>
            <p className="text-[11px] text-[#5B5F66] mb-3">
              Ingresa con un solo clic con la cuenta de demostración:
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#aa0055] hover:bg-[#8c0046] active:bg-[#6b0036] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              {loading ? "Iniciando..." : "Entrar como Usuario Demo (1 Clic)"}
            </button>
          </div>

          {/* Google OAuth Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar con Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider absolute">
              O con correo
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <div className="flex items-center px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus-within:border-[#aa0055]">
                <Mail className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Contraseña
                </label>
              </div>
              <div className="flex items-center px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus-within:border-[#aa0055]">
                <Lock className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#450023] hover:bg-[#34001a] active:bg-[#200010] text-[#F6F3EC] border border-[#8F6829]/50 font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Verificando..." : "Iniciar Sesión"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FD007E]" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            ¿No tienes cuenta aún?{" "}
            <Link href="/registro" className="text-[#aa0055] font-bold hover:underline">
              Regístrate gratis aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  Utensils,
  Laptop,
  HeartPulse,
  Briefcase,
  ShoppingBag,
  Sparkles,
  Car,
  GraduationCap,
  Plane,
  Building2,
  Wrench,
  Dumbbell,
  HelpCircle,
} from "lucide-react";

interface CategoryCardProps {
  slug: string;
  name: string;
  icon: string;
  description?: string | null;
  color?: string | null;
  count?: number;
}

const ICON_MAP: Record<string, any> = {
  Utensils,
  Laptop,
  HeartPulse,
  Briefcase,
  ShoppingBag,
  Sparkles,
  Car,
  GraduationCap,
  Plane,
  Building2,
  Wrench,
  Dumbbell,
};

export default function CategoryCard({
  slug,
  name,
  icon,
  description,
  color = "#108863",
  count,
}: CategoryCardProps) {
  const IconComponent = ICON_MAP[icon] || HelpCircle;

  return (
    <Link
      href={`/negocios?categoria=${slug}`}
      className="group p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-brand-500/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start relative overflow-hidden"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform"
        style={{ backgroundColor: color || "#108863" }}
      >
        <IconComponent className="w-6 h-6" />
      </div>

      <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors mb-1 line-clamp-1">
        {name}
      </h3>

      {description && (
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between w-full pt-2 border-t border-slate-100 text-[11px] font-semibold text-brand-600">
        <span>{count !== undefined ? `${count} ${count === 1 ? "negocio" : "negocios"}` : "Ver empresas"}</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}

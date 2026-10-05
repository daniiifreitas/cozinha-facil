import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ChefHat, Heart, CalendarDays, BookOpen } from "lucide-react";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/receitas", label: "Receitas", icon: ChefHat },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/planejar", label: "Planejar", icon: CalendarDays },
  { to: "/guias", label: "Guias", icon: BookOpen },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 bg-cream/95 ring-1 ring-black/5">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between py-3 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? "font-semibold text-brand" : "text-ink/50 hover:text-ink"
                }`}
              >
                <span className="grid size-6 place-items-center">
                  <Icon className={`size-5 ${isActive ? "text-brand" : "text-ink/40"}`} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

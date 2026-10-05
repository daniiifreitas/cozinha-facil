import { Link } from "@tanstack/react-router";
import { ChefHat } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-brand text-sm font-semibold text-cream">
          <ChefHat className="size-5" />
        </div>
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Cozinha Fácil
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-ink/55 sm:block">Bem-vindo, Ana</span>
        <div className="grid size-9 place-items-center rounded-full bg-butter font-semibold text-ink outline-1 -outline-offset-1 outline-black/5">
          A
        </div>
      </div>
    </header>
  );
}

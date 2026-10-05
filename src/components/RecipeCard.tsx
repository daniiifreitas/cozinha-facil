import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { Recipe } from "@/lib/recipes";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const difficultyColor =
    recipe.difficulty === "Fácil"
      ? "bg-leafdark/10 text-leafdark"
      : recipe.difficulty === "Médio"
        ? "bg-brand/10 text-brand-dark"
        : "bg-ink/10 text-ink";

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card p-3 ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:ring-brand/30">
      <Link to="/receitas/$id" params={{ id: recipe.id }} className="block">
        <img
          src={recipe.image}
          alt={recipe.title}
          width={1024}
          height={768}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-xl object-cover outline-1 -outline-offset-1 outline-black/5"
        />
        <div className="pt-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">{recipe.title}</h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyColor}`}>
              {recipe.difficulty}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/60">{recipe.description}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-ink/55">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {recipe.time}
            </span>
            <span>{recipe.servings}</span>
          </div>
        </div>
      </Link>
      <FavoriteButton id={recipe.id} className="absolute right-5 top-5" />
    </div>
  );
}

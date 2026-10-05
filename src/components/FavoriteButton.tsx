import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/kitchen-store";

interface Props {
  id: string;
  size?: "sm" | "lg";
  className?: string;
}

export function FavoriteButton({ id, size = "sm", className = "" }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      aria-label={active ? "Remover dos favoritos" : "Salvar nos favoritos"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={`grid place-items-center rounded-full bg-cream/90 ring-1 ring-black/5 transition-transform hover:scale-110 ${
        size === "lg" ? "size-11" : "size-9"
      } ${className}`}
    >
      <Heart
        className={`${size === "lg" ? "size-5" : "size-4"} ${
          active ? "fill-brand text-brand" : "text-ink/50"
        }`}
      />
    </button>
  );
}

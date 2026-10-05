import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/lib/recipes";
import { useFavorites } from "@/lib/kitchen-store";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — Cozinha Fácil" },
      {
        name: "description",
        content:
          "Suas receitas salvas em um só lugar: volte rápido aos pratos que você mais gosta de cozinhar.",
      },
      { property: "og:title", content: "Favoritos — Cozinha Fácil" },
      {
        property: "og:description",
        content: "As receitas que você salvou, sempre à mão para o próximo preparo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, ready } = useFavorites();
  const saved = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />

        <section className="mt-2">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Favoritos
          </h1>
          <p className="mt-3 max-w-[52ch] text-pretty text-ink/65">
            Toque no coração em qualquer receita para guardá-la aqui e voltar quando quiser cozinhar
            de novo.
          </p>
          {ready && saved.length > 0 && (
            <p className="mt-2 text-sm font-semibold text-brand">
              {saved.length} {saved.length === 1 ? "receita salva" : "receitas salvas"}
            </p>
          )}
        </section>

        <section className="mt-8">
          {!ready ? null : saved.length === 0 ? (
            <div className="rounded-3xl bg-card p-10 text-center ring-1 ring-black/5">
              <Heart className="mx-auto size-8 text-brand/60" />
              <p className="mt-4 text-ink/65">Você ainda não salvou nenhuma receita.</p>
              <Link
                to="/receitas"
                className="mt-5 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark"
              >
                Explorar receitas
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

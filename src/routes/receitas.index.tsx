import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes, difficulties, categories, type Difficulty } from "@/lib/recipes";
import { Search, Refrigerator } from "lucide-react";

export const Route = createFileRoute("/receitas/")({
  head: () => ({
    meta: [
      { title: "Receitas — Cozinha Fácil" },
      {
        name: "description",
        content:
          "Do ovo cozido ao boeuf bourguignon: receitas passo a passo com dicas de cozimento e substituições para ingredientes que faltam.",
      },
      { property: "og:title", content: "Receitas — Cozinha Fácil" },
      {
        property: "og:description",
        content: "Receitas do simples ao complexo, com dicas de cozimento e alternativas de ingredientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecipesPage,
});

function RecipesPage() {
  const [filter, setFilter] = useState<Difficulty | "Todas">("Todas");
  const [category, setCategory] = useState<string>("Todas");
  const [query, setQuery] = useState("");

  const normalize = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const q = normalize(query.trim());
  const filtered = recipes.filter((r) => {
    if (filter !== "Todas" && r.difficulty !== filter) return false;
    if (category !== "Todas" && r.category !== category) return false;
    if (!q) return true;
    return (
      normalize(r.title).includes(q) ||
      normalize(r.description).includes(q) ||
      normalize(r.category).includes(q) ||
      r.ingredients.some((i) => normalize(i).includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />

        <section className="mt-2">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Receitas
          </h1>
          <p className="mt-3 max-w-[52ch] text-pretty text-ink/65">
            Do ovo cozido no ponto certo até o boeuf bourguignon. Cada receita traz dicas de
            cozimento e o que usar quando falta um ingrediente.
          </p>
          <p className="mt-2 text-sm font-semibold text-brand">{recipes.length} receitas no catálogo</p>
        </section>

        <section className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="relative block flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por prato ou ingrediente (ex.: frango, ovo, chocolate)"
              className="w-full rounded-full bg-card py-3 pl-11 pr-4 text-sm text-ink ring-1 ring-black/5 outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <Link
            to="/geladeira"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-leafdark px-5 py-3 text-sm font-semibold text-cream"
          >
            <Refrigerator className="size-4" /> O que tem na geladeira?
          </Link>
        </section>

        <section className="mt-4 flex flex-wrap gap-2">
          {(["Todas", ...categories] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                category === cat
                  ? "bg-leafdark text-cream"
                  : "bg-card text-ink/70 ring-1 ring-black/5 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        <section className="mt-3 flex flex-wrap gap-2">
          {(["Todas", ...difficulties] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setFilter(level)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === level
                  ? "bg-brand text-cream"
                  : "bg-card text-ink/70 ring-1 ring-black/5 hover:text-ink"
              }`}
            >
              {level}
            </button>
          ))}
        </section>

        <section className="mt-8">
          {filtered.length === 0 ? (
            <p className="rounded-2xl bg-card p-6 text-center text-ink/60 ring-1 ring-black/5">
              Nenhuma receita encontrada. Tente outro ingrediente ou limpe os filtros.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

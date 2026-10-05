import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { recipes, getRecipeById } from "@/lib/recipes";
import {
  useMealPlan,
  useFavorites,
  weekDays,
  mealSlots,
  mealKey,
  type WeekDay,
  type MealSlot,
} from "@/lib/kitchen-store";
import { ServingsStepper } from "@/components/ServingsStepper";
import { baseServings, mergeIngredients } from "@/lib/servings";
import { Plus, X, Search, ShoppingBasket, Clock, Trash2 } from "lucide-react";

export const Route = createFileRoute("/planejar")({
  head: () => ({
    meta: [
      { title: "Planejar refeições — Cozinha Fácil" },
      {
        name: "description",
        content:
          "Monte o cardápio da semana: escolha almoço e jantar de cada dia e receba a lista de compras pronta.",
      },
      { property: "og:title", content: "Planejar refeições — Cozinha Fácil" },
      {
        property: "og:description",
        content: "Cardápio semanal de almoço e jantar com lista de compras automática.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPage,
});

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function PlannerPage() {
  const { plan, servings, setServings, setMeal, clearMeal, clearAll, ready } = useMealPlan();
  const { favorites } = useFavorites();
  const [picking, setPicking] = useState<{ day: WeekDay; slot: MealSlot } | null>(null);
  const [query, setQuery] = useState("");

  const planned = Object.values(plan);

  const shoppingList = useMemo(() => {
    const entries: { list: string[]; factor: number }[] = [];
    Object.entries(plan).forEach(([key, id]) => {
      const recipe = getRecipeById(id);
      if (!recipe) return;
      const base = baseServings(recipe.servings);
      const want = servings[key] ?? base;
      entries.push({ list: recipe.ingredients, factor: want / base });
    });
    return mergeIngredients(entries);
  }, [plan, servings]);


  const q = normalize(query.trim());
  const options = useMemo(() => {
    const base = q
      ? recipes.filter(
          (r) =>
            normalize(r.title).includes(q) ||
            normalize(r.category).includes(q) ||
            r.ingredients.some((i) => normalize(i).includes(q)),
        )
      : [...recipes].sort((a, b) => {
          const fa = favorites.includes(a.id) ? 0 : 1;
          const fb = favorites.includes(b.id) ? 0 : 1;
          return fa - fb;
        });
    return base.slice(0, 40);
  }, [q, favorites]);

  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />

        <section className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Planejar refeições
            </h1>
            <p className="mt-3 max-w-[52ch] text-pretty text-ink/65">
              Escolha o que vai para a mesa no almoço e no jantar de cada dia. A lista de compras se
              monta sozinha ali embaixo.
            </p>
          </div>
          {planned.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-ink/70 ring-1 ring-black/5 hover:text-ink"
            >
              <Trash2 className="size-4" />
              Limpar semana
            </button>
          )}
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weekDays.map((day) => (
            <div key={day} className="rounded-3xl bg-card p-5 ring-1 ring-black/5">
              <h2 className="font-display text-xl font-semibold text-ink">{day}</h2>
              <div className="mt-4 space-y-3">
                {mealSlots.map((slot) => {
                  const id = ready ? plan[mealKey(day, slot)] : undefined;
                  const recipe = id ? getRecipeById(id) : undefined;
                  return (
                    <div key={slot}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">
                        {slot}
                      </p>
                      {recipe ? (
                        <div className="mt-1.5 rounded-2xl bg-background p-2 ring-1 ring-black/5">
                          <div className="flex items-center gap-3">
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              width={80}
                              height={80}
                              loading="lazy"
                              className="size-12 shrink-0 rounded-xl object-cover"
                            />
                            <Link
                              to="/receitas/$id"
                              params={{ id: recipe.id }}
                              className="min-w-0 flex-1"
                            >
                              <span className="block truncate text-sm font-semibold text-ink">
                                {recipe.title}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-ink/55">
                                <Clock className="size-3" />
                                {recipe.time}
                              </span>
                            </Link>
                            <button
                              type="button"
                              aria-label={`Remover ${slot} de ${day}`}
                              onClick={() => clearMeal(day, slot)}
                              className="grid size-7 shrink-0 place-items-center rounded-full text-ink/40 hover:bg-brand/10 hover:text-brand"
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                          <ServingsStepper
                            size="sm"
                            className="mt-2"
                            label={`Porções do ${slot} de ${day}`}
                            value={servings[mealKey(day, slot)] ?? baseServings(recipe.servings)}
                            onChange={(n) => setServings(day, slot, n)}
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery("");
                            setPicking({ day, slot });
                          }}
                          className="mt-1.5 flex w-full items-center gap-2 rounded-2xl border border-dashed border-ink/15 px-3 py-3 text-sm text-ink/50 transition-colors hover:border-brand/40 hover:text-brand"
                        >
                          <Plus className="size-4" />
                          Escolher prato
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-ink">
            <ShoppingBasket className="size-6 text-leafdark" />
            Lista de compras
          </h2>
          {shoppingList.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-card p-6 text-ink/60 ring-1 ring-black/5">
              Escolha as refeições da semana e os ingredientes aparecem aqui, sem repetição.
            </p>
          ) : (
            <ul className="mt-4 grid gap-2 rounded-3xl bg-card p-6 ring-1 ring-black/5 sm:grid-cols-2 lg:grid-cols-3">
              {shoppingList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {picking && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6">
          <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-background ring-1 ring-black/10 sm:rounded-3xl">
            <div className="flex items-center justify-between gap-3 border-b border-black/5 p-5">
              <h3 className="font-display text-lg font-semibold text-ink">
                {picking.slot} de {picking.day}
              </h3>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setPicking(null)}
                className="grid size-8 place-items-center rounded-full text-ink/50 hover:bg-card"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="p-5 pb-3">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar prato ou ingrediente"
                  className="w-full rounded-full bg-card py-3 pl-11 pr-4 text-sm text-ink ring-1 ring-black/5 outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-brand/40"
                />
              </label>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <ul className="space-y-2">
                {options.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setMeal(picking.day, picking.slot, r.id);
                        setPicking(null);
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl bg-card p-2 text-left ring-1 ring-black/5 hover:ring-brand/30"
                    >
                      <img
                        src={r.image}
                        alt={r.title}
                        width={80}
                        height={80}
                        loading="lazy"
                        className="size-12 shrink-0 rounded-xl object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {r.title}
                          {favorites.includes(r.id) && " ♥"}
                        </span>
                        <span className="text-xs text-ink/55">
                          {r.category} · {r.time}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
                {options.length === 0 && (
                  <li className="py-6 text-center text-sm text-ink/55">Nada encontrado.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

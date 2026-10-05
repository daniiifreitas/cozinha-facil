import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/lib/recipes";
import { usePantry } from "@/lib/kitchen-store";
import { pantryGroups, allPantryItems, matchRecipes, normalize } from "@/lib/pantry";
import { Search, Check, RotateCcw, Refrigerator } from "lucide-react";

export const Route = createFileRoute("/geladeira")({
  head: () => ({
    meta: [
      { title: "O que tem na geladeira? — Cozinha Fácil" },
      {
        name: "description",
        content:
          "Marque o que você tem em casa e descubra quais pratos dá para fazer agora, sem passar no mercado.",
      },
      { property: "og:title", content: "O que tem na geladeira? — Cozinha Fácil" },
      {
        property: "og:description",
        content: "Escolha os ingredientes que você tem e veja receitas prontas para fazer hoje.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PantryPage,
});

function PantryPage() {
  const { pantry, toggle, clear, ready } = usePantry();
  const [query, setQuery] = useState("");

  const q = normalize(query.trim());
  const searchHits = useMemo(
    () => (q ? allPantryItems.filter((i) => normalize(i.label).includes(q) || i.keys.some((k) => k.includes(q))) : []),
    [q],
  );

  const matches = useMemo(() => matchRecipes(recipes, pantry), [pantry]);
  const ready0 = matches.filter((m) => m.missing.length === 0).slice(0, 24);
  const almost = matches.filter((m) => m.missing.length > 0 && m.missing.length <= 2).slice(0, 12);

  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />

        <section className="mt-2">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <Refrigerator className="size-4" /> Sem ir ao mercado
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            O que tem na geladeira?
          </h1>
          <p className="mt-3 max-w-[52ch] text-pretty text-ink/65">
            Marque o que você tem em casa e eu mostro o que dá para cozinhar agora. Sal, pimenta,
            água e óleo já entram na conta.
          </p>
        </section>

        <section className="mt-6">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Procurar um ingrediente (ex.: creme de leite, abobrinha)"
              className="w-full rounded-full bg-card py-3 pl-11 pr-4 text-sm text-ink ring-1 ring-black/5 outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-brand/40"
            />
          </label>
          {q && (
            <div className="mt-3 flex flex-wrap gap-2">
              {searchHits.length === 0 ? (
                <p className="text-sm text-ink/55">Nada encontrado com esse nome.</p>
              ) : (
                searchHits.map((i) => (
                  <Chip
                    key={i.id}
                    label={i.label}
                    active={pantry.includes(i.id)}
                    onClick={() => toggle(i.id)}
                  />
                ))
              )}
            </div>
          )}
        </section>

        <section className="mt-6 space-y-6">
          {pantryGroups.map((group) => (
            <div key={group.id}>
              <h2 className="mb-3 font-display text-lg font-semibold text-ink">{group.label}</h2>
              <div className="flex flex-wrap gap-2">
                {group.items.map((i) => (
                  <Chip
                    key={i.id}
                    label={i.label}
                    active={pantry.includes(i.id)}
                    onClick={() => toggle(i.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {pantry.length > 0 && (
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-card px-4 py-3 ring-1 ring-black/5">
            <p className="text-sm text-ink/70">
              <span className="font-semibold text-ink">{pantry.length}</span>{" "}
              {pantry.length === 1 ? "ingrediente marcado" : "ingredientes marcados"}
            </p>
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
            >
              <RotateCcw className="size-4" /> Limpar
            </button>
          </div>
        )}

        <section className="mt-10">
          {!ready ? null : pantry.length === 0 ? (
            <p className="rounded-2xl bg-card p-6 text-center text-ink/60 ring-1 ring-black/5">
              Marque alguns ingredientes acima para ver o que dá para fazer hoje.
            </p>
          ) : (
            <>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Dá pra fazer agora
              </h2>
              {ready0.length === 0 ? (
                <p className="mt-3 rounded-2xl bg-card p-6 text-ink/60 ring-1 ring-black/5">
                  Ainda não deu match completo. Marque mais alguns itens ou veja abaixo o que falta
                  quase nada.
                </p>
              ) : (
                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {ready0.map((m) => (
                    <RecipeCard key={m.recipe.id} recipe={m.recipe} />
                  ))}
                </div>
              )}

              {almost.length > 0 && (
                <>
                  <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-ink">
                    Falta quase nada
                  </h2>
                  <p className="mt-1 text-sm text-ink/60">
                    Um ou dois itens separam você desses pratos.
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {almost.map((m) => (
                      <Link
                        key={m.recipe.id}
                        to="/receitas/$id"
                        params={{ id: m.recipe.id }}
                        className="flex gap-3 rounded-2xl bg-card p-3 ring-1 ring-black/5 transition-colors hover:ring-brand/30"
                      >
                        <img
                          src={m.recipe.image}
                          alt={m.recipe.title}
                          width={200}
                          height={200}
                          loading="lazy"
                          className="size-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <h3 className="font-display text-base font-semibold text-ink">
                            {m.recipe.title}
                          </h3>
                          <p className="mt-1 text-sm text-ink/60">
                            Falta: <span className="font-semibold text-brand">{m.missing.join(", ")}</span>
                          </p>
                          <p className="mt-1 text-xs text-ink/50">
                            {m.recipe.time} · {m.recipe.difficulty}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-leafdark text-cream"
          : "bg-card text-ink/70 ring-1 ring-black/5 hover:text-ink"
      }`}
    >
      {active && <Check className="size-3.5" />}
      {label}
    </button>
  );
}

import { useEffect, useMemo, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Timer } from "@/components/Timer";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ServingsStepper } from "@/components/ServingsStepper";
import { CookMode } from "@/components/CookMode";
import { baseServings, scaleIngredients } from "@/lib/servings";
import { recipes, getRecipeById } from "@/lib/recipes";
import { ChefHat, Clock, Users, CheckCircle2, Flame, Repeat, CalendarDays, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/receitas/$id")({
  loader: ({ params }) => {
    const recipe = getRecipeById(params.id);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.recipe.title} — Cozinha Fácil` : "Receita — Cozinha Fácil";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: loaderData
            ? `${loaderData.recipe.description} Aprenda a fazer passo a passo.`
            : "Receita passo a passo para iniciantes.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: loaderData
            ? `${loaderData.recipe.description} Aprenda a fazer passo a passo.`
            : "Receita passo a passo para iniciantes.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: RecipeDetailPage,
  notFoundComponent: RecipeNotFound,
});

function RecipeNotFound() {
  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />
        <div className="mt-12 text-center">
          <h1 className="font-display text-3xl font-semibold text-ink">Receita não encontrada</h1>
          <p className="mt-2 text-ink/65">Que tal escolher outra receita deliciosa?</p>
        </div>
      </div>
    </div>
  );
}

function RecipeDetailPage() {
  const { recipe } = Route.useLoaderData();
  const base = baseServings(recipe.servings);
  const [servings, setServings] = useState(base);
  const [cookMode, setCookMode] = useState(false);
  useEffect(() => {
    setServings(baseServings(recipe.servings));
    setCookMode(false);
  }, [recipe.id, recipe.servings]);
  const factor = servings / base;
  const ingredients = useMemo(
    () => scaleIngredients(recipe.ingredients, factor),
    [recipe.ingredients, factor],
  );
  const difficultyColor =
    recipe.difficulty === "Fácil"
      ? "bg-leafdark/10 text-leafdark"
      : recipe.difficulty === "Médio"
        ? "bg-brand/10 text-brand-dark"
        : "bg-ink/10 text-ink";


  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />

        <section className="mt-2 grid gap-8 lg:grid-cols-2">
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              width={1024}
              height={768}
              className="aspect-[4/3] w-full rounded-3xl object-cover ring-1 ring-black/5"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyColor}`}>
                {recipe.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-ink/55">
                <Clock className="size-3.5" />
                {recipe.time}
              </span>
              <span className="flex items-center gap-1 text-xs text-ink/55">
                <Users className="size-3.5" />
                {recipe.servings}
              </span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {recipe.title}
              </h1>
              <FavoriteButton id={recipe.id} size="lg" className="mt-1 shrink-0" />
            </div>
            <p className="mt-3 text-pretty text-ink/65">{recipe.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCookMode(true)}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-cream"
              >
                <PlayCircle className="size-5" />
                Iniciar Modo Cozinha
              </button>
              <Link
                to="/planejar"
                className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-ink/70 ring-1 ring-black/5 hover:text-brand"
              >
                <CalendarDays className="size-4" />
                Planejar esta semana
              </Link>
            </div>

            <div className="mt-6 rounded-2xl bg-card p-5 ring-1 ring-black/5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                  <ChefHat className="size-5 text-brand" />
                  Ingredientes
                </h2>
                <ServingsStepper
                  value={servings}
                  onChange={setServings}
                  size="sm"
                  className="bg-background"
                />
              </div>
              {servings !== base && (
                <p className="mb-3 text-xs text-ink/55">
                  Quantidades ajustadas de {base} para {servings}{" "}
                  {servings === 1 ? "porção" : "porções"}.
                </p>
              )}
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-ink/80">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-leafdark" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-ink">
              Modo de preparo
            </h2>
            <div className="space-y-6">
              {recipe.steps.map((step, index) => (
                <div key={index} className="rounded-2xl bg-card p-5 ring-1 ring-black/5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-cream">
                      {index + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      Passo {index + 1}
                    </h3>
                  </div>
                  <p className="mt-3 text-ink/80">{step.text}</p>
                  {step.tip && (
                    <div className="mt-3 rounded-xl bg-butter/40 p-3 text-sm text-ink/70 ring-1 ring-brand/10">
                      <strong className="text-brand-dark">Dica:</strong> {step.tip}
                    </div>
                  )}
                  {step.timer && (
                    <div className="mt-4">
                      <Timer initialSeconds={step.timer} label={`Timer do passo ${index + 1}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-3xl bg-leafdark p-6 text-cream">
                <h3 className="font-display text-xl font-semibold">Pronto para começar?</h3>
                <p className="mt-2 text-cream/75">
                  Um passo por vez, letras grandes e timer na tela — perfeito para acompanhar no fogão.
                </p>
                <button
                  onClick={() => setCookMode(true)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cream py-3 font-semibold text-leafdark ring-1 ring-cream/60"
                >
                  <PlayCircle className="size-5" />
                  Iniciar Modo Cozinha
                </button>
              </div>

              {recipe.cookingTips.length > 0 && (
                <div className="rounded-3xl bg-butter/40 p-6 ring-1 ring-brand/10">
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    <Flame className="size-5 text-brand" />
                    Dicas de cozimento
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {recipe.cookingTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-ink/75">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.substitutions.length > 0 && (
                <div className="rounded-3xl bg-card p-6 ring-1 ring-black/5">
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    <Repeat className="size-5 text-leafdark" />
                    Faltou algum ingrediente?
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {recipe.substitutions.map((sub, index) => (
                      <li key={index} className="text-sm text-ink/75">
                        <strong className="text-ink">{sub.item}:</strong> {sub.alt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

        </section>
      </div>

      {cookMode && (
        <CookMode
          recipe={recipe}
          ingredients={ingredients}
          servings={servings}
          onClose={() => setCookMode(false)}
        />
      )}
    </div>
  );
}

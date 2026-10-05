import { createFileRoute, Link } from "@tanstack/react-router";
import { Refrigerator } from "lucide-react";
import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import { Timer } from "@/components/Timer";
import { Confetti } from "@/components/Confetti";
import { MeatGuideCard } from "@/components/MeatGuideCard";
import { TipCard } from "@/components/TipCard";
import { recipes } from "@/lib/recipes";
import { meatGuides, kitchenTips } from "@/lib/guides";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cozinha Fácil — Aprenda a cozinhar do zero" },
      {
        name: "description",
        content:
          "App para quem não sabe cozinhar. Receitas fáceis, dicas, tempos de cozimento, melhores temperos e guia de carnes.",
      },
      { property: "og:title", content: "Cozinha Fácil — Aprenda a cozinhar do zero" },
      {
        property: "og:description",
        content:
          "Receitas fáceis, dicas, tempos de cozimento, melhores temperos e guia de carnes para iniciantes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />

        <section className="mt-2">
          <p className="text-sm font-semibold tracking-wide text-brand">Sexta-feira, 14h</p>
          <h1 className="mt-1 max-w-[20ch] text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Boa, Ana. Vamos cozinhar algo gostoso hoje?
          </h1>
          <p className="mt-3 max-w-[52ch] text-pretty text-ink/65">
            Um passo de cada vez. Escolha uma receita e eu te acompanho do início ao fim — sem
            pressa e sem sustos.
          </p>
        </section>

        <section className="mt-6">
          <Link
            to="/geladeira"
            className="flex items-center gap-4 rounded-3xl bg-leafdark p-5 text-cream transition-transform hover:-translate-y-0.5"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cream/15">
              <Refrigerator className="size-6 text-butter" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-xl font-semibold">
                O que tem na geladeira?
              </span>
              <span className="mt-0.5 block text-pretty text-sm text-cream/75">
                Marque o que você tem em casa e veja o que dá para cozinhar agora.
              </span>
            </span>
          </Link>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Receitas para começar
            </h2>
            <span className="text-sm text-ink/55">Ver todas</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.slice(0, 3).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <Timer initialSeconds={444} label="Tempo restante" />

          <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl bg-leafdark p-6 text-cream">
            <Confetti />
            <div className="relative">
              <p className="text-sm font-semibold text-butter">Receita concluída</p>
              <h3 className="mt-1 max-w-[22ch] text-balance font-display text-3xl font-semibold tracking-tight">
                Você fez o arroz perfeito!
              </h3>
              <p className="mt-2 max-w-[44ch] text-pretty text-cream/75">
                Muito bem. Anotei essa no seu caderninho de conquistas.
              </p>
            </div>
            <div className="relative mt-6">
              <button className="w-full rounded-xl bg-cream py-3 font-semibold text-leafdark ring-1 ring-cream/60">
                Próxima receita
              </button>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Guia de carnes
            </h2>
            <div className="flex gap-1 rounded-full bg-card p-1 text-sm ring-1 ring-black/5">
              <button className="rounded-full bg-brand px-4 py-1.5 font-semibold text-cream">
                Carnes
              </button>
              <button className="rounded-full px-4 py-1.5 font-medium text-ink/60">Temperos</button>
              <button className="rounded-full px-4 py-1.5 font-medium text-ink/60">Dicas</button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {meatGuides.map((guide) => (
              <MeatGuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-ink">
            Dicas para a cozinha
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {kitchenTips.slice(0, 3).map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

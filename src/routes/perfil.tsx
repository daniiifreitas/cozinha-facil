import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { CheckCircle2, Clock, ChefHat, Award } from "lucide-react";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Cozinha Fácil" },
      {
        name: "description",
        content: "Acompanhe suas conquistas e receitas feitas no Cozinha Fácil.",
      },
      { property: "og:title", content: "Perfil — Cozinha Fácil" },
      { property: "og:description", content: "Suas conquistas na cozinha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const achievements = [
  { id: 1, title: "Primeira receita", description: "Você completou uma receita do início ao fim.", icon: CheckCircle2 },
  { id: 2, title: "Mestre do arroz", description: "Acertou o ponto do arroz soltinho.", icon: ChefHat },
  { id: 3, title: "Tempo certo", description: "Usou o timer em 5 receitas.", icon: Clock },
];

const stats = [
  { label: "Receitas feitas", value: "12" },
  { label: "Horas na cozinha", value: "8h" },
  { label: "Conquistas", value: "3" },
];

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />

        <section className="mt-2">
          <div className="flex items-center gap-4">
            <div className="grid size-20 place-items-center rounded-full bg-butter font-display text-3xl font-semibold text-ink">
              A
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Ana
              </h1>
              <p className="text-ink/55">Cozinheira em treinamento · desde agosto de 2026</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-card p-5 text-center ring-1 ring-black/5"
              >
                <p className="font-display text-3xl font-semibold text-brand">{stat.value}</p>
                <p className="mt-1 text-sm text-ink/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-ink">
            <Award className="size-6 text-brand" />
            Conquistas
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className="rounded-2xl bg-card p-5 ring-1 ring-black/5"
                >
                  <div className="grid size-11 place-items-center rounded-xl bg-butter text-ink">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                    {achievement.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-ink">
            Últimas receitas
          </h2>
          <div className="rounded-2xl bg-card p-5 ring-1 ring-black/5">
            <div className="space-y-4">
              {[
                { name: "Arroz soltinho", date: "Hoje" },
                { name: "Ovos mexidos", date: "Ontem" },
                { name: "Salada caprese", date: "3 dias atrás" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-ink">{item.name}</span>
                  <span className="text-sm text-ink/55">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

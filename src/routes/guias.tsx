import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { MeatGuideCard } from "@/components/MeatGuideCard";
import { TipCard } from "@/components/TipCard";
import { meatGuides, seasoningGuides, kitchenTips, seasoningSubstitutions } from "@/lib/guides";
import { Flame, Leaf, Lightbulb, ArrowRight, Search } from "lucide-react";

type Tab = "carnes" | "temperos" | "dicas";

export const Route = createFileRoute("/guias")({
  head: () => ({
    meta: [
      { title: "Guias — Cozinha Fácil" },
      {
        name: "description",
        content: "Guias práticos de carnes, temperos e dicas para quem está aprendendo a cozinhar.",
      },
      { property: "og:title", content: "Guias — Cozinha Fácil" },
      {
        property: "og:description",
        content: "Tempos de cozimento, melhores temperos e dicas para iniciantes na cozinha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("carnes");
  const [subSearch, setSubSearch] = useState("");

  const subRows = seasoningSubstitutions.filter((row) => {
    const q = subSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      row.missing.toLowerCase().includes(q) ||
      row.use.toLowerCase().includes(q)
    );
  });

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "carnes", label: "Carnes", icon: Flame },
    { id: "temperos", label: "Temperos", icon: Leaf },
    { id: "dicas", label: "Dicas", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-background pb-40 text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-5">
        <Header />

        <section className="mt-2">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Guias da cozinha
          </h1>
          <p className="mt-3 max-w-[52ch] text-pretty text-ink/65">
            Consulte tempos, temperos e truques para cozinhar com mais confiança.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex gap-1 rounded-full bg-card p-1 text-sm ring-1 ring-black/5 w-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-medium transition-colors ${
                    isActive
                      ? "bg-brand font-semibold text-cream"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {activeTab === "carnes" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {meatGuides.map((guide) => (
                  <MeatGuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            )}

            {activeTab === "temperos" && (
              <div className="space-y-10">
                <div className="grid gap-4 sm:grid-cols-2">
                  {seasoningGuides.map((seasoning) => (
                    <div
                      key={seasoning.id}
                      className="rounded-2xl bg-card p-5 ring-1 ring-black/5"
                    >
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {seasoning.name}
                      </h3>
                      <p className="mt-2 text-sm text-ink/60">{seasoning.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {seasoning.pairings.map((pairing) => (
                          <span
                            key={pairing}
                            className="rounded-full bg-butter/40 px-2.5 py-1 text-xs font-medium text-ink/70 ring-1 ring-brand/10"
                          >
                            {pairing}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <section>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    Faltou um tempero? Troque sem medo
                  </h2>
                  <p className="mt-2 max-w-[52ch] text-sm text-ink/60">
                    Ache o tempero que acabou na lista e veja o que usar no lugar — com a medida
                    certa para o prato não mudar de sabor.
                  </p>

                  <div className="relative mt-5 max-w-sm">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                    <input
                      type="search"
                      value={subSearch}
                      onChange={(e) => setSubSearch(e.target.value)}
                      placeholder="Buscar tempero (ex.: orégano, limão)"
                      aria-label="Buscar tempero na tabela de substituição"
                      className="w-full rounded-full bg-card py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 ring-1 ring-black/5 outline-none focus:ring-2 focus:ring-brand/40"
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {subRows.map((row) => (
                      <div
                        key={row.id}
                        className="rounded-2xl bg-card p-5 ring-1 ring-black/5"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-base font-semibold text-ink line-through decoration-brand/50 decoration-2">
                            {row.missing}
                          </span>
                          <ArrowRight className="size-4 shrink-0 text-brand" />
                          <span className="font-display text-base font-semibold text-leaf">
                            {row.use}
                          </span>
                        </div>
                        <p className="mt-2 inline-block rounded-full bg-butter/40 px-2.5 py-1 text-xs font-medium text-ink/70 ring-1 ring-brand/10">
                          {row.amount}
                        </p>
                        {row.note && (
                          <p className="mt-2 text-sm text-ink/60">{row.note}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {subRows.length === 0 && (
                    <p className="mt-4 rounded-2xl bg-card p-5 text-sm text-ink/60 ring-1 ring-black/5">
                      Não achamos esse tempero na tabela — mas na dúvida, ervas secas trocam entre
                      si na mesma medida, e limão no final disfarça quase qualquer sabor faltoso.
                    </p>
                  )}
                </section>
              </div>
            )}

            {activeTab === "dicas" && (
              <div className="grid gap-4 sm:grid-cols-3">
                {kitchenTips.map((tip) => (
                  <TipCard key={tip.id} tip={tip} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

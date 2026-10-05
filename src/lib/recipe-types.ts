const catCafe = "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80";
const catMassas = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80";
const catCarnes = "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80";
const catAves = "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80";
const catPeixes = "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80";
const catArroz = "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80";
const catSopas = "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80";
const catSaladas = "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80";
const catLanches = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
const catDoces = "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80";
const catLegumes = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80";
const catBebidas = "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80";

export type Difficulty = "Fácil" | "Médio" | "Difícil";

export interface Substitution {
  item: string;
  alt: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  servings: string;
  difficulty: Difficulty;
  category: string;
  ingredients: string[];
  steps: { text: string; tip?: string; timer?: number }[];
  cookingTips: string[];
  substitutions: Substitution[];
}

export const categoryImages: Record<string, string> = {
  "Café da manhã": catCafe,
  Massas: catMassas,
  Carnes: catCarnes,
  Aves: catAves,
  Peixes: catPeixes,
  "Arroz e feijão": catArroz,
  Sopas: catSopas,
  Saladas: catSaladas,
  Lanches: catLanches,
  Doces: catDoces,
  Legumes: catLegumes,
  Bebidas: catBebidas,
  Básico: catCafe,
};

/** Passo: só texto, ou [texto, tempo em segundos], ou [texto, tempo, dica]. */
export type RawStep = string | [string, number] | [string, number | null, string];

export interface RawRecipe {
  id: string;
  t: string;
  d: string;
  cat: keyof typeof categoryImages | string;
  time: string;
  serv: string;
  diff: Difficulty;
  ing: string[];
  st: RawStep[];
  tips: string[];
  subs: [string, string][];
}

export function make(raw: RawRecipe): Recipe {
  return {
    id: raw.id,
    title: raw.t,
    description: raw.d,
    image: categoryImages[raw.cat] ?? catCafe,
    time: raw.time,
    servings: raw.serv,
    difficulty: raw.diff,
    category: raw.cat,
    ingredients: raw.ing,
    steps: raw.st.map((s) => {
      if (typeof s === "string") return { text: s };
      const [text, timer, tip] = s;
      return {
        text,
        ...(typeof timer === "number" ? { timer } : {}),
        ...(tip ? { tip } : {}),
      };
    }),
    cookingTips: raw.tips,
    substitutions: raw.subs.map(([item, alt]) => ({ item, alt })),
  };
}

export function makeAll(list: RawRecipe[]): Recipe[] {
  return list.map(make);
}
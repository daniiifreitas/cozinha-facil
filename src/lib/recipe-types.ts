import catCafe from "@/assets/cat-cafe.jpg";
import catMassas from "@/assets/cat-massas.jpg";
import catCarnes from "@/assets/cat-carnes.jpg";
import catAves from "@/assets/cat-aves.jpg";
import catPeixes from "@/assets/cat-peixes.jpg";
import catArroz from "@/assets/cat-arroz.jpg";
import catSopas from "@/assets/cat-sopas.jpg";
import catSaladas from "@/assets/cat-saladas.jpg";
import catLanches from "@/assets/cat-lanches.jpg";
import catDoces from "@/assets/cat-doces.jpg";
import catLegumes from "@/assets/cat-legumes.jpg";
import catBebidas from "@/assets/cat-bebidas.jpg";

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

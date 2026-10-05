import type { Recipe } from "@/lib/recipe-types";

export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Itens que quase todo mundo tem em casa — não contam como "faltando". */
const STAPLE_KEYS = [
  "sal",
  "pimenta",
  "agua",
  "oleo",
  "azeite",
  "papel-aluminio",
  "papel aluminio",
  "papel-manteiga",
  "gelo",
  "tempero",
  "caldo de legumes",
  "caldo de carne",
  "caldo de galinha",
];

export interface PantryItem {
  id: string;
  label: string;
  keys: string[];
}

export interface PantryGroup {
  id: string;
  label: string;
  items: PantryItem[];
}

const item = (id: string, label: string, keys?: string[]): PantryItem => ({
  id,
  label,
  keys: (keys ?? [id]).map(normalize),
});

export const pantryGroups: PantryGroup[] = [
  {
    id: "basicos",
    label: "Básicos da despensa",
    items: [
      item("ovo", "Ovos", ["ovo", "ovos", "gema", "gemas", "clara"]),
      item("arroz", "Arroz", ["arroz"]),
      item("feijao", "Feijão", ["feijao"]),
      item("macarrao", "Macarrão", [
        "macarrao",
        "espaguete",
        "penne",
        "parafuso",
        "talharim",
        "massa de lasanha",
        "nhoque",
      ]),
      item("pao", "Pão", ["pao", "paes", "pao de forma", "torrada"]),
      item("batata", "Batata", ["batata", "batatas"]),
      item("farinha", "Farinha de trigo", ["farinha de trigo", "farinha"]),
      item("acucar", "Açúcar", ["acucar"]),
      item("fuba", "Fubá / polenta", ["fuba", "polenta"]),
      item("aveia", "Aveia", ["aveia"]),
      item("tapioca", "Goma de tapioca", ["tapioca", "goma"]),
      item("lentilha", "Lentilha / grão-de-bico", ["lentilha", "grao-de-bico", "grao de bico"]),
    ],
  },
  {
    id: "proteinas",
    label: "Carnes e proteínas",
    items: [
      item("frango", "Frango", ["frango", "peito de frango", "coxa", "sobrecoxa", "galinha"]),
      item("carne-moida", "Carne moída", ["carne moida"]),
      item("bife", "Bife / carne em bife", ["bife", "bifes", "contrafile", "alcatra", "file mignon", "picanha"]),
      item("carne-cozida", "Carne para cozido", ["musculo", "acem", "patinho", "coxao", "carne em cubos", "carne seca"]),
      item("linguica", "Linguiça / salsicha", ["linguica", "salsicha", "calabresa"]),
      item("bacon", "Bacon / presunto", ["bacon", "presunto"]),
      item("peixe", "Peixe", ["tilapia", "peixe", "file de peixe", "merluza", "salmao", "sardinha", "pescada"]),
      item("atum", "Atum em lata", ["atum"]),
      item("camarao", "Camarão", ["camarao"]),
    ],
  },
  {
    id: "laticinios",
    label: "Geladeira e laticínios",
    items: [
      item("leite", "Leite", ["leite"]),
      item("manteiga", "Manteiga", ["manteiga", "margarina"]),
      item("queijo", "Queijo", ["queijo", "mucarela", "muçarela", "parmesao", "prato", "requeijao"]),
      item("creme-de-leite", "Creme de leite", ["creme de leite"]),
      item("leite-condensado", "Leite condensado", ["leite condensado"]),
      item("iogurte", "Iogurte", ["iogurte"]),
      item("maionese", "Maionese", ["maionese"]),
    ],
  },
  {
    id: "frescos",
    label: "Legumes e frescos",
    items: [
      item("cebola", "Cebola", ["cebola", "cebolas"]),
      item("alho", "Alho", ["alho"]),
      item("tomate", "Tomate", ["tomate", "tomates"]),
      item("cenoura", "Cenoura", ["cenoura"]),
      item("abobrinha", "Abobrinha", ["abobrinha"]),
      item("abobora", "Abóbora", ["abobora"]),
      item("pimentao", "Pimentão", ["pimentao"]),
      item("brocolis", "Brócolis / couve-flor", ["brocolis", "couve-flor", "couve flor"]),
      item("couve", "Couve / espinafre", ["couve", "espinafre"]),
      item("alface", "Alface / folhas", ["alface", "rucula", "folhas", "mix de folhas"]),
      item("mandioca", "Mandioca", ["mandioca", "aipim", "macaxeira"]),
      item("milho", "Milho", ["milho"]),
      item("ervilha", "Ervilha / vagem", ["ervilha", "vagem"]),
      item("champignon", "Champignon", ["champignon", "cogumelo"]),
      item("cheiro-verde", "Cheiro-verde / salsinha", ["cheiro-verde", "salsinha", "cebolinha", "coentro"]),
      item("manjericao", "Manjericão", ["manjericao"]),
    ],
  },
  {
    id: "frutas",
    label: "Frutas",
    items: [
      item("limao", "Limão", ["limao"]),
      item("laranja", "Laranja", ["laranja"]),
      item("banana", "Banana", ["banana"]),
      item("maca", "Maçã", ["maca"]),
      item("abacate", "Abacate", ["abacate"]),
      item("manga", "Manga", ["manga"]),
      item("maracuja", "Maracujá", ["maracuja"]),
      item("morango", "Morango", ["morango"]),
    ],
  },
  {
    id: "extras",
    label: "Molhos e extras",
    items: [
      item("molho-tomate", "Molho de tomate", ["molho de tomate", "extrato de tomate", "tomate pelado"]),
      item("shoyu", "Shoyu", ["shoyu", "molho de soja"]),
      item("mostarda", "Mostarda", ["mostarda"]),
      item("ketchup", "Ketchup", ["ketchup"]),
      item("vinagre", "Vinagre", ["vinagre"]),
      item("chocolate", "Chocolate / achocolatado", ["chocolate", "cacau", "achocolatado"]),
      item("fermento", "Fermento", ["fermento"]),
      item("amido", "Amido de milho", ["amido de milho", "maisena"]),
      item("coco", "Leite de coco / coco", ["leite de coco", "coco ralado"]),
      item("mel", "Mel", ["mel"]),
      item("vinho", "Vinho", ["vinho"]),
      item("cafe", "Café", ["cafe"]),
      item("pipoca", "Milho de pipoca", ["milho de pipoca", "pipoca"]),
      item("farinha-mandioca", "Farinha de mandioca", ["farinha de mandioca", "farofa"]),
      item("farinha-rosca", "Farinha de rosca", ["farinha de rosca", "panko"]),
      item("azeitona", "Azeitona", ["azeitona"]),
      item("noz-moscada", "Noz-moscada", ["noz-moscada"]),
    ],
  },
];

export const allPantryItems: PantryItem[] = pantryGroups.flatMap((g) => g.items);

const itemById = new Map(allPantryItems.map((i) => [i.id, i]));

export function pantryLabel(id: string) {
  return itemById.get(id)?.label ?? id;
}

function isStaple(line: string) {
  return STAPLE_KEYS.some((k) => line.includes(k));
}

/** Descobre qual item da despensa uma linha de ingrediente exige. */
function matchItem(line: string): PantryItem | null {
  let best: PantryItem | null = null;
  let bestLen = 0;
  for (const it of allPantryItems) {
    for (const key of it.keys) {
      if (key.length > bestLen && new RegExp(`(^|[^a-z])${key}([^a-z]|$)`).test(line)) {
        best = it;
        bestLen = key.length;
      }
    }
  }
  return best;
}

export interface PantryMatch {
  recipe: Recipe;
  used: number;
  missing: string[];
}

/** Nome curto e legível de um ingrediente que não está no catálogo. */
function shortName(raw: string) {
  let s = raw
    .replace(/\(.*?\)/g, "")
    .replace(/^\s*[\d/.,½¼¾⅓⅔\s]+/, "")
    .replace(/^(x[ií]caras?|colheres?|colher|gramas?|g|kg|ml|litros?|latas?|caixas?|fatias?|dentes?|unidades?)\b/i, "")
    .replace(/^\s*(de|da|do)\s+/i, "")
    .split(",")[0]!
    .trim();
  if (s.length > 28) s = s.slice(0, 28).trim() + "…";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Classifica as receitas pelo que a pessoa tem em casa. */
export function matchRecipes(recipes: Recipe[], selected: string[]): PantryMatch[] {
  const has = new Set(selected);
  if (has.size === 0) return [];

  const results: PantryMatch[] = [];
  for (const recipe of recipes) {
    const missing = new Set<string>();
    let used = 0;
    for (const raw of recipe.ingredients) {
      const line = normalize(raw);
      const match = matchItem(line);
      if (match) {
        if (has.has(match.id)) used += 1;
        else if (!isStaple(line)) missing.add(match.label);
        continue;
      }
      // Ingrediente fora do catálogo: só ignora se for item básico da despensa.
      if (!isStaple(line)) {
        const name = shortName(raw);
        if (name) missing.add(name);
      }
    }
    if (used === 0) continue;
    results.push({ recipe, used, missing: [...missing] });
  }

  return results.sort(
    (a, b) =>
      a.missing.length - b.missing.length ||
      b.used - a.used ||
      a.recipe.title.localeCompare(b.recipe.title, "pt-BR"),
  );
}

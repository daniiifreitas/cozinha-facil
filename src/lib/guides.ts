export interface MeatGuide {
  id: string;
  name: string;
  initial: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  temperature: string;
  time: string;
  tip: string;
}

export const meatGuides: MeatGuide[] = [
  {
    id: "bife-grelhado",
    name: "Bife grelhado",
    initial: "B",
    difficulty: "Médio",
    temperature: "220°C na chapa",
    time: "5–6 min de cada lado",
    tip: "Deixa descansar 3 min antes de cortar.",
  },
  {
    id: "frango-assado",
    name: "Frango assado",
    initial: "F",
    difficulty: "Fácil",
    temperature: "180°C no forno",
    time: "45–50 min",
    tip: "Cubra com papel-alumínio se dourar rápido.",
  },
  {
    id: "salmao-grelhado",
    name: "Salmão grelhado",
    initial: "S",
    difficulty: "Fácil",
    temperature: "200°C",
    time: "8 min na pele",
    tip: "Acerte o sal só no final para a crosta dourar.",
  },
  {
    id: "lasanha-bolonhesa",
    name: "Lasanha bolonhesa",
    initial: "L",
    difficulty: "Médio",
    temperature: "190°C no forno",
    time: "40 min",
    tip: "Deixe a borda dourar antes de servir.",
  },
];

export interface SeasoningGuide {
  id: string;
  name: string;
  description: string;
  pairings: string[];
}

export const seasoningGuides: SeasoningGuide[] = [
  {
    id: "sal-pimenta",
    name: "Sal e pimenta",
    description: "A base de quase todo tempero. Tempere sempre de longe para distribuir uniformemente — e prove antes de servir: o que parece 'sem graça' geralmente é sal.",
    pairings: ["carnes", "ovos", "legumes", "massas"],
  },
  {
    id: "alho",
    name: "Alho",
    description: "Doura rápido e perfuma qualquer preparo. Fogo médio-baixo e atenção: queimou, fica amargo e não tem conserto — comece de novo.",
    pairings: ["arroz", "carnes", "massas", "legumes"],
  },
  {
    id: "cebola",
    name: "Cebola",
    description: "Refogada devagar até ficar translúcida, vira a base do sabor de quase tudo: molhos, sopas, carnes e arroz. É o passo 1 da maioria das receitas.",
    pairings: ["molhos", "sopas", "carnes", "arroz"],
  },
  {
    id: "sofrito",
    name: "O trio do refogado",
    description: "Azeite + cebola + alho douradinho é o fundamento da cozinha brasileira. Quando um prato parece 'sem graça', quase sempre faltou esse refogado.",
    pairings: ["feijão", "arroz", "molhos", "estufados"],
  },
  {
    id: "ervas-frescas",
    name: "Ervas frescas",
    description: "Salsinha, coentro e manjericão entram no final para manter o sabor vivo. Cebolinha e coentro picados em cima do prato pronto parecem mágica.",
    pairings: ["saladas", "sopas", "peixes", "risotos"],
  },
  {
    id: "ervas-secas",
    name: "Ervas secas",
    description: "Orégano, louro e tomilho aguentam cozimento longo — perfeitas para molhos, sopas e carnes de panela. Uma folha de louro no arroz e no feijão muda tudo.",
    pairings: ["molhos", "carnes de panela", "sopas", "arroz"],
  },
  {
    id: "especiarias",
    name: "Especiarias do dia a dia",
    description: "Páprica dá cor e um toque defumado, cominho combina com feijão e carnes, canela vai bem em doces e no café. Menos é mais: meia colher já basta.",
    pairings: ["carnes", "feijão", "assados", "doces"],
  },
  {
    id: "acidos",
    name: "Ácidos",
    description: "Limão ou vinagre no final realçam todos os outros sabores. Um prato 'faltoso' que já tem sal costuma precisar de um pouquinho de limão, não de mais sal.",
    pairings: ["peixes", "saladas", "carnes", "legumes"],
  },
  {
    id: "gorduras",
    name: "Gorduras boas",
    description: "Um fio de azeite cru por cima no final dá brilho e sabor. Uma noz de manteiga no fim do molho ou do arroz deixa tudo mais gostoso — é o truque dos restaurantes.",
    pairings: ["massas", "molhos", "legumes", "pães"],
  },
  {
    id: "umami",
    name: "Umami (o reforço secreto)",
    description: "Um fio de shoyu, uma pitada de caldo de galinha em pó ou queijo ralado deixam molhos e sopas muito mais encorpados. Use aos poucos e prove sempre.",
    pairings: ["molhos", "sopas", "carnes", "arroz"],
  },
  {
    id: "marinadas",
    name: "Marinadas",
    description: "Carne que descansa 30 min com limão, alho, sal e um fio de azeite fica macia e saborosa. Frango é o que mais ganha com isso.",
    pairings: ["frango", "peixes", "carnes", "espetinhos"],
  },
  {
    id: "pimenta",
    name: "Pimenta-do-reino",
    description: "Moída na hora vale mais que a de lata. Para dar calor sem arder demais, use pimenta-calabresa ou um toque extra de pimenta-do-reino.",
    pairings: ["carnes", "molhos", "ovos", "peixes"],
  },
];

export interface SubstitutionRow {
  id: string;
  missing: string;
  use: string;
  amount: string;
  note?: string;
}

export const seasoningSubstitutions: SubstitutionRow[] = [
  {
    id: "alho-fresco",
    missing: "Alho fresco",
    use: "Alho em pó",
    amount: "½ colher (chá) por dente",
    note: "Ferva mais devagar: o pó queima rápido e amarga.",
  },
  {
    id: "cebola",
    missing: "Cebola",
    use: "Cebola em flocos ou alho-poró",
    amount: "1 colher (sopa) por cebola pequena",
    note: "Hidrate os flocos em um fio de água por 5 min antes do refogado.",
  },
  {
    id: "ervas-frescas-secas",
    missing: "Ervas frescas (salsinha, cebolinha, manjericão)",
    use: "As mesmas ervas secas",
    amount: "1 colher (chá) de seca para cada 1 colher (sopa) de fresca",
    note: "A seca é mais concentrada — sempre use 3× menos.",
  },
  {
    id: "coentro",
    missing: "Coentro",
    use: "Salsinha + umas gotas de limão",
    amount: "Mesma medida de salsinha",
  },
  {
    id: "manjericao",
    missing: "Manjericão",
    use: "Orégano ou salsinha",
    amount: "Metade da medida",
    note: "Finalize com um fio de azeite para reaproximar o sabor.",
  },
  {
    id: "oregano",
    missing: "Orégano",
    use: "Tomilho ou mistura de ervas secas",
    amount: "Mesma medida",
  },
  {
    id: "louro",
    missing: "Louro",
    use: "Uma pitada de tomilho seco",
    amount: "¼ colher (chá) por folha",
    note: "O tomilho não precisa ser retirado depois, diferente do louro.",
  },
  {
    id: "cominho",
    missing: "Cominho",
    use: "Páprica defumada",
    amount: "Metade da medida",
  },
  {
    id: "paprica",
    missing: "Páprica",
    use: "Colorau (colorífico) ou cominho em pó",
    amount: "Mesma medida",
    note: "O cominho muda o sabor: comece com metade e prove.",
  },
  {
    id: "pimenta-reino",
    missing: "Pimenta-do-reino",
    use: "Pimenta-branca",
    amount: "Mesma medida",
    note: "A branca é mais aromática e um pouco mais picante.",
  },
  {
    id: "calabresa",
    missing: "Pimenta-calabresa",
    use: "Molho de pimenta",
    amount: "Algumas gotas, aos poucos",
    note: "Cuidado: o molho costuma ter vinagre, prove antes de corrigir o sal.",
  },
  {
    id: "limao",
    missing: "Limão",
    use: "Vinagre de maçã",
    amount: "Metade da medida",
    note: "O vinagre é mais ácido — coloque menos e vá provando.",
  },
  {
    id: "vinagre",
    missing: "Vinagre",
    use: "Suco de limão",
    amount: "Mesma medida",
    note: "Se for molho quente, adicione só no final para não amargar.",
  },
  {
    id: "shoyu",
    missing: "Shoyu (molho de soja)",
    use: "Sal + uma pitada de açúcar",
    amount: "1 pitada de cada por colher (sopa)",
    note: "Deixa o mesmo toque encorpado em molhos e sopas.",
  },
  {
    id: "manteiga",
    missing: "Manteiga",
    use: "Azeite ou margarina",
    amount: "¾ da medida",
    note: "Com azeite, refogue em fogo um pouco mais baixo.",
  },
  {
    id: "azeite",
    missing: "Azeite",
    use: "Óleo de soja ou girassol",
    amount: "Mesma medida",
    note: "O sabor fica mais neutro; corrija no final com uma pitada de sal.",
  },
];


export interface KitchenTip {
  id: string;
  title: string;
  description: string;
}

export const kitchenTips: KitchenTip[] = [
  {
    id: "paciencia",
    title: "Paciência vale ouro",
    description: "Leve o tempero para um ponto a mais de dourado. Não queime, só perfuma.",
  },
  {
    id: "tempere-por-partes",
    title: "Tempere por partes",
    description: "Acerte o sal aos poucos e prove sempre. Errar pouco é melhor que errar muito.",
  },
  {
    id: "descanse",
    title: "Deixe descansar",
    description: "Carnes descansam por 3 min. O suco se espalha e a peça fica mais suculenta.",
  },
  {
    id: "agua-fervente",
    title: "Água bem quente",
    description: "Para arroz e massa, a água deve estar fervendo antes de começar.",
  },
  {
    id: "fogo-baixo",
    title: "Domine o fogo baixo",
    description: "A maioria dos erros na cozinha vem de fogo alto demais. Controle o calor.",
  },
  {
    id: "mise-en-place",
    title: "Prepare tudo antes",
    description: "Separe ingredientes antes de ligar o fogo. Cozinhar fica mais tranquilo.",
  },
  {
    id: "prove-o-caminho",
    title: "Prove durante o caminho",
    description: "Prove o molho, o arroz e a sopa antes de servir — e de novo depois de temperar. Seu paladar é o melhor termômetro.",
  },
  {
    id: "toque-final",
    title: "O toque final",
    description: "Ervas picadas, um fio de azeite ou raspas de limão por cima do prato pronto mudam tudo. Servir bonito também é sabor.",
  },
  {
    id: "nao-mexa-tanto",
    title: "Não mexa tanto",
    description: "Carne e frango douram melhor se você deixar quietinhos na panela. Mexer demais impede a casquinha dourada onde mora o sabor.",
  },
  {
    id: "deglaciar",
    title: "Use a panela suja",
    description: "Depois de dourar carne, aquele fundinho grudado é puro sabor. Um pouco de água quente solta tudo e vira um molho incrível.",
  },
];

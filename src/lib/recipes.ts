import type { Difficulty, Recipe, Substitution } from "./recipe-types";
const ovosMexidos = "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80";
const risotoParmesao = "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80";
const saladaCaprese = "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80";
const ovoCozido = "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80";
const macarraoAlhoOleo = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80";
const frangoGrelhado = "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80";
const boeufBourguignon = "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80";
const lasanha = "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=800&q=80";
const bifeAcebolado = "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80";
const sopaAbobora = "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80";
const brownie = "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80";

import { daily1 } from "./daily-1";
import { daily2 } from "./daily-2";
import { daily3 } from "./daily-3";
import { daily4 } from "./daily-4";
import { daily5 } from "./daily-5";
import { daily6 } from "./daily-6";

export type { Difficulty, Substitution, Recipe } from "./recipe-types";

const baseRecipes: Recipe[] = [
  {
    id: "ovo-cozido",
    title: "Ovo cozido no ponto certo",
    description: "Do mole ao duro: só uma questão de minutos.",
    image: ovoCozido,
    time: "12 min",
    servings: "quantos você quiser",
    difficulty: "Fácil",
    category: "Básico",
    ingredients: ["Ovos", "Água suficiente para cobrir", "1 colher (chá) de sal ou vinagre"],
    steps: [
      {
        text: "Coloque os ovos em uma panela e cubra com água fria, 2 dedos acima deles.",
        tip: "Água fria no início evita que a casca trinque com o choque térmico.",
      },
      {
        text: "Leve ao fogo alto até ferver. A contagem do tempo começa a partir da fervura.",
      },
      {
        text: "Gema mole (bem cremosa): 6 minutos de fervura.",
        timer: 360,
      },
      {
        text: "Gema mole-cremosa (tipo japonês): 7 minutos.",
        timer: 420,
      },
      {
        text: "Gema duro-macia: 9 minutos. Gema totalmente firme: 12 minutos.",
        timer: 540,
      },
      {
        text: "Transfira imediatamente para uma tigela com água e gelo por 2 minutos e descasque.",
        tip: "O choque de gelo para o cozimento e faz a casca sair fácil.",
        timer: 120,
      },
    ],
    cookingTips: [
      "Ovos muito frescos são mais difíceis de descascar — os de 5 a 10 dias soltam melhor.",
      "Anel esverdeado ao redor da gema = passou do ponto. Reduza 1 a 2 minutos.",
      "Em altitude alta, some 1 minuto ao tempo.",
    ],
    substitutions: [
      { item: "Sal na água", alt: "Vinagre branco — ajuda a coagular a clara se a casca trincar." },
      { item: "Água com gelo", alt: "Água corrente bem fria por 1 minuto." },
    ],
  },
  {
    id: "ovos-mexidos",
    title: "Ovos mexidos cremosos",
    description: "Perfeito para o primeiro café da manhã.",
    image: ovosMexidos,
    time: "10 min",
    servings: "2 porções",
    difficulty: "Fácil",
    category: "Café da manhã",
    ingredients: [
      "4 ovos",
      "1 colher (sopa) de manteiga",
      "Sal e pimenta a gosto",
      "Salsinha picada (opcional)",
    ],
    steps: [
      {
        text: "Quebre os ovos em uma tigela e bata levemente com um garfo.",
        tip: "Não bata demais — ovos mexidos cremosos gostam de clara e gema levemente misturadas.",
      },
      {
        text: "Derreta a manteiga em fogo baixo em uma frigideira antiaderente.",
        tip: "Fogo baixo é o segredo. Ovo não gosta de pressa.",
      },
      {
        text: "Despeje os ovos e mexa delicadamente com uma espátula de silicone.",
        timer: 180,
      },
      {
        text: "Quando estiver quase no ponto, retire do fogo e tempere.",
        tip: "O calor residual termina o cozimento sem ressecar.",
      },
    ],
    cookingTips: [
      "Tempere com sal só no final: sal cedo demais deixa o ovo aguado.",
      "Uma colher de creme de leite ou leite fora do fogo devolve a cremosidade se passar do ponto.",
    ],
    substitutions: [
      { item: "Manteiga", alt: "Azeite ou óleo neutro (fica menos aromático, mas funciona)." },
      { item: "Salsinha", alt: "Cebolinha, orégano fresco ou nada mesmo." },
    ],
  },
  {
    id: "arroz-soltinho",
    title: "Arroz soltinho",
    description: "O acompanhamento que todo iniciante precisa dominar.",
    image: ovosMexidos,
    time: "25 min",
    servings: "4 porções",
    difficulty: "Fácil",
    category: "Básico",
    ingredients: [
      "1 xícara de arroz",
      "2 xícaras de água quente",
      "1 dente de alho",
      "1 colher (sopa) de azeite",
      "Sal a gosto",
    ],
    steps: [
      { text: "Refogue o alho no azeite até dourar levemente.", tip: "Não deixe queimar, senão fica amargo." },
      { text: "Adicione o arroz e misture bem para envolver os grãos.", timer: 60 },
      { text: "Acrescente a água fervente e o sal. Tampe a panela." },
      { text: "Cozinhe em fogo baixo até a água secar.", timer: 900 },
      { text: "Desligue e deixe descansar tampado por 5 minutos antes de soltar com um garfo.", timer: 300 },
    ],
    cookingTips: [
      "Proporção segura: 2 partes de água para 1 de arroz branco.",
      "Não mexa durante o cozimento — mexer solta amido e empapa.",
      "Arroz integral pede 2,5 xícaras de água e cerca de 35 minutos.",
    ],
    substitutions: [
      { item: "Alho", alt: "Cebola picada, ou alho em pó (1/2 colher de chá)." },
      { item: "Azeite", alt: "Óleo de soja, manteiga ou óleo de coco." },
    ],
  },
  {
    id: "macarrao-alho-oleo",
    title: "Macarrão alho e óleo",
    description: "Cinco ingredientes, dez minutos, sabor de restaurante.",
    image: macarraoAlhoOleo,
    time: "15 min",
    servings: "2 porções",
    difficulty: "Fácil",
    category: "Massas",
    ingredients: [
      "200 g de espaguete",
      "4 dentes de alho fatiados finos",
      "4 colheres (sopa) de azeite",
      "Pimenta calabresa a gosto",
      "Salsinha picada",
      "Sal para a água",
    ],
    steps: [
      {
        text: "Ferva bastante água com sal (1 colher de sopa por litro) e cozinha a massa.",
        tip: "A água tem que ter gosto de mar — é o único momento de temperar a massa por dentro.",
        timer: 480,
      },
      {
        text: "Em uma frigideira fria, coloque azeite e alho e leve ao fogo baixo até dourar levemente.",
        tip: "Começar com a frigideira fria evita que o alho queime.",
        timer: 180,
      },
      { text: "Reserve 1 concha da água do cozimento antes de escorrer a massa." },
      {
        text: "Junte a massa à frigideira com um pouco da água reservada e mexa até formar um molho brilhante.",
        tip: "O amido da água é o que emulsiona e cria o molho.",
      },
      { text: "Finalize com salsinha e pimenta calabresa." },
    ],
    cookingTips: [
      "Al dente = 1 minuto a menos que a embalagem indica; ele termina de cozinhar na frigideira.",
      "Nunca jogue óleo na água de cozimento: o molho deixa de grudar na massa.",
    ],
    substitutions: [
      { item: "Espaguete", alt: "Qualquer massa longa ou curta que tiver em casa." },
      { item: "Pimenta calabresa", alt: "Pimenta-do-reino, páprica picante ou nada." },
      { item: "Salsinha", alt: "Cebolinha, manjericão ou orégano seco." },
    ],
  },
  {
    id: "salada-caprese",
    title: "Salada caprese",
    description: "Rápida, fresca e cheia de cor.",
    image: saladaCaprese,
    time: "15 min",
    servings: "2 porções",
    difficulty: "Fácil",
    category: "Saladas",
    ingredients: [
      "2 tomates maduros",
      "1 bola de muçarela de búfala",
      "Folhas de manjericão fresco",
      "Azeite extra virgem",
      "Sal e pimenta",
    ],
    steps: [
      { text: "Lave e corte os tomates em fatias grossas." },
      { text: "Corte a muçarela em fatias do mesmo tamanho." },
      { text: "Monte alternando fatias de tomate e muçarela em um prato." },
      {
        text: "Decore com manjericão, regue com azeite e tempere.",
        tip: "Use azeite de boa qualidade — faz toda a diferença.",
      },
    ],
    cookingTips: [
      "Tempere com sal só na hora de servir, senão o tomate solta água.",
      "Tomate gelado tem pouco sabor: deixe fora da geladeira 20 minutos antes.",
    ],
    substitutions: [
      { item: "Muçarela de búfala", alt: "Muçarela comum, queijo minas frescal ou tofu firme." },
      { item: "Manjericão fresco", alt: "Orégano fresco; seco só se não tiver mesmo outra opção." },
    ],
  },
  {
    id: "frango-grelhado",
    title: "Frango grelhado suculento",
    description: "O truque é temperatura e descanso, não tempo de fogo.",
    image: frangoGrelhado,
    time: "25 min",
    servings: "2 porções",
    difficulty: "Fácil",
    category: "Carnes",
    ingredients: [
      "2 filés de peito de frango",
      "Sal e pimenta-do-reino",
      "1 colher (chá) de páprica",
      "Suco de 1/2 limão",
      "2 colheres (sopa) de azeite",
    ],
    steps: [
      {
        text: "Achate os filés até ficarem com espessura uniforme (cerca de 2 cm).",
        tip: "Espessura igual = cozimento igual. Sem parte crua e parte seca.",
      },
      { text: "Tempere com sal, pimenta, páprica, limão e azeite. Deixe descansar 15 minutos.", timer: 900 },
      { text: "Aqueça bem a frigideira antes de colocar o frango — ela precisa chiar.", timer: 120 },
      { text: "Grelhe 5 a 6 minutos de um lado sem mexer.", timer: 330 },
      { text: "Vire e grelhe mais 4 a 5 minutos.", timer: 270 },
      {
        text: "Retire e deixe descansar 5 minutos antes de cortar.",
        tip: "Descanso é o que mantém o suco dentro da carne.",
        timer: 300,
      },
    ],
    cookingTips: [
      "Frango está pronto a 74 °C no centro. Sem termômetro: o suco sai transparente, não rosado.",
      "Não fique virando: cada virada esfria a frigideira e impede a crosta dourada.",
    ],
    substitutions: [
      { item: "Páprica", alt: "Colorau, curry suave ou orégano." },
      { item: "Limão", alt: "Vinagre de vinho branco ou vinagre de maçã (metade da quantidade)." },
      { item: "Peito de frango", alt: "Sobrecoxa desossada — mais suculenta, cozinha 2 minutos a mais." },
    ],
  },
  {
    id: "sopa-abobora",
    title: "Creme de abóbora",
    description: "Conforto em uma panela só.",
    image: sopaAbobora,
    time: "40 min",
    servings: "4 porções",
    difficulty: "Fácil",
    category: "Sopas",
    ingredients: [
      "800 g de abóbora cabotiá em cubos",
      "1 cebola picada",
      "2 dentes de alho",
      "1 litro de caldo de legumes",
      "2 colheres (sopa) de azeite",
      "Sal, pimenta e noz-moscada",
    ],
    steps: [
      { text: "Refogue a cebola e o alho no azeite até ficarem macios.", timer: 300 },
      { text: "Junte a abóbora e refogue mais 3 minutos.", timer: 180 },
      { text: "Cubra com o caldo e cozinhe até a abóbora desmanchar ao toque do garfo.", timer: 1200 },
      {
        text: "Bata com mixer ou liquidificador até ficar liso e ajuste o tempero.",
        tip: "Se usar liquidificador, tire a tampinha central e cubra com um pano — vapor quente expande.",
      },
    ],
    cookingTips: [
      "Sopa grossa demais? Junte caldo quente aos poucos. Rala demais? Ferva sem tampa por 10 minutos.",
      "Uma pitada de noz-moscada transforma qualquer creme de legume.",
    ],
    substitutions: [
      { item: "Abóbora cabotiá", alt: "Mandioquinha, cenoura ou batata-doce." },
      { item: "Caldo de legumes", alt: "Água + 1 cubo de caldo, ou água com uma cenoura e talos de salsinha." },
      { item: "Creme de leite (finalização)", alt: "Leite de coco ou um fio de azeite." },
    ],
  },
  {
    id: "bife-acebolado",
    title: "Bife acebolado",
    description: "Crosta dourada por fora, rosado por dentro.",
    image: bifeAcebolado,
    time: "20 min",
    servings: "2 porções",
    difficulty: "Médio",
    category: "Carnes",
    ingredients: [
      "2 bifes de contrafilé (2 cm)",
      "2 cebolas em rodelas",
      "1 colher (sopa) de manteiga",
      "1 colher (sopa) de óleo",
      "Sal grosso e pimenta-do-reino",
    ],
    steps: [
      {
        text: "Tire a carne da geladeira 20 minutos antes e seque bem com papel-toalha.",
        tip: "Carne úmida cozinha no vapor e não doura.",
        timer: 1200,
      },
      { text: "Aqueça a frigideira com óleo até quase soltar fumaça." },
      { text: "Sele o bife 2 minutos de cada lado sem mexer para o ponto ao ponto.", timer: 120 },
      { text: "Retire os bifes e reserve tampados. Na mesma frigideira, doure as cebolas na manteiga.", timer: 480 },
      { text: "Volte os bifes por 30 segundos com a cebola e sirva." },
    ],
    cookingTips: [
      "Pontos por espessura de 2 cm: mal passado ~2 min/lado, ao ponto ~3 min, bem passado ~4 min.",
      "Sal grosso na hora de ir à frigideira; sal fino muito antes rouba a umidade.",
      "Frigideira lotada = carne cozida. Faça um bife por vez se preciso.",
    ],
    substitutions: [
      { item: "Contrafilé", alt: "Alcatra, coxão mole fino ou patinho (mais magro, cuidado para não secar)." },
      { item: "Manteiga", alt: "Azeite; a cebola demora um pouco mais para caramelizar." },
    ],
  },
  {
    id: "risoto-parmesao",
    title: "Risoto de parmesão",
    description: "Parece difícil, mas é só paciência.",
    image: risotoParmesao,
    time: "35 min",
    servings: "4 porções",
    difficulty: "Médio",
    category: "Massas",
    ingredients: [
      "1 xícara de arroz arbóreo",
      "3 xícaras de caldo de legumes quente",
      "1/2 xícara de vinho branco seco",
      "1/2 xícara de queijo parmesão ralado",
      "1 colher (sopa) de manteiga gelada",
      "1 cebola picada",
    ],
    steps: [
      { text: "Aqueça o caldo em uma panela separada e mantenha em fogo baixo." },
      { text: "Refogue a cebola na manteiga até ficar transparente.", timer: 300 },
      { text: "Adicione o arroz e mexa até que os grãos fiquem levemente translúcidos.", timer: 120 },
      { text: "Acrescente o vinho e mexa até evaporar." },
      { text: "Vá adicionando o caldo concha por concha, mexendo sempre.", timer: 1200 },
      {
        text: "Desligue o fogo, misture o parmesão e a manteiga gelada. Sirva imediatamente.",
        tip: "O toque final de manteiga gelada dá o brilho e a cremosidade (mantecatura).",
      },
    ],
    cookingTips: [
      "Caldo frio interrompe o cozimento: mantenha sempre quente ao lado.",
      "Risoto bom é 'all'onda': escorre devagar no prato, não fica em bloco.",
      "Nunca lave o arroz arbóreo — o amido é o que cria a cremosidade.",
    ],
    substitutions: [
      { item: "Arroz arbóreo", alt: "Carnaroli, ou arroz branco comum (fica menos cremoso, não lave)." },
      { item: "Vinho branco", alt: "Caldo + 1 colher de suco de limão ou vinagre branco." },
      { item: "Parmesão", alt: "Grana padano, pecorino ou queijo meia-cura ralado." },
    ],
  },
  {
    id: "lasanha-bolonhesa",
    title: "Lasanha à bolonhesa",
    description: "Prato de domingo em família, camada por camada.",
    image: lasanha,
    time: "1h30",
    servings: "6 porções",
    difficulty: "Médio",
    category: "Massas",
    ingredients: [
      "500 g de massa de lasanha",
      "500 g de carne moída",
      "1 lata de tomate pelado (ou 500 g de molho)",
      "1 cebola e 2 dentes de alho",
      "500 ml de leite, 2 colheres (sopa) de manteiga e 2 de farinha (bechamel)",
      "300 g de muçarela e 100 g de parmesão",
      "Sal, pimenta, noz-moscada e orégano",
    ],
    steps: [
      { text: "Refogue cebola e alho, junte a carne e doure bem até ficar marrom.", timer: 600 },
      {
        text: "Adicione o tomate, tempere e cozinhe em fogo baixo por 30 minutos.",
        tip: "Molho bolonhesa melhora com tempo. Quanto mais lento, mais sabor.",
        timer: 1800,
      },
      {
        text: "Bechamel: derreta a manteiga, misture a farinha, cozinhe 2 minutos e junte o leite aos poucos mexendo sempre.",
        tip: "Leite morno + fogo baixo + mexer sempre = zero grumo.",
        timer: 480,
      },
      { text: "Monte: molho no fundo, massa, bolonhesa, bechamel, muçarela. Repita 3 a 4 camadas." },
      { text: "Termine com bechamel e parmesão. Cubra com papel-alumínio e asse a 180 °C por 30 minutos.", timer: 1800 },
      { text: "Retire o alumínio e gratine por mais 15 minutos.", timer: 900 },
      { text: "Descanse 15 minutos antes de cortar.", tip: "Cortar quente demais desmonta tudo.", timer: 900 },
    ],
    cookingTips: [
      "Se usar massa que não é pré-cozida, deixe o molho mais líquido — ela absorve líquido no forno.",
      "Molho até a borda de cada camada: canto seco é canto duro.",
    ],
    substitutions: [
      { item: "Bechamel", alt: "Creme de leite + requeijão batidos (versão rápida)." },
      { item: "Carne moída", alt: "Frango desfiado, carne de soja hidratada ou legumes assados." },
      { item: "Tomate pelado", alt: "Molho de tomate pronto + 1 pitada de açúcar para tirar a acidez." },
    ],
  },
  {
    id: "brownie",
    title: "Brownie de chocolate",
    description: "Casquinha crocante e miolo úmido.",
    image: brownie,
    time: "45 min",
    servings: "12 pedaços",
    difficulty: "Médio",
    category: "Doces",
    ingredients: [
      "200 g de chocolate meio amargo",
      "150 g de manteiga",
      "3 ovos",
      "200 g de açúcar",
      "120 g de farinha de trigo",
      "1 pitada de sal",
    ],
    steps: [
      { text: "Derreta o chocolate com a manteiga em banho-maria ou micro-ondas de 30 em 30 segundos." },
      {
        text: "Bata os ovos com o açúcar até clarear — é isso que forma a casquinha brilhante.",
        timer: 240,
      },
      { text: "Misture o chocolate derretido morno aos ovos." },
      { text: "Incorpore a farinha e o sal com espátula, mexendo o mínimo possível.", tip: "Mexer demais deixa o brownie borrachudo." },
      { text: "Asse a 180 °C por 25 minutos. O centro deve sair levemente úmido no palito.", timer: 1500 },
      { text: "Espere esfriar completamente antes de cortar.", timer: 1200 },
    ],
    cookingTips: [
      "Brownie continua assando fora do forno: tire quando ainda parecer pouco pronto no meio.",
      "Forma forrada com papel-manteiga = desenforma sem drama.",
    ],
    substitutions: [
      { item: "Chocolate meio amargo", alt: "100 g de cacau em pó + 60 g de manteiga extra." },
      { item: "Manteiga", alt: "Óleo neutro (usar 20% menos)." },
      { item: "Farinha de trigo", alt: "Farinha de amêndoa ou mix sem glúten." },
    ],
  },
  {
    id: "boeuf-bourguignon",
    title: "Boeuf bourguignon",
    description: "O clássico francês. Longo, mas cada passo é simples.",
    image: boeufBourguignon,
    time: "3h30",
    servings: "6 porções",
    difficulty: "Difícil",
    category: "Carnes",
    ingredients: [
      "1,2 kg de acém ou paleta em cubos grandes",
      "150 g de bacon em cubos",
      "1 garrafa de vinho tinto seco (750 ml)",
      "500 ml de caldo de carne",
      "2 cenouras, 1 cebola grande, 2 dentes de alho",
      "250 g de cogumelos paris",
      "12 cebolinhas pérola (ou 2 cebolas pequenas em gomos)",
      "2 colheres (sopa) de farinha, 2 de extrato de tomate",
      "Buquê garni: tomilho, louro e salsinha",
    ],
    steps: [
      {
        text: "Seque muito bem os cubos de carne com papel-toalha e tempere com sal e pimenta.",
        tip: "Carne seca é a diferença entre dourar e cozinhar no vapor.",
      },
      { text: "Doure o bacon em uma panela de fundo grosso e reserve, deixando a gordura.", timer: 480 },
      {
        text: "Sele a carne em pequenas porções até ficar bem marrom em todos os lados. Reserve.",
        tip: "Não lote a panela. Essa crosta escura é 80% do sabor final.",
        timer: 900,
      },
      { text: "Refogue cebola, cenoura e alho na mesma panela até dourarem.", timer: 480 },
      { text: "Polvilhe a farinha, mexa por 2 minutos e junte o extrato de tomate.", timer: 120 },
      {
        text: "Deglaceie com o vinho, raspando o fundo da panela com uma colher de pau.",
        tip: "Todo aquele grudadinho marrom no fundo é sabor puro. Raspe tudo.",
      },
      { text: "Volte carne e bacon, junte o caldo até quase cobrir e o buquê garni." },
      {
        text: "Tampe e cozinhe em forno a 160 °C (ou fogo bem baixo) por 2h30 a 3h, até desfiar com o garfo.",
        timer: 3600,
      },
      { text: "À parte, doure os cogumelos e as cebolinhas na manteiga e junte no final.", timer: 600 },
      {
        text: "Ajuste o tempero e o molho: se estiver ralo, ferva sem tampa até encorpar.",
        tip: "Fica ainda melhor no dia seguinte.",
      },
    ],
    cookingTips: [
      "Corte grande de carne com colágeno (acém, paleta, músculo) é obrigatório — filé mignon fica seco aqui.",
      "Cozimento lento e baixo: se ferver forte, a carne endurece em vez de amaciar.",
      "O ponto é quando a carne cede sozinha à pressão do garfo, não pelo relógio.",
      "Molho ralo? Ferva sem tampa. Molho grosso? Junte caldo quente.",
    ],
    substitutions: [
      { item: "Vinho tinto", alt: "Caldo de carne + 2 colheres de vinagre balsâmico + 1 de suco de uva." },
      { item: "Bacon", alt: "Pancetta, linguiça calabresa ou 1 colher extra de manteiga." },
      { item: "Cebolinhas pérola", alt: "Cebola comum cortada em gomos grossos." },
      { item: "Cogumelos paris", alt: "Shimeji, shiitake ou cogumelo em conserva bem escorrido." },
      { item: "Panela de ferro", alt: "Qualquer panela de fundo grosso com tampa; ou panela de pressão por 40 minutos." },
    ],
  },
];

export const recipes: Recipe[] = [...baseRecipes, ...daily1, ...daily2, ...daily3, ...daily4, ...daily5, ...daily6];

export const categories: string[] = Array.from(new Set(recipes.map((r) => r.category))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export const difficulties: Difficulty[] = ["Fácil", "Médio", "Difícil"];
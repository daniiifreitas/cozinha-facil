/** Ajuste de porções: lê a quantidade no início do ingrediente e recalcula. */

const QTY_RE =
  /^\s*(\d+\s+\d+\s*\/\s*\d+|\d+\s*\/\s*\d+|\d+(?:[.,]\d+)?)(?:\s*(?:a|-|–|até)\s*(\d+\s*\/\s*\d+|\d+(?:[.,]\d+)?))?\s*/;

const FRACTIONS: [number, string][] = [
  [0.125, "⅛"],
  [0.25, "¼"],
  [0.333, "⅓"],
  [0.5, "½"],
  [0.666, "⅔"],
  [0.75, "¾"],
];

function parseNumber(token: string): number {
  const t = token.replace(/,/g, ".").trim();
  const mixed = t.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const frac = t.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  const n = Number(t);
  return Number.isFinite(n) ? n : NaN;
}

/** Formata a quantidade de um jeito legível na cozinha (½, 1 ¾, 2,5, 250). */
export function formatQty(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0";
  const rounded = Math.round(value * 100) / 100;
  if (rounded >= 10) return String(Math.round(rounded));

  const whole = Math.floor(rounded + 1e-9);
  const rest = rounded - whole;
  for (const [frac, glyph] of FRACTIONS) {
    if (Math.abs(rest - frac) < 0.04) {
      return whole > 0 ? `${whole} ${glyph}` : glyph;
    }
  }
  if (rest < 0.04) return String(whole);
  return rounded.toFixed(rounded * 10 % 1 === 0 ? 1 : 2).replace(".", ",").replace(/,?0+$/, "");
}

export interface ParsedIngredient {
  qty: number | null;
  qtyMax: number | null;
  rest: string;
  raw: string;
}

export function parseIngredient(raw: string): ParsedIngredient {
  const match = raw.match(QTY_RE);
  if (!match) return { qty: null, qtyMax: null, rest: raw.trim(), raw };
  const qty = parseNumber(match[1] ?? "");
  const qtyMax = match[2] ? parseNumber(match[2]) : null;
  if (!Number.isFinite(qty)) return { qty: null, qtyMax: null, rest: raw.trim(), raw };
  return {
    qty,
    qtyMax: qtyMax !== null && Number.isFinite(qtyMax) ? qtyMax : null,
    rest: raw.slice(match[0].length).trim(),
    raw,
  };
}

export function formatIngredient(qty: number | null, qtyMax: number | null, rest: string): string {
  if (qty === null) return rest;
  const head = qtyMax !== null ? `${formatQty(qty)} a ${formatQty(qtyMax)}` : formatQty(qty);
  return rest ? `${head} ${rest}` : head;
}

/** Recalcula um ingrediente para o fator pedido (2x, 0,5x...). */
export function scaleIngredient(raw: string, factor: number): string {
  if (factor === 1) return raw;
  const p = parseIngredient(raw);
  if (p.qty === null) return raw;
  return formatIngredient(p.qty * factor, p.qtyMax === null ? null : p.qtyMax * factor, p.rest);
}

export function scaleIngredients(list: string[], factor: number): string[] {
  return list.map((i) => scaleIngredient(i, factor));
}

/** Quantas porções a receita rende originalmente ("4 porções" -> 4). */
export function baseServings(servings: string): number {
  const m = servings.match(/\d+/);
  const n = m ? Number(m[0]) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 2;
}

export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 20;

export function clampServings(n: number): number {
  return Math.min(MAX_SERVINGS, Math.max(MIN_SERVINGS, Math.round(n)));
}

/** Junta ingredientes iguais somando as quantidades (para a lista de compras). */
export function mergeIngredients(entries: { list: string[]; factor: number }[]): string[] {
  const map = new Map<string, { qty: number | null; qtyMax: number | null; rest: string }>();
  for (const { list, factor } of entries) {
    for (const raw of list) {
      const p = parseIngredient(raw);
      const scaledQty = p.qty === null ? null : p.qty * factor;
      const scaledMax = p.qtyMax === null ? null : p.qtyMax * factor;
      const key = p.rest.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const current = map.get(key);
      if (!current) {
        map.set(key, { qty: scaledQty, qtyMax: scaledMax, rest: p.rest });
        continue;
      }
      if (current.qty !== null && scaledQty !== null) {
        current.qty += scaledQty;
        if (current.qtyMax !== null && scaledMax !== null) current.qtyMax += scaledMax;
        else current.qtyMax = null;
      }
    }
  }
  return [...map.values()]
    .map((v) => formatIngredient(v.qty, v.qtyMax, v.rest))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
}

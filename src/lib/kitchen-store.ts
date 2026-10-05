import { useCallback, useEffect, useState } from "react";

const FAV_KEY = "cf:favorites";
const PLAN_KEY = "cf:mealplan";
const SERV_KEY = "cf:mealservings";
const PANTRY_KEY = "cf:pantry";
const EVENT = "cf:store-change";

export const weekDays = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
] as const;

export const mealSlots = ["Almoço", "Jantar"] as const;

export type WeekDay = (typeof weekDays)[number];
export type MealSlot = (typeof mealSlots)[number];

/** key format: `${day}|${slot}` -> recipe id */
export type MealPlan = Record<string, string>;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage indisponível */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setValue(read<T>(key, fallback));
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const save = useCallback(
    (next: T) => {
      setValue(next);
      write(key, next);
    },
    [key],
  );

  return { value, save, ready };
}

export function useFavorites() {
  const { value, save, ready } = useStored<string[]>(FAV_KEY, []);

  const toggle = useCallback(
    (id: string) => save(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]),
    [value, save],
  );

  const isFavorite = useCallback((id: string) => value.includes(id), [value]);

  return { favorites: value, toggle, isFavorite, ready };
}

export function mealKey(day: WeekDay, slot: MealSlot) {
  return `${day}|${slot}`;
}

export function useMealPlan() {
  const { value, save, ready } = useStored<MealPlan>(PLAN_KEY, {});
  const { value: servings, save: saveServings } = useStored<Record<string, number>>(SERV_KEY, {});

  const setMeal = useCallback(
    (day: WeekDay, slot: MealSlot, recipeId: string) => {
      save({ ...value, [mealKey(day, slot)]: recipeId });
    },
    [value, save],
  );

  const clearMeal = useCallback(
    (day: WeekDay, slot: MealSlot) => {
      const next = { ...value };
      delete next[mealKey(day, slot)];
      save(next);
      const nextServings = { ...servings };
      delete nextServings[mealKey(day, slot)];
      saveServings(nextServings);
    },
    [value, save, servings, saveServings],
  );

  const clearAll = useCallback(() => {
    save({});
    saveServings({});
  }, [save, saveServings]);

  const setServings = useCallback(
    (day: WeekDay, slot: MealSlot, n: number) => {
      saveServings({ ...servings, [mealKey(day, slot)]: n });
    },
    [servings, saveServings],
  );

  return { plan: value, servings, setServings, setMeal, clearMeal, clearAll, ready };
}

export function usePantry() {
  const { value, save, ready } = useStored<string[]>(PANTRY_KEY, []);

  const toggle = useCallback(
    (id: string) => save(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]),
    [value, save],
  );

  const clear = useCallback(() => save([]), [save]);

  return { pantry: value, toggle, clear, ready };
}

import { useCallback, useEffect, useRef, useState } from "react";
import { ChefHat, ChevronLeft, ChevronRight, Pause, Play, RotateCcw, X } from "lucide-react";
import type { Recipe } from "@/lib/recipe-types";

function formatTime(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function StepTimer({ seconds: initial }: { seconds: number }) {
  const [seconds, setSeconds] = useState(initial);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSeconds(initial);
    setRunning(false);
    setDone(false);
  }, [initial]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const progress = initial > 0 ? ((initial - seconds) / initial) * 100 : 0;

  return (
    <div
      className={`rounded-3xl p-5 ring-1 ${done ? "bg-brand/15 ring-brand/40" : "bg-card ring-black/5"}`}
    >
      <div className="h-2 w-full overflow-hidden rounded-full bg-butter/60">
        <div className="h-2 rounded-full bg-brand transition-all duration-1000" style={{ width: `${progress}%` }} />
      </div>
      <p
        className="mt-4 text-center font-display text-6xl font-semibold tabular-nums tracking-tight text-ink"
        aria-live="polite"
      >
        {formatTime(seconds)}
      </p>
      <p className="mt-1 text-center text-sm text-ink/55">
        {done ? "Tempo esgotado! Confira o ponto." : running ? "Contando o tempo deste passo…" : "Timer deste passo"}
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => {
            setDone(false);
            setRunning((r) => !r);
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand py-4 text-base font-semibold text-cream"
        >
          {running ? <Pause className="size-5" /> : <Play className="size-5" />}
          {running ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setDone(false);
            setSeconds(initial);
          }}
          aria-label="Reiniciar timer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-butter/70 px-5 py-4 text-base font-semibold text-ink"
        >
          <RotateCcw className="size-5" />
        </button>
      </div>
    </div>
  );
}

interface CookModeProps {
  recipe: Recipe;
  ingredients: string[];
  servings: number;
  onClose: () => void;
}

export function CookMode({ recipe, ingredients, servings, onClose }: CookModeProps) {
  const [index, setIndex] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);
  const wakeLockRef = useRef<{ release: () => Promise<void> } | null>(null);

  const total = recipe.steps.length;
  const step = recipe.steps[index]!;
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const nav = navigator as Navigator & {
      wakeLock?: { request: (type: "screen") => Promise<{ release: () => Promise<void> }> };
    };
    const request = async () => {
      try {
        const lock = await nav.wakeLock?.request("screen");
        if (lock) {
          if (cancelled) void lock.release();
          else wakeLockRef.current = lock;
        }
      } catch {
        /* tela sempre acesa não disponível */
      }
    };
    void request();
    const onVisible = () => {
      if (document.visibilityState === "visible") void request();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      void wakeLockRef.current?.release();
      wakeLockRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, next, prev]);

  const last = index === total - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Modo cozinha: ${recipe.title}`}
      className="fixed inset-0 z-50 flex flex-col bg-background text-foreground"
    >
      <header className="shrink-0 border-b border-black/5 px-5 pb-4 pt-5">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <ChefHat className="size-5 shrink-0 text-brand" />
          <p className="truncate font-display text-lg font-semibold text-ink">{recipe.title}</p>
          <button
            onClick={onClose}
            aria-label="Sair do modo cozinha"
            className="ml-auto grid size-10 shrink-0 place-items-center rounded-full bg-card text-ink/70 ring-1 ring-black/5"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mx-auto mt-4 max-w-3xl">
          <div className="flex gap-1.5" aria-hidden="true">
            {recipe.steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= index ? "bg-brand" : "bg-butter/70"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm font-semibold text-ink/55">
            Passo {index + 1} de {total} · {servings} {servings === 1 ? "porção" : "porções"}
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto max-w-3xl space-y-5">
          <p className="text-pretty font-display text-3xl font-semibold leading-snug text-ink sm:text-4xl">
            {step.text}
          </p>
          {step.tip && (
            <div className="rounded-2xl bg-butter/50 p-4 text-lg text-ink/75 ring-1 ring-brand/10">
              <strong className="text-brand-dark">Dica:</strong> {step.tip}
            </div>
          )}
          {step.timer && <StepTimer seconds={step.timer} />}
        </div>
      </div>

      <footer className="shrink-0 border-t border-black/5 bg-card px-5 pb-6 pt-4">
        <div className="mx-auto max-w-3xl space-y-3">
          <button
            onClick={() => setShowIngredients(true)}
            className="w-full rounded-2xl bg-background py-3 text-sm font-semibold text-ink/70 ring-1 ring-black/5"
          >
            Ver ingredientes
          </button>
          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={index === 0}
              className="flex items-center justify-center gap-2 rounded-2xl bg-background px-6 py-5 text-base font-semibold text-ink ring-1 ring-black/5 disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
              Voltar
            </button>
            <button
              onClick={last ? onClose : next}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-5 text-lg font-semibold text-cream"
            >
              {last ? "Concluir" : "Avançar"}
              {!last && <ChevronRight className="size-5" />}
            </button>
          </div>
        </div>
      </footer>

      {showIngredients && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end bg-ink/50">
          <button
            aria-label="Fechar ingredientes"
            className="flex-1"
            onClick={() => setShowIngredients(false)}
          />
          <div className="max-h-[70vh] overflow-y-auto rounded-t-3xl bg-background px-5 pb-8 pt-5">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-ink">
                  Ingredientes · {servings} {servings === 1 ? "porção" : "porções"}
                </h2>
                <button
                  onClick={() => setShowIngredients(false)}
                  aria-label="Fechar ingredientes"
                  className="grid size-10 place-items-center rounded-full bg-card text-ink/70 ring-1 ring-black/5"
                >
                  <X className="size-5" />
                </button>
              </div>
              <ul className="mt-4 space-y-3">
                {ingredients.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-lg text-ink/80">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

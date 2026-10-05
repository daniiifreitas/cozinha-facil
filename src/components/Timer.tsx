import { useEffect, useState, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerProps {
  initialSeconds?: number;
  label?: string;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Timer({ initialSeconds = 444, label = "Tempo restante" }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const toggle = useCallback(() => setIsRunning((prev) => !prev), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const progress = initialSeconds > 0 ? ((initialSeconds - seconds) / initialSeconds) * 100 : 0;

  return (
    <div className="rounded-3xl bg-card p-6 ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-leafdark">Modo de preparo</span>
        <span className="text-xs text-ink/50">Passo 2 de 4</span>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-butter/60">
        <div
          className="h-2 rounded-full bg-brand transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-6 grid place-items-center py-4">
        <div className="relative size-48">
          <div className="absolute inset-0 rounded-full border-[10px] border-butter" />
          <div
            className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-brand border-r-brand"
            style={{ transform: `rotate(${progress * 3.6}deg)`, transition: "transform 1s linear" }}
          />
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="font-display text-5xl font-semibold tracking-tight tabular-nums text-ink">
                {formatTime(seconds)}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink/45">
                {label}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-ink/55">Fervendo em fogo baixo…</p>
      <div className="mt-5 flex gap-2">
        <button
          onClick={toggle}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand/40"
        >
          {isRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={reset}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-butter/60 px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-butter"
        >
          <RotateCcw className="size-4" />
          Reiniciar
        </button>
      </div>
    </div>
  );
}

import { Minus, Plus, Users } from "lucide-react";
import { MIN_SERVINGS, MAX_SERVINGS, clampServings } from "@/lib/servings";

interface Props {
  value: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}

export function ServingsStepper({ value, onChange, size = "md", label, className = "" }: Props) {
  const btn =
    size === "sm"
      ? "grid size-6 place-items-center rounded-full text-ink/60"
      : "grid size-8 place-items-center rounded-full text-ink/60";
  const icon = size === "sm" ? "size-3" : "size-4";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-card px-2 py-1 ring-1 ring-black/5 ${className}`}
    >
      <button
        type="button"
        aria-label="Menos porções"
        disabled={value <= MIN_SERVINGS}
        onClick={() => onChange(clampServings(value - 1))}
        className={`${btn} hover:bg-brand/10 hover:text-brand disabled:opacity-30`}
      >
        <Minus className={icon} />
      </button>
      <span
        aria-live="polite"
        className={`inline-flex items-center gap-1 font-semibold text-ink ${
          size === "sm" ? "text-xs" : "text-sm"
        }`}
      >
        <Users className={icon} />
        {value} {value === 1 ? "porção" : "porções"}
      </span>
      <button
        type="button"
        aria-label="Mais porções"
        disabled={value >= MAX_SERVINGS}
        onClick={() => onChange(clampServings(value + 1))}
        className={`${btn} hover:bg-brand/10 hover:text-brand disabled:opacity-30`}
      >
        <Plus className={icon} />
      </button>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}

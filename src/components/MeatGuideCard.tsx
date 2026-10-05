import type { MeatGuide } from "@/lib/guides";

interface MeatGuideCardProps {
  guide: MeatGuide;
}

export function MeatGuideCard({ guide }: MeatGuideCardProps) {
  const difficultyColor =
    guide.difficulty === "Fácil"
      ? "bg-leafdark/10 text-leafdark"
      : guide.difficulty === "Médio"
        ? "bg-brand/10 text-brand-dark"
        : "bg-ink/10 text-ink";

  return (
    <div className="flex items-start gap-4 rounded-2xl bg-card p-5 ring-1 ring-black/5">
      <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-butter font-display font-semibold text-ink">
        {guide.initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink">{guide.name}</h3>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyColor}`}>
            {guide.difficulty}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink/60">
          {guide.temperature} · {guide.time} · {guide.tip}
        </p>
      </div>
    </div>
  );
}

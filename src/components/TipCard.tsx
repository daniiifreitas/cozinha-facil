import type { KitchenTip } from "@/lib/guides";

interface TipCardProps {
  tip: KitchenTip;
}

export function TipCard({ tip }: TipCardProps) {
  return (
    <div className="rounded-2xl bg-butter/40 p-5 ring-1 ring-brand/10">
      <p className="font-display text-lg font-semibold text-ink">{tip.title}</p>
      <p className="mt-1 text-sm text-ink/65">{tip.description}</p>
    </div>
  );
}

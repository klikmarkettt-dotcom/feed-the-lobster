'use client'
import { getTrustLevel, TRUST_LEVELS } from '@/lib/items'

export function TrustBadge({ score }: { score: number }) {
  const level = getTrustLevel(score)
  const idx = TRUST_LEVELS.findIndex((l) => l.label === level.label)
  const next = TRUST_LEVELS[idx - 1]
  const progress = next ? Math.min(100, ((score - level.min) / (next.min - level.min)) * 100) : 100

  return (
    <div className={`flex flex-col gap-1 px-3 py-2 rounded-lg border ${level.border} ${level.bg} min-w-[150px]`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400 uppercase tracking-widest">Trust</span>
        <span className={`text-xs font-bold ${level.text}`}>{level.emoji} {level.label}</span>
      </div>
      <span className={`text-2xl font-bold tabular-nums ${level.text}`}>{score}</span>
      <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${progress}%`, background: level.color, boxShadow: `0 0 6px ${level.color}` }} />
      </div>
    </div>
  )
}

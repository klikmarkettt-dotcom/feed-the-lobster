'use client'
import type { ShopItem } from '@/lib/items'

export function ShopItemCard({ item, onClick, disabled }: { item: ShopItem; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="group border border-zinc-800 hover:border-red-800 bg-zinc-900/60 hover:bg-red-950/20 rounded-xl p-3 text-left transition-all disabled:opacity-40 disabled:cursor-not-allowed">
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.emoji}</div>
      <div className="text-white font-semibold text-sm">{item.name}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-zinc-300 text-sm font-mono font-bold">{item.price}◎</span>
        <span className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">+{item.trustBoost}</span>
      </div>
    </button>
  )
}

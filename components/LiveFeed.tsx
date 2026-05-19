'use client'

export interface FeedItem {
  id: string; wallet: string; itemName: string; itemEmoji: string
  price: number; trustBoost: number; signature?: string; when: number
}

function timeAgo(ts: number) {
  const d = Math.floor((Date.now() - ts) / 1000)
  if (d < 60) return `${d}s ago`
  if (d < 3600) return `${Math.floor(d / 60)}m ago`
  return `${Math.floor(d / 3600)}h ago`
}

export function LiveFeed({ events }: { events: FeedItem[] }) {
  if (!events.length) return <p className="text-zinc-700 text-xs italic text-center py-4">No purchases yet — be the first 🦞</p>
  return (
    <ul className="space-y-2">
      {events.slice(0, 5).map((ev) => (
        <li key={ev.id} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm animate-slideUp">
          <span className="text-2xl">{ev.itemEmoji}</span>
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-xs">{ev.itemName}</div>
            <div className="text-zinc-600 text-xs font-mono">{ev.wallet.slice(0,4)}…{ev.wallet.slice(-4)}</div>
          </div>
          <div className="text-right">
            <div className="text-red-400 text-xs font-bold">+{ev.trustBoost}</div>
            <div className="text-zinc-700 text-xs">{timeAgo(ev.when)}</div>
          </div>
          {ev.signature && (
            <a href={`https://solscan.io/tx/${ev.signature}`} target="_blank" rel="noreferrer"
              className="text-zinc-700 hover:text-zinc-400 text-xs">↗</a>
          )}
        </li>
      ))}
    </ul>
  )
}

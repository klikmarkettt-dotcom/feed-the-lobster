'use client'
import { useState } from 'react'
import type { ShopItem } from '@/lib/items'

export function BuyModal({ item, onConfirm, onCancel, loading }: {
  item: ShopItem; onConfirm: (tip: number) => void; onCancel: () => void; loading: boolean
}) {
  const [tip, setTip] = useState(0)
  const [custom, setCustom] = useState('')
  const [useCustom, setUseCustom] = useState(false)
  const activeTip = useCustom ? (parseFloat(custom) || 0) : tip
  const total = item.price + activeTip

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm rounded-2xl border p-6" style={{ background: '#0a0505', borderColor: '#5a1a1a', boxShadow: '0 0 60px rgba(180,30,20,0.2)' }}>
        <div className="flex gap-4 mb-5">
          <span className="text-5xl">{item.emoji}</span>
          <div>
            <h3 className="text-white font-bold text-xl">{item.name}</h3>
            <p className="text-zinc-500 text-sm mt-1">{item.description}</p>
            <span className="text-red-400 text-xs border border-red-900 px-2 py-0.5 rounded-full mt-2 inline-block">+{item.trustBoost} TRUST</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">{item.name}</span>
            <span className="text-white font-mono">{item.price}◎</span>
          </div>
          <div className="border-t border-zinc-800 pt-2">
            <p className="text-zinc-500 text-xs mb-2">💛 Tip creator</p>
            <div className="flex gap-2 flex-wrap">
              {[0, 0.01, 0.05].map((t) => (
                <button key={t} onClick={() => { setTip(t); setUseCustom(false) }}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${!useCustom && tip === t ? 'border-yellow-600 bg-yellow-900/40 text-yellow-400' : 'border-zinc-700 text-zinc-500'}`}>
                  {t === 0 ? 'No tip' : `${t}◎`}
                </button>
              ))}
              <button onClick={() => setUseCustom(true)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${useCustom ? 'border-yellow-600 bg-yellow-900/40 text-yellow-400' : 'border-zinc-700 text-zinc-500'}`}>
                Custom
              </button>
            </div>
            {useCustom && (
              <input type="number" value={custom} onChange={(e) => setCustom(e.target.value)}
                placeholder="0.00" step="0.01" min="0"
                className="mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-yellow-600" />
            )}
          </div>
          <div className="flex justify-between font-bold border-t border-zinc-700 pt-2">
            <span className="text-white">Total</span>
            <span className="text-white font-mono">{total.toFixed(4)}◎</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onCancel} disabled={loading}
            className="flex-1 border border-zinc-700 text-zinc-400 rounded-xl py-3 text-sm hover:text-white transition-colors">
            Cancel
          </button>
          <button onClick={() => onConfirm(activeTip)} disabled={loading}
            className="flex-1 rounded-xl py-3 text-sm font-bold text-white transition-all disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #7B1FA2 0%, #4A148C 100%)', boxShadow: '0 0 20px rgba(123,31,162,0.5)' }}>
            {loading ? '⏳ Confirming…' : '🟣 Buy with Phantom'}
          </button>
        </div>
      </div>
    </div>
  )
}

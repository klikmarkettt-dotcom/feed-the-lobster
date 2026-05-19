'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { LobsterSVG } from '@/components/LobsterSVG'
import { ShopItemCard } from '@/components/ShopItem'
import { BuyModal } from '@/components/BuyModal'
import { TrustBadge } from '@/components/TrustBadge'
import { LiveFeed, type FeedItem } from '@/components/LiveFeed'
import { useTrustScore } from '@/hooks/useTrustScore'
import { useSolanaPayment } from '@/hooks/useSolanaPayment'
import { SHOP_ITEMS, type ShopItem, type LobsterReaction } from '@/lib/items'

interface Toast { id: number; text: string; type: 'success'|'error'|'levelup'; href?: string }

export default function Page() {
  const { publicKey } = useWallet()
  const wallet = publicKey?.toBase58() ?? null
  const { score, addScore, levelUp } = useTrustScore(wallet)
  const { pay, loading } = useSolanaPayment()
  const [selected, setSelected] = useState<ShopItem | null>(null)
  const [reaction, setReaction] = useState<LobsterReaction>('idle')
  const [speech, setSpeech] = useState('Feed me... 🦞')
  const [toasts, setToasts] = useState<Toast[]>([])
  const [feed, setFeed] = useState<FeedItem[]>([])
  const tid = useRef(0)

  const toast = useCallback((text: string, type: Toast['type'], href?: string) => {
    const id = ++tid.current
    setToasts((p) => [...p, { id, text, type, href }])
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 5000)
  }, [])

  useEffect(() => { if (levelUp) toast(`🎉 LEVEL UP! You are now ${levelUp}!`, 'levelup') }, [levelUp, toast])

  useEffect(() => {
    if (reaction !== 'idle') return
    const phrases = ['Feed me... 🦞', 'I am hungry... 🌊', 'SOL accepted 🦐', 'Claws ready... 🦀']
    const iv = setInterval(() => setSpeech(phrases[Math.floor(Math.random() * phrases.length)]), 4000)
    return () => clearInterval(iv)
  }, [reaction])

  async function handleBuy(tip: number) {
    if (!selected) return
    try {
      const result = await pay({ amountSol: selected.price, tipSol: tip })
      setReaction(selected.reaction)
      setSpeech(selected.speech)
      addScore(selected.trustBoost)
      if (wallet) setFeed((p) => [{ id: result.signature, wallet, itemName: selected.name, itemEmoji: selected.emoji, price: selected.price, trustBoost: selected.trustBoost, signature: result.signature, when: Date.now() }, ...p].slice(0, 10))
      toast(`✓ Fed! +${selected.trustBoost} trust earned`, 'success', result.explorerUrl)
      setSelected(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      setReaction('sad'); setSpeech('Oof... 😢')
      toast(`✗ ${msg.includes('rejected') ? 'Rejected' : msg.includes('funds') ? 'Insufficient funds' : 'Transaction failed'}`, 'error')
      setSelected(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #080305 0%, #0f0408 50%, #080305 100%)' }}>
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-xs">
        {toasts.map((t) => (
          <div key={t.id} onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))}
            className="rounded-xl border px-4 py-3 text-sm font-medium cursor-pointer animate-slideUp"
            style={{ background: t.type === 'success' ? 'rgba(10,30,10,0.95)' : t.type === 'levelup' ? 'rgba(20,10,30,0.95)' : 'rgba(30,10,10,0.95)', borderColor: t.type === 'success' ? '#166534' : t.type === 'levelup' ? '#7c3aed' : '#7f1d1d', color: t.type === 'success' ? '#4ade80' : t.type === 'levelup' ? '#c084fc' : '#fca5a5' }}>
            {t.text}
            {t.href && <a href={t.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="block text-xs underline opacity-60 mt-1">View on Solscan ↗</a>}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b sticky top-0 z-30"
        style={{ borderColor: '#2a0a0a', background: 'rgba(8,3,5,0.95)', backdropFilter: 'blur(12px)' }}>
        <div>
          <h1 className="text-white font-bold tracking-widest text-lg">☿ FEED THE LOBSTER</h1>
          <p className="text-zinc-700 text-xs">Klik is hungry. SOL welcome.</p>
        </div>
        <div className="flex items-center gap-3">
          {wallet && <TrustBadge score={score} />}
          <WalletMultiButton />
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lobster */}
          <div className="lg:col-span-1 flex flex-col items-center gap-4">
            <div className="w-full flex flex-col items-center py-6 px-4 rounded-2xl border"
              style={{ background: 'radial-gradient(ellipse at center, #150808 0%, #080305 100%)', borderColor: '#2a0a0a' }}>
              <LobsterSVG reaction={reaction} speech={speech} onReactionEnd={() => { setReaction('idle'); setSpeech('Feed me... 🦞') }} />
            </div>
            {/* Trust levels */}
            <div className="w-full rounded-xl border p-4 space-y-2" style={{ borderColor: '#1a0808', background: '#0a0405' }}>
              <h3 className="text-zinc-600 text-xs uppercase tracking-widest mb-3">Trust Levels</h3>
              {[
                { emoji: '👑', label: 'CHAMBER LEGEND', range: '200+', color: '#FFD700' },
                { emoji: '🟣', label: 'LOBSTER FRIEND', range: '121–199', color: '#A855F7' },
                { emoji: '🔵', label: 'CHAMBER ALLY', range: '81–120', color: '#3B82F6' },
                { emoji: '🟢', label: 'TRUSTED', range: '61–80', color: '#22C55E' },
                { emoji: '🟡', label: 'MEMBER', range: '41–60', color: '#EAB308' },
                { emoji: '🟠', label: 'LURKER', range: '21–40', color: '#F97316' },
                { emoji: '🔴', label: 'UNKNOWN', range: '0–20', color: '#EF4444' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2 text-xs">
                  <span>{l.emoji}</span>
                  <span className="font-bold" style={{ color: l.color }}>{l.label}</span>
                  <span className="text-zinc-700 ml-auto font-mono">{l.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shop + Feed */}
          <div className="lg:col-span-2 space-y-6">
            {!wallet && (
              <div className="rounded-xl border border-dashed text-center py-8 px-4" style={{ borderColor: '#3a1010', background: '#0c0406' }}>
                <div className="text-4xl mb-3">🟣</div>
                <p className="text-zinc-400 font-semibold mb-4">Connect Phantom to Feed Klik</p>
                <WalletMultiButton />
              </div>
            )}
            <div>
              <h2 className="text-zinc-500 text-xs uppercase tracking-widest mb-3">◆ Choose what to feed</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SHOP_ITEMS.map((item) => (
                  <ShopItemCard key={item.id} item={item} onClick={() => setSelected(item)} disabled={!wallet} />
                ))}
              </div>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: '#1a0808', background: '#0a0405' }}>
              <h2 className="text-zinc-600 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-800 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-700" />
                </span>
                Live Session Feed
              </h2>
              <LiveFeed events={feed} />
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 border-t" style={{ borderColor: '#150608' }}>
        <p className="text-zinc-800 text-xs">All transactions go directly to the creator's Solana wallet. Non-custodial.</p>
        <p className="text-zinc-800 text-xs mt-1 font-mono">Ghz2RotTtZKJeUFFNVfYV8NrB6TW5ZkJKQGcVYx31PvD</p>
      </footer>

      {selected && <BuyModal item={selected} onConfirm={handleBuy} onCancel={() => setSelected(null)} loading={loading} />}
    </div>
  )
}

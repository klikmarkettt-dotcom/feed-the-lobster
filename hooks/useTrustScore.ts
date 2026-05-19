'use client'
import { useCallback, useEffect, useState } from 'react'
import { getTrustLevel } from '@/lib/items'

export function useTrustScore(walletAddress: string | null) {
  const [score, setScore] = useState(0)
  const [levelUp, setLevelUp] = useState<string | null>(null)

  useEffect(() => {
    if (!walletAddress) { setScore(0); return }
    const stored = localStorage.getItem('ftl_trust_' + walletAddress)
    setScore(stored ? parseInt(stored, 10) : 0)
  }, [walletAddress])

  const addScore = useCallback((boost: number) => {
    if (!walletAddress) return
    setScore((prev) => {
      const next = prev + boost
      localStorage.setItem('ftl_trust_' + walletAddress, String(next))
      const prevLvl = getTrustLevel(prev)
      const nextLvl = getTrustLevel(next)
      if (nextLvl.label !== prevLvl.label) {
        setLevelUp(nextLvl.label)
        setTimeout(() => setLevelUp(null), 4000)
      }
      return next
    })
  }, [walletAddress])

  return { score, addScore, currentLevel: getTrustLevel(score), levelUp }
}

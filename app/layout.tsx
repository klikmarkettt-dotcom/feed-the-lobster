import type { Metadata } from 'next'
import './globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import { SolanaWalletProvider } from '@/components/WalletProvider'

export const metadata: Metadata = {
  title: 'Feed the Lobster 🦞',
  description: 'Buy food for Klik using SOL. Earn trust. Become a Chamber Legend.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-mono antialiased" style={{ background: '#080305' }}>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  )
}

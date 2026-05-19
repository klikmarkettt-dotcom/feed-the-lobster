import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-8deg) scale(1.05)' },
          '25%': { transform: 'rotate(8deg) scale(1.1)' },
          '50%': { transform: 'rotate(-8deg) scale(1.05)' },
          '75%': { transform: 'rotate(8deg) scale(1.1)' },
        },
        megaDance: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '20%': { transform: 'rotate(-15deg) scale(1.2)' },
          '40%': { transform: 'rotate(15deg) scale(1.3)' },
          '60%': { transform: 'rotate(-15deg) scale(1.2)' },
          '80%': { transform: 'rotate(15deg) scale(1.3)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-8px)' },
          '80%': { transform: 'translateX(8px)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0) rotate(-3deg)' },
          '50%': { transform: 'translateX(12px) rotate(3deg)' },
        },
        nibble: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-4px)' },
          '75%': { transform: 'translateY(4px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0) rotate(-180deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        droopIn: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(10px) rotate(-5deg)' },
        },
        spin360: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.3)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
      animation: {
        bob: 'bob 2.5s ease-in-out infinite',
        wiggle: 'wiggle 0.6s ease-in-out',
        megaDance: 'megaDance 1s ease-in-out 3',
        shake: 'shake 0.8s ease-in-out',
        sway: 'sway 1.2s ease-in-out infinite',
        nibble: 'nibble 0.4s ease-in-out 4',
        droopIn: 'droopIn 0.5s ease-out forwards',
        slideUp: 'slideUp 0.4s ease-out',
        scaleIn: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        spin360: 'spin360 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config

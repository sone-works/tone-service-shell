import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@sone-dao/**/dist/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@sone-dao/tone-react-page-signup/dist/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      mono: ['B612 Mono', 'monospace'],
      content: ['Inter', 'sans-serif'],
      header: ['lores-12', 'monospace'],
      release: ['hydrophilia-iced', 'monospace'],
    },
  },
  darkMode: 'class',
  plugins: [nextui(), require('tailwind-scrollbar')({ nocompatible: true })],
}
export default config

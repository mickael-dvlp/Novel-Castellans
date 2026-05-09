import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: '#FAF5EB',
        'parchment-dark': '#F0E8D5',
        ink: '#2C1810',
        night: '#100E0C',
        'night-surface': '#1C1814',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#3D2B1F',
            '--tw-prose-headings': '#2C1810',
            '--tw-prose-links': '#B45309',
            '--tw-prose-bold': '#2C1810',
            '--tw-prose-counters': '#78716C',
            '--tw-prose-bullets': '#A8A29E',
            '--tw-prose-hr': '#E7D5B8',
            '--tw-prose-quotes': '#44403C',
            '--tw-prose-quote-borders': '#D97706',
            fontSize: '1.125rem',
            lineHeight: '1.9',
            maxWidth: '100%',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              textAlign: 'justify',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#E8D5C0',
            '--tw-prose-headings': '#F5E8D0',
            '--tw-prose-links': '#FBB040',
            '--tw-prose-bold': '#F5E8D0',
            '--tw-prose-counters': '#A8A29E',
            '--tw-prose-bullets': '#78716C',
            '--tw-prose-hr': '#2C2218',
            '--tw-prose-quotes': '#D4C0A8',
            '--tw-prose-quote-borders': '#D97706',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

import { SITE_CONFIG } from '@/config'

export default function Footer() {
  return (
    <footer className="bg-parchment-dark/60 dark:bg-night-surface/60 border-t border-amber-200/50 dark:border-stone-800/50 py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="font-serif text-sm text-stone-500 dark:text-stone-500">
          © {new Date().getFullYear()} <span className="text-amber-700 dark:text-amber-500">{SITE_CONFIG.title}</span> — {SITE_CONFIG.author}
        </p>
      </div>
    </footer>
  )
}

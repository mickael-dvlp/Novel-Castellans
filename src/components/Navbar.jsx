import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { SITE_CONFIG } from '@/config'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-parchment/90 dark:bg-night-surface/90 backdrop-blur-sm border-b border-amber-200/60 dark:border-stone-800/60">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-lg font-bold text-amber-900 dark:text-amber-200 hover:text-amber-700 dark:hover:text-amber-300 transition-colors truncate"
        >
          {SITE_CONFIG.title}
        </Link>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors hidden sm:block"
          >
            Sommaire
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

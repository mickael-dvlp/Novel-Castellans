import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllChaptersMeta } from '@/lib/chapters'
import { SITE_CONFIG } from '@/config'
import ResumeReading from '@/components/ResumeReading'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.title} — Sommaire`,
}

export default function HomePage() {
  const chapters = getAllChaptersMeta()

  return (
    <div className="max-w-[788px] mx-auto px-4 py-10 sm:py-14">

      {/* Hero */}
      <header className="text-center mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-900 dark:text-amber-200 mb-3">
          {SITE_CONFIG.title}
        </h1>
        <p className="text-stone-500 dark:text-stone-500 text-sm">
          {SITE_CONFIG.author} · {chapters.length} chapitre{chapters.length > 1 ? 's' : ''}
        </p>
      </header>

      {/* Reprendre la lecture (client-side localStorage) */}
      <ResumeReading />

      {/* Liste des chapitres */}
      {chapters.length === 0 ? (
        <p className="text-center text-stone-400 dark:text-stone-600 py-16 font-serif italic">
          Aucun chapitre disponible pour l&apos;instant.
        </p>
      ) : (
        <ol className="space-y-1.5">
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link
                href={`/chapitre/${chapter.slug}`}
                className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/50 dark:bg-stone-900/50 hover:bg-amber-100/70 dark:hover:bg-stone-800/70 border border-amber-100 dark:border-stone-800/50 transition-all group"
              >
                <span className="font-serif text-2xl font-bold text-amber-300 dark:text-amber-700 min-w-[3.5rem] text-center tabular-nums select-none">
                  {String(chapter.chapter).padStart(3, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="font-serif font-medium text-stone-800 dark:text-stone-200 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors truncate">
                    {chapter.title}
                  </p>
                  {chapter.date && (
                    <p className="text-xs text-stone-400 dark:text-stone-600 mt-0.5">
                      {chapter.date}
                    </p>
                  )}
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-amber-300 dark:text-stone-700 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors group-hover:translate-x-0.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

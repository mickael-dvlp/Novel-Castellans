import Link from 'next/link'

export default function ChapterNav({ prevChapter, nextChapter }) {
  return (
    <div className="flex items-center justify-between gap-3 py-5 border-y border-amber-200/60 dark:border-stone-800/60 my-8">
      {prevChapter ? (
        <Link
          href={`/chapitre/${prevChapter.slug}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-100/80 dark:bg-stone-800/80 hover:bg-amber-200/80 dark:hover:bg-stone-700/80 border border-amber-200/60 dark:border-stone-700/60 transition-all text-sm font-medium max-w-[45%] group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-amber-600 dark:text-amber-500">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="truncate">
            <span className="block text-xs text-stone-500 dark:text-stone-500 font-normal">Précédent</span>
            <span className="text-stone-700 dark:text-stone-300">Chap. {prevChapter.chapter}</span>
          </span>
        </Link>
      ) : (
        <div />
      )}

      <Link
        href="/"
        className="shrink-0 text-xs text-stone-400 dark:text-stone-600 hover:text-amber-700 dark:hover:text-amber-400 transition-colors px-2"
      >
        ☰ Sommaire
      </Link>

      {nextChapter ? (
        <Link
          href={`/chapitre/${nextChapter.slug}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-100/80 dark:bg-stone-800/80 hover:bg-amber-200/80 dark:hover:bg-stone-700/80 border border-amber-200/60 dark:border-stone-700/60 transition-all text-sm font-medium max-w-[45%] text-right group"
        >
          <span className="truncate">
            <span className="block text-xs text-stone-500 dark:text-stone-500 font-normal">Suivant</span>
            <span className="text-stone-700 dark:text-stone-300">Chap. {nextChapter.chapter}</span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-amber-600 dark:text-amber-500">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

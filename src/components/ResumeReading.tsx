'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface SavedProgress {
  slug: string
  chapter: number
  title: string
}

export default function ResumeReading() {
  const [progress, setProgress] = useState<SavedProgress | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lastChapter')
    if (saved) {
      try {
        setProgress(JSON.parse(saved))
      } catch {
        localStorage.removeItem('lastChapter')
      }
    }
  }, [])

  if (!progress) return null

  return (
    <Link
      href={`/chapitre/${progress.slug}`}
      className="flex items-center justify-between gap-4 w-full px-5 py-4 rounded-xl bg-amber-600 dark:bg-amber-700 hover:bg-amber-700 dark:hover:bg-amber-600 text-white transition-colors mb-8 group shadow-md"
    >
      <div className="min-w-0">
        <p className="text-xs text-amber-200 mb-0.5">Reprendre la lecture</p>
        <p className="font-serif font-medium truncate">
          Chapitre {progress.chapter} — {progress.title}
        </p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-0.5 transition-transform">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </Link>
  )
}

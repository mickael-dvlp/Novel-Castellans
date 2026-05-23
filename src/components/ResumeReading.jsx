'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ResumeReading() {
  const [progress, setProgress] = useState(null)

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
      className="flex items-center justify-between gap-4 w-full px-5 py-3.5 rounded-xl mb-1 group
        bg-orange-950/70 backdrop-blur-sm
        border border-orange-700/40
        hover:border-orange-500/65 hover:bg-orange-950/85
        transition-all duration-200 shadow-lg shadow-orange-950/30"
      style={{ boxShadow: '0 0 18px rgba(200,60,0,0.12), inset 0 1px 0 rgba(255,120,0,0.07)' }}
    >
      <div className="min-w-0">
        <p className="text-[0.68rem] text-orange-500/70 mb-0.5 uppercase tracking-wider font-sans">
          Reprendre la lecture
        </p>
        <p className="font-serif font-medium text-orange-100/90 truncate">
          Chapitre {progress.chapter} — {progress.title}
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-orange-600/60 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </Link>
  )
}

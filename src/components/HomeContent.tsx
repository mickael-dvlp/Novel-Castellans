'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ChapterMeta } from '@/lib/chapters'
import { SITE_CONFIG } from '@/config'
import ResumeReading from './ResumeReading'

interface Props {
  chapters: ChapterMeta[]
}

export default function HomeContent({ chapters }: Props) {
  return (
    <div className="relative z-10 flex flex-col h-full max-w-[788px] mx-auto w-full px-4 pt-6 pb-4">

      {/* Hero */}
      <motion.header
        className="text-center mb-5 shrink-0"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <h1
          className="font-serif text-5xl sm:text-6xl font-bold text-orange-50 mb-3 leading-tight"
          style={{
            textShadow:
              '0 0 35px rgba(255,100,20,0.55), 0 0 70px rgba(255,55,8,0.25)',
          }}
        >
          {SITE_CONFIG.title}
        </h1>
        <p className="text-orange-500/55 text-[0.68rem] tracking-[0.22em] uppercase font-sans">
          {SITE_CONFIG.author}&nbsp;&nbsp;·&nbsp;&nbsp;
          {chapters.length} chapitre{chapters.length > 1 ? 's' : ''}
        </p>
      </motion.header>

      {/* Reprendre la lecture */}
      <motion.div
        className="shrink-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <ResumeReading />
      </motion.div>

      {/* Séparateur incandescent */}
      <motion.div
        className="shrink-0 h-px my-4 bg-gradient-to-r from-transparent via-orange-700/35 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      />

      {/* Liste des chapitres — scrollable */}
      <div className="flex-1 overflow-y-auto pr-0.5 lava-scrollbar">
        {chapters.length === 0 ? (
          <motion.p
            className="text-center text-orange-900/45 py-16 font-serif italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Aucun chapitre disponible pour l&apos;instant.
          </motion.p>
        ) : (
          <motion.ol
            className="space-y-1.5 pb-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.055, delayChildren: 0.55 },
              },
            }}
          >
            {chapters.map((chapter) => (
              <motion.li
                key={chapter.slug}
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.38, ease: 'easeOut' }}
              >
                <Link
                  href={`/chapitre/${chapter.slug}`}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl
                    bg-stone-950/65 backdrop-blur-[2px]
                    border border-orange-950/30
                    hover:border-orange-700/55 hover:bg-stone-900/75
                    transition-all duration-200 group"
                >
                  <span
                    className="font-serif text-2xl font-bold text-orange-700/65
                      group-hover:text-orange-400 transition-colors
                      min-w-[3.5rem] text-center tabular-nums select-none"
                    style={{
                      textShadow: 'none',
                    }}
                  >
                    {String(chapter.chapter).padStart(3, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-medium text-stone-300 group-hover:text-orange-100 transition-colors truncate">
                      {chapter.title}
                    </p>
                    {chapter.date && (
                      <p className="text-xs text-orange-900/55 mt-0.5">
                        {chapter.date}
                      </p>
                    )}
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-orange-900/35 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </div>
  )
}

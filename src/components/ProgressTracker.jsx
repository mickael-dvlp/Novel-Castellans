'use client'

import { useEffect } from 'react'

export default function ProgressTracker({ slug, chapterNum, title }) {
  useEffect(() => {
    localStorage.setItem(
      'lastChapter',
      JSON.stringify({ slug, chapter: chapterNum, title })
    )
  }, [slug, chapterNum, title])

  return null
}

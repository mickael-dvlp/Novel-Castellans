'use client'

import { useEffect } from 'react'

interface Props {
  slug: string
  chapterNum: number
  title: string
}

export default function ProgressTracker({ slug, chapterNum, title }: Props) {
  useEffect(() => {
    localStorage.setItem(
      'lastChapter',
      JSON.stringify({ slug, chapter: chapterNum, title })
    )
  }, [slug, chapterNum, title])

  return null
}

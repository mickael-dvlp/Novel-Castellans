import type { Metadata } from 'next'
import { getAllChaptersMeta } from '@/lib/chapters'
import { SITE_CONFIG } from '@/config'
import LavaBackground from '@/components/LavaBackground'
import BodyScrollLock from '@/components/BodyScrollLock'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.title} — Sommaire`,
}

export default function HomePage() {
  const chapters = getAllChaptersMeta()

  return (
    <div className="relative overflow-hidden" style={{ height: 'calc(100dvh - 56px)' }}>
      <BodyScrollLock />
      <LavaBackground />
      <HomeContent chapters={chapters} />
    </div>
  )
}

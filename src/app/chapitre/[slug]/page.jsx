import { notFound } from 'next/navigation'
import { getAllChaptersMeta, getChapterBySlug } from '@/lib/chapters'
import ChapterNav from '@/components/ChapterNav'
import ProgressTracker from '@/components/ProgressTracker'

export async function generateStaticParams() {
  const chapters = getAllChaptersMeta()
  return chapters.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const chapter = await getChapterBySlug(slug)
  if (!chapter) return {}
  return {
    title: chapter.title,
    description: `Lire le chapitre ${chapter.chapter} : ${chapter.title}`,
  }
}

export default async function ChapterPage({ params }) {
  const { slug } = await params
  const chapter = await getChapterBySlug(slug)

  if (!chapter) notFound()

  const allChapters = getAllChaptersMeta()
  const currentIndex = allChapters.findIndex(c => c.slug === slug)
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  return (
    <div className="max-w-[788px] mx-auto px-4 py-8 sm:py-12">

      {/* Sauvegarde de la progression */}
      <ProgressTracker slug={slug} chapterNum={chapter.chapter} title={chapter.title} />

      {/* En-tête du chapitre */}
      <header className="text-center mb-10">
        <p className="text-sm text-stone-400 dark:text-stone-600 mb-3 tracking-wide uppercase">
          Chapitre {chapter.chapter}
          {chapter.date && (
            <span className="normal-case tracking-normal"> · {chapter.date}</span>
          )}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-900 dark:text-amber-200 leading-tight">
          {chapter.title}
        </h1>
        <div className="mt-5 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent dark:via-amber-700/60" />
        </div>
      </header>

      {/* Navigation haut */}
      <ChapterNav prevChapter={prevChapter} nextChapter={nextChapter} />

      {/* Contenu du chapitre */}
      <article
        className="reading-content prose prose-stone dark:prose-invert prose-lg max-w-none mt-2"
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />

      {/* Navigation bas */}
      <ChapterNav prevChapter={prevChapter} nextChapter={nextChapter} />

    </div>
  )
}

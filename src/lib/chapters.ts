import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const chaptersDir = path.join(process.cwd(), 'content/chapters')

export interface ChapterMeta {
  slug: string
  title: string
  chapter: number
  date: string
}

export interface Chapter extends ChapterMeta {
  content: string
}

function formatDate(raw: string): string {
  if (!raw) return ''
  try {
    return new Date(raw).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return raw
  }
}

export function getAllChaptersMeta(): ChapterMeta[] {
  if (!fs.existsSync(chaptersDir)) return []

  const files = fs.readdirSync(chaptersDir)
    .filter(f => f.endsWith('.md'))
    .sort()

  return files
    .map(filename => {
      const fullPath = path.join(chaptersDir, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const chapterNum = parseInt(data.chapter) || parseInt(filename)

      return {
        slug: String(chapterNum),
        title: data.title || `Chapitre ${chapterNum}`,
        chapter: chapterNum,
        date: formatDate(data.date),
      }
    })
    .sort((a, b) => a.chapter - b.chapter)
}

export function getAllChapterSlugs(): string[] {
  return getAllChaptersMeta().map(c => c.slug)
}

export async function getChapterBySlug(slug: string): Promise<Chapter | null> {
  if (!fs.existsSync(chaptersDir)) return null

  const chapterNum = parseInt(slug)
  if (isNaN(chapterNum)) return null

  // Scan all files and match by frontmatter chapter number
  // (compatible with both 001.md and 1.md naming conventions)
  const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'))

  for (const filename of files) {
    const fullPath = path.join(chaptersDir, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    if (parseInt(data.chapter) === chapterNum) {
      marked.setOptions({ gfm: true })
      const htmlContent = await marked.parse(content)

      return {
        slug,
        title: data.title || `Chapitre ${chapterNum}`,
        chapter: chapterNum,
        date: formatDate(data.date),
        content: htmlContent,
      }
    }
  }

  return null
}

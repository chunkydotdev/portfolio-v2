import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
  content: string
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  const posts = fileNames
    .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const filePath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString(),
        readingTime: readingTime(content).text,
        tags: data.tags || [],
        content,
      }
    })

  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getRecentBlogPosts(limit = 4): BlogPost[] {
  return getAllBlogPosts().slice(0, limit)
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find(post => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map(post => post.slug)
}

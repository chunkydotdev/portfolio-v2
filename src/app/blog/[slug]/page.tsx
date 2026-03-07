import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <article className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8 text-black/40 hover:text-black">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </Button>

        <header className="mb-12">
          <h1 className="font-heading text-5xl md:text-6xl mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-black/40 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>

          <div className="flex gap-2 mt-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] tracking-wider uppercase">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="w-full h-[1px] bg-black/10 mt-8" />
        </header>

        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-black prose-p:text-black/70 prose-a:text-black prose-a:underline prose-strong:text-black">
          <div dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }} />
        </div>
      </article>
    </main>
  )
}

// Simple markdown to HTML converter for basic rendering
function formatMarkdown(content: string): string {
  let html = content
    // Fenced code blocks (``` with optional language)
    .replace(/```(\w*)\n([\s\S]*?)```/gm, (_match, lang, code) => {
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trimEnd()
      return `<pre class="my-6 rounded-lg bg-black/5 p-4 overflow-x-auto"><code${lang ? ` data-lang="${lang}"` : ''}>${escaped}</code></pre>`
    })
    // Inline code
    .replace(/`([^`]+)`/gim, '<code class="bg-black/5 rounded px-1.5 py-0.5 text-sm">$1</code>')
    // Images (must come before links to avoid conflict)
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="my-8 w-full grayscale hover:grayscale-0 transition-all duration-500" />')
    // Headers with spacing
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-12 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-black underline hover:no-underline">$1</a>')
    // Lists - mark them for later wrapping
    .replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/(<li[^>]*>.*?<\/li>\n?)+/gim, (match) => {
    return `<ul class="list-disc my-6 space-y-1">${match}</ul>`
  })

  html = html
    // Paragraphs - split by double newlines
    .split(/\n\n+/)
    .map(block => {
      block = block.trim()
      if (!block) return ''
      // Don't wrap if already an HTML element
      if (block.startsWith('<h') ||
          block.startsWith('<ul') ||
          block.startsWith('<img') ||
          block.startsWith('<pre') ||
          block.startsWith('<div') ||
          block.startsWith('<p')) {
        return block
      }
      return `<p class="my-4 leading-relaxed">${block}</p>`
    })
    .join('\n')

  // Clean up any remaining issues
  html = html
    .replace(/<p class="my-4 leading-relaxed"><(h[123]|ul|img|pre|div)/g, '<$1')
    .replace(/<\/(h[123]|ul|img|pre|div)><\/p>/g, '</$1>')
    .replace(/<pre([\s\S]*?)<\/pre>/g, (match) => match.replace(/\n/g, '{{NEWLINE}}'))
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\{\{NEWLINE\}\}/g, '\n')
    .trim()

  return html
}

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Apple, Play, FileText, Shield } from 'lucide-react'
import { getMobileAppBySlug, getAllMobileAppSlugs } from '@/lib/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Simple markdown to HTML converter
function formatMarkdown(content: string): string {
  return content
    // Convert \n to actual newlines first
    .replace(/\\n/g, '\n')
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/gim, '<em>$1</em>')
    // Unordered lists - convert lines starting with -
    .replace(/^- (.+)$/gim, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>\n?)+/gim, (match) => `<ul>${match}</ul>`)
    // Paragraphs - split by double newline
    .split(/\n\n+/)
    .map(block => {
      block = block.trim()
      if (!block) return ''
      // Don't wrap if already wrapped in a tag
      if (block.startsWith('<')) return block
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`
    })
    .join('\n')
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllMobileAppSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const app = getMobileAppBySlug(slug)

  if (!app) {
    return { title: 'App Not Found' }
  }

  return {
    title: app.title,
    description: app.description,
    openGraph: {
      title: app.title,
      description: app.description,
      images: [app.image.hero],
    },
  }
}

export default async function MobileAppPage({ params }: PageProps) {
  const { slug } = await params
  const app = getMobileAppBySlug(slug)

  if (!app) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/mobile"
          className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-8 text-sm tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all mobile apps
        </Link>

        {/* App Icon & Hero */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          {app.image.appIcon && (
            <div className="w-24 h-24 overflow-hidden shadow-lg flex-shrink-0 border border-black/10">
              <img
                src={app.image.appIcon}
                alt={`${app.title} icon`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
              />
            </div>
          )}
          <div>
            <h1 className="font-heading text-5xl md:text-6xl mb-4">{app.title}</h1>
            <div className="flex flex-wrap gap-2">
              {app.stack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-[10px] tracking-wider uppercase">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative overflow-hidden mb-8 border border-black/10">
          <img
            src={app.image.hero}
            alt={app.title}
            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <div className="w-full h-[1px] bg-black/10 my-8" />

        {/* Description */}
        <div
          className="mb-8 prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-black prose-p:text-black/70 prose-li:text-black/70 prose-strong:text-black prose-ul:list-disc prose-ul:pl-5"
          dangerouslySetInnerHTML={{
            __html: formatMarkdown(app.longDescription || app.description)
          }}
        />

        {/* Store Links */}
        <div className="flex flex-wrap gap-4 mb-8">
          {app.appStoreUrl && (
            <Button asChild size="lg">
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Apple className="w-5 h-5" />
                App Store
              </a>
            </Button>
          )}
          {app.playStoreUrl && (
            <Button asChild size="lg" variant="outline">
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Google Play
              </a>
            </Button>
          )}
        </div>

        {/* Legal Links */}
        {app.legal && (
          <div className="flex flex-wrap gap-6 mb-12 p-6 border border-black/10">
            <Link
              href={`/mobile/${app.slug}/privacy`}
              className="flex items-center gap-2 text-black/40 hover:text-black transition-colors text-sm tracking-wider uppercase"
            >
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Link>
            <Link
              href={`/mobile/${app.slug}/terms`}
              className="flex items-center gap-2 text-black/40 hover:text-black transition-colors text-sm tracking-wider uppercase"
            >
              <FileText className="w-4 h-4" />
              Terms of Service
            </Link>
          </div>
        )}

        {/* Gallery */}
        {app.image.gallery && app.image.gallery.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-2xl">Screenshots</h2>
              <div className="h-[1px] flex-1 bg-black/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-black/10">
              {app.image.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden bg-white">
                  <img
                    src={image}
                    alt={`${app.title} screenshot ${index + 1}`}
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

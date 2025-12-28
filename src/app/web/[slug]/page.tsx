import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { getWebAppBySlug, getAllWebAppSlugs } from '@/lib/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllWebAppSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const app = getWebAppBySlug(slug)

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

export default async function WebAppPage({ params }: PageProps) {
  const { slug } = await params
  const app = getWebAppBySlug(slug)

  if (!app) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/web"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all web apps
        </Link>

        {/* Hero Image */}
        <div className="relative rounded-lg overflow-hidden mb-8 shadow-xl">
          <img
            src={app.image.hero}
            alt={app.title}
            className="w-full h-auto"
          />
        </div>

        {/* Title & Tech Stack */}
        <div className="mb-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">{app.title}</h1>
          <div className="flex flex-wrap gap-2">
            {app.stack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-lg leading-relaxed text-foreground/90">
            {app.longDescription || app.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button asChild size="lg">
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Site
            </a>
          </Button>
          {app.github && (
            <Button asChild variant="outline" size="lg">
              <a
                href={app.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            </Button>
          )}
        </div>

        {/* Gallery */}
        {app.image.gallery && app.image.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="font-heading text-2xl mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {app.image.gallery.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={`${app.title} screenshot ${index + 1}`}
                    className="w-full h-auto"
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

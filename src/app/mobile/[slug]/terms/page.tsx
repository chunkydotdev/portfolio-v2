import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getMobileAppBySlug, getAllMobileAppSlugs } from '@/lib/projects'

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
    title: `Terms of Service - ${app.title}`,
    description: `Terms of Service for ${app.title}`,
  }
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { slug } = await params
  const app = getMobileAppBySlug(slug)

  if (!app || !app.legal) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/mobile/${app.slug}`}
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {app.title}
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl mb-4">Terms of Service</h1>
        <p className="text-foreground/70 mb-8">
          For {app.title} - Effective Date: {app.legal.effectiveDate}
        </p>

        <div className="prose prose-lg max-w-none bg-card p-6 md:p-8 rounded-lg">
          <div
            className="text-card-foreground/90 space-y-4"
            dangerouslySetInnerHTML={{
              __html: app.legal.termsOfService.replace(/\n/g, '<br />'),
            }}
          />
        </div>

        <div className="mt-8 p-4 bg-secondary/20 rounded-lg">
          <p className="text-sm text-foreground/70">
            If you have any questions about these Terms of Service, please contact us at:{' '}
            <a
              href={`mailto:${app.legal.contactEmail}`}
              className="text-link hover:underline"
            >
              {app.legal.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

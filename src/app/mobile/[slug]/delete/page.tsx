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
    title: app.legal.language === 'en' ? `Delete account - ${app.title}` : `Radera konto - ${app.title}`,
    description: app.legal.language === 'en' ? `How to delete your account in ${app.title}` : `Så raderar du ditt konto i ${app.title}`,
  }
}

export default async function DeleteAccountPage({ params }: PageProps) {
  const { slug } = await params
  const app = getMobileAppBySlug(slug)

  if (!app || !app.legal?.deleteAccount) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/mobile/${app.slug}`}
          className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-8 text-sm tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {app.title}
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl mb-4">{app.legal.language === 'en' ? 'Delete account' : 'Radera konto'}</h1>
        <p className="text-black/40 mb-8 text-sm tracking-wider uppercase">
          {app.title} &mdash; Delete your account and data
        </p>

        <div className="w-full h-[1px] bg-black/10 mb-8" />

        <div className="prose prose-lg max-w-none border border-black/10 p-6 md:p-8">
          <div
            className="text-black/70 space-y-4"
            dangerouslySetInnerHTML={{
              __html: app.legal.deleteAccount.replace(/\n/g, '<br />'),
            }}
          />
        </div>

        <div className="mt-8 p-6 border border-black/10">
          <p className="text-sm text-black/40">
            Questions? Contact us at:{' '}
            <a
              href={`mailto:${app.legal.contactEmail}`}
              className="text-black underline hover:no-underline"
            >
              {app.legal.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllMobileApps } from '@/lib/projects'
import { ProjectCard } from '@/components/projects/project-card'

export const metadata: Metadata = {
  title: 'Mobile Apps',
  description: 'All mobile applications built by Magnus Junghard Jägryd',
}

export default function MobileAppsPage() {
  const apps = getAllMobileApps()

  if (apps.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="font-heading text-4xl md:text-5xl mb-8">Mobile Apps</h1>

          <div className="text-center py-16 bg-secondary/20 rounded-lg">
            <p className="text-xl font-heading mb-2">Coming Soon! 📱</p>
            <p className="text-foreground/70">
              Mobile apps are currently in development. Check back soon!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl mb-8">Mobile Apps</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {apps.map((app) => (
            <ProjectCard key={app.slug} project={app} type="mobile" />
          ))}
        </div>
      </div>
    </div>
  )
}

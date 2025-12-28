import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllWebApps } from '@/lib/projects'
import { ProjectCard } from '@/components/projects/project-card'

export const metadata: Metadata = {
  title: 'Web Apps',
  description: 'All web applications built by Magnus Junghard Jägryd',
}

export default function WebAppsPage() {
  const apps = getAllWebApps()

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

        <h1 className="font-heading text-4xl md:text-5xl mb-8">Web Apps</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {apps.map((app) => (
            <ProjectCard key={app.slug} project={app} type="web" />
          ))}
        </div>
      </div>
    </div>
  )
}

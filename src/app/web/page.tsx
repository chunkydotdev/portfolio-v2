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
          className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-8 text-sm tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <h1 className="font-heading text-4xl md:text-5xl">Web Apps</h1>
          <div className="h-[1px] flex-1 bg-black/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px] bg-black/10">
          {apps.map((app) => (
            <ProjectCard key={app.slug} project={app} type="web" />
          ))}
        </div>
      </div>
    </div>
  )
}

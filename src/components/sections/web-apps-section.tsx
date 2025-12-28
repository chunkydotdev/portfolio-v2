import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/projects/project-card'
import { WebApp } from '@/types/project'

interface WebAppsSectionProps {
  apps: WebApp[]
}

export function WebAppsSection({ apps }: WebAppsSectionProps) {
  return (
    <section className="py-16 px-4 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-3xl md:text-4xl">Web Apps</h2>
        <Button asChild variant="ghost" className="group">
          <Link href="/web" className="flex items-center gap-2">
            View all
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apps.map((app) => (
          <ProjectCard key={app.slug} project={app} type="web" />
        ))}
      </div>
    </section>
  )
}

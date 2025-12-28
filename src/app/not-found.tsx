import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <h1 className="font-heading text-6xl md:text-8xl mb-4">404</h1>
      <p className="text-xl md:text-2xl text-foreground/80 mb-8">
        Oops! This page doesn't exist.
      </p>
      <Button asChild size="lg">
        <Link href="/" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  )
}

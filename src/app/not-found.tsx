import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <h1 className="font-heading text-[12rem] md:text-[16rem] leading-none mb-0 text-black/10">404</h1>
      <p className="text-lg md:text-xl text-black/50 mb-8 -mt-4">
        This page doesn&apos;t exist.
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

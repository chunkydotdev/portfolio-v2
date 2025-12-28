'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { WebApp } from '@/types/project'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WebAppsShowcaseProps {
  apps: WebApp[]
}

export function WebAppsShowcase({ apps }: WebAppsShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)

  const activeApp = apps[activeIndex]

  const goToNext = useCallback(() => {
    if (activeIndex < apps.length - 1 && !isLocked) {
      setIsLocked(true)
      setActiveIndex(prev => prev + 1)
      setTimeout(() => setIsLocked(false), 800)
    }
  }, [activeIndex, apps.length, isLocked])

  const goToPrev = useCallback(() => {
    if (activeIndex > 0 && !isLocked) {
      setIsLocked(true)
      setActiveIndex(prev => prev - 1)
      setTimeout(() => setIsLocked(false), 800)
    }
  }, [activeIndex, isLocked])

  // Capture wheel events in the capture phase (before parent gets it)
  useEffect(() => {
    const container = containerRef.current
    if (!container || apps.length <= 1) return

    const handleWheel = (e: WheelEvent) => {
      // Check if the event target is within our container
      if (!container.contains(e.target as Node)) return

      const now = Date.now()
      if (now - lastScrollTime.current < 300) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      const scrollingDown = e.deltaY > 0
      const scrollingUp = e.deltaY < 0
      const atFirst = activeIndex === 0
      const atLast = activeIndex === apps.length - 1

      // If we can navigate within projects, prevent parent scroll
      if ((scrollingDown && !atLast) || (scrollingUp && !atFirst)) {
        e.preventDefault()
        e.stopPropagation()
        lastScrollTime.current = now

        if (scrollingDown) {
          goToNext()
        } else {
          goToPrev()
        }
      }
      // Otherwise let it bubble to parent for section change
    }

    // Use capture phase to intercept before scroll container
    document.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    return () => document.removeEventListener('wheel', handleWheel, { capture: true })
  }, [activeIndex, apps.length, goToNext, goToPrev])

  if (apps.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-xl text-foreground/70">No web apps to display</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="h-full w-full relative overflow-hidden">
      {/* Section title */}
      <motion.div
        className="absolute top-8 left-8 md:left-16 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl text-foreground/90">Web Apps</h2>
      </motion.div>

      {/* Background hero image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeApp.slug}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={activeApp.image.hero}
            alt={activeApp.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end pb-24 md:pb-32 px-8 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeApp.slug}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-heading text-xl md:text-2xl mb-2 block">
              {String(activeIndex + 1).padStart(2, '0')} / {String(apps.length).padStart(2, '0')}
            </span>
            <h3 className="font-heading text-5xl md:text-7xl mb-4">
              {activeApp.title}
            </h3>
            <p className="text-lg md:text-xl mb-6 text-foreground/90 line-clamp-3">
              {activeApp.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {activeApp.stack.slice(0, 5).map(tech => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href={`/web/${activeApp.slug}`}>
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={activeApp.url} target="_blank" rel="noopener noreferrer">
                  Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows + Project indicators */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
        {/* Up arrow */}
        <button
          onClick={goToPrev}
          disabled={activeIndex === 0}
          className={cn(
            'p-2 rounded-full transition-all duration-300',
            activeIndex === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-primary/20 cursor-pointer'
          )}
          aria-label="Previous project"
        >
          <ChevronUp className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="flex flex-col gap-3">
          {apps.map((app, i) => (
            <button
              key={app.slug}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300 cursor-pointer',
                i === activeIndex
                  ? 'bg-primary scale-125'
                  : 'bg-foreground/30 hover:bg-foreground/50'
              )}
              aria-label={`View ${app.title}`}
            />
          ))}
        </div>

        {/* Down arrow */}
        <button
          onClick={goToNext}
          disabled={activeIndex === apps.length - 1}
          className={cn(
            'p-2 rounded-full transition-all duration-300',
            activeIndex === apps.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-primary/20 cursor-pointer'
          )}
          aria-label="Next project"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>

      {/* View all link */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button asChild variant="ghost" size="sm">
          <Link href="/web">
            View all projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}

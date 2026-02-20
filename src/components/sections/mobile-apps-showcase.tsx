'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronUp, Smartphone } from 'lucide-react'
import { MobileApp } from '@/types/project'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileAppsShowcaseProps {
  apps: MobileApp[]
}

export function MobileAppsShowcase({ apps }: MobileAppsShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)

  // Coming soon state
  if (apps.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0], y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8"
          >
            <Smartphone className="h-24 w-24 mx-auto text-primary" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-6xl mb-4">Mobile Apps</h2>
          <p className="text-xl text-foreground/70 mb-2">Coming Soon!</p>
          <p className="text-foreground/50">
            Stay tuned for exciting mobile projects
          </p>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-black/5 rotate-12" />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-black/5 -rotate-6" />
        <div className="absolute bottom-1/3 left-1/3 w-10 h-10 border border-black/5 rotate-45" />
      </div>
    )
  }

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
    }

    document.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    return () => document.removeEventListener('wheel', handleWheel, { capture: true })
  }, [activeIndex, apps.length, goToNext, goToPrev])

  return (
    <div ref={containerRef} className="h-full w-full relative overflow-hidden">
      {/* Section title */}
      <motion.div
        className="absolute top-8 left-8 md:left-16 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl text-foreground/90">Mobile Apps</h2>
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
            className="w-full h-full object-cover grayscale"
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
                <Link href={`/mobile/${activeApp.slug}`}>
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
          aria-label="Previous app"
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
          aria-label="Next app"
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
          <Link href="/mobile">
            View all apps <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}

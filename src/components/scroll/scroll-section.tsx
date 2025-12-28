'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScroll } from './scroll-container'

interface ScrollSectionProps {
  children: ReactNode
  className?: string
  id?: string
  index: number
  background?: 'default' | 'secondary' | 'gradient'
}

export function ScrollSection({
  children,
  className,
  id,
  index,
  background = 'default'
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const { setActiveSection } = useScroll()

  useEffect(() => {
    if (isInView) {
      setActiveSection(index)
    }
  }, [isInView, index, setActiveSection])

  return (
    <section
      ref={ref}
      id={id}
      data-scroll-section
      data-section-index={index}
      className={cn(
        'min-h-screen h-screen w-full snap-start snap-always shrink-0',
        'flex items-center justify-center overflow-hidden relative',
        background === 'secondary' && 'bg-secondary/30',
        background === 'gradient' && 'bg-gradient-to-b from-background to-secondary/20',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  )
}

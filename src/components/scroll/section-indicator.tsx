'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScroll } from './scroll-container'

interface Section {
  id: string
  label: string
}

interface SectionIndicatorProps {
  sections: Section[]
}

export function SectionIndicator({ sections }: SectionIndicatorProps) {
  const { activeSection, scrollToSection } = useScroll()

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <ul className="flex flex-col gap-4">
        {sections.map((section, i) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(i)}
              className="group flex items-center gap-3 cursor-pointer"
              aria-label={`Go to ${section.label}`}
            >
              {/* Label (shows on hover) */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-foreground/70 whitespace-nowrap pr-2">
                {section.label}
              </span>

              {/* Dot indicator */}
              <motion.span
                className={cn(
                  'block w-3 h-3 rounded-full border-2 transition-colors duration-200',
                  i === activeSection
                    ? 'bg-primary border-primary'
                    : 'border-foreground/30 group-hover:border-primary'
                )}
                animate={i === activeSection ? { scale: 1.3 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

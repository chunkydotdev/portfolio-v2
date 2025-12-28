'use client'

import { ReactNode, useRef, createContext, useContext, useState, useCallback } from 'react'

interface ScrollContextType {
  activeSection: number
  setActiveSection: (index: number) => void
  scrollToSection: (index: number) => void
  totalSections: number
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export function useScroll() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within a ScrollContainer')
  }
  return context
}

interface ScrollContainerProps {
  children: ReactNode
  totalSections: number
}

export function ScrollContainer({ children, totalSections }: ScrollContainerProps) {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback((index: number) => {
    const sections = document.querySelectorAll('[data-scroll-section]')
    const target = sections[index] as HTMLElement
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        activeSection,
        setActiveSection,
        scrollToSection,
        totalSections,
      }}
    >
      <main ref={containerRef} className="snap-y snap-mandatory">
        {children}
      </main>
    </ScrollContext.Provider>
  )
}

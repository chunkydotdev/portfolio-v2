'use client'

import { ReactNode } from 'react'
import { ScrollContainer } from './scroll-container'
import { SectionIndicator } from './section-indicator'

export const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'web-apps', label: 'Web Apps' },
  { id: 'mobile-apps', label: 'Mobile Apps' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

interface ScrollWrapperProps {
  children: ReactNode
}

export function ScrollWrapper({ children }: ScrollWrapperProps) {
  return (
    <ScrollContainer totalSections={sections.length}>
      {children}
      <SectionIndicator sections={sections} />
    </ScrollContainer>
  )
}

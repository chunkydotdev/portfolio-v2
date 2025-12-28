export interface WebApp {
  slug: string
  title: string
  description: string
  longDescription?: string
  image: {
    thumbnail: string
    hero: string
    gallery?: string[]
  }
  stack: string[]
  url: string
  github?: string
  featured: boolean
  order: number
}

export interface MobileApp {
  slug: string
  title: string
  description: string
  longDescription?: string
  image: {
    thumbnail: string
    hero: string
    gallery?: string[]
    appIcon: string
  }
  stack: string[]
  appStoreUrl?: string
  playStoreUrl?: string
  featured: boolean
  order: number
  legal: {
    privacyPolicy: string
    termsOfService: string
    effectiveDate: string
    contactEmail: string
  }
}

export type Project = WebApp | MobileApp

export function isMobileApp(project: Project): project is MobileApp {
  return 'appStoreUrl' in project || 'playStoreUrl' in project || 'legal' in project
}

import fs from 'fs'
import path from 'path'
import { WebApp, MobileApp } from '@/types/project'

const webAppsDirectory = path.join(process.cwd(), 'src/content/web')
const mobileAppsDirectory = path.join(process.cwd(), 'src/content/mobile')

// Web Apps
export function getAllWebApps(): WebApp[] {
  if (!fs.existsSync(webAppsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(webAppsDirectory)
  const apps = fileNames
    .filter(name => name.endsWith('.json'))
    .map(fileName => {
      const filePath = path.join(webAppsDirectory, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContents) as WebApp
    })

  return apps.sort((a, b) => a.order - b.order)
}

export function getFeaturedWebApps(): WebApp[] {
  return getAllWebApps().filter(app => app.featured)
}

export function getWebAppBySlug(slug: string): WebApp | undefined {
  return getAllWebApps().find(app => app.slug === slug)
}

export function getAllWebAppSlugs(): string[] {
  return getAllWebApps().map(app => app.slug)
}

// Mobile Apps
export function getAllMobileApps(): MobileApp[] {
  if (!fs.existsSync(mobileAppsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(mobileAppsDirectory)
  const apps = fileNames
    .filter(name => name.endsWith('.json'))
    .map(fileName => {
      const filePath = path.join(mobileAppsDirectory, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContents) as MobileApp
    })

  return apps.sort((a, b) => a.order - b.order)
}

export function getFeaturedMobileApps(): MobileApp[] {
  return getAllMobileApps().filter(app => app.featured)
}

export function getMobileAppBySlug(slug: string): MobileApp | undefined {
  return getAllMobileApps().find(app => app.slug === slug)
}

export function getAllMobileAppSlugs(): string[] {
  return getAllMobileApps().map(app => app.slug)
}

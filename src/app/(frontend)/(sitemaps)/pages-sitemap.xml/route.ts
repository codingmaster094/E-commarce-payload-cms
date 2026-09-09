import { getServerSideSitemap } from 'next-sitemap'
import { getPayloadClient } from '@/lib/cms'
import { getSiteURL } from '@/lib/siteURL'

export const dynamic = 'force-dynamic'

export async function GET() {
  const SITE_URL = getSiteURL()
  const now = new Date().toISOString()

  const staticRoutes = [
    { loc: `${SITE_URL}/`, lastmod: now },
    { loc: `${SITE_URL}/impressum`, lastmod: now },
    { loc: `${SITE_URL}/datenschutzerklaerung`, lastmod: now },
  ]

  try {
    const payload = await getPayloadClient()
    if (!payload) return getServerSideSitemap(staticRoutes)

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: true,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const pages = (results.docs || [])
      .filter((page: { slug?: string | null }) => Boolean(page?.slug))
      .map((page: { slug?: string | null; updatedAt?: string }) => ({
        loc: `${SITE_URL}/${page.slug}`,
        lastmod: page.updatedAt || now,
      }))

    return getServerSideSitemap([...staticRoutes, ...pages])
  } catch (error) {
    console.error('pages-sitemap error:', error)
    return getServerSideSitemap(staticRoutes)
  }
}

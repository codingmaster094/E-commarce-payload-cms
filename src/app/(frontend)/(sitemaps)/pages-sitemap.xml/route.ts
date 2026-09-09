import { getServerSideSitemap } from 'next-sitemap'
import { getPayloadClient } from '@/lib/cms'
import { getSiteURL } from '@/lib/siteURL'

export const dynamic = 'force-dynamic'

export async function GET() {
  const SITE_URL = getSiteURL()
  const now = new Date().toISOString()

  const staticRoutes = [
    { loc: `${SITE_URL}/`, lastmod: now },
    { loc: `${SITE_URL}/chairs`, lastmod: now },
    { loc: `${SITE_URL}/shop`, lastmod: now },
    { loc: `${SITE_URL}/categories`, lastmod: now },
    { loc: `${SITE_URL}/collections`, lastmod: now },
    { loc: `${SITE_URL}/about`, lastmod: now },
    { loc: `${SITE_URL}/contact`, lastmod: now },
    { loc: `${SITE_URL}/faq`, lastmod: now },
    { loc: `${SITE_URL}/shipping`, lastmod: now },
    { loc: `${SITE_URL}/returns`, lastmod: now },
    { loc: `${SITE_URL}/impressum`, lastmod: now },
    { loc: `${SITE_URL}/datenschutzerklaerung`, lastmod: now },
  ]

  try {
    const payload = await getPayloadClient()
    if (!payload) return getServerSideSitemap(staticRoutes)

    const [pagesResult, productResult] = await Promise.all([
      payload.find({
        collection: 'pages',
        overrideAccess: true,
        depth: 0,
        limit: 1000,
        pagination: false,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'products',
        overrideAccess: true,
        depth: 0,
        limit: 1000,
        pagination: false,
        select: { slug: true, updatedAt: true },
      }),
    ])

    const pages = (pagesResult.docs || [])
      .filter((page: { slug?: string | null }) => Boolean(page?.slug))
      .map((page: { slug?: string | null; updatedAt?: string }) => ({
        loc: `${SITE_URL}/${page.slug}`,
        lastmod: page.updatedAt || now,
      }))

    const products = (productResult.docs || [])
      .filter((product: { slug?: string | null }) => Boolean(product?.slug))
      .map((product: { slug?: string | null; updatedAt?: string }) => ({
        loc: `${SITE_URL}/chairs/${product.slug}`,
        lastmod: product.updatedAt || now,
      }))

    return getServerSideSitemap([...staticRoutes, ...pages, ...products])
  } catch (error) {
    console.error('pages-sitemap error:', error)
    return getServerSideSitemap(staticRoutes)
  }
}

import { getPageBySlug } from '@/lib/cms'
import RenderBlocks from '@/app/(frontend)/components/RenderBlocks'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const RESERVED = new Set([
  'admin',
  'api',
  'home',
  'header',
  'footer',
  'impressum',
  'datenschutzerklaerung',
  'sitemap.xml',
  'robots.txt',
  'chairs',
  'categories',
  'collections',
  'wishlist',
  'cart',
  'checkout',
  'account',
  'compare',
  'search',
  'about',
  'contact',
])

export async function generateMetadata({ params }) {
  const { slug } = await params
  if (RESERVED.has(slug)) return {}
  const page = await getPageBySlug(slug)
  if (!page) return { title: 'Seite nicht gefunden' }
  const seo = page?.seo?.meta || {}
  return {
    title: seo.title || page.title,
    description: seo.description || '',
    alternates: { canonical: seo.canonicalUrl || undefined },
    robots: `${seo.indexing || 'index'},${seo.following || 'follow'}`,
  }
}

export default async function CmsPage({ params }) {
  const { slug } = await params
  if (RESERVED.has(slug)) notFound()

  const page = await getPageBySlug(slug)
  if (!page) notFound()

  return (
    <div className="pagecontent">
      <RenderBlocks blocks={page.layout} />
    </div>
  )
}

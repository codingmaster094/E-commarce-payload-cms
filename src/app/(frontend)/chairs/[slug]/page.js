import ProductDetailClient from '../../components/ProductDetailClient'
import { getProductBySlug } from '@/lib/cms'
import { mapProduct } from '@/lib/mapCms'
import { getSiteURL } from '@/lib/siteURL'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const doc = await getProductBySlug(slug)
  const product = mapProduct(doc)
  if (!product) return { title: 'Product' }
  const title = product.name
  const description = product.shortDescription || product.description?.slice(0, 160)
  return {
    title,
    description,
    alternates: { canonical: `${getSiteURL()}/chairs/${product.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      images: product.thumbnail ? [{ url: product.thumbnail }] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params
  const doc = await getProductBySlug(slug)
  const product = mapProduct(doc)
  const site = getSiteURL()

  const jsonLd =
    product &&
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      sku: product.sku,
      image: product.images.filter(Boolean),
      description: product.shortDescription || product.description,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: product.price,
        availability:
          product.availability === 'in_stock'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        url: `${site}/chairs/${product.slug}`,
      },
      ...(product.reviewCount > 0
        ? {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }
        : {}),
    })

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ) : null}
      <ProductDetailClient params={Promise.resolve({ slug })} />
    </>
  )
}

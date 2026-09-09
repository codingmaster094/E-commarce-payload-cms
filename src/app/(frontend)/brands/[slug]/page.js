import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBrandBySlug } from '@/lib/brands'
import { getProducts } from '@/lib/cms'
import { mapProduct } from '@/lib/mapCms'
import ProductCard from '../../components/ProductCard'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)
  return { title: brand?.name || 'Brand' }
}

export default async function BrandDetailPage({ params }) {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)
  if (!brand) return notFound()
  const products = (await getProducts()) || []
  const mapped = products
    .map((doc) => mapProduct(doc))
    .filter((product) => product && (product.brandSlug === slug || product.brandName === brand.name))

  return (
    <div className="container py-12 space-y-8">
      <nav className="text-xs text-neutral-500">
        <Link href="/">Home</Link> / <Link href="/brands">Brands</Link> / <span className="text-neutral-900">{brand.name}</span>
      </nav>
      <h1 className="text-3xl font-extrabold font-outfit">{brand.name}</h1>
      {brand.description ? <p className="text-sm text-neutral-600 max-w-2xl">{brand.description}</p> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mapped.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

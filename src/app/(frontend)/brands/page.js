import Link from 'next/link'
import { getBrandsCMS } from '@/lib/brands'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Brands' }

export default async function BrandsPage() {
  const brands = await getBrandsCMS()

  return (
    <div className="container py-12 space-y-8">
      <h1 className="text-3xl font-extrabold font-outfit">Brands</h1>
      {brands.length === 0 ? (
        <p className="text-sm text-neutral-600">No brands published yet. Add them in Payload CMS.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.slug}`} className="p-6 border border-neutral-200 rounded-2xl hover:border-neutral-900">
              <h2 className="font-bold font-outfit">{brand.name}</h2>
              <p className="text-xs text-neutral-500 mt-2">{brand.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

import { lexicalText } from '@/app/(frontend)/untils/lexicalText'
import type { CategoryItem, CollectionItem, ProductItem } from '@/lib/seedData'
import { brandConfig } from '@/lib/brand'
import {
  CATEGORIES as FALLBACK_CATEGORIES,
  COLLECTIONS as FALLBACK_COLLECTIONS,
  PRODUCTS as FALLBACK_PRODUCTS,
} from '@/lib/seedData'

export type BrandConfig = typeof brandConfig

function mediaUrl(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'url' in value) {
    const url = (value as { url?: string }).url
    return url || ''
  }
  return ''
}

export function descriptionToText(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null) {
    const node = value as { root?: unknown }
    return lexicalText(node.root || value).trim()
  }
  return ''
}

export function mapCategory(
  doc: Record<string, unknown> | null | undefined,
  productCount = 0,
): CategoryItem | null {
  if (!doc) return null
  return {
    id: String(doc.id ?? doc.slug ?? ''),
    name: String(doc.name ?? ''),
    slug: String(doc.slug ?? ''),
    description: String(doc.description ?? ''),
    image: mediaUrl(doc.image) || String(doc.imageUrl ?? ''),
    featured: Boolean(doc.featured),
    productCount,
  }
}

export function mapCollection(doc: Record<string, unknown> | null | undefined): CollectionItem | null {
  if (!doc) return null
  return {
    id: String(doc.id ?? doc.slug ?? ''),
    name: String(doc.name ?? ''),
    slug: String(doc.slug ?? ''),
    description: String(doc.description ?? ''),
    image: mediaUrl(doc.image) || String(doc.imageUrl ?? ''),
    featured: Boolean(doc.featured),
    tagline: String(doc.tagline ?? ''),
  }
}

export function mapProduct(doc: Record<string, unknown> | null | undefined): ProductItem | null {
  if (!doc) return null

  const category = doc.category as Record<string, unknown> | string | undefined
  const collections = Array.isArray(doc.collections) ? doc.collections : []
  const firstCollection =
    collections[0] && typeof collections[0] === 'object'
      ? (collections[0] as Record<string, unknown>)
      : null

  const uploadedImages = Array.isArray(doc.images)
    ? doc.images
        .map((entry) => {
          if (entry && typeof entry === 'object' && 'image' in entry) {
            return mediaUrl((entry as { image?: unknown }).image)
          }
          return ''
        })
        .filter(Boolean)
    : []

  const urlImages = Array.isArray(doc.imageUrls)
    ? doc.imageUrls
        .map((entry) => {
          if (entry && typeof entry === 'object' && 'url' in entry) {
            return String((entry as { url?: string }).url || '')
          }
          return ''
        })
        .filter(Boolean)
    : []

  const thumbnail = mediaUrl(doc.thumbnail) || String(doc.thumbnailUrl ?? '')
  const images = uploadedImages.length > 0 ? uploadedImages : urlImages.length > 0 ? urlImages : thumbnail ? [thumbnail] : []

  const materials = Array.isArray(doc.materials)
    ? doc.materials
        .map((entry) => {
          if (typeof entry === 'string') return entry
          if (entry && typeof entry === 'object' && 'material' in entry) {
            return String((entry as { material?: string }).material || '')
          }
          return ''
        })
        .filter(Boolean)
    : []

  const features = Array.isArray(doc.features)
    ? doc.features
        .map((entry) => {
          if (typeof entry === 'string') return entry
          if (entry && typeof entry === 'object' && 'feature' in entry) {
            return String((entry as { feature?: string }).feature || '')
          }
          return ''
        })
        .filter(Boolean)
    : []

  const colors = Array.isArray(doc.colors)
    ? doc.colors
        .map((entry) => {
          if (!entry || typeof entry !== 'object') return null
          const color = entry as { name?: string; hex?: string }
          if (!color.name || !color.hex) return null
          return { name: color.name, hex: color.hex }
        })
        .filter((color): color is { name: string; hex: string } => Boolean(color))
    : []

  const specifications = Array.isArray(doc.specifications)
    ? doc.specifications
        .map((entry) => {
          if (!entry || typeof entry !== 'object') return null
          const spec = entry as { name?: string; value?: string }
          if (!spec.name || !spec.value) return null
          return { name: spec.name, value: spec.value }
        })
        .filter((spec): spec is { name: string; value: string } => Boolean(spec))
    : []

  const dimensions =
    doc.dimensions && typeof doc.dimensions === 'object'
      ? (doc.dimensions as ProductItem['dimensions'])
      : { width: '', depth: '', height: '', seatHeight: '' }

  const availability =
    doc.availability === 'out_of_stock' || doc.availability === 'pre_order' || doc.availability === 'in_stock'
      ? doc.availability
      : 'in_stock'

  return {
    id: String(doc.id ?? doc.slug ?? ''),
    name: String(doc.name ?? ''),
    slug: String(doc.slug ?? ''),
    sku: String(doc.sku ?? ''),
    shortDescription: String(doc.shortDescription ?? ''),
    description: descriptionToText(doc.description),
    price: Number(doc.price ?? 0),
    compareAtPrice: doc.compareAtPrice != null ? Number(doc.compareAtPrice) : undefined,
    categorySlug: typeof category === 'object' && category ? String(category.slug ?? '') : '',
    categoryName: typeof category === 'object' && category ? String(category.name ?? '') : '',
    collectionSlug: firstCollection ? String(firstCollection.slug ?? '') : undefined,
    collectionName: firstCollection ? String(firstCollection.name ?? '') : undefined,
    images,
    thumbnail,
    materials,
    colors,
    features,
    specifications,
    dimensions,
    weight: String(doc.weight ?? ''),
    maxLoad: String(doc.maxLoad ?? ''),
    warranty: String(doc.warranty ?? ''),
    stock: Number(doc.stock ?? 0),
    availability,
    rating: Number(doc.rating ?? 0),
    reviewCount: Number(doc.reviewCount ?? 0),
    featured: Boolean(doc.featured),
    bestSeller: Boolean(doc.bestSeller),
    newArrival: Boolean(doc.newArrival),
  }
}

export function mergeBrand(settings: Record<string, unknown> | null | undefined): BrandConfig {
  if (!settings) return brandConfig
  return {
    brandName: String(settings.siteName || brandConfig.brandName),
    shortName: String(settings.shortName || brandConfig.shortName),
    brandTagline: String(settings.tagline || brandConfig.brandTagline),
    brandDescription: String(settings.brandDescription || brandConfig.brandDescription),
    logoText: String(settings.logoText || brandConfig.logoText),
    logoSubtext: String(settings.logoSubtext || brandConfig.logoSubtext),
    contactEmail: String(settings.email || brandConfig.contactEmail),
    phone: String(settings.phone || brandConfig.phone),
    address: String(settings.address || brandConfig.address),
    currency: String(settings.currency || brandConfig.currency),
    currencyCode: String(settings.currencyCode || brandConfig.currencyCode),
    socialLinks: {
      instagram: String(settings.instagram || brandConfig.socialLinks.instagram),
      twitter: String(settings.twitter || brandConfig.socialLinks.twitter),
      facebook: String(settings.facebook || brandConfig.socialLinks.facebook),
      linkedin: String(settings.linkedin || brandConfig.socialLinks.linkedin),
      youtube: String(settings.youtube || brandConfig.socialLinks.youtube),
    },
    policies: {
      freeShippingThreshold: Number(
        settings.freeShippingThreshold ?? brandConfig.policies.freeShippingThreshold,
      ),
      warrantyYears: Number(settings.warrantyYears ?? brandConfig.policies.warrantyYears),
      trialDays: Number(settings.trialDays ?? brandConfig.policies.trialDays),
    },
    hoursWeekday: String(settings.hoursWeekday || brandConfig.hoursWeekday),
    hoursSaturday: String(settings.hoursSaturday || brandConfig.hoursSaturday),
    contactIntro: String(settings.contactIntro || brandConfig.contactIntro),
  }
}

export function withFallbackProducts(docs: unknown[] | null | undefined): ProductItem[] {
  const mapped = (docs || []).map((doc) => mapProduct(doc as Record<string, unknown>)).filter(Boolean) as ProductItem[]
  return mapped.length > 0 ? mapped : FALLBACK_PRODUCTS
}

export function withFallbackCategories(
  docs: unknown[] | null | undefined,
  products: ProductItem[],
): CategoryItem[] {
  const mapped = (docs || [])
    .map((doc) => {
      const item = mapCategory(doc as Record<string, unknown>)
      if (!item) return null
      return {
        ...item,
        productCount: products.filter((product) => product.categorySlug === item.slug).length,
      }
    })
    .filter(Boolean) as CategoryItem[]
  return mapped.length > 0 ? mapped : FALLBACK_CATEGORIES
}

export function withFallbackCollections(docs: unknown[] | null | undefined): CollectionItem[] {
  const mapped = (docs || []).map((doc) => mapCollection(doc as Record<string, unknown>)).filter(Boolean) as CollectionItem[]
  return mapped.length > 0 ? mapped : FALLBACK_COLLECTIONS
}

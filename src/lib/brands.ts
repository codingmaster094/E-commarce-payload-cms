import { getPayloadClient, toPlain } from '@/lib/cms'

export async function getBrandsCMS() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return []
    const result = await payload.find({
      collection: 'brands',
      depth: 1,
      limit: 50,
      where: { status: { equals: 'active' } },
    })
    return toPlain(result.docs || []) || []
  } catch {
    return []
  }
}

export async function getBrandBySlug(slug) {
  try {
    const payload = await getPayloadClient()
    if (!payload) return null
    const result = await payload.find({
      collection: 'brands',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    return toPlain(result.docs[0] ?? null)
  } catch {
    return null
  }
}

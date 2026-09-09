import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { evaluateCoupon } from '@/lib/ecommerce/coupon'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const code = String(body?.code || '').trim().toUpperCase()
    const subtotal = Number(body?.subtotal || 0)
    const productIds: string[] = Array.isArray(body?.productIds) ? body.productIds.map(String) : []
    const categoryIds: string[] = Array.isArray(body?.categoryIds) ? body.categoryIds.map(String) : []

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Enter a coupon code.' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'coupons',
      where: { code: { equals: code } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const coupon = result.docs[0]
    if (!coupon) {
      return NextResponse.json({ valid: false, message: 'Coupon not found.' }, { status: 404 })
    }

    return NextResponse.json(evaluateCoupon(coupon, subtotal, productIds, categoryIds))
  } catch (error) {
    console.error('coupon validate failed', error)
    return NextResponse.json({ valid: false, message: 'Unable to validate coupon.' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { evaluateCoupon } from '@/lib/ecommerce/coupon'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const items = Array.isArray(body?.items) ? body.items : []
    if (items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const headerList = await headers()
    const { user } = await payload.auth({ headers: headerList })
    const customer = user?.collection === 'customers' ? user : null

    const productIds = items.map((item: { productId?: string }) => String(item.productId || ''))
    const products = await payload.find({
      collection: 'products',
      where: { id: { in: productIds } },
      limit: 100,
      depth: 1,
      overrideAccess: true,
    })

    const pricedItems = items.flatMap((item: {
      productId: string
      quantity: number
      color?: string
      variantTitle?: string
    }) => {
      const product = products.docs.find((doc) => String(doc.id) === String(item.productId))
      if (!product) return []
      const quantity = Math.max(1, Number(item.quantity) || 1)
      const unitPrice = Number(product.salePrice || product.price || 0)
      return [{
        productName: product.name,
        productId: String(product.id),
        sku: product.sku,
        quantity,
        unitPrice,
        color: item.color || '',
        variantTitle: item.variantTitle || '',
      }]
    })

    if (pricedItems.length === 0) {
      return NextResponse.json({ error: 'No valid products in cart.' }, { status: 400 })
    }

    const subtotal = pricedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const shipping = Number(body?.shipping || 0)
    const tax = Number(body?.tax || 0)
    let discount = 0
    let couponCode = ''

    if (body?.couponCode) {
      const found = await payload.find({
        collection: 'coupons',
        where: { code: { equals: String(body.couponCode).toUpperCase() } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      const coupon = found.docs[0]
      if (coupon) {
        const categoryIds = products.docs
          .map((doc) => (typeof doc.category === 'object' ? doc.category?.id : doc.category))
          .filter(Boolean)
          .map(String)
        const result = evaluateCoupon(coupon, subtotal, productIds, categoryIds)
        if (result.valid) {
          discount = result.discount
          couponCode = result.code
          await payload.update({
            collection: 'coupons',
            id: coupon.id,
            data: { usageCount: Number(coupon.usageCount || 0) + 1 },
            overrideAccess: true,
          })
        }
      }
    }

    const total = Math.max(0, subtotal - discount + shipping + tax)
    const shippingAddress = body?.shippingAddress || {}
    const billingAddress = body?.billingSameAsShipping
      ? { ...shippingAddress, sameAsShipping: true }
      : { ...(body?.billingAddress || {}), sameAsShipping: false }

    const order = await payload.create({
      collection: 'orders',
      overrideAccess: true,
      data: {
        orderNumber: `MNV-${Date.now().toString().slice(-8)}`,
        customer: customer?.id,
        customerEmail: body?.email || customer?.email,
        customerName:
          body?.customerName ||
          [shippingAddress.firstName, shippingAddress.lastName].filter(Boolean).join(' ') ||
          (customer as { name?: string } | null)?.name,
        items: pricedItems,
        subtotal,
        discount,
        couponCode,
        shipping,
        tax,
        total,
        currency: body?.currency || 'USD',
        paymentStatus: 'pending',
        orderStatus: 'pending',
        shippingAddress,
        billingAddress,
        shippingMethod: body?.shippingMethod || 'standard',
        paymentMethod: body?.paymentMethod || 'manual',
        notes: body?.notes || '',
      },
    })

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      total: order.total,
    })
  } catch (error) {
    console.error('checkout failed', error)
    return NextResponse.json({ error: 'Unable to place order.' }, { status: 500 })
  }
}

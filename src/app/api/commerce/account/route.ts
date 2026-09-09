import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const headerList = await headers()
    const { user } = await payload.auth({ headers: headerList })
    if (user?.collection !== 'customers') {
      return NextResponse.json({ orders: [] }, { status: 401 })
    }

    const result = await payload.find({
      collection: 'orders',
      where: { customer: { equals: user.id } },
      sort: '-createdAt',
      limit: 50,
      depth: 0,
      overrideAccess: true,
    })

    return NextResponse.json({ orders: result.docs })
  } catch (error) {
    console.error('orders list failed', error)
    return NextResponse.json({ orders: [] }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const headerList = await headers()
    const { user } = await payload.auth({ headers: headerList })
    if (user?.collection !== 'customers') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const wishlist = Array.isArray(body?.wishlist) ? body.wishlist : []

    await payload.update({
      collection: 'customers',
      id: user.id,
      data: { wishlist },
      overrideAccess: true,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('wishlist sync failed', error)
    return NextResponse.json({ error: 'Unable to sync wishlist.' }, { status: 500 })
  }
}

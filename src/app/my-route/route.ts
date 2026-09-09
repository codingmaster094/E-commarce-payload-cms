import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import type { GlobalSlug } from 'payload'
export const dynamic = 'force-dynamic'
export const GET = async (req: NextRequest) => {
  try {
    const payload = await getPayload({ config: await configPromise })
    const searchParams = req.nextUrl.searchParams
    const slug = searchParams.get('slug') as GlobalSlug | null

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Missing slug parameter' },
        { status: 400 }
      )
    }
    const data = await payload.findGlobal({
      slug,
      depth: 2,
    })
    if (!data) {
      return NextResponse.json(
        { success: false, message: `No global found for slug "${slug}"`},
        { status: 404 }
      )
    }
    return NextResponse.json({
      success: true,
      slug,
      data,
    })
  } catch (error) {
    console.error('Error fetching global:', error)
    return NextResponse.json(
      {
        success: false,
        message: `Error fetching global "${req.nextUrl.searchParams.get('slug')}"`,
        error: error,
      },
      { status: 500 }
    )
  }
}

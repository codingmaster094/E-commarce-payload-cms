import { getGlobal } from '@/lib/cms'
import { getSiteURL } from '@/lib/siteURL'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const site = getSiteURL()
  const robotsGlobal = await getGlobal<{ robots?: string }>('robots')
  const robotsRaw = robotsGlobal?.robots

  if (typeof robotsRaw === 'string' && robotsRaw.trim()) {
    return new Response(robotsRaw.trim(), {
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  const fallback = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    `Sitemap: ${site}/sitemap.xml`,
  ].join('\n')

  return new Response(fallback, {
    headers: { 'Content-Type': 'text/plain' },
  })
}

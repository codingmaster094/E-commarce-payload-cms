import RenderBlocks from '../components/RenderBlocks'
import { getPageBySlug } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const page = await getPageBySlug('home')
  if (!page?.layout?.length) return <div className="pagecontent">No homepage content available.</div>
  return <RenderBlocks blocks={page.layout} />
}

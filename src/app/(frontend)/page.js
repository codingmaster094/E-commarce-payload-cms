import { getGlobal } from '@/lib/cms'
import HomePageClient from './components/HomePageClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const home = await getGlobal('home-page')
  return <HomePageClient home={home} />
}

import { getGlobal } from '@/lib/cms'
import AboutPageClient from '../components/AboutPageClient'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const about = await getGlobal('about-page')
  return <AboutPageClient about={about} />
}

import { getPageBySlug } from '@/lib/cms'
import RenderBlocks from '../components/RenderBlocks'
import { lexicalText } from '@/app/(frontend)/untils/lexicalText'

function fallbackCopy(title, paragraphs) {
  return (
    <div className="container py-12 max-w-3xl space-y-4">
      <h1 className="text-3xl font-extrabold font-outfit text-neutral-900">{title}</h1>
      {paragraphs.map((text) => (
        <p key={text.slice(0, 24)} className="text-sm text-neutral-700 leading-relaxed">{text}</p>
      ))}
    </div>
  )
}

export async function PolicyPage({ slug, title, paragraphs }) {
  const page = await getPageBySlug(slug)
  if (page?.layout?.length) {
    return (
      <div className="py-8">
        <div className="container mb-8">
          <h1 className="text-3xl font-extrabold font-outfit">{page.title || title}</h1>
        </div>
        <RenderBlocks blocks={page.layout} />
      </div>
    )
  }
  if (page?.content) {
    return (
      <div className="container py-12 max-w-3xl space-y-4">
        <h1 className="text-3xl font-extrabold font-outfit">{page.title || title}</h1>
        <p className="text-sm text-neutral-700">{lexicalText(page.content)}</p>
      </div>
    )
  }
  return fallbackCopy(title, paragraphs)
}

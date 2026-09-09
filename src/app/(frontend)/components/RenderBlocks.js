import HeroSection from '@/app/(frontend)/components/HeroSection'
import Personalvermittlung from '@/app/(frontend)/components/Personalvermittlung'
import OffenStellen from '@/app/(frontend)/components/OffenStellen'
import FAQ from '@/app/(frontend)/components/FAQ'
import Kontakt from '@/app/(frontend)/components/Kontakt'
import Tab2 from '@/app/(frontend)/components/Tab2'
import { lexicalText } from '@/app/(frontend)/untils/lexicalText'

function settingsClassName(settings) {
  const padding = {
    none: 'py-0',
    sm: 'py-32',
    md: 'py-64',
    lg: 'py-80',
  }[settings?.padding || 'md']

  const background = {
    default: '',
    white: 'bg-white',
    muted: 'bg-gray-50',
    dark: 'bg-primary_1 text-white',
  }[settings?.background || 'default']

  const align = settings?.align === 'center' ? 'text-center' : ''
  return [padding, background, align].filter(Boolean).join(' ')
}

function Shell({ block, children }) {
  if (block?.settings?.visible === false) return null
  return (
    <section id={block?.settings?.anchor || undefined} className={settingsClassName(block?.settings)}>
      {children}
    </section>
  )
}

const registry = {
  hero: (block) => (
    <HeroSection
      Heading={block.Heading}
      SubHeading={block.SubHeading}
      BG_Image={block.heroImage}
      BTN={block.hero_link}
      Description={block.richText?.root?.children}
    />
  ),
  personalvermittlung: (block) => (
    <Personalvermittlung
      Side_Image={block.personalvermittlung_Image}
      Heading={block.Heading}
      Description={block.description?.root?.children}
    />
  ),
  offeneStellen: (block) => (
    <OffenStellen
      SideImage={block.offeneStellenImage}
      Heading={block.heading}
      Description={block.description?.root?.children}
      BTN={block.offeneStellen_link}
    />
  ),
  faq: (block) => (
    <FAQ
      Section_Show={block.enableFAQ}
      title={block.Heading}
      FAQ_Data={block.FaqContent}
    />
  ),
  unternehmen: (block) => <Tab2 data={block} />,
  contact: (block) => (
    <Kontakt
      Heading={block.Heading}
      SubHeading={block.SubHeading}
      FormHeading={block.FormHeading}
      SubmitButton={block.sumbimtedButtonLabel || 'Anfrage abschicken'}
      DatenschutzerklarungLink={block.DatenschutzerklarungLink}
    />
  ),
  richContent: (block) => (
    <div className="container pagecontent">
      {block.Gutenberg_html ? (
        <div dangerouslySetInnerHTML={{ __html: block.Gutenberg_html }} />
      ) : (
        <p>{lexicalText(block.Gutenberg)}</p>
      )}
    </div>
  ),
  cta: (block) => (
    <div className="container text-center space-y-24">
      {block.heading ? <h2 className="text-h2/snug">{block.heading}</h2> : null}
      {block.text ? <p>{block.text}</p> : null}
      {block.button?.url ? (
        <a href={block.button.url} target={block.button.target || '_self'} className="btn-dark inline-block">
          <span>{block.button.label}</span>
        </a>
      ) : null}
    </div>
  ),
  image: (block) =>
    block.image?.url ? (
      <div className="container">
        <img src={block.image.url} alt={block.image.alt || block.caption || ''} className="w-full h-auto" />
        {block.caption ? <p className="mt-8 text-sm">{block.caption}</p> : null}
      </div>
    ) : null,
  banner: (block) => (
    <div className="container">
      <div className="bg-primary_1 text-white p-32 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-16">
        <p>{block.text}</p>
        {block.link?.url ? (
          <a href={block.link.url} target={block.link.target || '_self'} className="underline">
            {block.link.label || block.link.url}
          </a>
        ) : null}
      </div>
    </div>
  ),
  accordion: (block) => (
    <FAQ
      Section_Show
      title={block.heading}
      FAQ_Data={(block.items || []).map((item) => ({
        title: item.title,
        richText: item.content,
      }))}
    />
  ),
  spacer: (block) => (
    <div
      aria-hidden
      className={block.size === 'lg' ? 'h-80' : block.size === 'sm' ? 'h-24' : 'h-48'}
    />
  ),
  html: (block) =>
    block.html ? <div className="container" dangerouslySetInnerHTML={{ __html: block.html }} /> : null,
}

export default function RenderBlocks({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return blocks.map((block, index) => {
    const render = registry[block?.blockType]
    if (!render) return null
    return (
      <Shell key={block.id || `${block.blockType}-${index}`} block={block}>
        {render(block)}
      </Shell>
    )
  })
}

import generatePageMetadata from '../untils/generatePageMetadata'
import { getGlobal } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return generatePageMetadata('impressum', {
    title: 'Impressum',
    description: 'Impressum der MeaNova GmbH',
  })
}

export default async function ImpressumPage() {
  const data = await getGlobal('impressum')
  const html = data?.contents?.Gutenberg_html

  if (html) {
    return (
      <div className="pagecontent">
        <div className="container" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
  }

  return (
    <div className="pagecontent">
      <div className="container">
        <h1>{data?.title || 'Impressum'}</h1>
        <div className="company-info">
          <h2>MeaNova GmbH</h2>
          <div className="contact-info">
            <p>
              Salzstraße 8
              <br />
              85622 Feldkirchen
              <br />
              Deutschland
            </p>
          </div>
          <h4>Vertreten durch:</h4>
          <p>Geschäftsführerin: Laura Marie Fies</p>
          <h4>Kontakt:</h4>
          <p>
            Telefon: 089 189659820
            <br />
            E-Mail: <a href="mailto:info@meanova.de">info@meanova.de</a>
          </p>
        </div>
      </div>
    </div>
  )
}

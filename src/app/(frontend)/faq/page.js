import { PolicyPage } from '../components/PolicyPage'

export const metadata = { title: 'FAQ' }

export default function FaqRoute() {
  return (
    <PolicyPage
      slug="faq"
      title="Frequently asked questions"
      paragraphs={[
        'Shipping, warranty, and trial policies are managed in Site Settings in Payload CMS.',
        'Need help choosing a chair? Visit Contact or use the comparison tool from the catalog.',
      ]}
    />
  )
}

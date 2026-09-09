import { PolicyPage } from '../components/PolicyPage'

export const metadata = { title: 'Returns' }

export default function ReturnsRoute() {
  return (
    <PolicyPage
      slug="returns"
      title="Returns"
      paragraphs={[
        'Trial and return windows are configured in Site Settings (trial days).',
        'Create a CMS page with slug “returns” to publish full return instructions.',
      ]}
    />
  )
}

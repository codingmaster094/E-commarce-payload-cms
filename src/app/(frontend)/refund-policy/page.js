import { PolicyPage } from '../components/PolicyPage'

export const metadata = { title: 'Refund policy' }

export default function RefundPolicyRoute() {
  return (
    <PolicyPage
      slug="refund-policy"
      title="Refund policy"
      paragraphs={[
        'Refunds follow the trial window in Site Settings. Publish a CMS page with slug “refund-policy” for full legal copy.',
      ]}
    />
  )
}

import { PolicyPage } from '../components/PolicyPage'

export const metadata = { title: 'Shipping' }

export default function ShippingRoute() {
  return (
    <PolicyPage
      slug="shipping"
      title="Shipping"
      paragraphs={[
        'Orders over the free-shipping threshold in Site Settings ship without a delivery fee.',
        'Create a CMS page with slug “shipping” to replace this fallback copy.',
      ]}
    />
  )
}

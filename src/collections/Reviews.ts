import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isAdmin } from '@/access/isAdmin'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'product', 'rating', 'status'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      return { status: { equals: 'approved' } }
    },
    create: anyone,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'product', type: 'relationship', relationTo: 'products', required: true },
    { name: 'customer', type: 'relationship', relationTo: 'customers' },
    { name: 'customerName', type: 'text', required: true },
    { name: 'rating', type: 'number', min: 1, max: 5, required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'comment', type: 'textarea' },
    { name: 'review', type: 'textarea', required: true },
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    { name: 'verifiedPurchase', type: 'checkbox', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Approved', value: 'approved' },
        { label: 'Pending', value: 'pending' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
  ],
}
